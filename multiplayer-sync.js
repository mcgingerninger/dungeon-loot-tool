// ===================== MULTIPLAYER SYNC (Firebase) — PHASE 1 + ACCOUNTS =====================
// Self-contained add-on for dungeon_loot_wheel: real player/DM accounts, a launch-time role
// gate, role-based tab restrictions, and realtime sync of a player's full save-state to the
// cloud. Everything multiplayer-related lives in this one file — the main app file only
// needed two small named hook additions (see the comment above its
// <script type="module" src="multiplayer-sync.js"> tag): window.onMultiplayerStateChange and
// window.applyRemoteMultiplayerState. Both are checked with `typeof x === 'function'` before
// being called, so if this file is ever removed, the main app keeps working exactly as it
// does today — nothing in it depends on this file existing.
//
// ---- Account model ----
// Real Firebase Email/Password accounts, but players/DMs never type or see an email — they
// pick a USERNAME and password, and this file synthesizes a fake-but-valid email under the
// hood (e.g. "dave" -> "dave@dnd-loot-tool.local") so Firebase's real password security
// (hashing, rate limiting, etc.) handles everything properly instead of anything here rolling
// its own crypto. Firebase's built-in email-uniqueness check doubles as username-uniqueness
// enforcement for free — no separate "is this username taken" lookup collection needed.
//
// A DM's account owns exactly one campaign (a room code, generated at signup). A player's
// account is linked to exactly one DM's campaign, entered once at signup — after that, they
// just log in with their username/password from any device and land straight back in it.
// (One account per campaign is a deliberate v1 simplification, not a hard technical limit.)
//
// ---- Role restrictions — read this before assuming it's airtight ----
// Hiding DM-only tabs for players is a UX courtesy, not a security boundary — anyone who
// opened browser devtools could still call the underlying functions directly. The REAL
// enforcement is what Firestore's security rules let a signed-in player's account actually
// read/write: only their own rooms/{code}/players/{uid} document, never anyone else's and
// never the room document itself. A player fiddling with devtools could still, say, generate
// themselves a legendary sword locally and have it sync — same as it always could with any
// client-side app — but they can't touch another player's data or the DM's.
//
// ---- One-time setup you still need to do in the Firebase console ----
// Test mode (from initial setup) allows any signed-in user to read/write everything for ~30
// days and then locks down to deny-everything. Before that expires (or if you've updated this
// file and need to re-paste), paste this into Firestore Database → Rules, replacing whatever's
// there, then click Publish:
//
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
//       match /users/{uid} {
//         allow read: if request.auth != null;
//         allow create: if request.auth != null && request.auth.uid == uid;
//         allow update: if request.auth != null && request.auth.uid == uid;
//       }
//       match /rooms/{roomCode} {
//         allow read: if request.auth != null;
//         allow create: if request.auth != null;
//         allow update, delete: if request.auth != null && resource.data.dmUid == request.auth.uid;
//         match /players/{playerId} {
//           allow read: if request.auth != null;
//           allow write: if request.auth != null && (
//             request.auth.uid == playerId ||
//             get(/databases/$(database)/documents/rooms/$(roomCode)).data.dmUid == request.auth.uid
//           );
//         }
//         // DM-only shared combat view — a player never writes here, only reads it live.
//         match /battlefield/{doc} {
//           allow read: if request.auth != null;
//           allow write: if request.auth != null && get(/databases/$(database)/documents/rooms/$(roomCode)).data.dmUid == request.auth.uid;
//         }
//         // Real-time looting: any authenticated user (a player looting for themselves, or the
//         // DM giving an item to someone) can CREATE a claim, but nobody can ever update or
//         // delete one — this immutability is what gives true first-write-wins for a specific
//         // corpse-drop item with zero server-side code and zero DM-online dependency.
//         match /lootClaims/{claimId} {
//           allow read: if request.auth != null;
//           allow create: if request.auth != null;
//           allow update, delete: if false;
//         }
//       }
//     }
//   }
//
// "write" already covers create/update/delete combined — this is what lets a DM delete a
// player's document (see removePlayer below) without needing a separate delete rule.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, updateProfile, deleteUser,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {
  initializeFirestore, doc, setDoc, getDoc, deleteDoc, onSnapshot, collection, serverTimestamp,
  updateDoc, increment, arrayUnion,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAv2PB_BFz0k_flWzjSgpRmQtLPx88KUPM",
  authDomain: "dnd-loot-tool.firebaseapp.com",
  projectId: "dnd-loot-tool",
  storageBucket: "dnd-loot-tool.firebasestorage.app",
  messagingSenderId: "1006460408021",
  appId: "1:1006460408021:web:e475fed0a7b66150f9125c",
};

const fbApp = initializeApp(firebaseConfig);
const auth = getAuth(fbApp);
// Plain getFirestore() defaults to a WebChannel transport that tries QUIC (HTTP/3) first —
// on some networks (corporate firewalls, certain ISPs/VPNs/proxies that block outbound UDP)
// QUIC connections fail outright, which shows up as net::ERR_QUIC_PROTOCOL_ERROR plus repeated
// 400s on firestore.googleapis.com's Write stream, and every read/write (including account
// creation and login) fails as a result. experimentalAutoDetectLongPolling makes the SDK probe
// for that up front and transparently fall back to long-polling over plain HTTPS instead of
// QUIC, with no behavior change for players on networks where QUIC works fine.
const db = initializeFirestore(fbApp, { experimentalAutoDetectLongPolling: true });

