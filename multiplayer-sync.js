// ===================== MULTIPLAYER SYNC (Firebase) — PHASE 1 =====================
// Self-contained add-on for dungeon_loot_wheel: hosting/joining a shared online session,
// and syncing a player's own inventory/state so it (a) persists in the cloud instead of
// just one browser's localStorage, and (b) is visible to the DM. Everything multiplayer-
// related lives in this one file — the main app file only needed two small additions to
// support it (see the comment above its <script type="module" src="multiplayer-sync.js">
// tag): a save-hook (window.onMultiplayerStateChange) and a load-hook
// (window.applyRemoteMultiplayerState). Both are checked with `typeof x === 'function'`
// before being called, so if this file is ever removed, the main app keeps working exactly
// as it does today — nothing in it depends on this file existing.
//
// What Phase 1 covers: creating/joining a room by a short code, anonymous sign-in (no
// passwords, no real accounts), and syncing your own full save-state (same shape as the
// existing localStorage blob) up to Firestore and back down in realtime — so if you close
// your laptop and open your phone with the same room code, you're exactly where you left
// off, and the DM's client sees you show up in a live roster.
//
// What's NOT in Phase 1 (deliberately deferred, see the conversation this was scoped in):
//   - The DM viewing or editing a PLAYER's inventory from their own screen (Phase 3).
//   - The DM pushing a specific item to a specific player (Phase 2).
// Both of those need the DM's client to read/write a player's document that isn't its own,
// which the Firestore security rules below already allow (dmUid check) — the client-side UI
// for it just isn't built yet.
//
// ---- One-time setup you still need to do in the Firebase console ----
// Test mode (from initial setup) allows any signed-in user to read/write everything for ~30
// days and then locks down to deny-everything. Before that expires, paste this into
// Firestore Database → Rules, replacing whatever's there, then click Publish:
//
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
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
//       }
//     }
//   }
//
// This says: anyone signed in (anonymously) can read rooms and player docs; only the room's
// own DM can edit/delete the room itself; a player doc can be written by that specific
// player OR by the room's DM — which is what lets the DM edit a player's inventory once that
// UI is built in Phase 3, without needing a rules change at that point.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getAuth, signInAnonymously, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {
  getFirestore, doc, setDoc, getDoc, onSnapshot, collection, serverTimestamp,
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
const db = getFirestore(fbApp);

// Room codes avoid visually-ambiguous characters (0/O, 1/I/L) since these get read aloud
// and typed by hand at the table.
const ROOM_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function generateRoomCode(len = 5) {
  let out = "";
  for (let i = 0; i < len; i++) out += ROOM_CODE_ALPHABET[Math.floor(Math.random() * ROOM_CODE_ALPHABET.length)];
  return out;
}

// All multiplayer session state lives here, not scattered across module-level variables.
const mp = {
  uid: null,
  roomCode: null,
  isDM: false,
  displayName: null,
  connected: false,
  // Guards the save→sync→listener→apply→(would-be-save-again) loop: while a remote update
  // is being applied to local state, the save hook skips pushing back up.
  applyingRemote: false,
  playerUnsub: null,
  rosterUnsub: null,
  roster: new Map(), // uid -> { displayName, isDM, updatedAt } — DM-only, for the roster list
};

function ensureSignedIn() {
  return new Promise((resolve, reject) => {
    if (auth.currentUser) { resolve(auth.currentUser); return; }
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) { unsub(); resolve(user); }
    }, reject);
    signInAnonymously(auth).catch((err) => { unsub(); reject(err); });
  });
}

function playerDocRef(roomCode, uid) {
  return doc(db, "rooms", roomCode, "players", uid);
}

// Forces a fresh save in the main file before we push anything — otherwise, if someone
// opens the page and hits Host/Join before any local save has happened yet (e.g. instantly
// on load, before the 5s autosave tick or any action-triggered save), _latestLocalState
// would still be null and we'd push nothing. window.saveAppState is safe to call here even
// disconnected — it always writes to localStorage, and only pushes to Firestore too if
// mp.connected is already true (it isn't yet at this point), so this just refreshes the
// cache without a redundant double-push.
function refreshLocalStateCache() {
  if (typeof window.saveAppState === "function") window.saveAppState();
}