// ---------- Username <-> synthetic email ----------
const USERNAME_EMAIL_DOMAIN = "dnd-loot-tool.local";
function sanitizeUsername(raw) {
  return (raw || "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
}
function usernameToEmail(username) {
  return sanitizeUsername(username) + "@" + USERNAME_EMAIL_DOMAIN;
}

// Room codes avoid visually-ambiguous characters (0/O, 1/I/L) since these get read aloud
// and typed by hand at the table.
const ROOM_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function generateRoomCode(len = 5) {
  let out = "";
  for (let i = 0; i < len; i++) out += ROOM_CODE_ALPHABET[Math.floor(Math.random() * ROOM_CODE_ALPHABET.length)];
  return out;
}

function userDocRef(uid) { return doc(db, "users", uid); }
function roomDocRef(roomCode) { return doc(db, "rooms", roomCode); }
function playerDocRef(roomCode, uid) { return doc(db, "rooms", roomCode, "players", uid); }
// One doc per room, written only by the DM, holding just the combat roster/log — deliberately
// separate from the DM's own players/{dmUid} doc (which holds their ENTIRE app state) so a
// player's battlefield listener only ever re-fires on actual combat activity, not on every
// unrelated thing the DM does elsewhere in the app (restocking the Store, editing their own
// inventory, etc.).
function battlefieldDocRef(roomCode) { return doc(db, "rooms", roomCode, "battlefield", "state"); }
function lootClaimDocRef(roomCode, claimId) { return doc(db, "rooms", roomCode, "lootClaims", claimId); }
function lootClaimsCollectionRef(roomCode) { return collection(db, "rooms", roomCode, "lootClaims"); }

// All multiplayer session state lives here, not scattered across module-level variables.
const mp = {
  uid: null,
  username: null,
  role: null, // 'dm' | 'player'
  roomCode: null,
  connected: false,
  // Guards the save→sync→listener→apply→(would-be-save-again) loop: while a remote update
  // is being applied to local state, the save hook skips pushing back up.
  applyingRemote: false,
  playerUnsub: null,
  rosterUnsub: null,
  roster: new Map(), // uid -> { username, updatedAt } — DM-only, for the roster/remove list
  kicked: false, // set true if the DM removed us — blocks any further push attempts
  // Monotonically increasing counter, stamped onto every write this client makes to its own
  // player doc (see pushOwnState) and checked on every snapshot the realtime listener
  // receives back (see startPlayerListener) — see the comment there for why this exists.
  pushRev: 0,
};

// ---------- Sign up ----------
async function signUpDM(username, password) {
  const email = usernameToEmail(username);
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const user = cred.user;
  await updateProfile(user, { displayName: sanitizeUsername(username) });
  const roomCode = generateRoomCode();
  await setDoc(roomDocRef(roomCode), { dmUid: user.uid, createdAt: serverTimestamp() });
  await setDoc(userDocRef(user.uid), {
    role: "dm", username: sanitizeUsername(username), campaignCode: roomCode, createdAt: serverTimestamp(),
  });
  await connectAsRole(user.uid, "dm", roomCode, sanitizeUsername(username));
}

async function signUpPlayer(username, password, campaignCode) {
  campaignCode = (campaignCode || "").trim().toUpperCase();
  if (!campaignCode) throw new Error("Enter the DM's campaign code.");
  const email = usernameToEmail(username);
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const user = cred.user;
  // The campaign-code check has to happen AFTER signup, not before: the security rules up top
  // require request.auth != null just to READ a room doc at all, so checking this before the
  // account exists throws Firestore's "Missing or insufficient permissions" instead of the
  // intended "no campaign found" message -- this is what was actually breaking player signup,
  // not a rules/config problem. If the code turns out to be bad, roll back the account that
  // was just created rather than leaving an orphaned login nobody can do anything useful with.
  const roomSnap = await getDoc(roomDocRef(campaignCode));
  if (!roomSnap.exists()) {
    await deleteUser(user).catch(() => {});
    throw new Error(`No campaign found for code "${campaignCode}".`);
  }
  await updateProfile(user, { displayName: sanitizeUsername(username) });
  await setDoc(userDocRef(user.uid), {
    role: "player", username: sanitizeUsername(username), campaignCode, createdAt: serverTimestamp(),
  });
  await connectAsRole(user.uid, "player", campaignCode, sanitizeUsername(username));
}

// ---------- Log in (also used for the automatic "already signed in" restore on page load) ----------
async function logIn(username, password) {
  const email = usernameToEmail(username);
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await restoreSession(cred.user);
}

// Reads this account's profile doc to find its role + campaign, then wires up the same sync
// engine Phase 1 already built. Used both right after a fresh login and automatically on page
// load if Firebase still has a valid persisted session for this browser.
async function restoreSession(user) {
  const snap = await getDoc(userDocRef(user.uid));
  if (!snap.exists()) throw new Error("Account profile not found — try logging in again.");
  const data = snap.data();
  await connectAsRole(user.uid, data.role, data.campaignCode, data.username);
}

async function connectAsRole(uid, role, roomCode, username) {
  mp.uid = uid;
  mp.role = role;
  mp.roomCode = roomCode;
  mp.username = username;
  mp.kicked = false;
  // Deliberately populate the local-state cache (for a first-time push, below) BEFORE
  // flipping mp.connected on — window.onMultiplayerStateChange only auto-pushes when
  // mp.connected is already true, so calling this while it's still false just refreshes the
  // cache without triggering an eager push that could race ahead of the "does this account
  // already have data" check right below it.
  refreshLocalStateCache();
  // A brand-new account has nothing synced yet — an existing one (returning login) already
  // has a player doc, and pushing local state here would clobber it with whatever's in this
  // browser's fresh localStorage. Only push if there's genuinely nothing there yet;
  // startPlayerListener()'s first snapshot handles pulling existing state down either way.
  const existing = await getDoc(playerDocRef(roomCode, uid));
  mp.connected = true;
  if (!existing.exists()) {
    const created = await pushOwnState();
    if (!created) {
      // The very first write failed (permissions still propagating, a network blip, etc.) —
      // do NOT proceed into startPlayerListener() in this state, since its first snapshot
      // would see "no document" and could misread that as having been removed by the DM
      // (see the comment on startPlayerListener for the full explanation of that bug and fix).
      // Bail out to the gate with a real error instead of silently continuing broken.
      mp.connected = false;
      setGateStatus("Couldn't reach the campaign database — check your connection and Firestore rules, then try again.", true);
      return;
    }
  }
  startPlayerListener();
  if (role === "dm") startRosterListener();
  else startBattlefieldListener(roomCode);
  startLootClaimListener(roomCode);
  hideGate();
  enforceRoleRestrictions(role);
  renderAccountPanel();
  updatePlayerNameDisplay();
}

// Fills in / shows the player-name span on the persistent inventory summary bar (see the
// #invPlayerNameWrap markup in the main file, just above the tab content) — reaching directly
// into that DOM element the same way enforceRoleRestrictions and the rest of this file already
// do, rather than routing through a window.* bridge function on the main script's side.
function updatePlayerNameDisplay() {
  const wrap = document.getElementById("invPlayerNameWrap");
  const val = document.getElementById("invPlayerName");
  if (!wrap || !val) return;
  if (mp.connected && mp.username) {
    val.textContent = mp.username;
    wrap.style.display = "";
  } else {
    wrap.style.display = "none";
  }
}

// Tears down this tab's own session state — unsubscribing listeners, clearing mp, hiding the
// role-restricted CSS and the player-name display — WITHOUT touching Firebase Auth itself.
// Split out from logOut() so the onAuthStateChanged handler below can reuse it for a sign-out
// that happened somewhere else (see the comment there): that path must never call signOut()
// itself, since Firebase Auth already reports signed-out by the time it runs.
function resetLocalSessionState() {
  if (mp.playerUnsub) mp.playerUnsub();
  if (mp.rosterUnsub) mp.rosterUnsub();
  if (mpBattlefieldUnsub) mpBattlefieldUnsub();
  if (mpLootClaimsUnsub) mpLootClaimsUnsub();
  mp.uid = null; mp.username = null; mp.role = null; mp.roomCode = null;
  mp.connected = false; mp.playerUnsub = null; mp.rosterUnsub = null; mp.roster.clear();
  mpBattlefieldUnsub = null; mpLootClaimsUnsub = null;
  document.body.classList.remove("role-player");
  updatePlayerNameDisplay();
}

function logOut() {
  resetLocalSessionState();
  signOut(auth).catch(() => {});
  showGate();
}

// ---------- Sync engine (same design as Phase 1) ----------
function refreshLocalStateCache() {
  if (typeof window.saveAppState === "function") window.saveAppState();
}
let _latestLocalState = null;
function collectCurrentAppState() { return _latestLocalState; }

// Firestore rejects an array whose elements are themselves arrays ("nested arrays are not
// supported") as a document field value. inventoryGrid is a literal 2D grid (an array of row
// arrays) and trips this directly — that's the exact error hit during testing. Rather than
// hardcode a fix for just that one field, this walks the ENTIRE state tree and JSON-stringifies
// any array-of-arrays it finds in place (tagged so the reverse pass can find and undo exactly
// those spots), so any other field with this same shape — now or added later — is covered too
// without needing to be individually tracked down. Everything else in the tree is untouched.
const NESTED_ARRAY_TAG = "__nestedArrayJSON";
function sanitizeNestedArrays(value) {
  if (Array.isArray(value)) {
    if (value.some((el) => Array.isArray(el))) return { [NESTED_ARRAY_TAG]: JSON.stringify(value) };
    return value.map(sanitizeNestedArrays);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const k of Object.keys(value)) out[k] = sanitizeNestedArrays(value[k]);
    return out;
  }
  return value;
}
function unsanitizeNestedArrays(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if (Object.prototype.hasOwnProperty.call(value, NESTED_ARRAY_TAG)) {
      try { return JSON.parse(value[NESTED_ARRAY_TAG]); } catch (e) { return []; }
    }
    const out = {};
    for (const k of Object.keys(value)) out[k] = unsanitizeNestedArrays(value[k]);
    return out;
  }
  if (Array.isArray(value)) return value.map(unsanitizeNestedArrays);
  return value;
}

window.onMultiplayerStateChange = function (data) {
  _latestLocalState = data;
  if (!mp.connected || mp.applyingRemote || mp.kicked) return;
  pushOwnState(data);
};

// Returns true/false so callers that actually need to know whether this specific write
// landed (connectAsRole's first-ever push) can react to a failure instead of assuming
// success. The routine background pushes from onMultiplayerStateChange don't check the
// return value — a transient failure there just means the next save cycle retries with
// fresher data anyway, same as before.
async function pushOwnState(stateOverride) {
  if (!mp.connected || !mp.roomCode || !mp.uid || mp.kicked) return false;
  const data = stateOverride || collectCurrentAppState();
  if (!data) return false;
  // Bumped BEFORE the write goes out (not after it resolves) so that if this exact push is
  // slow and a LATER push overtakes it, startPlayerListener already knows about the newer rev
  // the moment that later push is issued — see the comment there for the full race this
  // prevents (an equip-slot move visually "jumping back" to where it was).
  const rev = ++mp.pushRev;
  try {
    await setDoc(playerDocRef(mp.roomCode, mp.uid), {
      username: mp.username, role: mp.role, updatedAt: serverTimestamp(), rev, state: sanitizeNestedArrays(data),
    }, { merge: true });
    return true;
  } catch (err) {
    console.error("[multiplayer-sync] pushOwnState failed:", err);
    return false;
  }
}

// ---------- Cross-player writes (DM -> any player in their room) ----------
// The security rules (see the comment block above) already let the DM write into ANY
// player's doc in their own room — this is what that permission was left in place for. Two
// narrow, atomic Firestore transforms rather than one generic "merge a patch object" helper:
// setDoc({merge:true}) replaces array fields wholesale, and the writer here never has (and
// shouldn't need to cache) the target player's current array contents. increment()/arrayUnion()
// are safe under concurrent writers with zero stale-read risk — e.g. two monsters hitting the
// same player in one rollAllBattleAttacks() pass. Both omit `rev` entirely, so the target's own
// staleness guard (startPlayerListener below) never mistakes an authoritative external push for
// a stale echo of one of ITS OWN writes.
function applyHpDelta(roomCode, targetUid, delta) {
  return updateDoc(playerDocRef(roomCode, targetUid), { "state.characterCurrentHp": increment(delta) }).catch((err) => {
    console.error("[multiplayer-sync] applyHpDelta failed:", err);
  });
}
// Delivers a FULL item object into a player's own account, not just a "gen:<id>" key into
// recentlyLooted — a bare key would only resolve through TOKEN_INDEX on whichever account
// registered it into savedGeneratedItems, and the DM's own client is the one holding the
// authoritative item data here, not the recipient's. Writing the complete item into the
// recipient's OWN savedGeneratedItems (their own "gen:<id>" key becomes resolvable purely
// from their own synced state, the same as anything they loot themselves) and the resulting
// key into their recentlyLooted, in one atomic multi-field update. Both are flat-array
// appends — safe with arrayUnion under concurrent writers — never inventoryGrid, which is an
// opaque JSON-string blob (see sanitizeNestedArrays below) Firestore can't field-path into.
function giftItemToPlayer(roomCode, targetUid, item) {
  const saved = { ...item, id: Date.now() + "_" + Math.random().toString(36).slice(2) };
  const key = "gen:" + saved.id;
  return updateDoc(playerDocRef(roomCode, targetUid), {
    "state.savedGeneratedItems": arrayUnion(saved),
    "state.recentlyLooted": arrayUnion(key),
  }).catch((err) => {
    console.error("[multiplayer-sync] giftItemToPlayer failed:", err);
  });
}
// Bridge for the main file's combat code (see resolveBattleAttack) — fire-and-forget by design,
// matching pushOwnState's own background-push convention; the caller doesn't await this.
window.applyHpDeltaToPlayer = function (targetUid, delta) {
  if (!mp.connected || !mp.roomCode) return;
  applyHpDelta(mp.roomCode, targetUid, delta);
};