// ---------- Hosting ----------
async function hostSession(displayName) {
  setMpStatus("Connecting…");
  try {
    refreshLocalStateCache();
    const user = await ensureSignedIn();
    const roomCode = generateRoomCode();
    await setDoc(doc(db, "rooms", roomCode), {
      dmUid: user.uid,
      createdAt: serverTimestamp(),
    });
    mp.uid = user.uid;
    mp.roomCode = roomCode;
    mp.isDM = true;
    mp.displayName = displayName || "Dungeon Master";
    mp.connected = true;
    await pushOwnState();
    startPlayerListener();
    startRosterListener();
    renderMultiplayerUI();
  } catch (err) {
    setMpStatus("Couldn't host a session: " + (err && err.message ? err.message : err), true);
  }
}

// ---------- Joining ----------
async function joinSession(roomCode, displayName) {
  roomCode = (roomCode || "").trim().toUpperCase();
  if (!roomCode) { setMpStatus("Enter a room code first.", true); return; }
  setMpStatus("Connecting…");
  try {
    const user = await ensureSignedIn();
    const roomSnap = await getDoc(doc(db, "rooms", roomCode));
    if (!roomSnap.exists()) { setMpStatus(`No session found for room code "${roomCode}".`, true); return; }
    mp.uid = user.uid;
    mp.roomCode = roomCode;
    mp.isDM = roomSnap.data().dmUid === user.uid;
    mp.displayName = displayName || "Adventurer";
    // Returning to a session you've already synced to (a new device, or reconnecting) should
    // pull the cloud state DOWN, not push whatever's in this browser's localStorage UP over
    // it — otherwise rejoining on a fresh device would wipe out everything already saved to
    // this room. Only a genuinely first-time join pushes local state as the starting point;
    // startPlayerListener()'s first snapshot handles pulling existing state down either way.
    const existingPlayerSnap = await getDoc(playerDocRef(roomCode, user.uid));
    mp.connected = true;
    if (!existingPlayerSnap.exists()) {
      refreshLocalStateCache();
      await pushOwnState();
    } else {
      // Still refresh the displayName/role/updatedAt fields (harmless — merge:true leaves
      // the existing `state` field alone since we're not including it here at all).
      await setDoc(playerDocRef(roomCode, user.uid), {
        displayName: mp.displayName, isDM: mp.isDM, updatedAt: serverTimestamp(),
      }, { merge: true });
    }
    startPlayerListener();
    if (mp.isDM) startRosterListener();
    renderMultiplayerUI();
  } catch (err) {
    setMpStatus("Couldn't join that session: " + (err && err.message ? err.message : err), true);
  }
}

function leaveSession() {
  if (mp.playerUnsub) mp.playerUnsub();
  if (mp.rosterUnsub) mp.rosterUnsub();
  mp.roomCode = null;
  mp.isDM = false;
  mp.connected = false;
  mp.roster.clear();
  mp.playerUnsub = null;
  mp.rosterUnsub = null;
  renderMultiplayerUI();
}

// Writes the app's current full state (same shape as the localStorage save) to this
// player's own document, tagged with a display name/role so the DM roster can show it.
async function pushOwnState(stateOverride) {
  if (!mp.connected || !mp.roomCode || !mp.uid) return;
  const data = stateOverride || collectCurrentAppState();
  if (!data) return;
  try {
    await setDoc(playerDocRef(mp.roomCode, mp.uid), {
      displayName: mp.displayName,
      isDM: mp.isDM,
      updatedAt: serverTimestamp(),
      state: data,
    }, { merge: true });
  } catch (err) { /* transient network error — the next save cycle will retry */ }
}

// Pulls the current app state out of the main file via the same object shape saveAppState()
// already builds — this function is only ever called FROM that hook (see
// window.onMultiplayerStateChange below), so it's handed the data directly rather than
// needing to reach into the main script's variables itself (a module can't see another
// script's top-level let/const bindings — see the comment on applyRemoteMultiplayerState in
// the main file for the other half of this).
let _latestLocalState = null;
function collectCurrentAppState() { return _latestLocalState; }

// The save-hook: called from the main file's saveAppState() every time it writes to
// localStorage. No-ops instantly if we're not in a connected session, or if this save was
// itself triggered by us just applying a remote update a moment ago.
window.onMultiplayerStateChange = function (data) {
  _latestLocalState = data;
  if (!mp.connected || mp.applyingRemote) return;
  pushOwnState(data);
};

// Realtime listener on this player's own document — this is how a DM's edit, or loot the DM
// pushes to you (once Phase 2/3 land), actually reaches your screen live. Also fires once
// immediately on subscribe with whatever's already in Firestore, which is how "join a
// session on a second device" picks up where the first one left off.
function startPlayerListener() {
  if (mp.playerUnsub) mp.playerUnsub();
  mp.playerUnsub = onSnapshot(playerDocRef(mp.roomCode, mp.uid), (snap) => {
    if (!snap.exists()) return;
    const remote = snap.data();
    if (!remote || !remote.state) return;
    mp.applyingRemote = true;
    try {
      if (typeof window.applyRemoteMultiplayerState === "function") {
        window.applyRemoteMultiplayerState(remote.state);
      }
    } finally {
      mp.applyingRemote = false;
    }
  });
}