// ---------- Real-time looting: lootClaims (immutable, first-write-wins) ----------
// Every corpse-drop item gets a claim doc at a deterministic id (monsterUid_itemId — both
// already unique and stable, see rollMonsterCombatLoot/buildMonsterPartItem in the main file).
// The security rule allows CREATE by any authenticated user but denies update/delete outright
// — Firestore's own create-vs-update rule evaluation is what gives true first-write-wins with
// zero arbitration and zero dependency on the DM's tab being open to referee: whichever write
// reaches the server first is a "create" (allowed), and it makes the SAME doc id's write from
// anyone else evaluate as an "update" (denied) from that instant on.
function createLootClaim(roomCode, claimId, claimedByUid, claimedByUsername) {
  return setDoc(lootClaimDocRef(roomCode, claimId), { claimedBy: claimedByUid, claimedByUsername, createdAt: serverTimestamp() });
}
// Player's own self-loot button: create the claim FIRST and only report success once that
// write is actually confirmed — the reactive listener below (not this function) is what
// actually places the item, so a tab closing in the gap between "claim confirmed" and "item
// applied" can't silently lose it (the listener re-checks on every reload).
window.createSelfLootClaim = function (monsterUid, itemId) {
  if (!mp.connected || !mp.roomCode) return Promise.reject(new Error("Not connected"));
  return createLootClaim(mp.roomCode, `${monsterUid}_${itemId}`, mp.uid, mp.username);
};
// DM's "give to..." action: claims on the chosen player's behalf (so a self-loot race against
// the same item still resolves correctly — whichever create wins), then, since the DM already
// has the authoritative item data AND cross-player write permission, delivers it directly
// rather than waiting on the target's own client/listener to be online at all.
window.dmGiveLootItem = function (monsterUid, itemId, targetUid, targetUsername, itemData) {
  if (!mp.connected || !mp.roomCode) return Promise.reject(new Error("Not connected"));
  return createLootClaim(mp.roomCode, `${monsterUid}_${itemId}`, targetUid, targetUsername)
    .then(() => giftItemToPlayer(mp.roomCode, targetUid, itemData));
};
// Player-only: reactively applies any claim this account has WON, exactly once each (guarded
// by a persisted appliedLootClaimIds list so a reload/listener-replay never re-grants an
// already-applied claim). Fires on every change to the whole claims collection rather than a
// one-shot per-click handler, so it's self-healing across refreshes/reconnects.
// Started for BOTH roles: a player applies any claim addressed to them (as above); the DM
// instead marks the matching item claimed on their own roster (so it stops looking available
// on the card, and — since pushBattlefieldState already excludes reserved items — the DM
// marking it claimed rather than deleting it keeps the item visible in their own history
// without it ever being re-offered to other players once someone's already won it).
let mpLootClaimsUnsub = null;
function startLootClaimListener(roomCode) {
  if (mpLootClaimsUnsub) mpLootClaimsUnsub();
  mpLootClaimsUnsub = onSnapshot(lootClaimsCollectionRef(roomCode), (snap) => {
    snap.forEach((docSnap) => {
      const claim = docSnap.data();
      if (mp.role === "dm") {
        if (typeof window.markLootClaimOnRoster === "function") window.markLootClaimOnRoster(docSnap.id, claim);
        return;
      }
      if (claim.claimedBy !== mp.uid) return;
      if (typeof window.applyWonLootClaim === "function") window.applyWonLootClaim(docSnap.id);
    });
  });
}

// ---------- Battlefield (DM-only write, shared read) ----------
// Debounced the same way the main app's own saveAppState is — renderCombatRoster() (which can
// fire many times in a burst: rollAllBattleAttacks re-rendering, HP slider drags, etc.) calls
// this every time, but only the last call in any 400ms window actually reaches Firestore.
let _battlefieldPushTimer = null;
function pushBattlefieldState(battleRoster, battleLog) {
  if (!mp.connected || !mp.roomCode || mp.role !== "dm") return;
  clearTimeout(_battlefieldPushTimer);
  _battlefieldPushTimer = setTimeout(() => {
    // Loot visibility is enforced HERE, in what actually gets written to the doc players can
    // read — not by the player-mode card renderer choosing not to show it. An entry's loot is
    // entirely absent until lootRevealed is set (see revealEntryLoot in the main file), and
    // reserved items are stripped individually even after reveal — there is nothing for a
    // player to find via devtools that the DM hasn't chosen to share.
    const payload = (battleRoster || []).map((entry) => {
      const { uid, monster, displayName, variant, traits, chaosGearList, hp, maxHp, hpRoll, ac, statLines, lastResult, defeated, loot, lootRevealed } = entry;
      const out = { uid, monster, displayName, variant, traits, chaosGearList, hp, maxHp, hpRoll, ac, statLines, lastResult, defeated };
      if (loot && lootRevealed) out.loot = { tier: loot.tier, gold: loot.gold, items: loot.items.filter((it) => !it.reserved) };
      return out;
    });
    setDoc(battlefieldDocRef(mp.roomCode), {
      battleRoster: sanitizeNestedArrays(payload), battleLog: (battleLog || []).slice(-50), updatedAt: serverTimestamp(),
    }).catch((err) => console.error("[multiplayer-sync] pushBattlefieldState failed:", err));
  }, 400);
}
window.pushBattlefieldState = pushBattlefieldState;

// Player-only: learns the DM's uid from the room doc (readable by any authenticated user —
// see the rules comment above) rather than pointing players at the DM's own players/{dmUid}
// doc, which would make every player's listener re-download the DM's ENTIRE inventory/
// merchant/generator state on any unrelated DM action, not just combat.
let mpBattlefieldUnsub = null;
async function startBattlefieldListener(roomCode) {
  if (mpBattlefieldUnsub) mpBattlefieldUnsub();
  const roomSnap = await getDoc(roomDocRef(roomCode));
  if (!roomSnap.exists()) return;
  mpBattlefieldUnsub = onSnapshot(battlefieldDocRef(roomCode), (snap) => {
    if (!snap.exists()) return;
    const data = snap.data();
    if (typeof window.applyRemoteBattlefieldState === "function") {
      window.applyRemoteBattlefieldState(unsanitizeNestedArrays(data.battleRoster || []), data.battleLog || []);
    }
  });
}

// Realtime listener on this account's own document — this is how a DM's edit, or loot pushed
// to you (Phase 2/3), reaches your screen live. Also detects the DM removing you: the
// document disappearing entirely (rather than just being empty) is the "you've been kicked"
// signal — but ONLY if it's a genuine exists -> gone transition, tracked via sawDocExist
// below. Without that check, a fresh account whose very first write to Firestore failed (a
// rules-propagation delay, a network blip, whatever) would show up here as "the document
// doesn't exist," which looks identical to being removed but means something completely
// different — this bug actually happened during testing and logged a brand-new account
// straight back out with a misleading "removed by the DM" message. By the time this listener
// starts, connectAsRole() has already confirmed the initial write succeeded (or bailed out
// before ever getting here), so the only way this callback can legitimately see a missing
// document is if it existed a moment ago and is now gone.
function startPlayerListener() {
  if (mp.playerUnsub) mp.playerUnsub();
  let sawDocExist = false;
  mp.playerUnsub = onSnapshot(playerDocRef(mp.roomCode, mp.uid), (snap) => {
    if (!snap.exists()) {
      if (sawDocExist && mp.connected && !mp.kicked) {
        mp.kicked = true;
        logOut();
        showGate();
        setGateStatus("You were removed from this campaign by the DM.", true);
      }
      return;
    }
    sawDocExist = true;
    const remote = snap.data();
    if (!remote || !remote.state) return;
    // Guards against a specific out-of-order-network race: every push carries an
    // ever-increasing `rev` (see pushOwnState), and this document has exactly one writer —
    // this account's own client, via pushOwnState — nothing else writes to a player's own
    // room doc today. Rapid successive local changes (e.g. dragging one item right after
    // another) each schedule their own debounced push; if an OLDER push's network round-trip
    // happens to finish after a NEWER one's, this listener would otherwise see the older
    // snapshot last and hand it to applyRemoteMultiplayerState, visibly reverting whatever
    // was just moved back to where it used to be (or undoing the move before it's ever seen).
    // Since mp.pushRev already reflects the newest rev THIS client has sent as of right now,
    // any snapshot behind that is guaranteed stale and is dropped rather than applied.
    if (typeof remote.rev === "number" && remote.rev < mp.pushRev) return;
    mp.applyingRemote = true;
    try {
      if (typeof window.applyRemoteMultiplayerState === "function") {
        window.applyRemoteMultiplayerState(unsanitizeNestedArrays(remote.state));
      }
    } finally {
      mp.applyingRemote = false;
    }
  });
}

// DM-only: listens to every player document in the room to keep a live, removable roster.
// Also captures each player's character-sheet HP/AC totals (computed by the main file, stored
// flat on their synced state) so the Combat tab's targeting UI can show live numbers and roll
// against a real player's real AC — see window.onConnectedPlayersChanged below.
function startRosterListener() {
  if (mp.rosterUnsub) mp.rosterUnsub();
  mp.rosterUnsub = onSnapshot(collection(db, "rooms", mp.roomCode, "players"), (snap) => {
    mp.roster.clear();
    snap.forEach((docSnap) => {
      const d = docSnap.data();
      const s = d.state || {};
      mp.roster.set(docSnap.id, {
        username: d.username || "Unnamed", role: d.role, updatedAt: d.updatedAt,
        currentHp: s.characterCurrentHp, maxHp: s.characterMaxHp, ac: s.characterAc,
      });
    });
    renderAccountPanel();
    // Explicit bridge (matching applyRemoteMultiplayerState's pattern) rather than the main
    // file reaching into mp.roster directly — the Combat tab's targeting UI (a separate,
    // later addition) reads player HP/AC/connection state through this hook only.
    if (typeof window.onConnectedPlayersChanged === "function") {
      window.onConnectedPlayersChanged([...mp.roster.entries()].map(([uid, p]) => ({ uid, ...p })));
    }
  });
}

// DM action: deletes the player's document. Their account login still exists (Firebase
// client SDKs can only delete YOUR OWN account, never someone else's — deleting the actual
// login would need paid server-side infrastructure), but they lose all access to this
// campaign and their character/inventory data is gone. Their own client's startPlayerListener
// picks up the deletion and logs them out automatically.
//
// Known limitation, kept deliberately simple: this doesn't maintain a ban list, so if the
// removed player logs back in with the same username/password, connectAsRole() sees no
// existing player document, treats it like any other fresh connection, and re-creates one —
// i.e. they can rejoin on their own. For a friendly home game this is usually fine (the DM
// just removes them again if it becomes a real problem); a proper "banned from this campaign"
// list is a small, well-contained addition if it's ever actually needed — a new
// rooms/{code}/removed/{uid} marker doc, checked at the top of connectAsRole.
async function removePlayer(uid) {
  if (!mp.connected || mp.role !== "dm" || !mp.roomCode) return;
  if (uid === mp.uid) return; // DM can't remove themselves this way
  try { await deleteDoc(playerDocRef(mp.roomCode, uid)); } catch (err) { /* rules will reject if not actually DM */ }
}