// DM-only: listens to every player document in the room to keep a live roster (name, role,
// last-updated). Phase 1 only surfaces this as a simple connected-players list; viewing or
// editing any individual player's actual inventory is Phase 3.
function startRosterListener() {
  if (mp.rosterUnsub) mp.rosterUnsub();
  mp.rosterUnsub = onSnapshot(collection(db, "rooms", mp.roomCode, "players"), (snap) => {
    mp.roster.clear();
    snap.forEach((docSnap) => {
      const d = docSnap.data();
      mp.roster.set(docSnap.id, {
        displayName: d.displayName || "Unnamed",
        isDM: !!d.isDM,
        updatedAt: d.updatedAt,
      });
    });
    renderMultiplayerUI();
  });
}

// ===================== UI (injected at runtime — nothing added to the main HTML file) =====================
function injectMultiplayerStyles() {
  const style = document.createElement("style");
  style.textContent = `
    #mpLauncherBtn {
      position: fixed; bottom: 1rem; right: 1rem; z-index: 9000;
      background: var(--surface, #1a1a1a); color: var(--gold, #c9a84c);
      border: 2px solid var(--gold, #c9a84c); border-radius: 6px;
      font-family: 'Crimson Text', serif; font-weight: 600; font-size: 0.9rem;
      padding: 0.55rem 0.9rem; cursor: pointer; letter-spacing: 0.02em;
      box-shadow: 0 2px 10px rgba(0,0,0,0.4);
    }
    #mpLauncherBtn.connected { border-color: var(--uncommon, #4caf7d); color: var(--uncommon, #4caf7d); }
    #mpOverlay {
      display: none; position: fixed; inset: 0; z-index: 9001;
      background: rgba(0,0,0,0.6); align-items: center; justify-content: center;
    }
    #mpOverlay.show { display: flex; }
    #mpModal {
      background: var(--bg, #12100d); border: 1px solid var(--border, #3d3020);
      width: min(440px, 92vw); max-height: 85vh; overflow: auto;
      padding: 1.2rem; font-family: 'Crimson Text', serif; color: var(--text, #e8dfc8);
    }
    #mpModal h3 { margin: 0 0 0.8rem; color: var(--gold, #c9a84c); font-size: 1.1rem; letter-spacing: 0.03em; }
    #mpModal .mp-close { float: right; cursor: pointer; font-size: 1.3rem; line-height: 1; color: var(--text-dim, #a89f8a); }
    #mpModal label { display: block; font-size: 0.85rem; color: var(--text-dim, #a89f8a); margin: 0.7rem 0 0.25rem; }
    #mpModal input[type=text] {
      width: 100%; box-sizing: border-box; background: var(--surface, #1a1a1a);
      border: 1px solid var(--border, #3d3020); color: var(--text, #e8dfc8);
      font-family: 'Crimson Text', serif; font-size: 0.95rem; padding: 0.5rem 0.6rem;
    }
    #mpModal .mp-btn {
      margin-top: 0.8rem; background: var(--gold, #c9a84c); color: var(--bg, #12100d);
      border: none; font-weight: 600; padding: 0.5rem 0.9rem; cursor: pointer; letter-spacing: 0.02em;
    }
    #mpModal .mp-btn.mp-danger { background: var(--danger, #e05252); color: #fff; }
    #mpModal .mp-status { margin-top: 0.6rem; font-size: 0.85rem; min-height: 1.2rem; }
    #mpModal .mp-status.error { color: var(--danger, #e05252); }
    #mpModal .mp-status.ok { color: var(--uncommon, #4caf7d); }
    #mpModal .mp-room-code {
      font-family: 'Share Tech Mono', monospace; font-size: 1.4rem; letter-spacing: 0.15em;
      color: var(--gold-bright, #e6c766); background: var(--surface, #1a1a1a);
      border: 1px solid var(--border, #3d3020); padding: 0.5rem 0.8rem; text-align: center; margin-top: 0.5rem;
    }
    #mpModal .mp-roster { margin-top: 0.6rem; border-top: 1px solid var(--border, #3d3020); padding-top: 0.6rem; }
    #mpModal .mp-roster-row { display: flex; justify-content: space-between; font-size: 0.85rem; padding: 0.25rem 0; }
    #mpModal .mp-roster-row .mp-dm-tag { color: var(--gold, #c9a84c); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; }
    #mpModal hr { border: none; border-top: 1px solid var(--border, #3d3020); margin: 1rem 0; }
  `;
  document.head.appendChild(style);
}