// ===================== ROLE-BASED TAB RESTRICTIONS =====================
// Pure CSS, targeting the exact onclick attributes already on the main file's nav buttons —
// zero changes needed there. Content panels are ALSO hidden (not just the nav buttons) as a
// safety net, since Roll Loot is the tab that's active by default on page load; without this,
// a player logging in would briefly see its content before ever clicking anything.
function enforceRoleRestrictions(role) {
  document.body.classList.toggle("role-player", role === "player");
  // The Battlefield tab is the opposite direction from everything else here — shown only FOR
  // players rather than hidden from them — so it isn't part of the body.role-player CSS block
  // (which only ever hides things) and needs this explicit toggle instead.
  const battlefieldBtn = document.getElementById("battlefieldTabBtn");
  if (battlefieldBtn) battlefieldBtn.style.display = role === "player" ? "" : "none";
  if (role !== "player") return;
  // If the page's default active tab is one now hidden for players, move them to Inventory
  // instead of leaving them looking at a blank content area.
  const activeBtn = document.querySelector(".tab-btn.active");
  const restricted = ["spin", "generate", "combat"];
  const onRestricted = activeBtn && restricted.some((t) => activeBtn.getAttribute("onclick") === `showTab('${t}',this)`);
  if (onRestricted && typeof window.showTab === "function") {
    const invBtn = document.querySelector(`[onclick="showTab('inventory',this)"]`);
    if (invBtn) window.showTab("inventory", invBtn);
  }
}

// ===================== UI (injected at runtime — nothing added to the main HTML file) =====================
function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* ---- Role-based tab hiding (see enforceRoleRestrictions) ---- */
    body.role-player [onclick="showTab('spin',this)"],
    body.role-player [onclick="showTab('generate',this)"],
    body.role-player [onclick="showTab('combat',this)"],
    body.role-player #tab-spin,
    body.role-player #tab-generate,
    body.role-player #tab-combat,
    body.role-player .add-item-area,
    body.role-player [onclick*="editItem("],
    body.role-player [onclick*="removeItem("] { display: none !important; }

    /* ---- Full-screen launch gate ---- */
    #mpGate {
      position: fixed; inset: 0; z-index: 9999; background: var(--bg, #12100d);
      display: flex; align-items: center; justify-content: center; padding: 1rem;
      font-family: 'Crimson Text', serif; color: var(--text, #e8dfc8);
    }
    #mpGate.hide { display: none; }
    #mpGateBox {
      width: min(420px, 94vw); background: var(--surface, #1a1a1a);
      border: 1px solid var(--border, #3d3020); padding: 1.4rem;
    }
    #mpGateBox h2 { margin: 0 0 0.3rem; color: var(--gold, #c9a84c); letter-spacing: 0.03em; }
    #mpGateBox p.mp-sub { color: var(--text-dim, #a89f8a); font-size: 0.85rem; margin: 0 0 1rem; }
    .mp-role-row { display: flex; gap: 0.7rem; margin-bottom: 1rem; }
    .mp-role-btn {
      flex: 1; background: var(--bg, #12100d); border: 2px solid var(--border, #3d3020);
      color: var(--text, #e8dfc8); font-family: 'Crimson Text', serif; font-weight: 600;
      font-size: 0.95rem; padding: 0.8rem 0.5rem; cursor: pointer; text-align: center;
    }
    .mp-role-btn:hover, .mp-role-btn.active { border-color: var(--gold, #c9a84c); color: var(--gold, #c9a84c); }
    .mp-mode-row { display: flex; gap: 0.5rem; margin-bottom: 0.9rem; }
    .mp-mode-btn {
      flex: 1; background: none; border: none; border-bottom: 2px solid var(--border, #3d3020);
      color: var(--text-dim, #a89f8a); font-family: 'Crimson Text', serif; font-size: 0.9rem;
      padding: 0.4rem; cursor: pointer;
    }
    .mp-mode-btn.active { color: var(--gold, #c9a84c); border-color: var(--gold, #c9a84c); }
    #mpGateBox label { display: block; font-size: 0.85rem; color: var(--text-dim, #a89f8a); margin: 0.6rem 0 0.25rem; }
    #mpGateBox input[type=text], #mpGateBox input[type=password] {
      width: 100%; box-sizing: border-box; background: var(--bg, #12100d);
      border: 1px solid var(--border, #3d3020); color: var(--text, #e8dfc8);
      font-family: 'Crimson Text', serif; font-size: 0.95rem; padding: 0.5rem 0.6rem;
    }
    .mp-btn {
      margin-top: 1rem; width: 100%; box-sizing: border-box;
      background: var(--gold, #c9a84c); color: var(--bg, #12100d);
      border: none; font-weight: 600; padding: 0.6rem 0.9rem; cursor: pointer; letter-spacing: 0.02em;
      font-family: 'Crimson Text', serif; font-size: 0.95rem;
    }
    .mp-btn.mp-danger { background: var(--danger, #e05252); color: #fff; }
    .mp-status { margin-top: 0.6rem; font-size: 0.85rem; min-height: 1.2rem; }
    .mp-status.error { color: var(--danger, #e05252); }
    .mp-status.ok { color: var(--uncommon, #4caf7d); }

    /* ---- Post-login account panel ---- */
    #mpAccountBtn {
      position: fixed; bottom: 1rem; right: 1rem; z-index: 9000;
      background: var(--surface, #1a1a1a); color: var(--uncommon, #4caf7d);
      border: 2px solid var(--uncommon, #4caf7d); border-radius: 6px;
      font-family: 'Crimson Text', serif; font-weight: 600; font-size: 0.9rem;
      padding: 0.55rem 0.9rem; cursor: pointer; letter-spacing: 0.02em;
      box-shadow: 0 2px 10px rgba(0,0,0,0.4); display: none;
    }
    #mpAccountBtn.show { display: block; }
    #mpAccountOverlay {
      display: none; position: fixed; inset: 0; z-index: 9001;
      background: rgba(0,0,0,0.6); align-items: center; justify-content: center;
    }
    #mpAccountOverlay.show { display: flex; }
    #mpAccountModal {
      background: var(--bg, #12100d); border: 1px solid var(--border, #3d3020);
      width: min(440px, 92vw); max-height: 85vh; overflow: auto;
      padding: 1.2rem; font-family: 'Crimson Text', serif; color: var(--text, #e8dfc8);
    }
    #mpAccountModal h3 { margin: 0 0 0.5rem; color: var(--gold, #c9a84c); font-size: 1.1rem; letter-spacing: 0.03em; }
    #mpAccountModal .mp-close { float: right; cursor: pointer; font-size: 1.3rem; line-height: 1; color: var(--text-dim, #a89f8a); }
    #mpAccountModal .mp-room-code-row { display: flex; gap: 0.5rem; align-items: stretch; margin: 0.5rem 0; }
    #mpAccountModal .mp-room-code {
      flex: 1; font-family: 'Share Tech Mono', monospace; font-size: 1.3rem; letter-spacing: 0.15em;
      color: var(--gold-bright, #e6c766); background: var(--surface, #1a1a1a);
      border: 1px solid var(--border, #3d3020); padding: 0.5rem 0.8rem; text-align: center;
      cursor: pointer; user-select: all;
    }
    #mpAccountModal .mp-room-code:hover { border-color: var(--gold, #c9a84c); }
    #mpAccountModal .mp-copy-btn {
      background: var(--surface, #1a1a1a); border: 1px solid var(--border, #3d3020);
      color: var(--text, #e8dfc8); font-family: 'Crimson Text', serif; font-size: 0.85rem;
      padding: 0.5rem 0.7rem; cursor: pointer; white-space: nowrap;
    }
    #mpAccountModal .mp-copy-btn:hover { border-color: var(--gold, #c9a84c); color: var(--gold, #c9a84c); }
    #mpAccountModal .mp-copy-msg { min-height: 1.1rem; font-size: 0.8rem; color: var(--uncommon, #4caf7d); text-align: center; margin: -0.2rem 0 0.3rem; }
    #mpAccountModal .mp-roster { margin-top: 0.7rem; border-top: 1px solid var(--border, #3d3020); padding-top: 0.6rem; }
    #mpAccountModal .mp-roster-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; padding: 0.3rem 0; gap: 0.5rem; }
    #mpAccountModal .mp-remove-btn { background: transparent; border: 1px solid var(--danger, #e05252); color: var(--danger, #e05252); font-size: 0.7rem; padding: 0.2rem 0.5rem; cursor: pointer; }
  `;
  document.head.appendChild(style);
}

function injectDom() {
  const gate = document.createElement("div");
  gate.id = "mpGate";
  gate.innerHTML = `<div id="mpGateBox"></div>`;
  document.body.appendChild(gate);

  const accountBtn = document.createElement("button");
  accountBtn.id = "mpAccountBtn";
  accountBtn.onclick = () => document.getElementById("mpAccountOverlay").classList.add("show");
  document.body.appendChild(accountBtn);

  const overlay = document.createElement("div");
  overlay.id = "mpAccountOverlay";
  overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove("show"); };
  overlay.innerHTML = `<div id="mpAccountModal"></div>`;
  document.body.appendChild(overlay);
}

function showGate() {
  document.getElementById("mpGate").classList.remove("hide");
  document.getElementById("mpAccountBtn").classList.remove("show");
  renderGateRoleSelect();
}
function hideGate() { document.getElementById("mpGate").classList.add("hide"); }

function setGateStatus(msg, isError) {
  const el = document.getElementById("mpGateStatus");
  if (!el) return;
  el.textContent = msg || "";
  el.className = "mp-status" + (isError ? " error" : msg ? " ok" : "");
}

// ---- Gate: step 1, role select ----
let gateRole = null; // 'dm' | 'player', chosen before showing the login/signup form
let gateMode = "login"; // 'login' | 'signup'

function renderGateRoleSelect() {
  const box = document.getElementById("mpGateBox");
  box.innerHTML = `
    <h2>🎲 Who's playing?</h2>
    <p class="mp-sub">Choose your role to log in or create an account.</p>
    <div class="mp-role-row">
      <button class="mp-role-btn" id="mpRolePlayerBtn">🧙 Player</button>
      <button class="mp-role-btn" id="mpRoleDmBtn">👑 Dungeon Master</button>
    </div>
    <div class="mp-status" id="mpGateStatus"></div>
  `;
  document.getElementById("mpRolePlayerBtn").onclick = () => { gateRole = "player"; gateMode = "login"; renderGateForm(); };
  document.getElementById("mpRoleDmBtn").onclick = () => { gateRole = "dm"; gateMode = "login"; renderGateForm(); };
}

// ---- Gate: step 2, login/signup form for the chosen role ----
function renderGateForm() {
  const box = document.getElementById("mpGateBox");
  const roleLabel = gateRole === "dm" ? "Dungeon Master" : "Player";
  const campaignFieldHtml = (gateRole === "player" && gateMode === "signup") ? `
    <label>DM's campaign code</label>
    <input type="text" id="mpCampaignCode" placeholder="e.g. K7M2P" style="text-transform:uppercase;">
  ` : "";
  box.innerHTML = `
    <span class="mp-close" style="float:right;cursor:pointer;color:var(--text-dim,#a89f8a);" id="mpBackBtn">← back</span>
    <h2>${gateRole === "dm" ? "👑" : "🧙"} ${roleLabel}</h2>
    <div class="mp-mode-row">
      <button class="mp-mode-btn ${gateMode === "login" ? "active" : ""}" id="mpModeLoginBtn">Log In</button>
      <button class="mp-mode-btn ${gateMode === "signup" ? "active" : ""}" id="mpModeSignupBtn">Create Account</button>
    </div>
    <label>Username</label>
    <input type="text" id="mpUsername" placeholder="pick a username" autocomplete="username">
    <label>Password</label>
    <input type="password" id="mpPassword" placeholder="••••••••" autocomplete="${gateMode === "signup" ? "new-password" : "current-password"}">
    ${campaignFieldHtml}
    <button class="mp-btn" id="mpSubmitBtn">${gateMode === "signup" ? "Create Account" : "Log In"}</button>
    <div class="mp-status" id="mpGateStatus"></div>
  `;
  document.getElementById("mpBackBtn").onclick = renderGateRoleSelect;
  document.getElementById("mpModeLoginBtn").onclick = () => { gateMode = "login"; renderGateForm(); };
  document.getElementById("mpModeSignupBtn").onclick = () => { gateMode = "signup"; renderGateForm(); };
  document.getElementById("mpSubmitBtn").onclick = handleGateSubmit;
}

async function handleGateSubmit() {
  const username = document.getElementById("mpUsername").value;
  const password = document.getElementById("mpPassword").value;
  if (!sanitizeUsername(username)) { setGateStatus("Enter a username (letters, numbers, - and _ only).", true); return; }
  if (!password || password.length < 6) { setGateStatus("Password must be at least 6 characters.", true); return; }
  setGateStatus("Working…");
  try {
    if (gateMode === "signup") {
      if (gateRole === "dm") await signUpDM(username, password);
      else await signUpPlayer(username, password, document.getElementById("mpCampaignCode").value);
    } else {
      await logIn(username, password);
    }
  } catch (err) {
    setGateStatus(friendlyAuthError(err), true);
  }
}

function friendlyAuthError(err) {
  const code = err && err.code;
  if (code === "auth/email-already-in-use") return "That username is already taken.";
  if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") return "Wrong username or password.";
  if (code === "auth/weak-password") return "Password must be at least 6 characters.";
  return (err && err.message) ? err.message.replace(/^Firebase:\s*/, "") : String(err);
}

// ---- Post-login account panel ----
function renderAccountPanel() {
  const btn = document.getElementById("mpAccountBtn");
  const modal = document.getElementById("mpAccountModal");
  if (!btn || !modal) return;
  btn.classList.toggle("show", mp.connected);
  if (!mp.connected) return;
  btn.textContent = (mp.role === "dm" ? "👑 " : "🧙 ") + mp.username;

  const rosterHtml = mp.role === "dm" ? `
    <div class="mp-roster">
      <label style="margin-top:0;">Connected players</label>
      ${[...mp.roster.entries()].filter(([uid]) => uid !== mp.uid).map(([uid, p]) => `
        <div class="mp-roster-row">
          <span>${escapeHtmlLocal(p.username)}${p.currentHp != null ? ` <span style="color:var(--text-dim,#a89f8a);">(HP ${escapeHtmlLocal(String(p.currentHp))}/${escapeHtmlLocal(String(p.maxHp))}, AC ${escapeHtmlLocal(String(p.ac))})</span>` : ""}</span>
          <button class="mp-remove-btn" data-uid="${uid}">Remove</button>
        </div>
      `).join("") || '<div style="color:var(--text-dim,#a89f8a);font-size:0.85rem;">No players have joined yet.</div>'}
    </div>
  ` : "";
  modal.innerHTML = `
    <span class="mp-close" onclick="document.getElementById('mpAccountOverlay').classList.remove('show')">×</span>
    <h3>${mp.role === "dm" ? "👑 Dungeon Master" : "🧙 Player"}: ${escapeHtmlLocal(mp.username)}</h3>
    <label>Campaign code</label>
    <div class="mp-room-code-row">
      <div class="mp-room-code" id="mpRoomCodeVal" title="Click to copy">${escapeHtmlLocal(mp.roomCode)}</div>
      <button class="mp-copy-btn" id="mpCopyRoomCodeBtn" title="Copy campaign code">📋 Copy</button>
    </div>
    <div class="mp-copy-msg" id="mpRoomCodeCopyMsg"></div>
    <button class="mp-btn mp-danger" id="mpLogoutBtn">Log Out</button>
    ${rosterHtml}
  `;
  document.getElementById("mpLogoutBtn").onclick = logOut;
  document.getElementById("mpCopyRoomCodeBtn").onclick = copyRoomCode;
  // Clicking the code itself copies it too — select-all-on-click still works as a fallback
  // (user-select:all above) for anyone whose browser blocks the Clipboard API.
  document.getElementById("mpRoomCodeVal").onclick = copyRoomCode;
  modal.querySelectorAll(".mp-remove-btn").forEach((el) => {
    el.onclick = () => {
      if (confirm(`Remove ${el.previousElementSibling.textContent} from your campaign? Their character data will be deleted.`)) {
        removePlayer(el.getAttribute("data-uid"));
      }
    };
  });
}

// Copies the campaign code to the clipboard — wired to both the dedicated Copy button and a
// click on the code itself. navigator.clipboard.writeText can still throw even when it exists
// (NotAllowedError for a variety of permission/focus reasons across different browsers, not
// just "unsupported") — confirmed directly while testing this, so the execCommand fallback
// below is attempted on ANY failure of the async API, not only when it's absent outright. The
// code text also has user-select:all as a last-resort manual-copy fallback if both fail.
async function copyRoomCode() {
  const code = mp.roomCode;
  if (!code) return;
  let copied = false;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
    } catch (err) { /* fall through to the execCommand fallback below */ }
  }
  if (!copied) {
    try {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      copied = document.execCommand("copy");
      document.body.removeChild(ta);
    } catch (err) { /* both methods failed — code is still visible and selectable by hand */ }
  }
  if (copied) flashRoomCodeCopied();
}
let _roomCodeCopyMsgTimer = null;
function flashRoomCodeCopied() {
  const el = document.getElementById("mpRoomCodeCopyMsg");
  if (!el) return;
  el.textContent = "✓ Copied!";
  clearTimeout(_roomCodeCopyMsgTimer);
  _roomCodeCopyMsgTimer = setTimeout(() => { el.textContent = ""; }, 1500);
}

function escapeHtmlLocal(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ===================== INIT =====================
function init() {
  injectStyles();
  injectDom();
  showGate();
  // Firebase persists the signed-in session in this browser (IndexedDB) across reloads —
  // this is what makes "log back in" mostly automatic on the SAME device, while a genuinely
  // different device still needs the username/password typed once.
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!mp.connected && !mp.kicked) {
        restoreSession(user).catch(() => { /* stale/broken session — fall back to the gate */ });
      }
      return;
    }
    // user is null: Firebase Auth itself now reports signed-out. Firebase's local persistence
    // is shared across every tab/window of the same browser, and signing out in ONE of them
    // propagates this same callback to every other open tab — but only THIS tab's own mp
    // state and gate/DOM would otherwise know about it. Without this branch, a second window
    // just kept right on behaving as if it were still logged in (roster listeners still
    // running, gate still hidden) since nothing here ever told it otherwise — which is exactly
    // what made logging out with two windows open look like it silently didn't work. Only
    // acts if THIS tab still thinks it's connected: the tab where Log Out was actually clicked
    // already reset its own state synchronously (see logOut), so this would otherwise be a
    // redundant showGate() call capable of wiping a just-shown message (e.g. "removed by the
    // DM") the instant after it appears.
    if (mp.connected) {
      resetLocalSessionState();
      showGate();
      setGateStatus("You were logged out.", false);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