function injectMultiplayerDom() {
  const launcher = document.createElement("button");
  launcher.id = "mpLauncherBtn";
  launcher.textContent = "🌐 Multiplayer";
  launcher.onclick = () => { document.getElementById("mpOverlay").classList.add("show"); };
  document.body.appendChild(launcher);

  const overlay = document.createElement("div");
  overlay.id = "mpOverlay";
  overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove("show"); };
  overlay.innerHTML = `<div id="mpModal"></div>`;
  document.body.appendChild(overlay);
}

function setMpStatus(msg, isError) {
  const el = document.getElementById("mpStatus");
  if (!el) return;
  el.textContent = msg || "";
  el.className = "mp-status" + (isError ? " error" : msg ? " ok" : "");
}

// Rebuilds the modal body based on current connection state — disconnected shows Host/Join
// forms, connected shows room code + status + (DM only) the live roster.
function renderMultiplayerUI() {
  const launcher = document.getElementById("mpLauncherBtn");
  const modal = document.getElementById("mpModal");
  if (!launcher || !modal) return;

  if (!mp.connected) {
    launcher.classList.remove("connected");
    launcher.textContent = "🌐 Multiplayer";
    modal.innerHTML = `
      <span class="mp-close" onclick="document.getElementById('mpOverlay').classList.remove('show')">×</span>
      <h3>🌐 Multiplayer</h3>
      <p style="color:var(--text-dim,#a89f8a);font-size:0.85rem;font-style:italic;">
        Host a session as the DM, or join one with a room code. Everything you loot and equip
        stays synced across every device you connect with this same code.
      </p>
      <div>
        <label>Your name</label>
        <input type="text" id="mpNameInput" placeholder="e.g. Dave, or your character's name">
        <div style="display:flex;gap:0.6rem;flex-wrap:wrap;">
          <button class="mp-btn" id="mpHostBtn">Host a New Session</button>
        </div>
        <hr>
        <label>Room code</label>
        <input type="text" id="mpJoinCodeInput" placeholder="e.g. K7M2P" style="text-transform:uppercase;">
        <button class="mp-btn" id="mpJoinBtn">Join Session</button>
      </div>
      <div class="mp-status" id="mpStatus"></div>
    `;
    document.getElementById("mpHostBtn").onclick = () => {
      hostSession(document.getElementById("mpNameInput").value.trim());
    };
    document.getElementById("mpJoinBtn").onclick = () => {
      joinSession(document.getElementById("mpJoinCodeInput").value, document.getElementById("mpNameInput").value.trim());
    };
    return;
  }

  launcher.classList.add("connected");
  launcher.textContent = "🌐 " + mp.roomCode;
  const rosterHtml = mp.isDM ? `
    <div class="mp-roster">
      <label style="margin-top:0;">Connected players</label>
      ${[...mp.roster.entries()].map(([uid, p]) => `
        <div class="mp-roster-row">
          <span>${escapeHtmlLocal(p.displayName)}${uid === mp.uid ? " (you)" : ""}</span>
          ${p.isDM ? '<span class="mp-dm-tag">DM</span>' : ""}
        </div>
      `).join("") || '<div style="color:var(--text-dim,#a89f8a);font-size:0.85rem;">No one else has joined yet.</div>'}
    </div>
  ` : "";
  modal.innerHTML = `
    <span class="mp-close" onclick="document.getElementById('mpOverlay').classList.remove('show')">×</span>
    <h3>🌐 Connected${mp.isDM ? " — Dungeon Master" : ""}</h3>
    <p style="color:var(--text-dim,#a89f8a);font-size:0.85rem;">Playing as <strong>${escapeHtmlLocal(mp.displayName)}</strong></p>
    <label>Room code — share this with your group</label>
    <div class="mp-room-code">${mp.roomCode}</div>
    <button class="mp-btn mp-danger" id="mpLeaveBtn">Leave Session</button>
    <div class="mp-status" id="mpStatus"></div>
    ${rosterHtml}
  `;
  document.getElementById("mpLeaveBtn").onclick = leaveSession;
}

function escapeHtmlLocal(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function initMultiplayer() {
  injectMultiplayerStyles();
  injectMultiplayerDom();
  renderMultiplayerUI();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMultiplayer);
} else {
  initMultiplayer();
}
