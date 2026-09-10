// ===================== PUZZLE LIBRARY DATA =====================
// Backing data for the Puzzles tab's category library (see PUZZLE_CATEGORIES and
// renderPuzzleCategory in the main file). Split into its own file the same way loot-data.js is —
// this is pure content, no logic, loaded via a plain <script src> before the main file's own
// script block runs.
//
// Two shapes in use:
//   Riddles:            { q: "riddle text", a: "answer", tier: "easy"|"medium"|"hard"|"legendary" }
//   Everything else:    { title: "Short Name", prompt: "read-aloud text", solution: "answer + reasoning", note: "DM mechanical hook" }

// Reworked from the original 18-riddle library, which was almost entirely the same rigid
// "I [verb clause]... What am I?" template — genuinely monotonous, and a few had answers that
// weren't fairly inferable from their own clues. Replaced with four difficulty tiers and mixed
// formats (rhyming couplets, straight wordplay, classic "I am" riddles).
//
// A later pass ("A sphinx blocks your path and asks: ...", "A cartographer's riddle, scrawled
// in the margin of an old map: ...") wrapped many of these in narrator/NPC scene-setting around
// the actual question, plus redundant trailing tags ("What is the answer?" after a riddle that
// already ends in its own question). Stripped back out here so `q` holds only the riddle itself
// — a few (e.g. "Three sisters live in the same house...") were left untouched since the
// scenario itself IS the riddle, not a wrapper around one, and a couple of now-orphaned pronouns
// ("What is she talking about?" with "she" removed) were tightened to stay self-contained. This
// is about riddle content specifically — read-aloud "prompt" text on every OTHER puzzle category
// below is a different field for a different purpose and is untouched.
const RIDDLE_LIBRARY = [
  // ---- EASY ----
  { q: 'What has a bank but no money, and a mouth but never speaks?', a: 'A river', tier: 'easy' },
  { q: 'What has to be broken before you can ever use it?', a: 'An egg', tier: 'easy' },
  { q: 'What grows taller the more you cut it down?', a: 'Grass', tier: 'easy' },
  { q: 'What has one eye but cannot see a single thing?', a: 'A needle', tier: 'easy' },
  { q: 'Light as a feather, yet the strongest warrior alive cannot hold me for more than a few minutes. What am I?', a: 'Your breath', tier: 'easy' },
  { q: 'Never trust a thing with four legs and a face, but no head. What is it?', a: 'A bed', tier: 'easy' },
  { q: 'What kind of band never plays a single note of music?', a: 'A rubber band', tier: 'easy' },
  { q: 'The more you take from me, the bigger I get. What am I?', a: 'A hole', tier: 'easy' },
  { q: 'I have cities but no houses, forests but no trees, and rivers but not a drop of water. What am I?', a: 'A map', tier: 'easy' },
  { q: 'Steady I glow, by day and by night, unless a cloud should block my light. What am I?', a: 'The sun', tier: 'easy' },
  { q: 'What can you catch, but never once throw?', a: 'A cold', tier: 'easy' },
  { q: 'What runs all around a farmyard, yet never once moves from its spot?', a: 'A fence', tier: 'easy' },
  { q: 'I follow you all day long, vanish the moment the sun goes down, and I am never quite the same shape twice. What am I?', a: 'Your shadow', tier: 'easy' },
  { q: 'What can you hold in your left hand but never in your right?', a: 'Your right hand', tier: 'easy' },
  { q: 'I get wetter and wetter the more I try to dry things off. What am I?', a: 'A towel', tier: 'easy' },
  // ---- MEDIUM ----
  { q: 'Take the path with no beginning and no end, and you will always arrive. What kind of path is this?', a: 'A circle (a loop road)', tier: 'medium' },
  { q: 'Silver I am beneath a full moon, gold beneath the sun, yet touch me and you will find I am neither metal at all. What am I?', a: 'Light (moonlight/sunlight)', tier: 'medium' },
  { q: 'I am a word that sounds exactly the same as my own first letter, no matter how many of my other letters you drop. What word am I?', a: 'Queue (it\'s pronounced identically to the letter Q)', tier: 'medium' },
  { q: 'I have a heart that does not beat, a spine that cannot bend, and pages full of thoughts that are not my own. What am I?', a: 'A book', tier: 'medium' },
  { q: 'What can travel all the way around the world while staying tucked in a single corner the entire time?', a: 'A postage stamp', tier: 'medium' },
  { q: 'I have no voice, yet I command every soul in this castle to rise or rest. Find me, and you find the true throne. What am I?', a: 'A bell (the castle bell that signals the hours)', tier: 'medium' },
  { q: 'Cut me and I do not bleed. Cook me and I only grow. Ignore me, and I will eventually vanish on my own. What am I?', a: 'Bread dough (or bread)', tier: 'medium' },
  { q: 'What belongs to you, yet everyone else uses it far more often than you ever will?', a: 'Your name', tier: 'medium' },
  { q: 'I am not alive, yet I can grow. I have no lungs, yet I need air. I have no mouth, yet water kills me. What am I?', a: 'Fire', tier: 'medium' },
  { q: 'Forward I am heavy, backward I am not. What am I?', a: 'The word "TON" (backward, "NOT")', tier: 'medium' },
  { q: 'What is so fragile that simply saying its name out loud can break it?', a: 'Silence', tier: 'medium' },
  { q: 'I have branches, but no leaves, no trunk, and no roots at all. What am I?', a: 'A bank (as in a bank branch)', tier: 'medium' },
  { q: 'Name the thing that is always coming but never actually arrives. What is it?', a: 'Tomorrow', tier: 'medium' },
  { q: 'What has many keys but cannot open a single lock?', a: 'A piano', tier: 'medium' },
  // ---- HARD ----
  { q: 'I am taken from a mine and shut up in a wooden case, from which I am never released, and yet I am used by almost everyone. What am I?', a: 'Pencil lead (graphite)', tier: 'hard' },
  { q: 'The more of me there is, the less you can see. I have no substance, yet I can fill an entire tower. What am I, and where would you look for me first?', a: 'Darkness — search the tower\'s lowest, most enclosed room, where light never reaches', tier: 'hard' },
  { q: 'Three sisters live in the same house, yet none of them has ever seen the other two, though they pass by each other constantly. Who are they?', a: 'Day, evening, and night (or similar: the parts of a day)', tier: 'hard' },
  { q: 'I am always hungry and must always be fed, but whatever I touch soon turns red, then black, then nothing at all. What am I?', a: 'Fire', tier: 'hard' },
  { q: 'Speak my name, and I disappear. What am I?', a: 'Silence', tier: 'hard' },
  { q: 'What can run but never walks, has a mouth but never talks, has a bed but never sleeps, and has a head but never weeps?', a: 'A river', tier: 'hard' },
  { q: 'I go up, but I never come back down on my own. I have no body, yet a fire is where I\'m born. What am I?', a: 'Smoke', tier: 'hard' },
  { q: 'What building has the most stories, yet none of them are ever written down?', a: 'A library (a building full of "stories" as a pun on floors/books)', tier: 'hard' },
  { q: 'I am not a season, yet I can be spring, summer, autumn, or winter all within a single hour. What am I?', a: 'The weather', tier: 'hard' },
  { q: 'I have killed thousands without ever lifting a blade, and I am welcomed into every home in the realm each night. What am I?', a: 'Sleep (or: a clock/time)', tier: 'hard' },
  { q: 'What can be given, but never actually bought, and once broken, is nearly impossible to fully repair?', a: 'Trust', tier: 'hard' },
  { q: 'I have no beginning and no end, yet I contain every edge, every corner, and every point in between. What am I?', a: 'A circle', tier: 'hard' },
  // ---- LEGENDARY ----
  { q: 'Name the only thing that grows larger the more it is shared, yet costs the giver nothing at all to give away. What is it?', a: 'Knowledge (deliberately open-ended — this is one of the rare riddles here with more than one fair answer; kindness, love, and happiness all satisfy the same logic. Reward any answer the player can genuinely justify.)', tier: 'legendary' },
  { q: 'I am the only thief who can steal your entire life without you noticing a single theft, one moment at a time. What — or who — am I?', a: 'Time', tier: 'legendary' },
  { q: 'I am told a thousand different ways by a thousand different mouths, and no two tellings are ever quite the same, yet I am still called by one single name. What am I?', a: 'A legend (or: a myth/story)', tier: 'legendary' },
  { q: 'Kill me and you gain nothing. Feed me and I will consume you both. Ignore me, and I fade to nothing on my own. What am I, three times over?', a: 'A grudge (or: a feud/hatred — the "three times" hints that the same answer must fit "kill," "feed," and "ignore")', tier: 'legendary' },
  { q: 'I have no body, yet I grow. I have no lungs, yet I am killed by truth. Kings fear me more than any blade. What am I?', a: 'A lie (or: a rumor)', tier: 'legendary' },
  { q: 'I crowned a thousand kings and buried just as many. Armies have marched in my name, yet I have never once lifted a blade myself. What am I?', a: 'War', tier: 'legendary' },
  { q: 'What can you give away completely, and still keep every last piece of it for yourself?', a: 'A promise (your word — giving it away means honoring it, not losing it)', tier: 'legendary' },
  { q: 'I am heavier than the mountain the moment you try to set me down, yet weightless the instant you choose to carry me freely. What am I?', a: 'A burden (or a duty/responsibility — the riddle is about willingness, not literal weight)', tier: 'legendary' },
  { q: 'Name the one thing every mortal is certain to lose, that no army, no spell, and no amount of gold has ever once been able to buy back. What is it?', a: 'Youth', tier: 'legendary' },
  { q: 'I touch every single thing that has ever existed, yet I myself can never be touched, held, or truly seen. I have no mouth, and yet I am the reason anything can be heard at all. What am I?', a: 'Air (the wind itself)', tier: 'legendary' }
];

const LOGIC_PUZZLES = [
  {
    title: "The Twin Golems",
    prompt: "Two identical stone golems flank a locked gate, one carved with a sun and one with a moon. A plaque reads: 'One of us always tells the truth. One of us always lies. You may ask exactly one question, to only one of us, before the gate judges you.' The golems answer any question, not just yes/no ones.",
    solution: "Ask either golem: 'What would the other golem say is the way through?' and then take the OPPOSITE of whatever answer you get. The truthful golem accurately reports the liar's false answer; the lying golem falsely reports the truthful golem's real answer — either way, the answer given is always wrong, so its opposite is always correct.",
    note: "No roll needed if a player works out the logic themselves; Intelligence DC 13 as a hint if the party is stuck after real effort. Guessing wrong without asking a question just means the gate stays shut and can be tried again from scratch. Reward: passage, plus a bit of respect from whichever golem got 'outsmarted.'"
  },
  {
    title: "The Scale of Five",
    prompt: "A vault door sits behind a balance scale and five identical-looking iron ingots on a nearby table. A plaque reads: 'One ingot is lighter than the rest. Two weighings, no more, will find it.'",
    solution: "Weigh two ingots against two others, leaving one aside. If they balance, the set-aside ingot is the light one. If they don't balance, take the lighter pair from that weighing and weigh those two against each other — the lighter of the two is the culprit.",
    note: "Intelligence (Investigation) DC 12 as a hint if the party is fumbling toward a solution but hasn't quite found the two-weighing trick. A third weighing (going over the stated limit) just causes the scale to lock up for a few minutes rather than triggering a trap. Reward: the vault's contents, whatever fits your scene."
  },
  {
    title: "The River Crossing",
    prompt: "A narrow, swift river blocks the path. A single small raft is tied to the bank, only able to carry the party's guide plus one other creature at a time. The guide is ferrying three creatures across for a local farmer: a wolf, a goat, and a sack of cabbages. Left alone together unsupervised, the wolf will eat the goat, and the goat will eat the cabbages.",
    solution: "Take the goat across first (leaving wolf and cabbage, which are safe together). Return alone, take the wolf across, but bring the goat back with you. Leave the goat, take the cabbages across (leaving wolf and cabbage safe together). Return alone for the goat, and bring it across last.",
    note: "No roll needed for a party that works it out themselves; Intelligence DC 11 as a hint after a couple of failed attempts. A wrong sequence just means the guide has to start the crossing over (the animals get spooked and refuse to continue), costing time but no harm. Reward: safe passage and the farmer's gratitude/a small reward on the far side."
  },
  {
    title: "The Locked Diary",
    prompt: "A dead scholar's diary is locked with a simple three-digit combination. Scrawled on the inside cover: 'The first digit is triple the last. The middle digit is the first digit minus the last digit. All three digits add up to 12.' ",
    solution: "Let the last digit be x, so the first is 3x. The middle digit is 3x − x = 2x. Sum: 3x + 2x + x = 6x = 12, so x = 2. First digit = 6, middle = 4, last = 2. The combination is 642.",
    note: "Intelligence (Investigation) DC 13 to set up the algebra cleanly if the party is doing this by trial and error rather than equations — let them brute-force it with enough patience instead if they'd rather not do math at the table. A wrong combination just fails to open the lock, no trap, unlimited attempts. Reward: whatever notes or secrets the diary holds."
  },
  {
    title: "The Four Suspects",
    prompt: "A theft has occurred, and four suspects each make one statement. Aldric says: 'Bryn did it.' Bryn says: 'Corin did it.' Corin says: 'Bryn is lying.' Dessa says: 'I didn't do it.' Exactly one suspect is telling the truth, and that suspect is the thief.",
    solution: "If Aldric is the truthful thief, then Bryn did it AND Aldric did it — a contradiction (only one person can be the thief), so Aldric is lying. If Bryn is the truthful thief, then Corin did it AND Bryn did it — also a contradiction, so Bryn is lying, which means Corin's statement ('Bryn is lying') is true, and Corin is the thief. Checking: Corin is the truthful one, saying 'Bryn is lying' — which fits, since we already know Bryn lied. Corin is the thief.",
    note: "Intelligence DC 13 to work through the logic cleanly, or let the party reason it out verbally at the table without a formal roll. A wrong accusation isn't punished harshly — the real thief simply isn't caught yet, and the investigation can continue with new evidence. Reward: catching Corin recovers the stolen goods and whatever bounty or goodwill follows."
  },
  {
    title: "The Nine Cells",
    prompt: "A dungeon's holding block has nine cells in a 3x3 grid, each meant to hold exactly one prisoner. A guard's log states: 'Row and column each must sum to the same total.' Numbers 1 through 9, each used exactly once, are carved above the cell doors, but three are missing and must be filled in by the party based on the rule to unlock the block's master gate.",
    solution: "This is a 3x3 magic square. The numbers 1–9 arranged so every row, column, and diagonal sums to 15 form the unique (up to rotation/reflection) arrangement: 8 1 6 / 3 5 7 / 4 9 2. Whatever three numbers are missing from the DM's specific version of the grid, they're the ones that complete this pattern in their given positions.",
    note: "Intelligence (Investigation) DC 14, or let a player who enjoys number puzzles work it out directly — the magic square's total (15) can be given as a freebie hint (row 2 or the carved plaque states it) if the table is stuck. A wrong number placement just doesn't seat properly and can be freely corrected. Reward: the master gate unlocks, freeing whatever's held in the block (a prisoner ally, evidence, or simply a shortcut)."
  },
  {
    title: "The Weighted Chest",
    prompt: "Three identical chests sit in a row, each holding a different amount of gold: one holds nothing, one holds a middling amount, and one holds a small fortune. Labels on the chests are known to be ALL incorrect: 'Empty,' 'Some Gold,' and 'Full of Gold.' The party may open exactly one chest to figure out all three.",
    solution: "Open the chest labeled 'Some Gold' — since the labels are all wrong, this chest cannot hold some gold; it must hold either nothing or a fortune. Whichever it actually holds tells you the rest: if it's empty, then the chest labeled 'Full of Gold' (which can't be full, and can't be empty since we just found the empty one) must hold Some Gold, leaving the chest labeled 'Empty' to hold the fortune. If the 'Some Gold' chest is actually full, then the 'Empty' chest must hold Some Gold, and the 'Full' chest holds nothing.",
    note: "Intelligence DC 13 to reason through which single chest to open for guaranteed full information — this is meant to reward clean logical thinking, not guessing. Opening a different chest first still works but may require opening a second to fully resolve the puzzle (allow it, just less efficient). Reward: full access to all three chests' contents once solved."
  },
  {
    title: "The Bridge of Torches",
    prompt: "Four adventurers must cross a rickety rope bridge in pitch darkness, but only one torch remains, and the bridge can hold at most two people at once. Aldo crosses in 1 minute, Bree in 2, Corin in 5, and Dagny in 10. The torch must be carried both ways, and the party has 17 minutes before it burns out.",
    solution: "Send Aldo and Bree across first (2 minutes). Aldo returns with the torch (1 minute, total 3). Send Corin and Dagny across together (10 minutes, total 13). Bree returns with the torch (2 minutes, total 15). Finally, Aldo and Bree cross together again (2 minutes, total 17) — everyone makes it exactly as the torch gutters out.",
    note: "Intelligence DC 14 to work out that the two slowest travelers should cross together rather than separately, which is the key insight. A slower solution (say, 19 minutes) simply means the torch burns out with the last crosser still on the bridge, forcing a Dexterity save DC 12 to finish crossing blind rather than an automatic fall. Reward: safe passage, with bragging rights for hitting the timing exactly."
  },
  {
    title: "The Three Chests of Fate",
    prompt: "A wizard's testing chamber holds three chests. A sign reads: 'Exactly one chest is safe to open. The gold chest's plaque says: I am safe. The silver chest's plaque says: The gold chest is not safe. The bronze chest's plaque says: I am not safe.' Exactly one of the three plaques is telling the truth.",
    solution: "If the gold plaque is true, then gold is safe — but then the silver plaque ('gold is not safe') would be false, and the bronze plaque ('I am not safe') would also need to be false, meaning bronze IS safe, contradicting 'exactly one is safe.' If the silver plaque is true (gold is not safe), the gold plaque is false (consistent), and the bronze plaque must be false, meaning bronze IS safe — but then two chests (silver's claim and bronze itself) would need checking: silver merely claims gold isn't safe, it doesn't claim itself is safe, so silver being true doesn't make silver the safe one. Testing bronze as the safe chest with silver's statement true holds up consistently. The bronze chest is safe to open.",
    note: "Intelligence DC 15 — this is one of the harder logic puzzles in the set, expect the table to talk it through together rather than one player solving it alone. Opening a wrong chest triggers a harmless but startling ward (a puff of colored smoke, a brief alarm) rather than damage. Reward: the bronze chest's contents, appropriate to a wizard's testing chamber (a scroll, a wand, spell components)."
  },
  {
    title: "The Seven Locks",
    prompt: "A vault door has seven numbered dial-locks in a row, each currently showing a number from 1 to 7 with no two dials repeating a number, but scrambled from their correct order. A plaque states: 'Swap any two dials in one move. Three moves will set them right, if you choose wisely — the correct order is written nowhere, but each dial that IS already correctly placed will glow faintly.'",
    solution: "This is a minimum-swaps puzzle: identify the dials that already glow (correctly placed) and leave them alone. For the remaining out-of-place dials, trace the cycles they form (dial A's number belongs where dial B is, and B's number belongs where C is, etc.) — a cycle of length n can always be fixed in n−1 swaps. With careful tracing, any specific scrambled arrangement of up to 7 elements with at most 2-3 misplaced short cycles can be resolved in 3 moves or fewer.",
    note: "Intelligence (Investigation) DC 14 to correctly trace which dials are glowing versus misplaced and plan the swap sequence. Using more than three swaps doesn't break anything — it just means the vault takes a little longer to register the correct final state, no trap or penalty for extra moves. Reward: the vault's contents, and satisfaction for the player who tracked the swap-cycles correctly."
  },
  {
    title: "The Poisoned Cups",
    prompt: "Ten identical cups of wine sit on a table, and the party knows exactly one is poisoned — slow-acting enough that a taste-tester wouldn't show symptoms for a full hour. Trapped in the room, the party has one hour before a door seals permanently, and they have exactly four rats willing to taste-test (a gift from a druid ally, sacrificed to the cause).",
    solution: "Number the cups 1 through 10 in binary using the four rats as binary digits (each rat represents one bit). For each cup, have a specific combination of rats taste a small sample based on that cup's binary representation (e.g., cup 6 = binary 0110, so rats 2 and 3 taste it). After an hour, whichever combination of rats shows symptoms directly identifies the poisoned cup's number in binary. Four rats can distinguish up to 16 possibilities, more than enough for 10 cups.",
    note: "Intelligence (Investigation or Arcana) DC 15 — this is a genuinely tricky puzzle, and it's fair to let a player with an unusual background (alchemist, tinkerer, spy) approach it with advantage, or to simply explain the binary-tasting trick via an NPC advisor if the table is unfamiliar with binary counting. A less efficient solution (testing cups one at a time) still works if the party has more time or rats — adjust the clock/rat count to your table's comfort level. Reward: identifying the poisoned cup safely lets the party drink the other nine without worry, or use the poison itself against a later foe."
  },
  {
    title: "The Order of Precedence",
    prompt: "Five knights — Aldric, Bea, Cato, Dree, and Elric — must be seated at a ceremonial table in the correct order of seniority, but the only clues available are overheard fragments: 'Bea is senior to Cato, but junior to Aldric.' 'Dree is the most junior of all five.' 'Elric is senior to Aldric.'",
    solution: "From the clues: Elric > Aldric > Bea > Cato, and Dree is last (most junior). The full seniority order, most senior to least: Elric, Aldric, Bea, Cato, Dree.",
    note: "Intelligence DC 12 to chain the clues together correctly — this is meant to be one of the easier logic puzzles, solvable through careful reading rather than complex deduction. Seating someone in the wrong order simply results in a socially awkward moment (an NPC master of ceremonies corrects it) rather than any real consequence. Reward: proper seating avoids offending a proud knightly order, smoothing over a later negotiation or alliance."
  },
  {
    title: "The Counterfeit Coin",
    prompt: "Among twelve identical-looking gold coins, exactly one is counterfeit and weighs either slightly more or slightly less than the rest (the party doesn't know which). A simple balance scale is available, and the vault mechanism will only respond to exactly three weighings.",
    solution: "Divide the coins into three groups of four. Weigh group A against group B. If they balance, the counterfeit is in group C — weigh two of those against each other (with a known-good coin as the third if needed) to narrow it down in two more weighings. If A and B don't balance, the counterfeit is in the heavier or lighter group; take that group and split it further, using the remaining weighings to isolate the exact coin and whether it's heavy or light. (A full worked solution takes real table time — let the party talk it through, and consider providing a physical prop or notes to track groupings.)",
    note: "Intelligence (Investigation) DC 15 — this is the hardest logic puzzle in the set and can genuinely take a while to reason through even for real puzzle-solvers; be patient and let the party use paper/notes to track their weighings. Exceeding three weighings just means the scale mechanism resets and must be started over, not a trap. Reward: identifying the counterfeit (and whether it's heavy or light) unlocks the vault and also flags a corrupt local mint as a story hook if you want to use it."
  },
  {
    title: "The Four Sealed Doors",
    prompt: "Four numbered doors stand before the party, and one — only one — is safe to open. Three ghostly attendants, bound to guide (or mislead) visitors, offer testimony. The first says: 'The safe door's number is even.' The second says: 'The safe door is not Door 4.' The third says: 'The safe door's number is greater than 2.' Exactly one of the three attendants is telling the truth; the other two are lying.",
    solution: "Test each door as the safe one and count how many attendants would be telling the truth. Door 1 safe: 'even' is false, 'not Door 4' is true, 'greater than 2' is false — exactly one truth. Door 2 safe: 'even' true, 'not Door 4' true, 'greater than 2' false — two truths, doesn't fit. Door 3 safe: 'even' false, 'not Door 4' true, 'greater than 2' true — two truths, doesn't fit. Door 4 safe: 'even' true, 'not Door 4' false, 'greater than 2' true — two truths, doesn't fit. Only Door 1 produces exactly one true statement among the three attendants, so Door 1 is the safe door.",
    note: "Intelligence DC 14 to work through the four possibilities systematically — encourage the party to test each door in turn against all three statements rather than guessing. A wrong door triggers a minor, non-lethal trap (a loud alarm, a puff of gas) rather than serious harm, and the party can eliminate that door and retry with the remaining three. Reward: whatever lies beyond Door 1."
  },
  {
    title: "The Merchant's Fair Trade",
    prompt: "A puzzle-loving merchant offers a deal: three sealed bags each contain a different number of gems (5, 8, and 13, though the party doesn't know which bag holds which). The merchant states: 'The middle bag does not hold 13. The left bag does not hold 8. The bag on the left holds fewer gems than the bag beside it.'",
    solution: "The middle bag can't hold 13, and the left bag can't hold 8 — so the left bag must hold either 5 or 13, but it can't be 13 either (that's ruled out for the middle bag, not the left one, so check the third clue: the left bag holds FEWER gems than the middle bag). If left held 13, it couldn't hold fewer than whatever's in the middle, since 13 is the largest value available — so left must hold 5. That leaves 8 and 13 for middle and right; since the middle bag can't hold 13, middle holds 8, and right holds 13.",
    note: "Intelligence DC 12 to work through the three clues methodically in order — this is meant to be a mid-tier constraint puzzle, more approachable than the counterfeit coin or sealed doors above. Guessing wrong just means the merchant chuckles and resets the bags for another attempt, no real cost. Reward: the correctly identified 13-gem bag, or the merchant's respect and a small discount on future trades."
  },
  {
    title: "The Prisoners' Hats",
    prompt: "Three prisoners are seated in a row, each wearing a hat that is either black or white, unable to see their own hat but able to see the hats of the prisoners seated in front of them. The rearmost prisoner can see both others' hats; the middle prisoner can see only the front prisoner's; the front prisoner can see no one's. A guard explains the rules before hooding them and placing the hats: 'There are exactly three hats between you — two black, one white — and every one of them is being used right now. If any of you can prove the color of your own hat, all three go free.' The rearmost prisoner speaks up immediately.",
    solution: "Since all three hats (two black, one white) are guaranteed to be in use across exactly three prisoners, the rearmost prisoner — who can see both other hats — always has enough information to deduce their own with certainty. If they see two black hats on the others, the only hat left is white, so theirs must be white. If they see one black and one white hat on the others, the only hat left from the supply (one black, one white already accounted for) is the second black hat, so theirs must be black. Either way, the rearmost prisoner can always solve it on the spot — they don't need to wait and see if the others struggle first.",
    note: "Intelligence DC 12 once the party grasps that ALL three hats from the fixed 2-black-1-white supply are in play (make sure the guard's dialogue states this plainly — it's the one piece of information the whole puzzle depends on). If the rearmost prisoner (or a player standing in for them) answers wrong, that prisoner simply stays put, no harm done, and the party can reason through it again with what they've learned. Reward: all three prisoners go free — potential allies, witnesses, or informants for later in the campaign."
  },
  {
    title: "The Alchemist's Ratios",
    prompt: "An alchemist's recipe book, partially burned, gives a potion formula: 'Two parts moonwort to three parts nightshade makes a sleeping draught. Reverse the ratio, and you have a deadly poison instead. The cauldron holds exactly ten measures total, no more, no less.' The party needs the sleeping draught, not the poison.",
    solution: "The ratio 2:3 (moonwort:nightshade) must scale to fill exactly 10 measures. Since 2+3 = 5 parts total, scaling by 2 gives 4 parts moonwort and 6 parts nightshade, totaling 10 — the correct sleeping draught mixture is 4 measures moonwort, 6 measures nightshade.",
    note: "Intelligence (Investigation or Arcana) DC 11 — a straightforward ratio-scaling puzzle, on the easier end of this set. Mixing the reversed ratio (6 moonwort, 4 nightshade) produces the deadly poison instead — a real risk if the party isn't careful, so consider having them test a tiny sample first (a DC 12 Medicine check on a rat or similar) before committing the whole brew. Reward: a working sleeping draught, useful for the adventure ahead, brewed correctly from salvaged ingredients."
  },
  {
    title: "The Watchtower Signals",
    prompt: "Three watchtowers along a border each show one of three signal-flag colors (red, blue, or gold) at any given time, and the party needs to know what the colors mean to interpret an incoming warning. A retired signal officer NPC gives cryptic hints: 'Red never means safe. If Tower One shows gold, Tower Two never shows red. Tower Three's color always matches Tower One's, unless Tower One shows blue.'",
    solution: "This puzzle is meant to be solved through direct observation combined with the given rules rather than pure abstract logic — have the party actually watch the towers' current colors and cross-reference against the officer's rules to determine what's currently being signaled (e.g., if Tower One shows gold, Tower Two can't show red, narrowing what Tower Two's color must mean; if Tower Three matches Tower One, that confirms Tower One's signal is being relayed rather than an independent one). The DM should decide the towers' actual current colors and what the overall message is (danger approaching, all clear, reinforcements needed) and use the officer's rules as the lens the party uses to interpret it correctly.",
    note: "Intelligence (Investigation) DC 12, or simply good roleplay engagement with the retired officer NPC, who can clarify a rule if directly asked a good follow-up question. A wrong interpretation just means the party prepares for the wrong scenario, a pacing complication rather than a hard failure — let the truth become clear shortly after (the real threat or lack thereof reveals itself). Reward: correctly reading the towers gives the party a head start reacting to whatever's actually signaled."
  },
  {
    title: "The Broken Sundial Clock",
    prompt: "A mechanism requires the party to input the current 'hour' using a set of five numbered gears, each showing 0-9, but three of the gears are jammed and must be deduced from a mechanic's note: 'The sum of all five gears is 27. The first and last gears are equal. The middle gear is double the second gear. The fourth gear is one more than the middle gear.'",
    solution: "Let the first and last gears both equal a, the second gear equal b, so the middle (third) gear is 2b, and the fourth gear is 2b+1. Sum: a + b + 2b + (2b+1) + a = 27, which simplifies to 2a + 5b + 1 = 27, so 2a + 5b = 26. Testing small values: if b=2, then 2a=16, a=8. Checking: gears are 8, 2, 4, 5, 8 — sum is 8+2+4+5+8=27. This fits all constraints.",
    note: "Intelligence (Investigation) DC 14 for the algebra, or let the party brute-force small values of b (0 through 5, since 5×5=25 already exceeds available room) with pencil and paper until one fits cleanly. A wrong gear setting just fails to trigger the mechanism and can be freely readjusted. Reward: whatever the mechanism controls or reveals once correctly set."
  },
  {
    title: "The Six Guards' Shifts",
    prompt: "Six guards rotate shifts at a checkpoint the party needs to slip past unnoticed, and an old duty roster (partially legible) gives clues: 'Guard Corvin never works alongside Guard Delphine. Guard Aeliana always works the shift right before Guard Brannon. Exactly two guards are on duty at any given time, and there are three shifts per day.' The party needs to determine which shift has the weakest (most exploitable) pairing.",
    solution: "This puzzle is meant to be worked out through logical elimination combined with whatever additional guard-personality details the DM provides (a lazy guard, a distracted one, a pair known to argue) — use the roster constraints to narrow down which two guards are paired on which shift, then apply narrative judgment (which the party can gather through observation or a bribed informant) to identify the shift with the least vigilant or most distracted pairing. The 'never alongside' and 'always right before' clues are enough to fully determine the roster's structure once the DM fixes the actual guard names to real shift slots ahead of time.",
    note: "Intelligence (Investigation) DC 13, or a full session of in-fiction stakeout/observation (several Perception checks over a longer watch) as a fair alternative to pure logic-puzzle solving. Choosing the wrong shift to attempt a sneak past just means a harder Stealth check against a more alert pairing, not an automatic failure or alarm. Reward: successfully identifying and exploiting the weak shift makes the actual infiltration significantly easier."
  },
  {
    title: "The Archivist's Filing Code",
    prompt: "An archive's card catalog is organized by a numeric code the party needs to crack to find a specific record. A sign reads: 'Each code is a three-digit number. No digit repeats within a code. The code for the record you seek is the largest possible three-digit number using only the digits 2, 5, and 8, where the digits are arranged so that no digit is in its 'natural' ascending position (2 first, 5 second, 8 last).'",
    solution: "This is a derangement problem: the three digits are 2, 5, 8, and 'natural order' is 2-5-8. We need the largest possible number where NO digit sits in its natural position (2 is not first, 5 is not second, 8 is not last). Testing arrangements: 8-2-5 has 8 first (not natural for 8, good), 2 second (not natural for 2, good), 5 third (not natural for 5, good) — this is a valid full derangement, and among the valid derangements (8-2-5 and 5-8-2), 852 is the larger number.",
    note: "Intelligence (Investigation) DC 13 to work through the derangement logic, or let the party simply try all six possible arrangements of three digits by hand (a manageable brute force at this scale) and check each against the two rules. A wrong code just doesn't pull the right record and can be retried. Reward: the specific archival record the party was searching for, whatever plot-relevant information it contains."
  }
];
const CIPHER_PUZZLES = [
  {
    title: "The Ironbound Ledger",
    prompt: "Above the sealed inner gate of Irongate Keep, an unfamiliar angular script has been chiseled into the lintel: SEG VIUFS WIDGQ IS NIWJ. Tucked inside the coat of a cartographer's corpse the party passed earlier lies a torn journal page headed 'Irongate Cipher — solved at last,' showing a full substitution alphabet she'd worked out before she died: A→I, B→R, C→O, D→N, E→G, F→A, G→T, H→E, I→B, J→C, K→D, L→F, M→H, N→J, O→K, P→L, Q→M, R→P, S→Q, T→S, U→U, V→V, W→W, X→X, Y→Y, Z→Z. Using her key, what does the lintel say?",
    solution: "It reads THE VAULT WAKES AT DAWN — the gate only unseals itself at first light, not on command. The cipher alphabet is built from the keyword IRONGATE (its unique letters, I-R-O-N-G-A-T-E, followed by the rest of the alphabet in order), which is why the cartographer titled her notes after the fortress. Translating the lintel doesn't open the gate; it tells the party WHEN it opens, so they don't waste the night trying to force it at the wrong hour.",
    note: "The key is a free prop (no check to find it); DC 12 Intelligence (Investigation) if a player wants to verify the substitution pattern instead of trusting the journal outright. A wrong translation just means they sit at a locked gate at the wrong hour, possibly drawing a wandering encounter — no trap. Reward is purely informational: showing up at dawn lets them slip in before the day guard's shift change."
  },
  {
    title: "Five Bells for Five Letters",
    prompt: "Set into the wall of a roadside shrine, a stone relief shows five bells hanging from a bare branch — the same 'five bells that toll for the unburied dead' a wandering priest mentioned to the party days ago. Beneath the carving, a line has been scratched into the stone: INL FY IZXP. Every letter has plainly been pushed forward through the alphabet by some number of places, and the shrine itself seems to be telling them how many.",
    solution: "Shift each letter back by 5 (I→D, N→I, L→G, and so on) to get DIG AT DUSK. The shrine marks a grave, and it's telling whoever reads it when the ground here is soft and unwatched enough to dig safely. The five carved bells are the shift key: each ciphertext letter has been pushed 5 places forward, so decoding means shifting every letter back by 5.",
    note: "DC 10 Intelligence (Investigation) hint: note aloud that the number of bells matches something countable about the cipher. No real fail-state — digging at the wrong hour just means the ground is frozen, watched, or already disturbed (a complication, not damage). Reward: a shallow cache of grave-goods or a keepsake tied to whoever the shrine honors, a decent minor sidequest hook."
  },
  {
    title: "The Mirror Saints",
    prompt: "In a shrine to twin saints, two statues face each other across the aisle — one young, one old — each raising a hand toward the other in mirror image. An inscription at their feet reads only: AS THE FIRST IS TO THE LAST, SO LETTER ANSWERS LETTER. Carved into the floor tiles between them runs: GSV YVOO RH GSV PVB. A worn plaque nearby spells the trick out for anyone who reads closely: the twin saints' alphabet runs backward — A is Z, B is Y, and so on to the mirror's end.",
    solution: "This is an Atbash cipher (A↔Z, B↔Y, C↔X, and so on). Reversing the mirror-mapping gives THE BELL IS THE KEY. If there's a bell prop nearby (or you place one in the next room), this line confirms to the players that ringing it is the intended solution, not a trap.",
    note: "DC 10 Intelligence (Investigation) hint: the statues literally mirror each other, which is the whole trick. Trying a normal shift cipher instead just produces gibberish — no penalty beyond wasted time, since the floor tiles aren't trapped. Reward: confidence to use the bell without fear, and the shrine's inner chamber can hold a minor relic or blessing (advantage on the party's next saving throw, a scroll, or similar)."
  },
  {
    title: "The Warding Grid",
    prompt: "Set into the archway of a sealed reliquary, a five-by-five grid of blank cells has been carved into the stone, numbered 1 through 5 along the top and down the left side. Wedged into a crack beside it is a scrap of vellum showing the same grid, filled in five letters per row: Row 1 — A B C D E. Row 2 — F G H I/J K (I and J share a cell). Row 3 — L M N O P. Row 4 — Q R S T U. Row 5 — V W X Y Z. Chalked below the grid on the archway itself is a string of paired numbers: 34-35-15-33  44-23-15  22-11-44-15. Each pair gives a row, then a column.",
    solution: "Read each pair as (row, column): 34→O, 35→P, 15→E, 33→N spells OPEN; 44→T, 23→H, 15→E spells THE; 22→G, 11→A, 44→T, 15→E spells GATE. Full message: OPEN THE GATE. Reading it aloud, or pressing the matching cells on the carved grid in order if you want a hands-on mechanism, unseals the reliquary door.",
    note: "DC 10 Investigation to connect the vellum scrap to the archway's carved grid if the party hasn't already. Reading a pair backward (column-then-row) just produces a garbled non-word — if you're running this as a physical dial/grid mechanism, let 2-3 wrong entries pass harmlessly before it needs a DC 14 Investigation reset; no trap. Reward: the reliquary holds a minor relic appropriate to whatever faith built it."
  },
  {
    title: "The Zigzag Vein",
    prompt: "In an abandoned mining claim, a prospector's journal found earlier includes a hand-drawn diagram of a lightning-bolt-shaped ore vein zigzagging down through three labeled rock layers: top, middle, bottom. Carved into the claim-marker post itself, with no spaces, is: MADHETTINGTEMI. The journal's last legible note reads: 'Wrote it the way the vein runs — top to bottom, side to side, three lines deep. Read the lines back in order and you'll have it.'",
    solution: "This is a rail-fence (zigzag) transposition cipher across 3 rails. Writing MEETATMIDNIGHT in a zigzag over 3 rows and reading each row left-to-right in turn reproduces MADHETTINGTEMI exactly. Decoded: MEET AT MIDNIGHT. The claim isn't an ore strike at all — it's a rendezvous point for something happening after dark.",
    note: "DC 13 Intelligence (Investigation), or a mining/prospecting tool proficiency check, to work out the zigzag pattern without brute-forcing rail counts from 2 to 6. A wrong rail count just yields nonsense — no trap, just redraw the grid. Reward: whoever (or whatever) is waiting at the meeting point — ally, ambush, or dead drop, your call."
  },
  {
    title: "The Willow Verse",
    prompt: "Carved into a weeping-willow gravestone, a five-line mourning verse has weathered but stayed legible: 'Beneath the willow, grief takes root, / Every tear waters what the dark has claimed, / Long is the sleep the faithful keep, / Old bells toll for names unnamed, / Where the shadow bends, the answer waits.' A groundskeeper mutters that the old verse-carvers 'always hid something in the first letters, if you knew to look.'",
    solution: "Reading the first letter of each line top to bottom spells BELOW. The verse is telling the reader, quite literally, that whatever they're looking for is buried beneath the stone or the willow itself, not hidden somewhere else in the graveyard.",
    note: "DC 8 Intelligence (Investigation) if a player doesn't think to try reading down the first letters after the groundskeeper's comment — have them notice the first letters seem oddly emphasized/enlarged in the carving. No wrong-attempt penalty; digging in the wrong spot first just costs time and possibly attracts a wandering encounter. Reward: whatever's buried below — bones worth a proper burial (goodwill/reputation), a small strongbox, or a clue to the graveyard's larger mystery."
  },
  {
    title: "The Vigil's Refrain",
    prompt: "A night-watch hymn is painted in fading script along a temple's inner wall, six lines long: 'When first the pilgrims came, they walked toward the risen sun, / and found the chapel hollow, their voices answered only echo. / They climbed the crumbling tower, / to keep their vigil through the night, / and swore to guard the buried truth.' An acolyte insists the hymn is sung backward at the midnight service — 'end to end, not front to front' — though she can't say why.",
    solution: "Reading the LAST letter of each line, top to bottom, spells N-O-R-T-H: NORTH. The hymn is a direction marker disguised as scripture — whatever the vigil is meant to protect lies to the north of the temple, and the acolyte's odd 'backward' singing tradition is a folk memory of how the cipher is meant to be read.",
    note: "DC 12 Intelligence (Investigation) or DC 12 Religion to connect the acolyte's 'sung backward' comment to reading the poem's ending letters rather than its opening ones. No punishing fail-state for a wrong direction — the party just walks a while before realizing nothing lines up, costing travel time. Reward: whatever lies north, from a hidden shrine annex to a literal treasure marker."
  },
  {
    title: "The Vault-Tiles",
    prompt: "Inside a dead locksmith's satchel, the party finds five small wooden tiles, each stamped with a single letter: T, A, V, L, U. There's no visible order to them — they're just loose in a pouch. A scrap of paper tucked in with them reads only: 'Not what you drink. What holds the coin.'",
    solution: "The five letters are an anagram of VAULT. Rearranged and placed into a waiting five-slot mechanism (a lock, a plaque, a dial — whatever the scene calls for), they spell the word that opens or reveals the vault the locksmith clearly built. The riddle note is a nudge away from the obvious wrong answer (a drinking vessel doesn't fit five tiles as cleanly, but it's meant to make players briefly consider and discard 'flask' or similar before landing on VAULT).",
    note: "DC 8 Intelligence (Investigation) or just letting players try letter combinations aloud — this one's meant to be solved by conversation, not a die roll. A wrong tile order just doesn't fit the mechanism/slot and can be freely retried, no penalty. Reward: the vault the locksmith built, containing whatever loot or documents suit your scene."
  },
  {
    title: "The Miller's Scale",
    prompt: "A dusty grain-mill has a merchant's balance scale bolted to a workbench, and beside it a small dish of five brass weights, scattered out of any order. Each weight is stamped with both a letter and its weight in ounces: S (1 oz), T (2 oz), O (3 oz), N (4 oz), E (5 oz). A faded label on the scale itself reads: 'True weight, light to heavy, left to right.'",
    solution: "Weighing each brass piece and arranging them on the scale's rail from lightest to heaviest — S, T, O, N, E — spells STONE left to right. This is meant to trigger a stone door, dial, or panel elsewhere in the mill (a stone-carved slot that accepts the weights in that order, or simply the word itself as a spoken/written answer).",
    note: "DC 10 Intelligence (Investigation) if a player doesn't think to actually weigh the pieces rather than guess by size. Placing them in the wrong order just fails to trigger anything — freely retriable, no trap. Reward: whatever's behind the stone mechanism, ideally something that rewards the mill's otherwise mundane flavor (a smuggler's cache, a hidden cellar, tools of a trade)."
  },
  {
    title: "The Miner's Chant",
    prompt: "A tavern regular sings a strange old miner's chant for a round of drinks, and the party can ask him to repeat it as many times as needed: 'Ho, down gold runs deep below, where none the wiser, men old, crones warm hearth, and cold stone.' He shrugs when asked what it means — 'just words my granddad sang, don't mean nothing by themselves.' (If the party wants it in writing, an old woman at the bar can be persuaded to scribble it down.)",
    solution: "Taken every third word, the chant reads: GOLD, BELOW, THE, OLD, HEARTH, STONE — 'gold below the old hearth stone.' It's a folk-memory treasure marker: somewhere in town (or a specific building you place), there's an old hearth with a loose foundation stone hiding gold beneath it.",
    note: "DC 13 Intelligence (Investigation) hint if the party is stuck after several read-throughs — note that the chant doesn't quite scan as normal verse, like something's been stitched into it. No fail-state; miscounting just wastes a few read-throughs. Reward: a genuinely modest cache of gold under an old hearthstone somewhere in town — small but satisfying, ideal for a low-stakes side discovery rather than a dungeon payoff."
  },
  {
    title: "The Throne Couplets",
    prompt: "A court poet's unfinished elegy is found pinned above a noble's writing desk, six lines in three rhyming pairs: 'Long ago a king built his throne, / sworn to rule these lands alone. // Now the ivy chokes the falls, / creeping green through empty halls. // But the old crown falls tonight, / when the last torch loses light.' A steward mentions offhand that the poet always 'buried her real meaning in the first half of every pair, never the second.'",
    solution: "Taking the END word of the FIRST line in each rhyming couplet gives THRONE, FALLS, TONIGHT — 'the throne falls tonight.' The elegy is a coded warning (or threat) about an assassination, coup, or collapse planned for that very night, hidden inside what looks like ordinary court poetry.",
    note: "DC 12 Intelligence (Investigation) or DC 12 Insight to catch the steward's comment as a deliberate hint rather than idle gossip. Acting on a misread (e.g., taking second-line words instead) just means the party braces for the wrong event and has to scramble when the real one happens — a pacing complication, not a hard failure. Reward: advance warning is the reward here — time to prepare, evacuate, or intervene before whatever 'falls' actually does."
  },
  {
    title: "The Trade Road Map",
    prompt: "A merchant's traveling map, recovered from a strongbox, marks eight small waypoint towns strung along a single trade road, in order: Ravenscroft, Ithil Hollow, Duskmere, Emberfall, Eastwick, Ashford, Stonewell, Thistledown. In the margin, someone has written in a different hand: 'Read the road, not the names.'",
    solution: "Taking the first letter of each town in order — R, I, D, E, E, A, S, T — spells RIDE EAST. The map itself is the message: whoever marked it wants a courier, spy, or the party itself to head east along this exact road rather than take a shortcut or alternate route.",
    note: "DC 10 Intelligence (Investigation) to notice the marginal note is a deliberate hint rather than an old owner's doodle. Following the wrong route just costs travel time and possibly a wasted random encounter — no ambush is specifically tied to the correct or incorrect path unless you want to add one. Reward: whatever waits at the road's end, or simply avoiding whatever danger lay along the road not taken."
  },
  {
    title: "The Smuggler's Waypoints",
    prompt: "A smuggler's hand-drawn route map lists four hamlets along a back trail, each name written unusually large and blocky, as if size mattered: Hollow, Ashenvalleys, Rowen, Marsh. A torn corner of the map bears a single instruction: 'Count the letters, not the miles.'",
    solution: "Counting the letters in each town name and converting each count to its position in the alphabet (A=1, B=2, and so on) gives: Hollow = 6 letters = F, Ashenvalleys = 12 letters = L, Rowen = 5 letters = E, Marsh = 5 letters = E. Together: FLEE. This route map is a warning, not a smuggling path — anyone following it is meant to be fleeing something, not transporting goods.",
    note: "DC 13 Intelligence (Investigation) hint: point out the odd, deliberate lettering size, as if inviting the reader to count. A wrong letter-count (easy to fumble on a long town name) just produces a nonsense word — encourage a recount rather than treating it as a hard fail. Reward: recognizing FLEE in time can let the party avoid an ambush or trap tied to that route, or warn an NPC before it's too late — a narrative payoff more than a loot one."
  },
  {
    title: "The Sacred Vowels",
    prompt: "If your campaign already has an established written language, rune set, or conlang, reskin this puzzle entirely using that instead — the mechanic below is just a simple, swappable stand-in. As written: a shrine's inner wall is carved with a script where consonants look like ordinary letters, but the five vowels have been replaced with small sacred glyphs, each named for an element by the temple's own scripture (found earlier, or paraphrased now): Flame stands for A, Wave for E, Stone for I, Wind for O, Root for U. The carving reads (with the glyphs described aloud or drawn as symbols): 'TH[Wave] V[Wind][Stone]D [Wind]P[Wave]NS [Flame]T D[Root]SK.'",
    solution: "Substituting each named glyph back for its vowel gives THE VOID OPENS AT DUSK. It's a warning inscription rather than a passphrase — whatever door, portal, or seal this shrine guards is only vulnerable (or only opens, depending on your framing) around dusk, and the party should plan their approach accordingly.",
    note: "DC 10 Religion or Arcana to recall the elemental-vowel scripture if it's been established in-world, or DC 13 Investigation to work out the pattern cold from context (short, common words like 'the' and 'at' are the easiest giveaways). No trap for a wrong reading — just a wasted trip if they show up at the wrong hour. Reward: showing up prepared at dusk avoids whatever complication the void's opening would otherwise cause."
  },
  {
    title: "The Chapel Hymnal",
    prompt: "A small chapel's hymnal, sitting open on a lectern, shows six numbered lines: (1) Rise and greet the golden dawn. (2) Bow before the sacred flame. (3) Guard the vault beneath the stone. (4) Keep the silence, speak his name. (5) Trust the light to lead you home. (6) Never fear the endless dark. Pressed between the pages is a scrap of paper reading only: '3-3, 2-5, 3-6, 6-5.'",
    solution: "Each pair is (line number, word number). Line 3, word 3 = 'vault.' Line 2, word 5 = 'flame.' Line 3, word 6 = 'stone.' Line 6, word 5 = 'dark.' Together: VAULT FLAME STONE DARK — a description of where to look (a vault, near a flame fixture, behind or under a stone marker, somewhere dark) rather than a spoken passphrase.",
    note: "DC 11 Intelligence (Investigation) to realize the numbers reference the hymnal's own lines and words rather than being a random code. A miscounted word (easy off-by-one) just gives a slightly wrong or nonsensical clue word — let the party sanity-check against the room before committing to a wrong location. Reward: whatever the described hiding spot actually contains — this format is ideal for pointing at a specific searchable feature in the room."
  },
  {
    title: "The Ashwood Signet",
    prompt: "A noble house's signet ring is engraved with its old motto — a single word, ASH, worn nearly smooth. Elsewhere in the estate, a letter in the family strongbox is written entirely in gibberish: 'TZL BGUEK YEELMTLR.' A note clipped to it reads: 'Sealed by the old way — the ring tells you how.'",
    solution: "This is a Vigenère cipher using the keyword ASH. Repeating A-S-H across the ciphertext and subtracting each key letter's value from the corresponding ciphertext letter decodes it to THE BONES REMEMBER — a family motto or warning tied to an ancestor's crypt, curse, or debt. (Decoding: T-A=T, Z-S=H, L-H=E for 'THE'; and so on through BGUEK→BONES and YEELMTLR→REMEMBER.)",
    note: "This is the most math-heavy entry in the set — DC 15 Intelligence (Investigation), or let a player with a relevant background (scholar, spy, cipher-clerk) attempt it with advantage, or simply hand over a decode table if your table doesn't enjoy the arithmetic. A wrong keyword guess just produces gibberish with no in-fiction consequence. Reward: whatever 'the bones remember' turns out to mean for your family plot — an ancestor's ghost, a real skeleton with information, or a literal debt come due."
  },
  {
    title: "The Reckoner's Chart",
    prompt: "A scholar's writing desk has a small brass plaque screwed to its surface, listing the alphabet in order alongside its position: A is 1, B is 2, C is 3, and so on to Z at 26 — a 'reckoner's chart' apparently used for correspondence and record-keeping. In the desk's single locked drawer (picked open or found unlocked), a note reads: '18-5-4 / 4-15-15-18 / 14-15-18-20-8.'",
    solution: "Using the plaque's chart, each number converts directly to a letter: 18-5-4 = R-E-D, 4-15-15-18 = D-O-O-R, 14-15-18-20-8 = N-O-R-T-H. Together: RED DOOR NORTH — directions to a specific door, painted or marked red, somewhere north of the scholar's study.",
    note: "DC 8 Intelligence (Investigation) to notice the plaque is a working key rather than décor. A slipped digit (reading 15 as 1-5 instead of one number) is an easy, forgivable player error — let them recheck rather than punish it. Reward: whatever's behind the red door — this format works well as a simple 'X marks the spot' clue rather than a guarded secret."
  },
  {
    title: "The Merchant's Idle Letter",
    prompt: "Among a dead courier's papers is a letter that reads almost like nonsense, as if the merchant were listing half-remembered errands rather than writing anything important: 'My good Trader, a River he asked us: iron and trade to oats, and rope.' Nothing about it seems worth a second glance — which is exactly why nobody's read it carefully. A separate scrap, found elsewhere on the body, bears only the number 7, underlined twice.",
    solution: "Counting only the letters (ignoring spaces and punctuation) and taking every 7th one spells T-R-A-I-T-O-R: TRAITOR. The 'boring' letter is a coded accusation smuggled past a censor or a suspicious courier service — the merchant was naming someone as a traitor without writing the word outright.",
    note: "DC 14 Intelligence (Investigation) to think to count letters at all rather than dismiss the letter as filler — the underlined '7' is the key nudge, so make sure players who search the body find it. A miscount just produces a near-miss word (still recognizably close to TRAITOR) rather than total gibberish, so don't punish an off-by-one too harshly. Reward: the identity of an actual traitor NPC in your current plot, or the seed for one if you don't have one yet."
  },
  {
    title: "The Harbor Flags",
    prompt: "Anchored in a harbor, seven ships fly small pennants from their masts, described left to right as the party looks down from a cliff or dock: a crimson bar, an ivory anchor, an onyx wave, a golden sun, an iron cross, a silver moon, a golden sun again, an emerald serpent, and an onyx wave again. A torn page from a signal codebook, found on a drowned sailor, gives a partial key: crimson bar = R, ivory anchor = U, onyx wave = N, golden sun = A, iron cross = T, silver moon = D, emerald serpent = W.",
    solution: "Reading the flags left to right against the codebook key gives R, U, N, A, T, D, A, W, N — RUN AT DAWN. It's a signal between ships (smugglers, mutineers, a fleet planning to slip past a blockade) coordinating a departure time, not a warning aimed at the party specifically, though it may affect their own plans in the harbor.",
    note: "DC 12 Intelligence (Investigation), or a Vehicles (Water)/sailor's background check, to think to cross-reference the flags against the codebook page rather than dismiss them as decoration. Misreading a flag just produces a nonsense phrase — let the party recount the sequence. Reward: advance knowledge of exactly when a ship (or fleet) intends to move, letting the party plan an ambush, an interception, or simply get out of the way."
  },
  {
    title: "The Magistrate's Notice",
    prompt: "Posted on a town notice board, a public proclamation reads: 'By order of the magistrate, all citizens are reminded that the autumn levy is due within the fortnight. Those who wish to Meet with the assessor may do so At the hall gates. Payment after Dusk will not be accepted, and latecomers will be fined double.' Nothing about it looks unusual at a glance — it's just one more tax notice among several posted nearby.",
    solution: "Three words are capitalized mid-sentence where they shouldn't be: Meet, At, Dusk. Read in order, they spell MEET AT DUSK — a covert instruction hidden inside an ordinary bureaucratic notice, presumably placed by whoever actually controls the notice board (a resistance cell, a spy network, a corrupt official) rather than the magistrate's own clerks.",
    note: "DC 13 Intelligence (Investigation) to notice the odd capitalization at all amid a wall of similar-looking notices — you can lower this to DC 10 if the party has already been told 'someone in town is passing coded messages.' Missing it just means they don't learn about the meeting, no worse off than before. Reward: eavesdropping on (or attending) the meeting the notice describes, a solid lead into whatever faction placed it."
  }
];
const ASTRONOMICAL_PUZZLES = [
  {
    title: "The Armillary Match",
    prompt: "The party finds an old armillary sphere — a cage of rotating brass rings marked with constellations and a small sun-and-moon indicator — in an observatory, tower, or ruin. A plaque reads: 'Set true, and the way is shown.' The mechanism only unlocks (revealing a hidden compartment, staircase, or door) when its rings are turned to match the actual night sky as it looked on [the specific night you described earlier — e.g., the night of the eclipse, the night the beacon was lit, or any night you gave vivid sky detail for].",
    solution: "The rings must be turned to reproduce the constellations, moon phase, and any notable celestial event (comet, eclipse, planetary alignment) exactly as you described them on that earlier night. If you haven't yet given the party enough specific sky detail to solve this cold, seed it retroactively: have an NPC astronomer, a diary entry, or a mural nearby describe 'the sky as it was that night' in the same terms you'll need the players to match on the rings.",
    note: "DC 12 Intelligence (Arcana or Investigation, or History if they were present for the original night) as a hint if players are stuck — the mechanism can visibly show 'close but not quite' rather than a flat no. A wrong alignment just resets with a soft click, no trap, letting them try again with a fresh guess. If they missed the original sky description entirely, let a stargazing NPC nearby recall it for them (a fallback hint, not a hard wall). Reward: access to whatever the observatory is hiding — knowledge, a relic, or a passage deeper in."
  },
  {
    title: "The Festival Lock",
    prompt: "A shrine, vault, or garden gate bears an inscription: 'Only on [the festival or seasonal holiday you've established in your world — e.g., the Longest Night, the Sowing Feast, the Ashen Fair] does this door remember how to open.' The party must either wait for that date to roll around in-game, or find another way to convince the lock that the festival is happening (a ritual reenactment, festival garb, a specific offering associated with the holiday, etc.).",
    solution: "If your calendar already has an established festival with a fixed date (or a date tied to a moon phase/solstice you've mentioned), that's the trigger date. If you haven't seeded a festival yet, do it now — have an NPC mention an upcoming holiday in passing, post a festival announcement in the next town, or let the players find a festival calendar in this very location listing the date.",
    note: "DC 13 History or Religion to recall festival dates if a player missed the earlier mention. Rather than force real-time waiting, let a clever workaround (dressing the part, performing the associated ritual, bringing the traditional offering) succeed on a DC 15 Charisma (Deception or Performance) check as a shortcut — a satisfying alternative to a hard multi-week wait. A failed attempt just fails quietly, no trap. Reward: whatever the festival lock protects, ideally something thematically tied to that holiday's meaning."
  },
  {
    title: "Counting the Moons",
    prompt: "An old journal, tombstone, or oath-stone references two events by their moon phase rather than a date: e.g., 'sworn beneath a full moon' and, elsewhere, '[the moon phase you described for a more recent in-game event].' A locked mechanism nearby has a dial with notches for a specific number, and a note reads: 'Turn it once for every moon between the oath and the breaking.'",
    solution: "Count the number of full lunar cycles between the two described events using your campaign's calendar (standard fantasy convention: one full moon roughly every 28-30 days, i.e., once per in-game month). If you haven't tracked moon phases explicitly, pick a plausible number of months that fits your timeline and simply declare that count as correct — the puzzle only needs internal consistency, not real astronomical precision.",
    note: "DC 12 Intelligence (History or Investigation) to help a player reconstruct the timeline if they've lost track of session dates — this is a good moment to just tell them the answer via an NPC who kept better records. Turning the dial to the wrong number just doesn't seat correctly and can be freely retried, no trap. Reward: whatever the dial unlocks — this works particularly well as a vault or memorial tied to an oath-breaker plot thread."
  },
  {
    title: "The Carved Constellation",
    prompt: "A domed ceiling, floor mosaic, or standing-stone circle is covered in carved stars, and the party must press or align the correct cluster to match a constellation an NPC astronomer, sailor, or druid described earlier as [the constellation you named — e.g., the Serpent, the Broken Crown, the Huntress's Bow]. Scattered among the correct stars are decoy clusters that almost, but don't quite, match the description.",
    solution: "The correct answer is whichever star pattern matches the shape and story details you gave when you first named the constellation. If you haven't described it in enough visual detail yet to make this solvable, have the astronomer NPC (or a book found in this very room) describe it now: give it a clear shape (e.g., 'five stars in a rough bow, with one bright star at the string') so players have something concrete to match against the carvings.",
    note: "DC 11 Intelligence (Investigation) or Nature to narrow down the decoys if the party is guessing blind. Pressing a wrong cluster can trigger a minor, non-lethal setback (a puff of stale air, a startling chime, a brief false-light illusion) rather than damage, and doesn't lock them out from trying again. Reward: whatever the correct constellation unlocks — a door, a spell effect, a hidden inscription revealed by starlight."
  },
  {
    title: "The Gnomon's Shadow",
    prompt: "A courtyard sundial (or a plain vertical post with markings around its base, if your setting doesn't have one) casts a shadow that must fall on a specific marked hour for a mechanism to trigger — the hour associated with [an event you described earlier, such as when the bells rang, when the ritual began, or when the murder happened]. The party must either wait for that hour or find a way to fake the shadow's position.",
    solution: "The correct hour is whatever time you attached to the earlier event. If you haven't given a specific hour yet, this is a fine moment to add one via an NPC's testimony ('it happened just as the shadow touched the third mark') so the players have a concrete target.",
    note: "DC 10 Intelligence (Investigation) to work out that the dial's marks correspond to the hours mentioned elsewhere in the mystery. If waiting for the real hour would stall the session too long, let the party fake it with a torch or magical light held at the correct angle, succeeding on a DC 14 Intelligence check to get the geometry right — a nice puzzle-within-a-puzzle rather than a hard multi-hour wait. A wrong attempt just fails to trigger anything. Reward: whatever the mechanism reveals, ideally information or access tied directly to the original event's mystery."
  },
  {
    title: "The Wanderer's Return",
    prompt: "An old astronomer's notes describe a comet — 'the Wanderer' or any name you prefer — appearing on two occasions: once during [an event far in your world's past that you've mentioned, e.g., a great war, a king's coronation], and again during [a more recent event the party witnessed or heard described]. A locked archive or shrine only opens for someone who can state how many years passed between the two sightings.",
    solution: "Subtract the two dates you've established for those events to get the number of years between comet sightings, and that's the number the mechanism wants (spoken aloud, dialed in, or written down, your choice of format). If you haven't pinned down exact years for either event, invent round numbers now (e.g., 'forty years apart') — the puzzle just needs the party to do the subtraction correctly once you give them both dates.",
    note: "DC 12 Intelligence (History) to recall or reconstruct the dates if the party has forgotten details from earlier sessions — an NPC scholar or a dusty chronicle in the same room is a fair fallback source. An incorrect number just fails to open the lock with no trap triggered. Reward: access to the archive or shrine, and thematically, a satisfying nod to the comet as a long-running piece of world flavor if you plan to have it return again during the campaign's climax."
  },
  {
    title: "The Eclipse Door",
    prompt: "A vault door is inscribed: 'When the sun goes dark, so too shall I open.' The party must be present during an actual in-game eclipse — either one you've already foreshadowed as upcoming, or one they need to calculate the timing of from [an eclipse you described happening earlier], using a cycle length given on a nearby star-chart (commonly a fixed number of years for a solar eclipse to recur in a given region, e.g., 'every eleven years the shadow returns').",
    solution: "If you've already set a date for an upcoming eclipse in your campaign calendar, that's the trigger. If not, retroactively establish one now: state the cycle length (any consistent number works, 11 years is a reasonable folk-astronomy figure) and count forward from the eclipse you previously described to give the party a concrete future date to aim for.",
    note: "DC 13 Intelligence (Arcana or History) to do the cycle-length math correctly, with a fallback where an astronomer NPC simply tells them the date if they're stuck or if waiting for a real future eclipse doesn't fit your session pacing. If you'd rather not stall the plot on a real-time wait, let the party trigger an artificial 'eclipse' with the right combination of shadow magic, an eclipse-relic, or a ritual — treat it as an equivalent solution. A failed attempt at the wrong time just doesn't open the door. Reward: whatever's sealed inside, ideally something suitably dramatic given the buildup."
  },
  {
    title: "The Calendar Wheel",
    prompt: "A stone wheel set into a floor or wall is carved with the months or seasons of your calendar and can be rotated by hand. A nearby inscription reads: 'Turn me to the day the bells rang for [the festival or historical date you've established, e.g., the founding of the town, the Sowing Feast].' The wheel only unlocks a mechanism when the correct date is aligned with a fixed pointer.",
    solution: "Align the wheel to whichever date you've previously attached to that festival or event. If you haven't given a specific date yet, this is a good place to have a townsperson mention it in passing ('always around the first frost' or similar), giving the players something concrete to match to the wheel's carved months.",
    note: "DC 10 History or Religion to recall the date if a player forgot it. Misaligning the wheel just doesn't seat the mechanism and can be freely retried — no trap, no penalty beyond a little wasted time. Reward: whatever the wheel unlocks, which pairs nicely with a vault, archive, or ritual chamber tied to that same festival's meaning."
  },
  {
    title: "The Tide Dial",
    prompt: "A coastal shrine or smuggler's cave has a small brass dial showing moon phases, connected by pipework or a simple lever mechanism to a sea-gate that only opens at a specific tide. A weathered sign reads: 'As the moon stood on [the night you described the tide or moon in an earlier coastal scene], so must it stand again.' The party must set the dial to match that remembered phase to trigger the gate.",
    solution: "Set the dial to whichever moon phase you described during that earlier coastal scene (new, full, or a specific crescent/gibbous stage). If you never specified one, decide now and let an old fisherman or the shrine's own carvings supply it as a fresh clue rather than making the players guess blind.",
    note: "DC 11 Intelligence (Investigation) or a sailor's background check to recall or reconstruct the correct phase. Setting the dial wrong just means the gate stays shut and the tide doesn't cooperate — no danger, just a delay until the next correct attempt. Reward: safe passage through the sea-gate, or whatever cache the smugglers were guarding behind it."
  },
  {
    title: "The Order of Seasons",
    prompt: "A ritual chamber holds four small idols or offering bowls, unlabeled, that must be placed in a circular rack in the correct order of your world's calendar year — starting from whichever season is currently in-game, or from [the season you established the campaign's founding myth/festival cycle begins with]. A verse on the wall hints at each idol's associated season through imagery (harvest sheaves, bare branches, new blossoms, high sun) without naming the season outright.",
    solution: "Match each idol's imagery to a season and place them in your calendar's established order, starting from the anchor season you've previously set (or simply spring-summer-autumn-winter if you haven't established anything more specific). If your world's calendar hasn't come up yet, this is a low-stakes place to establish it on the fly.",
    note: "DC 10 Nature or Religion to correctly match imagery to season if a player is unsure. Placing an idol wrong just fails to seat it properly in the rack — freely correctable, no trap. Reward: whatever the completed ritual triggers, from a blessing effect to a hidden compartment in the rack's base."
  },
  {
    title: "Twin Stars, One Path",
    prompt: "An old star-chart or a dying stargazer gives the party two remembered star bearings from earlier in the campaign — for instance, [a star or constellation you described as being directly overhead on a specific night] and [a second star position noted from a different vantage point or night]. A buried marker or hidden door is only found by standing where both bearings would have crossed.",
    solution: "Plot roughly where the two described bearings intersect on your local map — this doesn't need real trigonometry, just a sensible in-fiction location that makes sense given both descriptions (e.g., 'a hilltop equidistant from both landmarks the stars were sighted over'). Decide this ahead of time and place the actual objective there.",
    note: "DC 13 Intelligence (Investigation) or Nature (Survival) to work out roughly where the two bearings cross without exact math — treat this as a reasoning puzzle, not a geometry test. Standing in the wrong spot just finds nothing, no danger. Reward: the buried marker, hidden door, or cache the triangulation was meant to reveal."
  },
  {
    title: "The Beast-Year Wheel",
    prompt: "Your world's calendar cycles through a repeating sequence of year-beasts (adapt freely — a Wolf Year, a Serpent Year, a Stag Year, and so on), and a stone wheel or tapestry depicts the full cycle. A locked shrine only responds to whichever beast matches the current in-game year, which the party should be able to work out from [omens, festivals, or NPC comments you've dropped earlier tying certain events to certain year-beasts].",
    solution: "Identify the current year-beast from whatever clues you've planted (an NPC saying 'it's a bad year to be born under the Wolf' or a festival banner depicting the correct beast). If you haven't established this yet, an elder or scholar nearby can simply state which year it is, giving the party the answer they need on the spot rather than forcing them to have tracked it from session one.",
    note: "DC 10 History or Religion to recall the current year-beast if it's been mentioned before. Choosing the wrong beast on the wheel just doesn't trigger the mechanism and can be retried. Reward: whatever the shrine protects, plus a nice worldbuilding touch if you want this beast-cycle to recur later in the campaign."
  },
  {
    title: "The Second Eclipse",
    prompt: "A star-chart references two solar eclipses by name or description — one that already happened [an eclipse you described earlier in the campaign] and a second, upcoming one the party must calculate using a cycle length given on the chart (e.g., 'the shadow returns every nine years'). A combination lock or ritual timing depends on knowing the coming eclipse's exact year.",
    solution: "Add the cycle length to the year of the earlier eclipse to get the target date. If you haven't previously set an exact year for that first eclipse, assign one now and let the chart itself state the cycle length plainly, so the arithmetic is straightforward once the party has both numbers.",
    note: "DC 12 Intelligence (Arcana or History) to do the calculation cleanly, with an NPC astronomer as a fallback who can simply confirm the answer if the party is stuck or if the resulting date doesn't comfortably fit your session's pacing. A wrong guess at the lock just doesn't open it, no trap. Reward: whatever the timed mechanism protects, ideally something that pays off the eclipse as a recurring piece of your world's astronomy."
  },
  {
    title: "The Hour of the Bell",
    prompt: "A bell tower or shrine only rings (or unlocks a passage) when a shadow-marker inside it aligns with a specific carved hour — the same hour [you described an important festival or ritual beginning at earlier in the campaign]. The party must either be present at that hour or manufacture the correct shadow angle artificially.",
    solution: "The correct hour is whatever time you attached to that earlier festival or ritual. If you haven't specified one, have a townsperson or ritual attendant recall it now ('always at the ninth bell, just as the light touches the altar') to give the players a concrete target.",
    note: "DC 10 Intelligence (Investigation) or Religion to recall the correct hour. If waiting for the literal time of day would stall your session, let the party fake the shadow with a controlled light source on a DC 13 Intelligence check to get the angle right. A wrong attempt just fails quietly. Reward: whatever the tower or shrine reveals when it finally rings true."
  },
  {
    title: "The Star-Myth Panels",
    prompt: "A chamber wall or shrine ceiling has several painted or carved panels, each depicting a myth-figure tied to a constellation — a Hunter, a Serpent, a Weaver, and so on. They're currently out of order, and a mechanism only responds when they're arranged in the order an astronomer NPC described the constellations rising, back in [the earlier scene where you had them describe the night sky's myths].",
    solution: "Arrange the panels in the same order the astronomer originally described the constellations appearing overhead. If that order hasn't been established yet, have the astronomer (or a book/scroll in this very room) lay it out now in clear, memorable terms — first the Hunter, then the Serpent, and so on — so the party has something to work from.",
    note: "DC 11 Intelligence (Investigation) or History to recall the order if the party heard it described earlier but forgot the sequence. Placing a panel out of order just fails to trigger the mechanism and is freely correctable. Reward: whatever the completed sequence reveals — often a good fit for a hidden passage, a mural that comes alive, or a final story panel that was blank until the sequence is right."
  },
  {
    title: "Which Season Was It",
    prompt: "The party is investigating a string of past events they've only heard described in vague terms (a fire, a disappearance, a strange light) — each tied to weather or festival details you mentioned in passing (e.g., 'the harvest was already in,' 'frost still on the ground,' 'the day of the Sowing Feast'). A mechanism, timeline mural, or NPC riddle requires the party to correctly order these events by season, not by the order they learned about them.",
    solution: "Match each event's described weather or festival detail to a season in your calendar, then sequence them accordingly. If any event's seasonal detail hasn't actually been given yet, this is a good moment to supply it via a witness's recollection, giving the players a fair basis for the ordering rather than asking them to guess.",
    note: "DC 12 Intelligence (Investigation) to piece together the seasonal clues if the party hasn't been tracking them closely. Getting the order wrong just produces an incorrect (but harmless) timeline that a sharp-eyed NPC or a re-examination of clues can correct. Reward: the true sequence of events, which should meaningfully clarify whatever mystery the party is investigating."
  },
  {
    title: "The Conjunction Lock",
    prompt: "A star-chart or astrologer's notes describe two celestial bodies — name them anything fitting your setting, such as the Red Wanderer and the Pale Star — slowly approaching a rare conjunction, first mentioned when [you described them in the sky during an earlier session]. A vault only opens on the date they align, calculable from each body's stated cycle length (e.g., 'the Red Wanderer returns every 3 years, the Pale Star every 5').",
    solution: "Find the next date both cycles coincide (the lowest common multiple of the two cycle lengths, counted forward from your last confirmed sighting date). If you haven't given exact cycle lengths yet, assign simple round numbers now so the math stays clean and satisfying rather than obscure.",
    note: "DC 13 Intelligence (Arcana) for the calculation, with an astrologer NPC available as a fallback to simply state the date if the party is stuck or the math would stall the session too long. An incorrect date attempt just fails to open the vault, no trap triggered. Reward: whatever the vault holds, ideally something suitably rare and important given the rarity of the conjunction itself."
  },
  {
    title: "The Sky-Mural",
    prompt: "A domed ceiling or wall-length mural depicts dozens of different night skies, each a small painted panel, and only one exactly matches [the specific night sky you described in an earlier, memorable scene — the stars, moon phase, and any celestial event visible that night]. Pressing the correct panel triggers a hidden mechanism.",
    solution: "The correct panel is whichever one matches the sky details from that earlier scene. If you didn't describe it in enough visual detail at the time to make this solvable now, have a caretaker, tour-guide NPC, or accompanying plaque describe 'the night the stars aligned so' in matching terms, effectively re-supplying the clue in the room itself.",
    note: "DC 12 Intelligence (Investigation) to narrow down the correct panel among several similar decoys. Pressing a wrong panel can trigger a small, harmless effect (a chime, a puff of illusory stardust, a brief flicker of light) rather than a trap, and doesn't prevent further attempts. Reward: whatever the mechanism reveals, and a nice touch if the correct panel's night ties thematically to the room's purpose."
  },
  {
    title: "The Age of the Ruin",
    prompt: "A collapsed structure has a series of small notches or star-symbols carved into a support pillar, clearly meant as a tally of some kind. A surviving inscription nearby says the ruin was sealed 'the year the sky wept fire' — referring to [a comet, meteor shower, or celestial omen you described happening earlier in the campaign, at a known point in your timeline]. The party must count the notches and match them against known events to work out how long ago the ruin was actually sealed.",
    solution: "Each notch represents one year (or one full star-cycle, your choice), counted backward from the present. Cross-reference the total against the date of the celestial omen you described earlier to confirm the ruin was sealed at that same time — the notch count and the referenced omen should agree once you've settled on both figures.",
    note: "DC 12 Intelligence (History or Investigation) to count the notches accurately and connect them to the referenced omen. A miscount just gives a slightly wrong age estimate, which a second, more careful count can correct — no trap tied to the counting itself. Reward: understanding the ruin's true age often unlocks a bigger revelation (who sealed it, why, and whether that reason still matters today) rather than physical loot."
  },
  {
    title: "The Twin Moons",
    prompt: "In settings with two moons (skip or reskin this one if yours has only one), a shrine mechanism has two separate dials, each carved with the phases of one moon. A verse reads: 'When [the first moon] stood as it did the night of [an event you described], and [the second moon] as it did that same night, the door remembers and opens.' The party must set both dials to match the remembered phases of that single, specific night.",
    solution: "Set each dial to the phase you described for its respective moon during that earlier scene. If you haven't given both moons' phases for that night, decide them now and have a nearby astronomer's notes or shrine carving state them clearly, so the party has concrete targets for both dials rather than one.",
    note: "DC 13 Intelligence (Investigation or Arcana) to recall or reconstruct both phases, especially if only one was clearly described before — allow a generous fallback where an NPC or written record supplies whichever phase is missing. Misaligning either dial just fails to open the door, freely retriable. Reward: whatever the shrine protects, and a good opportunity to make your world's two-moon detail feel meaningfully load-bearing rather than cosmetic."
  }
];
const ENVIRONMENTAL_PUZZLES = [
  {
    title: "The Sunfire Reliquary",
    prompt: "Sunlight pours through a single high window into a circular shrine of blackened basalt. At the center, a faceted red gem sits in a stone cradle, dark and lifeless. Three bronze mirrors on swiveling arms line the walls, each dented from age, along with a faded mural showing a beam of light bouncing off a mountain, a wave, and a flame before striking a jewel.",
    solution: "The mural shows the beam's path in order: mountain (topmost mirror, angled steeply down), wave (the mirror nearest the floor, angled up), then flame (the last mirror, aimed level at the gem). Setting the three mirrors to steep-down, floor-up, level-straight in that order channels the window's sunbeam into the gem, which flares and unlocks the cradle, swinging open a hidden floor hatch beneath it.",
    note: "Investigation DC 13 to notice the mural sequence at all; DC 16 to read it correctly without a hint. A wrongly angled mirror just scatters the light harmlessly, so players can adjust freely with no penalty until the beam lands true. Reward: a sunstone (functions as a continual light pebble, or sells for 50 gp)."
  },
  {
    title: "The Weeping Cistern",
    prompt: "The party descends into a stone reservoir chamber as water begins pouring in from carved fish-mouth spouts on all four walls. The exit door is already half-submerged and sinking lower. Four wheel-valves sit on pedestals around the room, each stamped with a different fish, and a drowned mosaic on the ceiling shows the four fish swimming in a specific order toward a carved sun.",
    solution: "The mosaic shows the swim order: catfish, eel, pike, then salmon, chasing the sun (which represents the exit). Turning the valves shut in that exact order — catfish first, salmon last — reverses the spouts into drains, lowering the water fast enough to clear the door before it fully submerges.",
    note: "Perception DC 14 to spot the ceiling mosaic before the water gets high enough to obscure it. Turning valves in the wrong order does nothing bad by itself, but wastes precious rounds — track 6 rounds until the door is fully sealed, creating real time pressure without being an instant kill (the room has an air pocket near the ceiling as a backstop). Reward: a waterproof strongbox that floats free once the tide recedes, containing a minor potion cache."
  },
  {
    title: "The Tide-Marked Landing",
    prompt: "A sluice gate slowly drains a flooded antechamber, and as the water level drops it reveals a mosaic floor of colored tiles, only some of which are actual pressure plates flush with the stone. High on the wall, a faded tide-chart fresco shows a fisherman's footprints crossing from a boat symbol to a lighthouse symbol, stepping only on blue tiles.",
    solution: "The fresco's footprints trace a path exclusively across the blue-glazed tiles, from the boat-shaped starting tile to the lighthouse-shaped exit tile. All non-blue tiles are pressure plates that trigger a dart trap or alarm. As the water drains, the party can watch which tiles the fresco's painted footprints pass over and match the real floor to it.",
    note: "A character can use an action to study the fresco and floor together for an automatic match, or roll Investigation DC 15 to shortcut it. Stepping on a wrong tile triggers a loud alarm bell (alerting nearby guards/monsters) rather than direct damage, letting players recover and reroute. Reward: a sealed urn of preserved incense worth 75 gp, found once the room fully drains."
  },
  {
    title: "The Loom of Four Threads",
    prompt: "A weaver's shrine holds four floor-to-ceiling levers, each carved with a different season's symbol — a budding branch, a sun, a falling leaf, a bare tree. A half-finished tapestry on the loom depicts the four seasons in a spiral pattern, but the spiral has been deliberately woven starting from winter rather than spring.",
    solution: "The tapestry's spiral, read starting from the bare-tree (winter) panel and moving inward, gives the true order: winter, spring, summer, autumn. Pulling the levers in that sequence — bare tree, budding branch, sun, falling leaf — releases the loom's tension bar and slides the wall panel behind it open.",
    note: "Investigation DC 13 to notice the spiral starts at winter instead of spring, which is the trick. Pulling levers out of order simply resets the loom's tension with a loud clack and no harm, so players can brute-force all 24 orders if patient, though a nearby wandering monster check every few failed attempts adds pressure. Reward: a set of weaver's tools that grant advantage on checks to identify magic textiles."
  },
  {
    title: "The Sunken Choir",
    prompt: "The party wades into a flooded chapel where a single shaft of light filters down through a domed skylight above the waterline. A tarnished mirror hangs on a pivot near the altar, and the submerged floor below is checkered with stone tiles, some of which release a jolt of numbing cold when stepped on. Faded gold lettering along the domed ceiling reads: 'Where the light falls true, the faithful may walk.'",
    solution: "The mirror must be angled so the shaft of light reflects down onto the floor tiles, tracing a lit path from the entrance to the altar. That lit path is also the only safe path across the pressure-plate floor — every tile the reflected beam touches is safe, and every tile in shadow triggers the cold jolt.",
    note: "Once the mirror is angled correctly (Investigation or a simple trial-and-error swivel, no roll needed to attempt), the safe path is visually obvious and needs no further roll. A wrong tile deals 1d6 cold damage and knocks the target prone in the water rather than anything lethal. Reward: a silver choir bell that calms hostile beasts within 30 feet once per day when rung."
  },
  {
    title: "The Star Wheel Observatory",
    prompt: "Atop a crumbling wizard's tower, the floor of the observatory is built from three concentric stone rings that can each be rotated independently, each etched with constellation glyphs. A brass astrolabe bolted to the wall shows the sky as it appeared 'on the night the tower was raised,' according to an engraved plaque, with three specific glyphs aligned along its central spine.",
    solution: "The astrolabe fixes three glyphs — the Serpent, the Anvil, and the Lantern — in a straight line down its spine. Rotating the three floor rings so those same three glyphs line up beneath the skylight causes the rings to lock and a section of the domed ceiling to slide open, dropping a rope ladder to the tower's hidden archive above.",
    note: "Arcana or Investigation DC 14 to read the astrolabe's alignment correctly. Rotating the rings to a wrong alignment does nothing except require re-rotating, though the rings are stiff and each rotation costs an action, adding time pressure if something is chasing the party. Reward: a spellbook page teaching one extra 1st-level wizard spell of the DM's choice."
  },
  {
    title: "The Scale of Honest Men",
    prompt: "A vault door is set into the wall behind an enormous bronze balance scale. On one side, a stone plinth is engraved 'The weight of a lie.' The room holds five identical-looking iron ingots stacked nearby, along with a small brass plaque reading: 'Truth is never the heaviest, nor the lightest, but the middle path.'",
    solution: "The five ingots are subtly different weights (a Perception check or simply hefting each one reveals it). The plaque means the party must place the third-heaviest ingot — the exact median weight — on the empty side of the scale to balance it against a fixed counterweight sealed into the plinth, which unlocks the vault door.",
    note: "Perception DC 15 to notice the ingots' weight differs at all; otherwise a character can spend a turn manually comparing them by hand instead. Placing the wrong ingot just fails to balance the scale — nothing triggers, it simply doesn't unlock, so players can swap ingots freely. Reward: 200 gp in worked silver ingots, plus the vault's contents (DM's choice of treasure)."
  },
  {
    title: "The Frostbound Vault",
    prompt: "Three doors sealed floor-to-ceiling in thick blue ice block the passage onward, each door bearing a rune: a wolf, a raven, a bear. Three unlit braziers stand nearby, and a frozen hunter's corpse still clutches a scrap of hide bearing a crude drawing — wolf tracks leading to raven feathers, raven feathers leading to bear claw marks.",
    solution: "The hide drawing indicates the melt order: wolf door first, then raven door, then bear door. Lighting the matching brazier beside each door (using any fire source) melts that door's ice after one full round if done in the correct sequence; lighting them out of order causes the ice to simply refreeze thicker on doors lit prematurely.",
    note: "Survival or Investigation DC 13 to interpret the tracking drawing. Lighting braziers out of order costs time (the wrongly-melted door refreezes over the next minute, requiring a re-light) but never harms the party — good for slow, careful experimentation. Reward: a frost-touched hand axe (treat as a +1 weapon that deals an extra 1d4 cold damage) frozen into the wall beyond the bear door."
  },
  {
    title: "The Whispering Flue",
    prompt: "Wind howls through a chimney-riddled chamber carved into a mountainside, dozens of small stone flues in the walls each fitted with an iron damper lever. A rusted weathervane spins wildly atop a central pole, and a carving beside it shows an arrow pointing due east, with the words 'Still the breath, save one, and the tower will point true.'",
    solution: "The party must close every damper except the one whose flue faces east (identifiable by sunlight/wind direction, or by matching flue positions to a compass rose etched faintly on the floor). With every other flue sealed, the remaining eastern draft spins the weathervane until it locks pointing east, which releases the floor grate beneath it.",
    note: "Investigation DC 13 to spot the faint compass rose on the floor that identifies true east. Closing the wrong damper does nothing harmful — it just fails to produce the correct draft, and dampers can be reopened freely to try again. Reward: a set of wind-caller's chimes (grants advantage on one Survival check per long rest to avoid getting lost outdoors)."
  },
  {
    title: "The Hall of Fractured Light",
    prompt: "A long gallery in a ruined elven tower is lined with cracked crystal mirrors on rails, each able to slide along a groove in the floor and pivot in place. A single beam of magical violet light pulses from a crystal orb at one end of the hall, and a sealed prism sits in a socket at the far end, clearly meant to catch it.",
    solution: "There are five mirrors, and only a specific three need to be slid into position and angled to bounce the beam in a zigzag down the hall to the prism; the other two are decoys that, if used, simply refract the light off into the walls. Careful trial and error (or Arcana DC 15 to trace the beam's likely path visually) reveals which three mirrors sit on the true line.",
    note: "Wrong mirror placement just scatters the beam with no effect — completely safe to experiment with, though each adjustment takes an action, so a ticking clock (patrol, encroaching effect) helps create urgency without punishing failure directly. Reward: when the prism catches the beam, it discharges into a wand of the DM's choice appearing in the now-unsealed socket."
  },
  {
    title: "The Drowned Vestry",
    prompt: "Cold seawater seeps in through cracks as the party enters a half-collapsed vestry beneath a coastal ruin, and a rusted sluice wheel on the far wall is already turning slowly on its own, flooding the room. A brass plaque nearby reads 'Three turns closes what the sea has opened,' and a domed alcove overhead holds a visible pocket of trapped air.",
    solution: "The sluice wheel must be turned exactly three full rotations in the reverse direction (opposite to how it is currently spinning) to seal the crack it is slowly widening. Turning it the wrong way accelerates the flooding instead. The air pocket in the domed alcove buys the party a safety margin if they misjudge the timing.",
    note: "No roll needed to identify the correct direction if a player thinks to reverse the wheel's current spin; award a hint at Investigation DC 12 otherwise. Turning it the wrong way for too long floods the room over 3 rounds, forcing a swim to the air pocket rather than causing direct harm. Reward: a corroded holy symbol that, once cleaned, functions as a focus for the Message cantrip permanently."
  },
  {
    title: "The Garden of Silent Bells",
    prompt: "A natural cavern has been carved into terraced garden beds long gone to moss, and the path forward is a floor of flat stones, some loose and rigged to trigger swinging bell-hammers that would wake anything sleeping nearby. A weathered statue of a gardener stands at the entrance, one stone foot frozen mid-step on a specific paving stone, its other foot raised toward the next.",
    solution: "The statue's stance shows the exact stride pattern needed: left-right-right-left across the terraces, matching the safe stones. Any character who mimics the statue's foot spacing while crossing (or who maps the safe stones by comparing them to the statue's pose) crosses without triggering the bells.",
    note: "Investigation DC 14 to notice the statue's foot pose is a literal map of the safe path rather than decoration. A wrong step doesn't harm the party, it just rings the bells loudly, drawing 1 random wandering monster check rather than dealing damage. Reward: a pouch of moonpetal seeds worth 40 gp to an herbalist, growing wild in the terraces."
  },
  {
    title: "The Ember Choir",
    prompt: "Four low stone altars ring a sunken fire-temple floor, each holding a shallow brazier — one cold, one smoking faintly, one banked with coals, one roaring. A cracked hymn carved into the temple wall reads: 'Breath before spark, spark before blaze, blaze before ash, and ash gives way.'",
    solution: "The hymn describes the fire's life cycle in order: breath (the cold brazier, representing unlit air) must be lit first, then the smoking one (spark), then the banked coals (blaze), and finally the roaring brazier is allowed to burn down to embers (ash) last by smothering it. Performing all four actions in that order — light, light, feed, smother — causes the central floor medallion to sink and open a passage below.",
    note: "Religion or Investigation DC 14 to parse the hymn as literal instructions rather than poetry. Performing a step out of order simply produces no effect on the medallion (braziers can be relit or resmothered freely), keeping this a low-stakes puzzle for methodical players. Reward: a flask of everburning oil (never runs out, but only fuels non-magical flame)."
  },
  {
    title: "The Tilting Reliquary",
    prompt: "The party enters a chamber built inside the hull of a long-buried ship, and the entire floor tilts alarmingly underfoot, sliding loose statuary and debris toward the downhill wall. Four empty pedestals are bolted at the corners of the room, and four matching statues (a knight, a monk, a merchant, a child) lie where they slid, each of noticeably different weight.",
    solution: "The room is a giant balance built into the hull; placing all four statues onto their pedestals in a specific corner arrangement — heaviest (the knight) opposite lightest (the child), and the monk opposite the merchant — levels the floor evenly. Once level, the sealed hatch in the ceiling releases and drops a ladder.",
    note: "Athletics checks are needed just to drag the heavier statues (DC 12–15 depending on which one). Placing statues in a poor arrangement just leaves the floor tilted and nothing more happens — no damage, just continued sliding hazard (difficult terrain) until corrected. Reward: a captain's signet ring found beneath the knight statue, worth 60 gp and a minor local reputation hook."
  },
  {
    title: "The Clockwork Orrery",
    prompt: "A brass orrery dominates the center of a wizard's tower study, tiny painted planets orbiting on creaking arms around a crystal sun. A hooded window above lets in a single beam of daylight, currently striking a blank patch of wall. A star-chart on the desk notes: 'When the red wanderer stands beside the hearth-star, the door remembers its name.'",
    solution: "The party must turn the orrery's hand-crank to advance the mechanism until the red-painted planet aligns directly beside the crystal sun (the 'hearth-star'), which rotates the tower's outer shutters just enough to redirect the daylight beam onto a hidden rune on the wall, which glows and unlocks the study's inner door.",
    note: "Arcana DC 13 to correctly identify which painted sphere is the 'red wanderer' from the star-chart's description. Cranking to the wrong position does nothing but require more cranking — the mechanism is slow (1 minute per attempt) but entirely safe. Reward: a folded star-chart that, in the DM's hands, can be used later as a clue to a hidden observatory or treasure location."
  },
  {
    title: "The Root Cellar Combination",
    prompt: "Deep in a natural cave network, an old hermit's storeroom has been sealed behind a stone door fitted with three rotating discs, each carved with animal totems — fox, owl, bear, deer, wolf, and more. The hermit's ghost, if the party speaks with it (or a journal found nearby), mutters that he 'always locked it the same way his grandfather taught him: the quiet hunter, the night watcher, the slow guardian.'",
    solution: "The three phrases map to totems: 'the quiet hunter' is the fox, 'the night watcher' is the owl, 'the slow guardian' is the bear. Rotating the three discs to show fox, owl, bear in that left-to-right order releases the door's bolt.",
    note: "This is pure roleplay/lore extraction — no roll needed if the party actually talks to the ghost or reads the journal; otherwise Investigation DC 15 to find the journal passage. Wrong disc combinations simply fail to unlock, discs can be spun freely with no trap. Reward: preserved dried goods worth little in gold but a hand-drawn map to a nearby landmark useful for the campaign."
  },
  {
    title: "The Quicksilver Falls",
    prompt: "A small waterfall inside an elemental water shrine splits into three channels controlled by stone sluice gates, cascading down into a basin where a mirrored floor lies just beneath the surface, currently churned and unreadable. A carved eel motif circles the basin's rim with an arrow showing which channel should run strongest.",
    solution: "Closing two of the three sluice gates so that only the channel marked by the eel's arrow flows at full strength calms that portion of the basin, letting the water settle glass-still over the mirrored floor. Once still, the mirrored floor reflects a hidden glyph painted on the ceiling, which is the actual answer needed for the shrine's altar (a simple word or symbol prompt the DM can tie to the dungeon's larger theme).",
    note: "Investigation DC 12 to identify the correct channel from the eel carving. Leaving the wrong gates open just keeps the water choppy and the reflection unreadable, an easily reversible state. Reward: a vial of shrine water that functions as a potion of water breathing when consumed."
  },
  {
    title: "The Deepwell Bellows",
    prompt: "A stone shaft drops into darkness, and the only way down is a wide platform suspended by ropes over a network of wind vents. Four hand-cranked bellows stand around the shaft's rim, each connected to a different vent, and a faded diagram on the wall shows the platform rising only when vents are filled in a staggered pattern rather than all at once.",
    solution: "The diagram shows the vents must be pumped in a rotating pattern — vent one, then vent three, then vent two, then vent four, repeating — rather than all four at once, which would overpressure and stall the mechanism. Two party members working two bellows each in that rotation raises the platform smoothly to the bottom of the shaft.",
    note: "Investigation DC 13 to correctly read the diagram's staggered pattern; without it, players can experiment freely. Pumping incorrectly just stalls the platform a few feet up with a hiss of escaping air rather than dropping it, so failure only costs time. Reward: nothing tangible here, but the platform ride skips what would otherwise be a lengthy, resource-draining climb down."
  },
  {
    title: "The Salt Flat Crossing",
    prompt: "The party enters a sun-bleached ruin open to the sky, its floor a cracked salt flat dotted with hundreds of hairline seams, some of which are pressure-triggered vents that spray blinding salt crystal. The domed ceiling above is punched through with small holes that, at midday, cast a scatter of light dots onto the floor matching a constellation.",
    solution: "The pattern of light dots cast through the ceiling's holes lands exactly on the safe (non-vent) sections of floor at midday. Following the dots of light across the flat, rather than walking any other path, crosses safely; the puzzle is time-sensitive only in the sense that the dots shift slowly as the sun moves, so a fast crossing is easiest.",
    note: "Perception DC 14 to notice the correlation between the ceiling holes and the light dots on the floor. Triggering a vent sprays a target with stinging salt crystal (1d4 damage, and disadvantage on Perception until it's washed off) rather than anything worse. Reward: a sun-cured hide map rolled up in a crevice, worth 30 gp to a collector and usable as a regional map prop."
  },
  {
    title: "The Twin Furnace Gate",
    prompt: "An iron gate is flanked by two furnaces, each fitted with a damper wheel to control its heat, and a row of floor plates leads up to the gate, faintly warm to the touch. An engraved plate reads: 'Match the forge-song, walk between the coals, and the gate remembers the smith who built it.' A faint humming can be heard from the furnaces at different pitches.",
    solution: "The two furnaces must be adjusted (via their damper wheels) until their humming pitches match one another exactly — this is the 'forge-song.' Once matched, the previously warm floor plates cool to safe temperature (they were rigged to scald anyone crossing while the furnaces were mismatched, as a kind of tuning-based trap), letting the party walk the plates safely to the gate, which then swings open.",
    note: "Perception DC 13 to notice the differing pitches; a character proficient with smith's tools or an instrument gets advantage on adjusting the dampers to match them. Crossing the plates before matching the pitches deals 1d6 fire damage per plate crossed, a real but non-lethal cost that rewards patience. Reward: a masterwork smith's hammer (grants advantage on one Smith's Tools check per long rest)."
  }
];
const SEQUENCE_PUZZLES = [
  {
    title: "The Bellringer's Round",
    prompt: "A statue of a robed bellringer stands beside four hanging bells of different sizes in a chapel belfry. When the party approaches, the statue's arm creaks to life and rings the bells in a short pattern, then goes still, clearly waiting for the pattern to be repeated back.",
    solution: "The statue plays a randomized sequence (DM picks 4–6 bell rings from the four bells, e.g., small-large-medium-small). Players must ring the same bells in the same order using ropes at the base of each bell. Getting it right causes the statue to bow and the belfry trapdoor to unlock.",
    note: "No roll needed, this is pure listen-and-repeat; a character can ask the statue to repeat the pattern once per short rest if they're unsure. A wrong sequence just resets the statue to try again with no penalty, ideal for a tension-free warm-up puzzle. Reward: a small silver bell that, when rung, functions as an alarm spell centered on the ringer once per day."
  },
  {
    title: "The Rune Circle",
    prompt: "Four glowing runes are set into a circular dais, each pulsing a different color when stepped on. As the party enters, the runes flash in a short sequence of colors on their own, then go dark, and the dais hums expectantly.",
    solution: "This is a classic Simon-Says: the DM determines a starting sequence of 3 colors, and after each successful repeat, adds one more color to the end (growing to 4, then 5, then 6). Players step on the corresponding runes in order to replay the sequence from the beginning each round.",
    note: "No roll, purely a memory challenge for the table — consider writing the sequence down after showing it once, out of character, since remembering long sequences from a verbal description is harder than seeing lit tiles. A wrong step causes a harmless flash and buzz and restarts that round's sequence only (not the whole thing). Reward: at 6 correct rounds, the dais grants one random minor magic trinket (DM's choice) it was hiding beneath a floor panel."
  },
  {
    title: "The Unfinished Tapestry",
    prompt: "A tapestry runs the length of a long hallway, showing a repeating woven pattern of sun, moon, and three stars in a specific arrangement that repeats six times before abruptly cutting off, unfinished, at a blank loom at the hallway's end. Six empty pegs sit beside the loom, each meant to hold a carved wooden token.",
    solution: "The pattern repeats sun-star-moon-star-star in each of the six panels shown. Reading the rhythm, the seventh (unfinished) section should continue the same pattern. A basket of tokens nearby lets the party hang sun, star, moon, star, star in the correct order on the six pegs, completing the tapestry and causing the loom to fold aside, revealing a passage.",
    note: "Investigation DC 12 to correctly identify the repeating rhythm across the six existing panels. Hanging tokens in the wrong order does nothing, they can simply be re-hung; this puzzle is meant to be a calm, low-stakes logic check. Reward: a spool of everlasting thread, useful as a component for mending or minor tailoring magic (DM's discretion on mechanical benefit)."
  },
  {
    title: "The Reliquary of Pairs",
    prompt: "Twelve small stone tiles are set face-down in a grid on a table in a memory shrine, each bearing a hidden symbol on its underside. A plaque reads: 'Two halves, one truth. Turn wrong, and the shrine forgets you tried.'",
    solution: "This is a standard matching-pairs memory game — six symbol pairs among the twelve tiles. Players flip two tiles at a time (out loud, tracking what they've seen); a match stays face-up, a mismatch flips back down. Once all six pairs are matched, the shrine's central reliquary case unlocks.",
    note: "No roll — this is genuinely a memory exercise for the players (or DM can allow an Intelligence check DC 13 per flip attempt to represent a character's memory instead, for tables that prefer not to track it themselves). The 'shrine forgets you tried' line is flavor only: mismatches simply flip back with no other cost. Reward: the reliquary case holds a pair of matched magic rings (DM's choice of a minor linked effect, such as each ring letting its wearer sense the other's general direction)."
  },
  {
    title: "The Gardener's Verse",
    prompt: "A small poem is carved into a planter box in an overgrown greenhouse: 'First the seed sleeps deep and round, then the stem reaches from the ground, then the bud waits, closed and slow, then the bloom finally starts to show.' Four stone switches shaped like a seed, a stem, a bud, and a flower are set into the wall nearby.",
    solution: "The poem directly states the correct order: seed, stem, bud, bloom. Pressing the four switches in that order causes the greenhouse's central fountain to shift aside, revealing stairs down.",
    note: "No roll needed if the party reads the poem aloud and reasons it out; Investigation DC 10 to notice the poem is a literal instruction if they're not paying attention to the words. A wrong press causes the switches to click back to their neutral position with no other effect, fully safe to retry. Reward: a handful of everbloom seeds that, when planted, sprout a flower a druid or herbalist could use as a rare spell component (DM's discretion)."
  },
  {
    title: "The Watchman's Habit",
    prompt: "A ghostly watchman paces a looping route through a ruined guardhouse each night, always pausing at the same four spots in the same order — a window, a weapon rack, a hearth, and a locked chest — before fading and starting over. He does not react to the party unless they interfere with his route.",
    solution: "The four spots the ghost pauses at, in order, are the actual sequence needed to unlock the chest: examining the window, touching the weapon rack, warming hands at the hearth, then approaching the chest triggers its lock to click open, mimicking the ritual the watchman performed every night in life to secure it.",
    note: "Perception DC 13 to notice the ghost's route is consistent and identical each loop (roughly 2 minutes per loop) rather than random wandering. Performing the actions out of order does nothing, and the ghost is passive, so there's no risk in observing multiple loops to confirm the pattern. Reward: the chest holds the watchman's old badge, a keepsake that grants advantage on Persuasion checks with any town guard once the party proves they returned it to his descendants (a roleplay hook, not a mechanical trinket)."
  },
  {
    title: "The Dynastic Gallery",
    prompt: "Six portraits line a gallery hall, each depicting a different ruler, but a plaque beneath each one has been swapped and mislabeled by vandals, giving the wrong ruler's name and reign dates under each face. A locked case at the hall's end can only be opened by pressing the portraits in true chronological order of their reigns.",
    solution: "The party must use context clues scattered elsewhere in the gallery (subtle details in the paintings' backgrounds, style of dress, weapons, or a nearby history book) to determine the true chronological order, ignoring the deliberately swapped plaques. Pressing the six portraits frame-edges in the correct true order unlocks the case.",
    note: "History DC 15 (or Investigation DC 13 if a history book is found and read first) to reconstruct the true order from visual clues alone. Pressing portraits in the wrong order simply doesn't unlock anything and can be retried freely. Reward: the case holds a ceremonial crown replica worth 100 gp and a strong hook for a noble-house subplot."
  },
  {
    title: "The Shepherd's Tune",
    prompt: "A set of wooden pipes lies beside a carved shepherd statue in a highland shrine, and a few notes of a simple folk tune are etched into the wall as musical notation, cut off mid-phrase. A shepherd's crook rests against the statue, inscribed 'finish what the flock forgot.'",
    solution: "The etched notation shows the first half of a simple, repeating four-note folk melody; a character with any musical training (or a successful Performance check) can recognize the melodic pattern and complete the final phrase by continuing the same interval pattern on the pipes. Playing the completed tune causes the statue's crook to swing aside, revealing a niche.",
    note: "Performance DC 13 to correctly intuit and play the missing notes (advantage if the character has proficiency with any instrument or the Music package background). A wrong note just produces a sour honk with no other consequence, and can be attempted as many times as needed. Reward: a small clay ocarina that, once per day, can calm one beast or animal automatically (DM's discretion on exact mechanics, similar to a limited-use calm emotions on animals only)."
  },
  {
    title: "The Rememberer's Cards",
    prompt: "A dusty table holds sixteen carved wooden tiles laid face down in a 4x4 grid inside an old sage's study, each stamped with a rune. A tin sign propped nearby reads: 'Eight pairs, eight truths. Fail twice more than you succeed, and the study's wards will notice.'",
    solution: "Another matching-pairs memory puzzle, larger than most (eight pairs among sixteen tiles). Unlike the smaller Reliquary of Pairs, this one has a real cost for excessive failure: the sign's warning is literal.",
    note: "No roll needed to attempt (or Intelligence DC 12 per flip if the DM wants to abstract memory), but track mismatches: after the number of failed flips exceeds successful matches by more than 2, the study's wards trigger a minor shock (1d4 force damage to whoever is flipping tiles) and the grid reshuffles itself, forcing the party to restart their mental map. This creates real risk for careless guessing rather than being purely tension-free. Reward: completing all eight pairs opens a drawer with a scroll of a 2nd-level spell of the DM's choice."
  },
  {
    title: "The Drummer's Count",
    prompt: "In a ceremonial war-room, a cracked drum sits before a mural of tribal warriors dancing in a ring, and a faded caption beneath reads: 'Three for the chief, five for the hunt, two for the harvest, and the circle is closed.' A locked weapon case sits against the far wall.",
    solution: "The caption gives a rhythmic beat-count sequence: strike the drum 3 times, then 5 times, then 2 times, in that order without extra beats in between, mimicking a ceremonial drumroll. Performing the beat pattern correctly causes the weapon case to unlatch.",
    note: "No roll needed if a player just literally counts out the beats as instructed; Investigation DC 10 if they need help realizing the caption is instructional rather than decorative. Miscounting the beats does nothing but require starting the pattern over from the first count of three, fully safe. Reward: the case holds a well-preserved ceremonial spear (treat as a masterwork spear, or a +1 weapon at the DM's discretion for higher-power games)."
  },
  {
    title: "The Sunlit Window",
    prompt: "A stained-glass window in a ruined chapel is missing several of its colored panes, replaced with plain glass, while a row of colored gems sits in a box below, unset. A verse etched into the sill reads: 'Red for the dawn, gold for the noon, blue for the dusk, and violet alone for the moon, in the order the sky wears them.'",
    solution: "The verse gives the color order directly: red, gold, blue, violet, matching dawn to moon. Setting the loose gems into the empty panes in that left-to-right (or bottom-to-top, matching the window's layout) order causes the window to blaze with colored light and open a wall panel beneath it when the sun (or a torch held behind it) shines through.",
    note: "No roll needed if the party reads the verse; Investigation DC 10 otherwise to notice the verse is meant to be read as instructions. Setting a gem into the wrong pane does nothing but require moving it to the correct one, entirely reversible. Reward: one of the gems turns out to be a genuine violet garnet worth 50 gp in addition to completing the puzzle."
  },
  {
    title: "The Dancer's Diagram",
    prompt: "A ballroom floor in a haunted manor is inlaid with a spiral of numbered tiles, and a faded dance instruction card framed on the wall shows a diagram of footprint pairs numbered 1 through 8, mapping out a formal dance's steps across the spiral.",
    solution: "The party must walk the numbered tiles in the exact order shown on the framed diagram (1 through 8), effectively performing the dance's footwork across the floor. Completing the full sequence in order causes the chandelier overhead to lower on its chain, revealing a hidden compartment in its base.",
    note: "No roll needed for a careful, deliberate walk matching the diagram; Investigation DC 10 if the party is rushing and needs a nudge to notice the numbers correspond to floor tiles. Stepping out of sequence causes the tile to sink an inch with a groan and reset the whole spiral, requiring the party to start the sequence over, but with no damage or trap. Reward: the compartment holds a pair of dancing slippers that grant advantage on Acrobatics checks to avoid falling prone."
  },
  {
    title: "The Candlelit Zodiac",
    prompt: "Twelve unlit candles ring a circular table in an astrologer's tower, each set beside a different zodiac-like symbol carved into the wood. A star chart pinned to the wall highlights four of the twelve symbols in a faint constellation shape, connected by drawn lines in a specific order the chart labels with small numbers.",
    solution: "The chart's numbered lines indicate the order to light exactly those four highlighted candles: for example, the Ram, then the Scales, then the Serpent, then the Lantern (DM can substitute specific symbols to match the dungeon's theme). Lighting only those four, in that order, and leaving the other eight dark, causes the table's center to rise into a small crystal orb display.",
    note: "Arcana or Investigation DC 14 to correctly trace the numbered constellation lines on the chart. Lighting an extra or wrong candle causes all lit candles to snuff out at once, resetting the attempt with no other consequence — a clean, repeatable puzzle. Reward: the orb display contains a shard of petrified starlight (usable as a spell component for any divination spell, or worth 40 gp to a collector)."
  },
  {
    title: "The Bell Tower Rhyme",
    prompt: "A child's rhyme is carved crudely into the wall of a bell tower, clearly added long after the tower's construction: 'Pull the fat one, then the thin, then the cracked one joins right in, pull them wrong and you'll begin again, but pull the boomer last, my friend.' Four bell-ropes of different thickness hang from the ceiling, one visibly cracked near the top.",
    solution: "The rhyme gives the pull order directly: the fat rope, then the thin rope, then the cracked rope, and finally the largest/loudest rope (the 'boomer') last. Pulling them in that order rings the bells in a specific chime that causes the tower's floor grate to release.",
    note: "No roll needed to follow the rhyme literally; Investigation DC 10 if the party dismisses it as mere decoration and needs a nudge that it's a real clue. Pulling ropes out of order causes the bells to clang discordantly and the rhyme's carving to glow faintly red, resetting the sequence, no harm done. Reward: a small bag of 25 gp in old offering coins found in the grate below."
  },
  {
    title: "The Incense Procession",
    prompt: "Six small censers sit unlit around a meditation chamber, each carved with a different flower. A wall fresco, badly faded but still legible in patches, shows robed figures carrying censers in a procession, walking past the flowers of a garden in a particular blooming order across the seasons.",
    solution: "The fresco shows the procession passing flowers in their natural spring-to-winter blooming order: crocus, tulip, rose, sunflower, chrysanthemum, and finally a winter-blooming flower like hellebore. Lighting the six censers in that seasonal order fills the room with layered incense smoke that coalesces into a glowing doorway.",
    note: "Nature or Investigation DC 13 to correctly reconstruct the blooming order, especially useful if a player has any gardening or herbalism background for advantage. Lighting censers out of order just produces mismatched, faintly unpleasant smoke with no other effect, freely correctable by snuffing and relighting. Reward: a sprig of preserved hellebore usable as a rare spell component, or worth 25 gp to an alchemist."
  },
  {
    title: "The Crest of Generations",
    prompt: "A family crest is carved into a puzzle box lid, showing four generations of a noble house arranged not by birth order but seemingly at random. A genealogy scroll found elsewhere in the room lists the family's actual birth order, along with a note that 'the box remembers only the true order of blood.'",
    solution: "The party must cross-reference the genealogy scroll against the crest's carved portraits (which are visually similar but subtly different per generation) to determine the true birth order, then press the four portraits on the box in that order to unlock it.",
    note: "Investigation DC 14 to match scroll names to carved portraits accurately (harder than most because the portraits look similar at a glance). Pressing portraits in the wrong order causes the box to click shut tighter and requires a DC 10 Strength check to pry back open for another attempt, a mild but real cost for careless guessing. Reward: the box contains a set of matched signet rings worth 80 gp total, and a strong roleplay hook tying to the family's current descendants."
  },
  {
    title: "The Mirror Chant",
    prompt: "A spectral choirmaster in a ruined amphitheater sings a short four-note phrase, then gestures for the party to answer. When they attempt a response, he seems to want it echoed back not forward, but in reverse, cocking his head expectantly at their first attempt.",
    solution: "The choirmaster is teaching a call-and-response where the correct answer is his phrase played in reverse order (e.g., if he sings low-high-low-mid, the party must respond mid-low-high-low). Any means of producing the notes works — humming, a found instrument, or even ordered bell-pulls elsewhere in the amphitheater. Getting the reversed phrase right causes him to nod and fade, leaving behind a glowing sigil on the stage floor.",
    note: "Performance DC 13 to correctly reverse and reproduce the phrase (advantage for a bard or anyone with a good ear cued by roleplay). A wrong response just makes him tilt his head sadly and repeat the original phrase patiently, no penalty for retries. Reward: the sigil, once touched, grants one character advantage on their next Performance or Persuasion check."
  },
  {
    title: "The Pipe Organ's Breath",
    prompt: "A massive pipe organ dominates a cathedral's ruined nave, several of its pipes visibly broken or missing. A hymnal open on the bench shows a simple rising-then-falling melody, and a note in the margin, in a different hand, warns: 'Play it wrong twice more than right, and the bellows will burst.'",
    solution: "The hymnal shows a melody that rises in pitch across the first half then falls back down in the second half (e.g., low, mid, high, high, mid, low). Playing the working pipes in that rising-falling pattern (skipping the broken pipes automatically, since they don't sound) completes the hymn and opens the choir loft's hidden stair.",
    note: "Performance DC 13 to play the correct pattern on an unfamiliar organ; DC lowered to 10 with proficiency in keyboard instruments if the DM allows it. Unlike most sequence puzzles here, wrong attempts genuinely accumulate: after the second wrong attempt beyond correct ones, the old bellows rupture, dealing 2d6 bludgeoning/thunder damage to whoever is at the keys and disabling the organ until repaired (DC 15 Tinker's Tools or smith's tools check, or simply finding another way through). Reward: completing it correctly reveals a hidden reliquary with a scroll of a 3rd-level spell."
  },
  {
    title: "The Phases of the Vault",
    prompt: "A domed ceiling above a circular vault is carved with eight moon phases in a ring, and eight small levers are set into the floor beneath, each aligned under one carved phase. A worn brass plate at the room's edge simply reads: 'Waxing opens what waning conceals.'",
    solution: "The plate hints that only the four waxing phases (new moon toward full moon) need to be pulled, in the order they appear around the ring moving toward fullness, while the four waning phase levers should be left untouched. Pulling the four correct levers in ascending order of moon fullness unseals the vault door.",
    note: "Astronomy is not a standard skill, so allow Nature or Investigation DC 13 to correctly identify which four carved phases represent 'waxing' and their correct order. Pulling a waning-phase lever by mistake causes a soft chime and that lever alone resets, no broader penalty, letting players correct course easily. Reward: the vault holds a small telescope of the far seer (functions as a spyglass with an added benefit of once/day advantage on a Perception check made at long range, DM's discretion on exact wording)."
  },
  {
    title: "The Growing Chorus",
    prompt: "Five glass orbs are set into an arch above a locked archive door, each one dark. As the party approaches, the leftmost orb flickers once and dims. The archivist ghost drifting nearby murmurs, 'Answer the chorus, and let it grow, or start again from long ago.'",
    solution: "This is a growing Simon-Says: the orbs flash a sequence that starts at length 1 and adds one more flash each time the party successfully repeats it back (by touching the orbs in order), building up to a final sequence of all five in a specific order. Successfully repeating the full five-orb sequence unlocks the archive door.",
    note: "No roll, purely a memory challenge (consider letting a player write down the sequence out of character as it grows, since tracking an audibly-described growing sequence is harder at the table than seeing it). The ghost's warning is literal: any wrong touch resets the sequence all the way back to a single flash, a real but non-damaging cost that punishes carelessness on longer chains. Reward: the archive holds a stack of preserved maps and a scroll of the DM's choice, appropriate to the campaign's next destination."
  }
];
const MORAL_PUZZLES = [
  {
    title: "The Twin Sentinels",
    prompt: "Two identical stone golems flank a sealed archway, one carved with a sun and one with a moon. A plaque reads: 'One of us always speaks truth. One of us always lies. You may ask exactly two questions total, to either or both of us, before the arch judges your worthiness.' The golems will answer any question, not just yes/no ones.",
    solution: "There's no single required phrasing. The 'textbook' solve is asking one golem what the other would say and inverting it, but reward ANY approach that demonstrates the players understood the logic trap — asking each golem to describe the other, asking a golem to point at the correct door, asking a question whose answer is the same regardless of who's lying ('Is stone heavier than water?' as a calibration question first), or even just picking a golem and building a case with the DM for why their reasoning was sound even if imperfect. The arch should open for good-faith logical effort, not just the 'optimal' formula.",
    note: "No roll required — this is a logic/roleplay puzzle. If the party is stuck after real effort, allow an Insight check (DC 13) on a re-ask to notice a golem's mouth doesn't move in sync with 'lying' answers, giving a hint. Failure to solve doesn't need to be fatal — have the arch simply stay shut and reset the golems' patience, costing a short rest's worth of time."
  },
  {
    title: "The Weeping Altar",
    prompt: "A basin of black water sits at the heart of a shrine. Runes around the rim read: 'Give up something you cannot replace, and the door beyond will open. The water will not accept coin, nor anything you do not truly value.' The basin seems to know the difference.",
    solution: "There is no 'trick' item — the puzzle is meant to make the players genuinely debate what they're willing to lose. Valid sacrifices include a sentimental keepsake, a magic item's charge, a spell slot burned permanently for the session, a point of a stat drained temporarily, or even a vow/promise the character must now honor (DM tracks it as a roleplay hook). The basin should reject anything offered cynically (a coin, a torch) with a ripple of refusal, but accept the first thing offered with real reluctance.",
    note: "No check needed to know the basin is testing sincerity — that's given in the prompt. If the party tries to trick it (offering something fake or valueless while claiming otherwise), call for a Deception check opposed by a flat DC 16 'insight' from the shrine; failure causes the basin to flood the room ankle-deep and lock the door for 1 hour. Reward: whatever lies beyond should feel worth the loss — a permanent magic item is fitting."
  },
  {
    title: "Two Claims on the Orchard",
    prompt: "A dryad blocks the party's path through her grove, furious. A traveling farmer nearby claims the dryad's trees were planted on his family's deeded land three generations ago and he has starving tenants to feed this winter. The dryad says the grove existed a thousand years before any deed and that cutting even one branch kills part of her. Both want the party to judge, or at least to leave siding with one.",
    solution: "Deliberately no 'correct' verdict. Good resolutions include: brokering a compromise (the farmer harvests deadfall/windfall only, the dryad allows one grove edge to be cleared), the party paying or working off the farmer's debt so he doesn't need the land, exposing that the deed itself is forged or outdated (only if players investigate), or simply picking a side and living with the NPC's reaction. The scene should reward listening and creative compromise over 'winning' an argument.",
    note: "Persuasion or Insight checks (DC 13-15) can reveal each party's genuine desperation/attachment rather than greed, deepening sympathy either way. If the party ignores both and leaves, have the conflict escalate offscreen (grove burned, or farmer's family driven off) as a consequence they hear about later. Reward for a real compromise: the dryad's blessing (advantage on saves vs. poison in her grove) or the farmer's lasting gratitude (a standing discount/ally in town)."
  },
  {
    title: "The Honest Door",
    prompt: "A plain wooden door with no visible lock bars a hallway. A small brass plate reads: 'Only those who answer truly may pass. What do you seek?' Players may be primed by earlier riddles in the dungeon to expect a trick — there isn't one.",
    solution: "The door opens for literally any honest answer, spoken with sincerity — 'treasure,' 'to save my friend,' 'I don't know, I'm just following the others.' The puzzle IS that there's no puzzle: it punishes players who try to game it with a 'clever' lie or an overthought riddle-answer instead of just answering the question asked. If someone answers dishonestly, the DM should know (via a subtle tell) but let it play out.",
    note: "No roll needed for a truthful answer — it simply opens. If a player answers with a deliberate lie, the door stays shut and a soft chime repeats the question once more, gently signaling 'try again, honestly' rather than punishing. This is a good palate-cleanser puzzle to place after a genuinely tricky one, so keep the reward modest but pleasant — a rest alcove or a minor blessing."
  },
  {
    title: "The Sphinx Who Asks What You Love",
    prompt: "A sphinx reclining atop a ruined library asks each party member in turn, 'What do you love most, and why does it matter?' She is not looking for a specific answer — she is judging the sincerity and self-knowledge in the reply. Refusing to answer, or giving a flippant non-answer, visibly disappoints her.",
    solution: "Every genuine answer should 'work' differently — the sphinx grants a boon tailored to what was shared (a character who says 'my sister' might get a vision of the sister's safety; one who says 'gold' might get an honest but cutting remark from the sphinx about it, plus a smaller reward). This is about character development, not a pass/fail gate. Let players roleplay their answers and treat all sincere answers as valid solutions with different flavors of reward.",
    note: "No check needed to answer, but an Insight check (DC 14) by the sphinx (rolled by the DM, secretly) determines whether she believes the answer is sincere. A dodge or lie gets a lukewarm, minor blessing instead of a strong one — not punishment, just a lesser reward. Consider giving mechanical boons like a single reroll token, temporary hit points, or a clue to a later puzzle."
  },
  {
    title: "The Weighing of the Deed",
    prompt: "In a tomb shaped like a judge's chamber, a spectral arbiter tells one party member: 'Before you pass, confess the worst thing you have ever done, in your own words. I will know if you lie.' The other spectators (rest of the party) must wait outside a veil of shadow and cannot hear the confession — only see the arbiter's reaction.",
    solution: "The 'solution' is simply an honest, personal confession from the player — the DM should let this be genuinely improvised roleplay, even if the character's confession is mundane. This works whether the character confesses something dark (a killing, a betrayal) or something small but personally shameful (cowardice, abandoning a friend). The point is vulnerability, not severity.",
    note: "This should not use dice — it's a pure roleplay checkpoint. If a player is uncomfortable improvising a confession, let them describe it in the third person or keep it vague ('something involving my brother') and have the arbiter accept that as sufficient. On refusal to engage at all, the arbiter simply denies passage and the party must find another route (a longer, trap-filled side passage) — a complication, not a hard stop."
  },
  {
    title: "Grum's Fair Trade",
    prompt: "A jittery goblin peddler named Grum sets up a rickety stall in the middle of a corridor, blocking the way, insisting the party 'simply must' buy something before passing. He lies constantly and shamelessly about his wares' value and origin, but by an old goblin custom he's bound by, he cannot refuse a truly fair trade once one is offered.",
    solution: "There's no fixed 'correct' item to trade — the puzzle rewards players who actually negotiate and offer something Grum would find fair (which might be junk to them but precious to a goblin, like a shiny button, a joke well-told, or a story). Deception, Persuasion, or even honest haggling all work. The fun is in watching Grum squirm as his own rule forces him to accept a deal he doesn't want.",
    note: "Persuasion or Deception check DC 12 to get Grum to name a 'fair' price at all (he stalls otherwise); DC 15 to talk him down further. On a failed haggle, Grum still lets them pass but 'accidentally' pickpockets a minor item as they go by. A charmingly worthless trinket from Grum can double as a future plot hook or comic relief item."
  },
  {
    title: "The Door That Just Wants to Be Told It Did a Good Job",
    prompt: "A heavy iron door, animated with a crude carved face, refuses to open, grumbling that 'nobody appreciates a good door anymore' after centuries standing guard alone. It won't respond to force, threats, or magic — only to being genuinely and specifically complimented on its craftsmanship, service, or the fine job it's doing standing there.",
    solution: "Any sincere, specific compliment works — praising its hinges, its patience, its carving, its dedication to the job. Generic flattery ('nice door') gets a lukewarm response; specific, creative compliments delight it. This is a pure comedy beat with no wrong answer as long as the players engage in good faith.",
    note: "Persuasion check DC 10 for a generic compliment (door opens slowly, grudgingly), DC 15 for a genuinely creative one is not even necessary — let good roleplay auto-succeed and reserve the roll only if players try to fake it insincerely. Failure/insincerity makes the door slam shut and sulk for 10 minutes before trying again. A fun, low-stakes puzzle to lighten the mood."
  },
  {
    title: "One Life, One River",
    prompt: "The party reaches a swift river mid-crossing when disaster strikes: a village child has been swept downstream on one side, and an unconscious party member is sinking on the other, both roughly equidistant and both about to be lost in seconds. There is time to save only one before the current sweeps them past the rocks.",
    solution: "No correct answer is intended — this is a genuine no-win choice meant to provoke real table discussion and consequence, not a puzzle with a hidden 'save both' solution (though a sufficiently creative plan, like a rope thrown to one while someone dives for the other, should be allowed if players think of it and can back it with checks). Whatever they choose, let it land emotionally and follow up on it later (grief, gratitude, a grudge from a bereaved family).",
    note: "If the party attempts to save both, require two separate checks (e.g., Athletics DC 16 and DC 16, made by two different characters simultaneously) — succeeding at both is possible but should feel like a genuine long shot. Failing either means that target is lost. This is a heavy scene; use sparingly and telegraph consequences honestly rather than fudging them."
  },
  {
    title: "The Beggar and the Bureaucrat",
    prompt: "At the city gate, a starving beggar begs the party for coin to feed her children, while a stern toll clerk insists that giving to beggars at the gate is against city law and that reporting her will earn the party a reward and the clerk's favor for later business. Both watch the party's decision closely.",
    solution: "No single right answer — giving the beggar coin, reporting her for the reward, quietly slipping her money out of the clerk's sight, arguing with the clerk on her behalf, or ignoring both are all valid and should shape how NPCs treat the party later (the clerk's faction vs. the city's poor). Reward roleplay commitment over any 'optimal' choice.",
    note: "Insight DC 12 reveals the beggar is telling the truth about her children (she is). Persuasion DC 14 can get the clerk to look the other way if the party wants to help her without consequence. There's no wrong mechanical choice — but track the reputation consequence (a favor owed to the clerk's faction, or goodwill with the city's underclass) for future scenes."
  },
  {
    title: "The Vow-Bound Prisoner",
    prompt: "A bound prisoner in a dungeon cell claims to have been wrongly imprisoned and begs the party to free her, swearing on everything she holds sacred that she's innocent. The jailer, absent but leaving a note, insists she's a dangerous poisoner awaiting trial and warns not to trust anything she says.",
    solution: "Both could be telling a version of the truth (she might be guilty of a lesser crime than accused, or innocent of THIS crime but guilty of another), and the DM should be prepared to reveal whichever backstory best serves the campaign rather than treating this as a logic puzzle with a hidden 'gotcha' answer. Freeing her, leaving her, or investigating further before deciding are all legitimate paths.",
    note: "Insight check DC 15 gets a read on her sincerity (make the roll mean something regardless of her actual guilt — a skilled liar can still read as sincere). Investigation DC 13 elsewhere in the dungeon can turn up evidence supporting or complicating either story. If freed and she's guilty, that's an interesting complication, not a punishment for 'wrong' play — let it develop into a new plot thread."
  },
  {
    title: "The Boastful Throne",
    prompt: "An ancient throne room tests visitors with a floating crown that only settles on the head of someone who first admits, aloud, to a genuine failure or weakness — the room's magic detects false humility instantly and mocks it with hollow echoing laughter.",
    solution: "Any sincere admission of weakness or failure works, regardless of severity — a character can confess a battle they lost, a fear they carry, or a skill they lack. The point is genuine humility, not competitive one-upping of trauma. Multiple party members can attempt it if the first is rejected.",
    note: "No roll for a sincere confession — it should simply work through roleplay. If a player tries to fake humility with an obviously boastful 'failure' ('my only weakness is I'm too generous'), the room's magic calls it out with laughter and the crown refuses, costing the party a few minutes and some pride but nothing dangerous. Reward: the crown grants a minor boon (advantage on the next Persuasion or Leadership-type check) to whoever earns it."
  },
  {
    title: "The Ferryman's Real Price",
    prompt: "A silent ferryman waits at an underground river, willing to carry the party across, but his toll is unusual: he asks each passenger to name aloud one memory they would be willing to lose forever in exchange for safe passage. He will not take coin, and he will not be rushed.",
    solution: "This is meant to unsettle rather than be solved cleverly — genuine engagement (naming a real memory, even a small one, and roleplaying the moment of loss) is the intended path. A party that finds another way across entirely (levitation, a bridge upstream, a different guide) has also 'solved' it by avoiding the toll, and that should be allowed and even quietly rewarded for cleverness.",
    note: "No check required if players engage honestly — treat the 'lost memory' as a light, reversible roleplay flourish (a detail their character can no longer quite recall) rather than a mechanical stat loss, unless your table wants higher stakes. If they find an alternate route, that's a valid win — consider a Perception or Investigation DC 14 to spot the alternate path in the first place."
  },
  {
    title: "The Grieving Ghost of the Miller",
    prompt: "The spirit of a drowned miller haunts his old mill, refusing to let the party pass until 'someone finally admits what happened to me was wrong.' He was drowned by the village decades ago over a false accusation of theft, and he wants acknowledgment, not vengeance — though he's been alone so long he's forgotten how to tell the difference.",
    solution: "There's no puzzle-box answer — the resolution is roleplay: the party investigating enough to learn his story (or simply taking his word for it) and then sincerely acknowledging the wrong done to him. This can be done through a heartfelt apology on the village's behalf, a promise to clear his name/tell his story, or a small ritual of remembrance. Force (destroying the ghost) is also a valid, if darker, resolution some tables may choose.",
    note: "Investigation or History checks around the mill (DC 13) can uncover his story to make the acknowledgment feel earned rather than guessed. Persuasion/Insight aren't strictly required, but a DC 15 Persuasion check can shortcut the scene if players want to speed-run a heartfelt speech. Reward: the ghost's blessing (removes a curse on the mill, or grants a keepsake he was buried with) once he's finally at peace."
  },
  {
    title: "The Guard Who Offers to Look Away",
    prompt: "A tired city guard blocking a restricted archive quietly offers the party a deal: for a modest bribe, he'll 'step away for his break' and let them through without a report. He seems almost relieved to be asked — like he's done this before and it eases his conscience about being underpaid.",
    solution: "No trick here — bribing him works exactly as offered, and so does refusing and finding a legitimate way past (talking your way in, showing credentials, coming back with permission). The interesting choice is what it says about the party, and whether the guard remembers the favor (or the refusal) later.",
    note: "Persuasion or Deception DC 12 if the party wants to talk him into a bigger favor than just looking away (e.g., providing a cover story too). No roll needed for a straightforward bribe. If the party reports him instead of bribing him, that's also valid — it could earn official favor but cost them an ally later. Track this as a minor reputation thread."
  },
  {
    title: "The Grove That Gives to Givers",
    prompt: "A small woodland shrine holds a wishing pool that grants requests, but its water visibly dims each time someone asks for something without first leaving an offering. A carved sign, half-worn, seems to say something about generosity coming before asking.",
    solution: "The 'trick,' such as it is, is straightforward and not meant to be a gotcha: give something before asking, and the wish is granted more fully; ask first, and it's granted weakly or not at all. This rewards generosity as a value rather than testing logic — let players who give something meaningful (not just a coin) get a noticeably better outcome, and treat it as a values statement rather than a mechanical formula to be min-maxed.",
    note: "No check needed — action (giving first) determines outcome. A token offering (a copper coin) grants a minor, flavorful wish; a meaningful offering (a treasured item, real effort) grants something mechanically useful (a temporary buff, a clue, a minor magic trinket). This can be revisited later in the campaign as a recurring shrine."
  },
  {
    title: "The Pie Judged by Greed",
    prompt: "A jolly, slightly unhinged pastry spirit challenges the party to an eating contest for a magic pie, but reveals mid-bite that the pie punishes gluttony — each additional slice eaten purely out of greed (rather than hunger or politeness) causes mild, comedic magical side effects (the eater's voice becomes squeaky, their hair turns pie-crust gold, etc.).",
    solution: "This is a comedic riff on a values test — a character who takes one modest slice and stops is 'rewarded' with a clean, useful minor magic effect from the pie, while a character who gorges themselves for the fun of it gets increasingly silly curses. There's no wrong choice, just different flavors of consequence — let greedy players enjoy the chaos rather than treating it as a failure state.",
    note: "Constitution save DC 10 per extra slice beyond the first to avoid a new comedic side effect (all effects fade after a long rest, purely cosmetic/harmless). No roll needed for a single polite slice. Good comic-relief encounter to break tension after a heavy scene."
  },
  {
    title: "The Beast Who Begs for Its Cub",
    prompt: "Mid-fight with a monstrous but clearly intelligent predator guarding its den, the creature suddenly breaks and flees toward a hidden alcove, snarling not in challenge but in desperation — inside are two small cubs. Cornered, it turns to face the party, placing itself between them and its young, clearly ready to die rather than retreat further.",
    solution: "Killing it, sparing it (letting it and its cubs go, perhaps in exchange for it ceding the territory or a treasure it's guarding), or even taking the cubs as a bargaining chip are all valid, morally loaded choices with no 'correct' answer built in. Consider having the choice echo later — a spared beast might aid the party in a future encounter, or a slain one's cubs might be found and raised by someone else entirely.",
    note: "An Animal Handling or Insight check DC 13 can reveal the creature would stand down permanently if the party backs off from the den, avoiding further combat. No check is needed to simply choose mercy or violence outright. Reward for sparing it: a future ally or a guide through its territory; reward for defeating it: whatever treasure it was guarding."
  },
  {
    title: "The Merchant's Missing Ring",
    prompt: "A merchant loudly accuses a ragged street child of stealing her ring right in front of the party, demanding they search the child or hand over 'justice' themselves. The child tearfully denies it, insisting they were just asking for spare coin. A small crowd is starting to gather and wants the party to act.",
    solution: "There's no built-in 'gotcha' — this can go multiple ways depending on investigation: the child may be innocent (the ring was dropped and lost, or someone else took it), guilty (desperate and telling a half-truth), or the merchant may even be lying to cause a scene. The DM should decide the 'truth' based on what makes the best story for this table rather than there being one hidden objectively correct outcome, and should let the party's approach (search, defend, pay the merchant off, investigate) shape the resolution.",
    note: "Investigation DC 12 finds the ring nearby if it was simply dropped; Insight DC 14 on either party gives a read on sincerity. If the party can't or don't investigate, a snap judgment (paying the merchant, or shielding the child) is equally valid — just have it affect reputation with the crowd/local watch afterward."
  },
  {
    title: "The Statue That Only Answers Once",
    prompt: "A weathered statue of a robed elder stands at a crossroads shrine, and a plaque explains it will answer exactly one honest question from the party — any question at all — but only if asked with genuine need, not idle curiosity. It seems to know the difference.",
    solution: "There's no logic trick — the intended solve is simply for the party to think carefully and ask something that actually matters to them (a real unanswered question in the campaign), rather than trying to game the wording for maximum info. Reward earnest, big-picture questions over 'gotcha' phrasing attempts; the statue can even refuse to answer a question asked purely to exploit its wording, gently redirecting the party.",
    note: "No roll needed for a sincere question — the DM should simply answer honestly and usefully, treating this as a free, guaranteed clue toward the campaign's next step. If the party wastes it on something trivial or manipulative, the statue answers literally and unhelpfully, and that's a fair, self-inflicted consequence rather than something to punish further."
  }
];
const COOPERATIVE_PUZZLES = [
  {
    title: "The Split Ledger",
    prompt: "The party is physically divided (DM should send subgroups to separate real-world spaces or have them cover their character sheets/notes from each other). Players in the EAST chamber see a stone wall carved with a grid of unlabeled symbols — no numbers, no key, nothing to translate them. Players in the WEST chamber find a leather ledger mapping each symbol to a number, but its pages are bound in reverse order (page 12 first, page 1 last) and must be read back-to-front to make sense. Neither group can see the other's material.",
    solution: "The west group must realize their ledger reads backwards and relay the symbol-to-number key verbally to the east group, who then apply it to the wall to spell out a numeric code (for a door, a lever sequence, or a lock). Success requires both groups describing what they see out loud to each other rather than one group just being told 'the answer.'",
    note: "No roll needed if communication is genuine and thorough. If a group tries to shortcut by describing vaguely, add an Intelligence (Investigation) check DC 13 to catch a misread symbol. On failure to catch a misread, the wrong code is entered and triggers a minor trap (a dart trap, DC 13 Dex save, 1d6 damage) rather than a hard lockout — the party can simply try again after."
  },
  {
    title: "The Bound and the Blind",
    prompt: "One player is blindfolded and has their ears plugged/muffled for this scene (they can only feel and grope). Seated at a table, they alone can physically handle a set of small carved wooden tiles with raised bumps and grooves — the rest of the party can see the tiles' visual side (painted symbols) but are not allowed to touch them. The blindfolded player must describe the shapes and textures they feel; the sighted players must describe the colors/symbols they see, without either side seeing/feeling the other's information.",
    solution: "The tiles form pairs — a texture (felt) matches a specific painted symbol (seen) — but only when both descriptions are compared aloud can the party sort them correctly into a matching sequence for a locking mechanism. Neither role alone has enough information.",
    note: "No roll for correct communication. If the party rushes and mismatches a pair, allow it to simply be wrong and require redoing the sequence rather than a punishing trap — this puzzle is meant to be low-stakes and fun with the sensory role-play. A DC 12 group check (best of Perception/Investigation among the sighted players) can hurry things along if the table is stuck."
  },
  {
    title: "The Cleric's Glow and the Rogue's Grease",
    prompt: "In a single shared room, only a character who can sense magic (via Detect Magic, a Paladin's Divine Sense, or similar) can see that four of eight identical levers pulse faintly. Only a character proficient with thieves' tools or trained in mechanisms (a Rogue, Artificer, or similar) can see, on close inspection, that four of the levers (not necessarily the same four) show fine tool-marks indicating they're rigged to a hidden secondary mechanism.",
    solution: "The magically-sensitive character and the mechanically-skilled character must compare notes out loud: levers that are BOTH magical and mechanically rigged are safe to pull (the magic and the rigging cancel each other's trap function), while levers with only one property are dangerous. This only works if both players describe their findings to each other rather than acting on their own information alone.",
    note: "Detect Magic (or equivalent) reveals the magical levers automatically. Investigation DC 14 (rogue/artificer) reveals the rigged ones. Pulling a mismatched lever triggers a loud alarm (no damage, but summons a wandering monster or alerts nearby guards) rather than instant harm — a real complication, not a dead end."
  },
  {
    title: "The Twin Scrying Pools",
    prompt: "Two players are each shown a separate still pool of water (physically separate players, ideally in different rooms or with screens between them) reflecting the SAME ruined chamber, but at different points in time — one pool shows the chamber as it looked freshly ruined, the other shows it centuries later, overgrown and shifted. Neither player can see the other's pool.",
    solution: "By describing what they each see aloud — furniture positions, a fallen banner, a crack in the floor — the two players can spot what changed between the two time periods (an object moved, a passage collapsed and reopened elsewhere) and deduce the location of a hidden item or route that only makes sense by comparing 'before' and 'after.'",
    note: "No roll for the comparison itself if descriptions are thorough. If the players struggle to spot the difference from description alone, allow an Intelligence check DC 13 from either to nudge them toward the one key discrepancy. Reward: the discrepancy points to a hidden cache or shortcut past a later obstacle."
  },
  {
    title: "The Rope-Tug Code",
    prompt: "One player (or a small group) descends into a flooded, pitch-dark cistern alone and must communicate to the party waiting above via a rope tied to their waist — one tug, two tugs, a held tug, etc. — since shouting doesn't carry through the water and walls. The diver can feel underwater carvings and obstacles but cannot see or speak clearly; the surface team has a torn diagram of what the tug-code should mean but is missing the diagram's legend explaining which tug pattern means what.",
    solution: "The diver must feel out the shape of the submerged mechanism (a rotating valve, say) and report findings via an improvised or partially-known tug code, while the surface team, lacking the legend, must work out through trial and repetition (and the diver's patience) what each tug pattern is being used to mean. This rewards the two subgroups establishing their own working code live at the table, not decoding a pre-set answer.",
    note: "Athletics DC 12 for the diver to hold their breath/position long enough to work the mechanism; on failure, they must surface and try again (costing time, not harm, unless something else in the cistern is hunting — a good spot to add a mild environmental threat like a current or eel). No check needed for the communication puzzle itself — that's pure roleplay coordination."
  },
  {
    title: "The Silent Signer and the Deaf Listener",
    prompt: "One player is designated 'deafened' for the scene (cannot be told any spoken information, only shown gestures/mime by the DM or teammates) and stands before a large humming resonant chime-wall that vibrates in a pattern only they can feel through their hands. Another player, blindfolded, stands nearby and can hear the chime-wall's tones clearly but cannot see the deafened player's gestures. The rest of the party can see and hear everything and must relay between the two.",
    solution: "The deafened player feels a rhythm through touch and must mime it (taps, hand claps) for the sighted party members to observe; the blindfolded player hears a melody and must hum or describe it aloud. The party in the middle must realize the rhythm (felt) and the melody (heard) are two halves of the same tune and combine them, then relay the completed pattern back to whichever character needs to reproduce it (e.g., knocking a rhythm on a door).",
    note: "Performance or Intelligence check DC 13 to accurately reproduce the combined pattern back on the door/mechanism once figured out. Getting the pattern wrong causes the chime-wall to reset and the puzzle to restart (a time cost, not damage) — consider adding a slow-filling water hazard in the room for light urgency."
  },
  {
    title: "The Mirror-Shard Twins",
    prompt: "Two players are each given (physically, if possible — a card, token, or just described text privately) one jagged half of a broken enchanted mirror. Each half, held up, shows a reflection of a DIFFERENT hidden room elsewhere in the dungeon that neither player has physically visited — one shard shows a room with three unlit braziers, the other shows the same room's ceiling with a painted constellation. Neither player can see the other's half or the room in person yet.",
    solution: "By describing their separate reflections to each other and the party, the two players can deduce which real room the mirror is showing (matching landmarks) and figure out the correct order to light the braziers based on the constellation pattern shown only in the other shard — information from both halves is required to solve the brazier order once the party actually reaches that room.",
    note: "No roll for the description/comparison. Once in the actual room, lighting braziers in the wrong order (if the party guesses without comparing) causes a brief harmless flare and mild disorientation (disadvantage on the next check) rather than a hard fail — they can simply try again."
  },
  {
    title: "The Memory Relay",
    prompt: "Only one player may enter a strange chamber at a time (a magical ward limits it), and they have 60 real seconds to observe an elaborate room full of statues, symbols, and a lever bank before being magically ushered back out with their memory of small details already starting to fade. They must then describe what they saw to the rest of the party, who were waiting outside and saw nothing themselves, before sending the next player in for another 60-second look.",
    solution: "No single player retains the whole picture — the party must pool multiple relayed accounts (2-3 players taking turns entering and reporting back) to reconstruct the full room and solve the lever sequence together, cross-checking each other's memories for consistency and filling gaps.",
    note: "Have each entering player make a Wisdom (Perception) check DC 12 privately — on a low roll, have them misremember one small detail, creating a fun 'compare notes' moment where the party must reconcile conflicting reports. Getting the final lever sequence wrong triggers a loud but harmless magical chime and resets the room, costing time only."
  },
  {
    title: "The Pictogram and the Runebook",
    prompt: "One player, examining a mural, can only make out crude pictograms (a sun, a wave, a mountain, a blade) with no obvious meaning. A second player, browsing a nearby shelf, finds a dwarven runebook with translations for abstract runes (danger, safety, treasure, passage) but no pictures at all — and critically, half the runebook's pages are water-damaged and illegible, meaning that player is also missing information the first player might be able to fill in once they compare what they have.",
    solution: "Neither reference alone completes the puzzle. The party must physically bring the two players together (or relay descriptions if kept apart) to match remembered/described pictograms to runes, filling each other's gaps — the mural-reader can describe an image the runebook is missing translation for, while context from the runebook helps guess at pictograms whose meaning isn't obvious.",
    note: "Intelligence (Investigation or History) check DC 13 to make a confident final match once both sets of info are combined; without the check, allow the party to guess based on pure roleplay reasoning if their logic is sound. A wrong final guess triggers a minor curse or trap (e.g., a temporary -2 to one ability score until short rest) rather than anything severe."
  },
  {
    title: "The Upper and Lower Galleries",
    prompt: "The party splits across two levels of a chamber — those on the UPPER gallery look down through a lattice floor and see only shifting shadows and silhouettes cast by something moving below, with no clear detail. Those on the LOWER floor can see a bank of unlabeled levers and a mechanism clearly, but the room is too dark down there to see anything happening above or make sense of what the shadows might mean.",
    solution: "The upper group must describe the shape/movement of the shadows they see (which correspond to which lever is currently active/moving below); the lower group, unable to see their own mechanism's effect from outside, needs that shadow-description to know which lever does what before committing to a full sequence.",
    note: "No roll needed for the communication itself. A Perception check DC 12 from the upper group helps them describe shadows more precisely if the table is struggling. Pulling levers blind without waiting for upper-gallery feedback can trigger the mechanism jamming, requiring a Strength check DC 14 to free it before trying again."
  },
  {
    title: "The Two Watchtowers",
    prompt: "The party splits into two groups stationed in twin watchtowers on either side of a ravine, too far apart to hear normal speech (shouting only carries single words, not full sentences) but able to see each other and use improvised gestures/torches. One tower has a large stone dial with numbers that needs to be set to unlock a bridge; the other tower has a scroll listing the correct numbers but written in a code that references landmarks only visible from the FIRST tower's vantage point.",
    solution: "The scroll-holding group must relay the code (via gestures, torch-flashes, or single shouted words across the gap) while the dial-operating group cross-references it against landmarks only they can see, working together across the distance to determine and set the correct number.",
    note: "No roll for successful signaling if the players roleplay the gesture/shouting exchange in good faith. If the table wants added tension, require a DC 12 group Perception check to correctly interpret a torch-signal at long range; a failed read sets the wrong number, causing the bridge to partially collapse into a safe-but-annoying detour rather than a fall."
  },
  {
    title: "The Tasting Table",
    prompt: "One player, blindfolded, is seated before a row of small vials and must taste (or smell) each one and describe the flavor/scent aloud — sweet, bitter, smoky, floral, metallic. Another player has a chart correlating flavors to alchemical runes but has never smelled or tasted the vials themselves and cannot identify which vial is which without the first player's description.",
    solution: "The blindfolded taster's sensory descriptions must be matched live against the chart-holder's rune key to correctly identify and combine the right vials into a working reagent/antidote — this only works through back-and-forth description, not either player acting alone.",
    note: "Constitution save DC 10 for the taster if any vial is mildly unpleasant (no real harm, just a comedic grimace or minor disadvantage on their next check). Wrong combinations produce a harmless but pungent smoke cloud (heavily obscured area for 1 minute) rather than poison, keeping this puzzle low-stakes and fun."
  },
  {
    title: "The Chess Match by Touch",
    prompt: "One player, blindfolded, sits before a raised-relief game board and can only feel piece shapes and positions, relaying the board state aloud. The rest of the party can see a matching (but currently unlit/dark) board across the room and must move actual mechanism-pieces based solely on the blindfolded player's verbal description, without being able to see the reference board themselves.",
    solution: "This requires the blindfolded player to accurately describe positions (using a grid system they invent together, like 'left corner, three up') and the sighted players to trust and translate that into physical moves on their own board — success means recreating the winning configuration entirely through verbal relay.",
    note: "No roll needed if description is careful; if the party is rushing, add an Intelligence check DC 12 for the blindfolded player to keep track of the full board without losing count. A miscommunicated position simply requires backtracking a move or two, not a punishing reset."
  },
  {
    title: "The Deafened Drummer",
    prompt: "One player has their hearing 'removed' for the scene (DM mimes instructions instead of speaking to them, or they wear headphones/earplugs) and stands before a set of ceremonial drums, feeling vibrations through the floor that correspond to a rhythm elsewhere in the dungeon they cannot hear directly. The rest of the party, in an adjoining room, can hear a faint, repeating melody through the walls but has no way to physically interact with the drums themselves.",
    solution: "The hearing party members must hum or tap out the melody they can hear for the deafened player to see/feel (via visible tapping, not speech), and the deafened player then reproduces that rhythm on the drums by feel and sight alone — neither role can complete the puzzle without the other's input.",
    note: "Performance check DC 12 for whichever player attempts to physically reproduce the final rhythm on the drums. A slightly wrong rhythm causes the drums to simply fall silent and require a restart rather than any punishment — treat repeated attempts as a fun, low-stakes rhythm game at the table."
  },
  {
    title: "The Threefold Wall",
    prompt: "The party splits into three small groups, each shown a different third of a riddle carved onto a different wall in three separate side-chambers (physically separate players/notes). No group can see the other two-thirds. Each fragment alone is nonsensical; together they form a complete question whose answer opens the central vault.",
    solution: "The three groups must reconvene and read their fragments aloud in sequence (they'll need to figure out the correct order, which may itself require comparing details like matching rhyme or numbering carved subtly into each fragment) to reconstruct the full riddle, then answer it together.",
    note: "Intelligence (Investigation) check DC 12 to notice the small ordering marks on each fragment if the party is stuck on sequencing. Answering the completed riddle wrong once is a freebie (the vault simply hums and waits); a second wrong guess seals the vault for a full day, a real but non-punishing complication that can redirect the session."
  },
  {
    title: "The Star-Chart and the Sky",
    prompt: "One player is sent to an open rooftop or skylight alone and can see actual constellations overhead (described by the DM) but has no reference for what they mean. Another player, in a sealed archive room with no windows, has a detailed star-chart key explaining what each constellation shape signifies (a season, a direction, a warning) but cannot see the actual sky to know which constellations are currently visible.",
    solution: "The rooftop player must describe the star patterns they see; the archive player cross-references those descriptions against their chart to determine the significance (e.g., which direction to travel, or which of several doors corresponds to the current season) — solving it requires both perspectives combined.",
    note: "No roll for the core communication. A Nature or Survival check DC 13 from the rooftop observer can help them describe constellations more precisely if players struggle with the collaborative description. A wrong interpretation sends the party down a longer but survivable wrong path rather than causing direct harm."
  },
  {
    title: "The Feast Table Confession",
    prompt: "Two players are seated apart at a long banquet table with other (NPC) guests between them, unable to speak privately or leave their seats without causing a scene. Each has secretly been slipped a different half of a dinner invitation revealing a conspirator's identity — one half names a person, the other half names a deed — but reading either half aloud at the table would tip off the wrong people.",
    solution: "The two players must find a subtle, in-character way to communicate their halves without alerting the NPCs around them — passing a note, a coded toast, an excuse to swap seats, or simply speaking in a prearranged code the party invents on the spot — to piece together who did what before the feast ends.",
    note: "Deception or Sleight of Hand check DC 13 to pass information subtly without an NPC noticing; failure means a nearby guest overhears a fragment, creating a fun complication (the guest reacts oddly, or later gossips about what they half-heard) rather than blowing the whole scene."
  },
  {
    title: "The Two Halves of the Ward",
    prompt: "The party splits into two groups on opposite sides of a warded double door that can only be opened from both sides simultaneously. Group A sees a puzzle-lock requiring a sequence of colored gems to be pressed; Group B, on the other side, sees a mirror-image lock but with the gem colors scrambled differently, and critically, a small inscription explaining that 'what one side presses, the other must press in reverse order' — information Group A does not have.",
    solution: "Group B must relay their inscription's rule to Group A, and then both groups must coordinate in real time — Group A pressing gems in one order while Group B presses the mirrored sequence in reverse — requiring constant back-and-forth communication (shouted through the door, or via a small grate) to stay synchronized.",
    note: "No roll needed if the groups coordinate well; if they rush without full communication, allow a DC 13 group check (average across both sides) to catch a timing mismatch. A failed sync causes the door to give a small shock (1d4 damage, no save) to whoever's touching it and reset — a minor sting, not a real setback."
  },
  {
    title: "The Puppet and the Puppeteer",
    prompt: "One player is blindfolded and must physically navigate a room full of pressure-sensitive floor tiles (some safe, some triggering minor alarms) using only verbal directions ('two steps left, one forward') called out by the rest of the party, who can see the tile pattern clearly from a safe vantage point but cannot enter the room themselves without setting off the same tiles.",
    solution: "This is a straightforward but tension-filled directional relay — the sighted party must give precise, careful directions and the blindfolded player must follow them exactly and communicate back what they feel underfoot, catching any miscommunication before a wrong step is taken.",
    note: "No roll needed for correct directions given carefully. A rushed or vague direction can be adjudicated with a DC 12 group Perception/Investigation check to have the sighted group double-check their own callout before it's acted on. A wrong tile triggers a loud alarm (summons a wandering patrol) rather than direct damage — a real complication that adds urgency without ending the scene."
  },
  {
    title: "The Scent and the Sketch",
    prompt: "One player, led through a smoke-filled corridor, can only describe what they smell (charred wood, lavender, brimstone, rain) as clues to which of several unmarked doors is safe. Another player, waiting at the junction with a torn sketchbook page, has crude drawings of each door labeled only with scent-words in a shorthand they don't fully understand without more context.",
    solution: "The smoke-walker's real-time descriptions must be cross-referenced against the sketchbook's scent-labels by the second player to identify which door matches which drawing (and therefore which door is safe versus trapped), requiring the two to communicate rather than either acting on partial information alone.",
    note: "Constitution save DC 10 for the smoke-walker to avoid a coughing fit that garbles their next description (fun complication, not harmful). Investigation DC 12 for the sketchbook-holder to make sense of their own shorthand notes if the table gets stuck. Picking the wrong door triggers a harmless soot explosion (everyone nearby is comically blackened, no damage) rather than a real trap."
  }
];
const CHARACTER_GATED_PUZZLES = [
  {
    title: "The Cant on the Wall",
    prompt: "Scrawled crudely among ordinary graffiti in a thieves' den hideout, a series of symbols and chalk marks looks like meaningless vandalism to most eyes, but hides directions to a hidden cache behind a false brick.",
    solution: "A character fluent in Thieves' Cant reads it instantly as a standard warning-and-directions marking system, pointing straight to the loose brick. Without that fluency, it just looks like nonsense scrawl.",
    note: "Gate: Thieves' Cant (Rogue, or any character/background with it). Fallback for parties without it: an Intelligence (Investigation) check DC 16 to notice the marks aren't random and slowly puzzle out a pattern by comparing them to other known cant markings elsewhere in the dungeon (representing hours of careful comparison) — or simply searching every brick by hand (10 minutes, 1-in-6 chance per attempt of triggering a minor alarm rune). Reward: a small hidden stash (gold, a minor magic item, or a map fragment)."
  },
  {
    title: "The Mural That Isn't There",
    prompt: "A stretch of corridor wall looks blank and unremarkable in torchlight, but the moment all light sources are extinguished, faint luminescent paint reveals a detailed mural depicting the layout of the vault two floors below.",
    solution: "Any character with darkvision automatically perceives the glowing mural once the torches are out, since darkvision lets them see in the resulting darkness while the mural's faint glow becomes visible contrast. Characters without darkvision are simply blind in the dark and see nothing.",
    note: "Gate: Darkvision (Dwarves, Elves, Half-Orcs, Tieflings, Gnomes, and others). Fallback for an all-human/non-darkvision party: casting Darkvision (or borrowing it from a familiar/ally), or using a very dim light source (a single candle, or covered lantern) plus a Perception check DC 15 to make out the faint glow without washing it out with too much light. Reward: advance knowledge of the vault's trap layout, granting advantage on the first trap-related check down there."
  },
  {
    title: "The Song the Statue Remembers",
    prompt: "A stone statue of a long-dead bard holds a lute that will only animate and open a hidden compartment in its base if someone plays the correct melody — a specific, unusual tune etched faintly into the statue's plinth in musical notation.",
    solution: "A character proficient with a musical instrument (or with Performance as their gated skill for an instrument they carry) can read the notation and replicate the melody accurately on their own instrument, triggering the compartment. An unpracticed attempt produces a passable but flawed tune that doesn't quite work.",
    note: "Gate: proficiency with a musical instrument / Performance. Fallback: a character without musical proficiency can attempt it with disadvantage on a Performance check (DC 15), or spend an hour of in-game practice first to remove the disadvantage, or have a proficient character coach them (granting advantage instead). Reward: the compartment holds a minor magic item tied to music (e.g., a charm that grants advantage on the next Performance-based check)."
  },
  {
    title: "The Chest With No Visible Lock",
    prompt: "An iron-bound chest sits in the open, apparently unlocked, but any attempt to lift the lid without first disabling a nearly invisible trigger plate beneath the hinges releases a cloud of sleep-inducing spores.",
    solution: "A Rogue (or any character with Expertise in Investigation or a high passive Perception) notices the almost imperceptible seam of the trigger plate on close inspection and can disable it with thieves' tools before opening the chest safely.",
    note: "Gate: Rogue Expertise / high Investigation or Perception. Fallback: any character can attempt a flat Investigation check DC 18 to spot the trigger without expertise, or simply open the chest blind and make a group Constitution save DC 13 to resist the sleep spores (unconscious for 1 minute, no lasting harm, but noisy and vulnerable). Reward: whatever treasure the chest holds, undiminished either way — the gate only affects whether the party takes the spore hit."
  },
  {
    title: "The Fox That Knows the Way",
    prompt: "A small, unnervingly patient fox has been trailing the party through a maze of ruined hedgerows, occasionally chittering and darting toward one path over another, clearly trying to communicate something it knows about the safe route.",
    solution: "A character who casts Speak with Animals (or has an innate ability to communicate with beasts, like a Ranger's companion bond or a Druid's Wild Shape empathy) can simply ask the fox, which will happily explain the safe path and warn of a nearby pit trap in exchange for a bit of food.",
    note: "Gate: Speak with Animals spell (or equivalent). Fallback: without it, a character can attempt an Animal Handling check DC 15 to interpret the fox's body language well enough to follow its general direction (not full detail — they'll still need a Perception check DC 13 to spot the pit trap themselves). Reward: a faster, safer route through the maze, or a following animal companion for the rest of the dungeon if treated kindly."
  },
  {
    title: "The Row of Identical Idols",
    prompt: "Twelve identical stone idols line a hallway, and legend (or a helpfully ominous plaque) says only one is truly enchanted and will react if touched correctly, while the other eleven are inert decoys — visually indistinguishable from one another.",
    solution: "A character who casts Detect Magic instantly sees which idol radiates an aura, saving significant time and risk. Without it, the party must resort to trial and error or careful physical inspection.",
    note: "Gate: Detect Magic spell (or an item/ability that senses magic, like a Paladin's Divine Sense for divine auras). Fallback: an Investigation check DC 16 per idol (tedious but doable) to spot subtly different wear patterns on the true idol's base, or simply touching each idol in turn and making a Dexterity save DC 12 to avoid a minor jolt of magical feedback (1d4 damage) from the eleven decoys before finding the real one. Reward: the true idol yields a minor blessing or unlocks a hidden passage."
  },
  {
    title: "The Inscription in a Dead Tongue",
    prompt: "An ancient stone tablet is covered in flowing script no one in the party recognizes, but it's clearly instructions of some kind — possibly the key to disarming the guardian construct standing silent nearby.",
    solution: "A character who casts Comprehend Languages (or has a racial/background trait granting broad language comprehension) reads the tablet immediately and learns the construct's shutdown phrase.",
    note: "Gate: Comprehend Languages spell or similar. Fallback: the party can seek out a scholar or linguist NPC back in town (costing time and possibly a fee), or attempt a slow Intelligence (History) check DC 18 to puzzle out enough of the script through comparative linguistics (representing a long, careful study session, at least 1 hour in-game). Reward: knowing the shutdown phrase avoids a dangerous fight with the guardian construct entirely."
  },
  {
    title: "The Grate Too Small",
    prompt: "A narrow ventilation grate leads to a shortcut past a sealed portcullis, but the opening is barely a foot and a half wide — plainly too small for most adventurers to squeeze through, no matter how they contort.",
    solution: "A Small-sized character (Halfling, Gnome, or similar) fits through with relative ease, popping out the other side to open the portcullis manually for the rest of the party.",
    note: "Gate: Small size (Halfling, Gnome, or a Medium character under a size-reduction effect). Fallback: a Reduce spell (or similar effect) shrinks a Medium character to fit; alternatively, the party can find the long way around (extra time, likely another encounter) or attempt to force the portcullis open directly with a Strength check DC 20 (or DC 15 with proper tools/leverage like a crowbar). Reward: the shortcut saves significant time and bypasses whatever guards or hazards the long way holds."
  },
  {
    title: "The Sheer Cliff Face",
    prompt: "A smooth, near-vertical cliff face rises above a chasm, with a small ledge visible near the top holding a glinting object, but there are no obvious handholds for most climbers.",
    solution: "A character with an innate climbing speed (Tabaxi, certain other races, or a Barbarian/Monk with relevant features) scales the cliff quickly and safely, retrieving the object without much difficulty.",
    note: "Gate: innate climbing speed. Fallback: any character can attempt the climb with rope and pitons via a Strength (Athletics) check DC 17 (reduced to DC 13 with proper climbing gear), with a fall (1d6 per 10 feet, capped reasonably) as the consequence of failure rather than instant death — or the party can find another route with a Perception check DC 14 to spot a longer but safer path. Reward: the object is a minor magic item or a useful map fragment visible only from that ledge."
  },
  {
    title: "The Seam in the Stonework",
    prompt: "A section of dungeon wall looks like solid, unremarkable stone to most, but conceals a secret door blended seamlessly into the natural rock — the kind of craftsmanship only a keen eye for stonework would ever catch.",
    solution: "A Dwarf (with Stonecunning) automatically notices the unnatural seam and slightly-too-perfect joins in the stonework, recognizing it as worked stone rather than natural rock, and can locate the trigger mechanism easily.",
    note: "Gate: Dwarf Stonecunning (or similar stone-sense trait). Fallback: a non-Dwarf character can attempt an Investigation or Perception check DC 17 to notice the same details without the racial bonus, or simply search the wall systematically (10 minutes per 10-foot section) for a passive chance to notice it. Reward: the secret door leads to a shortcut or a hidden treasure room bypassing a guarded route."
  },
  {
    title: "The Beguiling Whisper",
    prompt: "A spectral guardian in an enchanted garden speaks in a hypnotic, honeyed voice, attempting to charm whoever listens into wandering off a cliff edge 'to see something beautiful.' Its magic is subtle and insidious.",
    solution: "A character with Fey Ancestry (Elves, Half-Elves) or another form of charm immunity/advantage shrugs off the effect entirely or resists it easily, and can then warn/protect the rest of the party from the guardian's influence.",
    note: "Gate: Fey Ancestry or charm resistance/immunity. Fallback: any character can attempt a Wisdom saving throw DC 15 against the charm effect; on a failure, they begin walking toward the cliff edge but a party member can attempt a Strength check DC 10 to physically restrain them (no damage, just a scare) before real danger. Reward: safely dealing with the guardian reveals a peaceful garden shrine and a minor restorative boon."
  },
  {
    title: "The Clockwork Puzzle-Box",
    prompt: "A intricate brass puzzle-box, covered in tiny interlocking gears and dials, is rumored to contain a valuable component inside — but its mechanism is far more delicate and complex than a simple lock, clearly built by a master tinkerer.",
    solution: "A character with tinker's tools proficiency (Gnomes, Artificers, or anyone trained) can methodically work through the gear sequence, understanding the mechanical logic well enough to open it safely and without damaging the contents.",
    note: "Gate: tinker's tools proficiency / Artificer-type expertise. Fallback: without proficiency, a character can attempt an Intelligence (Investigation) check DC 17 to reason through the mechanism by trial and observation, or simply force the box open with a Strength check DC 15 — success still gets the contents, but a forced opening has a 50% chance of slightly damaging whatever's inside (reducing a magic item's charges by one, for example). Reward: a valuable clockwork component or small magic item."
  },
  {
    title: "The Boulder-Sealed Passage",
    prompt: "A massive boulder blocks a narrow passage, clearly too heavy for ordinary effort to move — but scorch marks and old rope fragments nearby suggest others have tried and failed before the party arrived.",
    solution: "A character with exceptional raw strength (a raging Barbarian, or anyone benefiting from a strength-boosting feature/spell) can shove the boulder aside with a single mighty effort, especially if raging removes the need for a particularly high roll.",
    note: "Gate: high Strength / Barbarian Rage or similar. Fallback: the party can rig a pulley-and-lever system (requiring rope, a sturdy branch or pole, and an hour of setup) to reduce the effective DC, or have multiple characters combine efforts on a group Strength check DC 20 (each contributing, with the highest roller leading). Reward: the passage leads to a shortcut or an unlooted side-chamber."
  },
  {
    title: "The Chasm of Uncertain Footing",
    prompt: "A wide chasm splits the dungeon corridor, its far ledge crumbling and uneven, with no clear way across except a running leap that would challenge even a skilled athlete — and a fall means a long drop onto jagged rocks below.",
    solution: "A Monk (with their enhanced jump distance and Slow Fall feature as a safety net) crosses with relative ease and confidence, able to recover gracefully even from a stumble.",
    note: "Gate: Monk class features (jump distance / Slow Fall) or similar mobility feature. Fallback: any character can attempt a Strength (Athletics) check DC 15 to make the jump, with a failed check resulting in a fall arrested by a rope tied off beforehand (if the party thinks to prepare one) — otherwise 2d6 fall damage and a Dexterity save DC 13 to avoid injuring an ankle (disadvantage on movement-related checks for the next hour). A Feather Fall or Jump spell also trivializes the crossing. Reward: the far side holds a shrine or cache inaccessible any other way."
  },
  {
    title: "The Pit With No Bridge",
    prompt: "A deep pit separates the party from a lever on a small central pillar rising from its depths, with no visible bridge, stair, or rope — just open air between the party and their goal.",
    solution: "A character capable of flight (Aarakocra, a Fly spell, a broom or magic item) simply flies over, pulls the lever, and returns without needing to solve the pit at all.",
    note: "Gate: flight (racial or spell). Fallback: the party can rig a rope-and-grapple crossing (Athletics DC 14 to secure the throw, then DC 12 to traverse), or use a Spider Climb / Feather Fall combination if available, or find a longer stair passage elsewhere in the dungeon (extra time, likely another minor encounter). Reward: the lever opens a shortcut door, saving significant backtracking."
  },
  {
    title: "The Trial of Endurance",
    prompt: "An ancient trial chamber floods with searing steam and demands whoever stands within endure its punishing heat for several long minutes without flinching or fleeing, as a test of resolve before a sealed door will open.",
    solution: "A character with exceptional constitution or an endurance-related racial trait (like a Half-Orc's Relentless Endurance, or simply a very high Constitution save) can outlast the trial with relative ease, enduring the punishment that would fell a less hardy soul.",
    note: "Gate: high Constitution / endurance traits. Fallback: any character can attempt the trial with a Constitution saving throw DC 16 each minute (up to 3 rounds), taking 1d8 fire damage on each failure but not being ejected unless they choose to flee; alternatively, the party can share the burden by having multiple characters take shorter turns, or use Resistance to fire (a spell or potion) to trivialize it. Reward: the sealed door opens to reveal a trial-reward chamber with a magic item suited to fortitude (e.g., a ring of Constitution-related benefit)."
  },
  {
    title: "The Grate Too Narrow for Boots",
    prompt: "A tight, twisting drainage tunnel offers a shortcut beneath a guarded checkpoint, but it's barely wide enough for a large housecat to squeeze through — plainly impassable for anyone in their normal form.",
    solution: "A Druid using Wild Shape to become a small animal (a rat, weasel, or similar) can slip through easily, scout ahead, and potentially unlock or unbar the door on the far side from the inside.",
    note: "Gate: Druid Wild Shape (small form) or a Find Familiar-type scouting option. Fallback: without Wild Shape, the party can send a purchased/summoned small creature (a hired guide's ferret, a Tiny familiar from another class, or a captured local critter) through instead, or bypass the checkpoint entirely with a Stealth-focused approach (group Stealth check DC 15) past the guards. Reward: bypassing the checkpoint avoids a difficult guard encounter entirely."
  },
  {
    title: "The Room of Absolute Dark",
    prompt: "A chamber is filled with unnatural, magical darkness that swallows even normal darkvision, leaving most parties completely blind and disoriented as something unseen shuffles nearby.",
    solution: "A character with an ability to see through magical darkness (a Warlock's Devil's Sight invocation, or similar) can navigate and act normally in the room, spotting the threat and guiding the rest of the party or dealing with it directly.",
    note: "Gate: Devil's Sight (Warlock invocation) or equivalent magical darkness-piercing sight. Fallback: the party can retreat and use a Daylight spell or similar to counter the magical darkness (if available), or navigate blind via careful, slow movement (half speed, Perception checks DC 15 to avoid bumping hazards) while relying on hearing and touch. Reward: whatever lurks in the dark is dealt with (or avoided) without a dangerous blind melee."
  },
  {
    title: "The Forgotten Ritual Circle",
    prompt: "A dormant ritual circle glows faintly on the floor of a temple chamber, clearly still active in some way, and touching it carelessly risks triggering an effect no one currently understands.",
    solution: "A character proficient in Religion or History (or a Cleric/Paladin with relevant domain knowledge) recognizes the ritual's purpose and safe activation method from its iconography, allowing the party to use or disarm it correctly.",
    note: "Gate: History or Religion proficiency. Fallback: without proficiency, the party can spend time researching (an hour with a relevant book, if one's available, or consulting an NPC scholar back in town), or simply test the circle cautiously — stepping on an edge tile first and making a Wisdom saving throw DC 13 to resist a minor disorienting effect (no lasting harm) before understanding it through trial and error. Reward: safe use of the circle grants a blessing, teleportation shortcut, or reveals hidden lore relevant to the campaign."
  },
  {
    title: "The Mirror of Many Faces",
    prompt: "A hall of illusions presents the party with what appears to be five identical robed figures, one of which is a genuine fiendish infiltrator and the rest harmless magical projections — all outwardly indistinguishable.",
    solution: "A Paladin using Divine Sense immediately detects the presence of the one genuine fiend among the illusions, cutting straight through the deception without needing to interact with any of them directly.",
    note: "Gate: Paladin's Divine Sense (or similar fiend/undead detection). Fallback: without it, the party can attempt to interact with each figure — illusions won't respond consistently to touch or complex questions (Investigation check DC 14 per figure to notice inconsistent reactions), or the party can simply attack all five (illusions harmlessly wink out when struck, wasting a turn but revealing the real target). Reward: identifying the fiend quickly avoids a drawn-out fight against illusions wasting the party's resources."
  }
];
const ILLUSION_PUZZLES = [
  {
    title: "The Wrong-Way Shadows",
    prompt: "Torches line both walls of this corridor, burning steady and yellow — but every shadow they throw, including your own, leans toward the north wall no matter where you stand. At the far end, a sunlit archway seems to open onto a garden beyond. The light from it never flickers with the torches.",
    solution: "The archway is a Silent Image (or similar minor illusion) masking solid stone; the real exit is a section of the north wall that looks blank but conceals a door. The illusion-caster never accounted for the room's actual light sources, so every shadow in the room — including the party's — is being pulled unnaturally toward the wall that's hiding something, instead of falling naturally away from the torches. The garden light also never wavers, unlike true torchlight.",
    note: "Investigation or Perception DC 13 to consciously clock the shadow inconsistency; anyone who says they're checking how the shadows fall gets it free. Walking into the fake archway just means walking into a wall (no damage, a faint mocking laugh). Reward: a small gem cache or a spell scroll behind the real door."
  },
  {
    title: "The Room That Echoes Bigger",
    prompt: "This chamber is small — you can cross it in six steps — but when you speak, your voice comes back off the walls a half-second too late, like it's bouncing through a much larger space. A single flat wall of undressed stone shows no seams, cracks, or mortar lines anywhere.",
    solution: "The 'small chamber' is itself an illusion (a Silent Image or similar magical overlay) laid across the entrance of a genuinely much larger vault beyond. The echo timing is the one thing the illusion doesn't fake, because it's a passive magical effect over sight, not sound — the true acoustics of the real, larger space leak through. Touching or pushing through the flat wall reveals it's not there at all.",
    note: "Perception DC 12 to notice the echo doesn't match the room's apparent size (a character with the Search action or who claps/shouts to test the room gets advantage). Walking confidently at the wall passes through harmlessly; walking timidly just bonks a nose. Reward: the true vault beyond holds the session's next tier of loot."
  },
  {
    title: "The Painted Door",
    prompt: "At the end of a dead-end hallway is a heavy iron-banded door, perfectly detailed down to the rust streaks and a keyhole — except it never opens, no matter what key or spell you try. Nearby, a much plainer stretch of bare wall has a single faint smudge of a footprint on the floor in front of it, as if someone stood there recently and simply vanished.",
    solution: "The 'iron door' is a masterwork trompe l'oeil mural, painted with such care that even the rust looks three-dimensional — but it's flat, and no amount of magic opens a door that was never a door. The real secret door is the plain wall with the footprint in front of it; the smudge is a genuine physical clue (someone used it recently) rather than anything magical.",
    note: "Investigation DC 14 to notice the painted door has no shadow gap under it and doesn't sound hollow when knocked on, versus the plain wall which does. Spending several minutes fruitlessly trying to pick/force the painted door just wastes time (maybe triggers a random encounter check). Reward: the hidden door leads to a supply cache or shortcut past a guarded area."
  },
  {
    title: "The Almost-Repeating Floor",
    prompt: "The floor of this hall is tiled in a checkered spiral pattern that seems to repeat every few feet — but a careful look shows one row near the middle is subtly off, the spiral's curve breaking and restarting a half-inch out of alignment before continuing as if nothing happened.",
    solution: "The misaligned row marks the safe path across a floor that is otherwise rigged with pressure plates keyed to the 'correct' spiral pattern. Whoever built this trap assumed no one would notice a tiling flaw; the row where the pattern breaks is the only line of tiles NOT wired to the trap, because the mason had to leave it as a maintenance access seam.",
    note: "Investigation DC 15 to spot the misalignment without being told to look for it; DC 10 if a player specifically says they're studying the floor pattern. Stepping on a live tile triggers a loud but non-lethal alarm-chime trap (no damage, alerts nearby monsters) rather than anything deadly. Reward: minor treasure in an alcove past the hall, plus avoiding the encounter the alarm would have caused."
  },
  {
    title: "The Hall of Mirrors",
    prompt: "This octagonal chamber is lined floor to ceiling with age-spotted mirrors, multiplying your torchlight into a dizzying maze of reflections. Somewhere among the eight mirrored walls is the actual exit corridor, but every panel looks identical at a glance. One reflection, if you look closely, never quite matches your movements.",
    solution: "One of the eight 'mirrors' is not a mirror at all but an open corridor dressed with a painted frame and glass-effect lacquer to blend in; forced perspective and the dazzle of the real mirrors around it hide the difference. The giveaway is that the false mirror's 'reflection' doesn't perfectly mirror the party's motion — a step forward doesn't bring the reflected party proportionally closer the way it does in the true mirrors.",
    note: "Perception DC 14, or automatic if a player tosses a coin/pebble at each panel and listens for the one that doesn't ring like glass. Walking into a true mirror just means a bruised nose and a wasted round. Reward: nothing fancy needed here — getting through efficiently avoids a wandering monster check."
  },
  {
    title: "The Backward Stair",
    prompt: "A spiral staircase corkscrews downward into darkness. Descending feels ordinary enough, but any character who turns around to go back up finds the stairs somehow leading further down instead, no matter how many turns they climb.",
    solution: "The staircase is built with a masonic trick used by paranoid architects: the steps are subtly wedge-shaped and the spiral's pitch is engineered so that walking 'up' the way you came actually continues you further along the same downward spiral, just from a different visual angle — there is no magic involved, only architecture. The only way to actually reverse course is to count steps aloud and physically retrace the exact number climbed, moving in exact lockstep rather than trusting your sense of 'up'.",
    note: "Investigation DC 13 to realize the stair keeps a suspiciously constant width and pitch that never varies as a real staircase's would over multiple flights. A wrong attempt just costs time and a few extra levels of pointless descent, not damage. Reward: none required — this is a pacing/navigation puzzle, but a side passage near the bottom can hold a minor cache as a consolation for the trouble."
  },
  {
    title: "The Glittering Vault",
    prompt: "Through an open doorway you see a small chamber heaped with gold coins, spilling almost to the threshold. It gleams invitingly in your torchlight. To one side, nearly hidden behind a support pillar, sits a plain, unremarkable wooden chest with a simple clasp.",
    solution: "The gold pile is a Major Image (or similar) illusion draped over a floor rigged to collapse into a spike pit the instant real weight is put on it — the trap-makers wanted the obvious, greedy choice to be the lethal one. The genuine treasure, considerably more modest looking, is in the plain wooden chest, which nobody bothers to loot on their way to the 'real' prize.",
    note: "Investigation or Insight DC 13 — the gold pile never shifts, clinks, or catches light exactly the way loose coin should, and no coins have spilled onto the floor outside the doorway despite the overflowing pile. Stepping onto the illusory gold triggers a fall onto a padded/net-lined pit below rather than spikes if you want a softer consequence (DM's call on lethality) — recommend 2d6 falling damage and a Strength check to climb out, not instant death. Reward: the plain chest holds real, if modest, treasure — reward the players who checked it first."
  },
  {
    title: "The Guide Who Forgot",
    prompt: "The frightened prisoner you freed two rooms back has been leading you confidently through the twisting passages, insisting she knows this place 'like the back of her hand' — but when you ask her a simple question about the room you just left, her answer doesn't match what you actually saw there.",
    solution: "'She' is a doppelganger, or an illusion/disguise spell cast by something that wants the party led deeper into a trap, and it doesn't actually have perfect knowledge of the dungeon — it's improvising based on what it can observe of the party's reactions. The mismatch between her claimed familiarity and her actual, slightly-wrong recall is the tell.",
    note: "Insight DC 14 to catch the inconsistency in her story, or automatic if a player directly cross-examines her about a specific detail from an earlier room. If unmasked, she panics and either flees or attacks rather than being an unbeatable threat — treat as a normal doppelganger/spy encounter, not an ambush kill. Reward: information about the dungeon's real layout, pried from her before she flees, or her employer's identity."
  },
  {
    title: "The Blind Gallery",
    prompt: "The moment you enter this long gallery, your torches gutter out and refuse to relight — the darkness here is absolute and unnatural. As you stand still, you notice the space doesn't feel empty: your own breathing and footsteps come back to you off close walls in some directions, and off open air in others.",
    solution: "The room is under a permanent magical darkness effect, but it's a straightforward navigation puzzle solvable by sound alone: clapping, tapping a staff, or speaking and listening to the echo reveals which directions are open passage and which are solid wall, guiding the party to the true exit without sight. There is no visual solution to find here — leaning on Perception (sight) instead of the room's actual sonic cues is the trap.",
    note: "Perception DC 12 (using hearing, not sight — call this out if a player insists on trying to see) to map the room by sound within a few rounds. A wrong turn just means bumping into a wall and having to reorient, no damage. Reward: a hidden alcove partway through the gallery, findable only by noticing a spot where echoes come back oddly hollow, containing a small magic item."
  },
  {
    title: "The Wall of Cold Fire",
    prompt: "A wall of orange flame roars silently across the corridor ahead, licking at the ceiling and radiating a flickering orange glow across your faces — but as you get closer, you realize you feel no heat at all, even standing right beside it.",
    solution: "The fire is a Major Image illusion (sound suppressed or simply flavor-omitted by the caster) meant to bar the corridor to anyone who doesn't investigate closely; it has no substance and can be walked straight through. It exists purely to turn back parties who don't test what's actually in front of them.",
    note: "Investigation DC 10 for anyone who gets within 10 feet and pays attention to the lack of heat, crackling sound, or smoke smell — this one should be easy to catch if players engage with their senses at all. Walking through does nothing but look silly in front of the flames. Reward: none required, but consider a short passage of story/lore revealed on the far side that justified guarding it in the first place."
  },
  {
    title: "The Silent Statues",
    prompt: "A colonnade of a dozen identical stone guardians lines this hall, each carved mid-stride with a raised spear. Your torchlight throws long shadows from most of them across the floor — but one, near the hall's center, casts no shadow at all.",
    solution: "Eleven of the statues are ordinary stone; the twelfth is a real, animated guardian (or a creature disguised as a statue) that the illusion of 'just another statue' relies on around it, but true stone always casts a shadow and this one, being a creature rather than an object under the room's lighting rules, subtly doesn't — or its shadow flickers independently when it shifts weight, however slightly, waiting to strike.",
    note: "Perception DC 15 to notice the missing/wrong shadow before it acts; alternatively the guardian gets a surprise round against anyone who walks past it without noticing. Frame the guardian as a warning/gatekeeper rather than an assassin — it can be reasoned with, bypassed with the right token or password, or fought as a normal encounter rather than an ambush kill. Reward: the guardian, once dealt with or satisfied, permits passage to a warded chamber beyond."
  },
  {
    title: "The Twin Doors",
    prompt: "Two identical oak doors stand side by side at the corridor's end, both banded in the same tarnished bronze, both slightly ajar. A thin ribbon tied to a wall sconce between them flutters gently — but only toward one of the two doors.",
    solution: "One door is a Silent Image dressing an actual dead-end alcove (a trap meant to waste time or trigger a nearby ambush), and the other leads onward. The fluttering ribbon reveals which door has real air moving through it from the passage beyond — illusions don't generate airflow, so the door the ribbon leans toward is the true one.",
    note: "Investigation DC 11 to notice the ribbon's consistent lean, or automatic if a player thinks to test airflow (a held-up feather, licked finger, or lit match works too). Opening the false door just reveals a shallow illusory alcove, wasting a round, sometimes with a minor trap or noise-maker set to alert nearby monsters. Reward: efficient choice avoids the wandering monster check tied to the wasted time."
  },
  {
    title: "The Portrait That Speaks",
    prompt: "A life-sized portrait of a stern old wizard hangs in this study, and as you approach, its painted lips move, greeting you by name and offering cryptic warnings about the dungeon ahead. Its voice seems to come from everywhere in the room at once, oddly.",
    solution: "The portrait itself is inert; the voice is being thrown via ventriloquism or a speaking tube by someone (a hidden servant, spy, or minor spellcaster) concealed behind the wall or in an adjoining room, watching through the portrait's eyeholes. The 'voice from everywhere' is the tell — a truly animated or magically speaking portrait would have its voice clearly originate from the painting, not diffuse oddly through the room.",
    note: "Insight or Investigation DC 13 to notice the voice's source doesn't quite track to the painting's mouth, or DC 15 Perception to hear faint shuffling/breathing behind the wall during a pause in the 'portrait's' speech. If confronted, the hidden speaker is a normal NPC (informant, spy, bored apprentice) rather than a monster — this is a roleplay/information encounter, not a fight. Reward: whatever information or bargain the hidden speaker is willing to offer once caught."
  },
  {
    title: "The Mirror Pool",
    prompt: "A still, circular pool of dark water sits in the center of this round chamber. Looking into it, you see your own reflection standing in a room that looks almost right — except the reflected room has a second doorway on its far wall that isn't anywhere in the actual room around you.",
    solution: "The pool is enchanted to show the room's true, unconcealed layout rather than a normal reflection; the extra doorway visible in the water is real, hidden behind an illusory wall panel in the actual room that the party can't see just by looking around normally. Checking the pool's reflection is the intended (and fair) way to spot the hidden exit.",
    note: "No check needed if a player looks into the pool and describes examining the reflection carefully; otherwise Perception DC 12 to notice the reflection doesn't quite match the room. There's no failure state here beyond not noticing — the pool is calm and non-hazardous. Reward: the hidden door leads to the chamber's real prize, rather than the pool being a red herring."
  },
  {
    title: "The Leaning Candle Flames",
    prompt: "A row of identical candle sconces lines this hallway, each flame burning straight and still except for two, near a section of blank wall, which lean consistently toward that wall as if pulled by an unseen draft.",
    solution: "The leaning flames are being pulled by air moving through a hidden door or passage behind that section of wall — a purely physical, mundane clue rather than anything magical, easily missed by parties who don't pay attention to their surroundings once they've decided a stretch of hallway is 'nothing.'",
    note: "Perception DC 11 to notice the leaning flames, especially if a player says they're checking the candles or torches as they pass. There's no punishment for missing it — the party simply continues on and may need to backtrack later. Reward: a shortcut or bypass around a later obstacle, if found."
  },
  {
    title: "The Bridge That Isn't Broken",
    prompt: "A stone bridge spans a deep chasm ahead, but halfway across, a wide gap yawns where the bridge appears to have crumbled away entirely, stone chunks visibly tumbled into the darkness below. There's no way across... except the wind doesn't seem to be blowing through the gap the way it should for an open chasm.",
    solution: "The gap is a Major Image illusion over a perfectly intact section of bridge, designed to make cautious parties turn back or waste resources finding another way around. The mismatch between the visual 'open chasm' and the lack of expected wind, echo, or falling debris sound is the fair clue that it isn't real.",
    note: "Investigation or Perception DC 13 to notice the sensory mismatch; alternatively, tossing a pebble into the 'gap' and hearing it clatter on solid stone rather than falling is an easy, player-generated solution worth rewarding automatically. Refusing to cross costs time (and possibly a wandering monster check) but nothing worse. Reward: crossing directly saves significant time versus finding an alternate route."
  },
  {
    title: "The Tunnel That Caved In",
    prompt: "The passage ahead is choked with rubble, ceiling beams sagging, dust still hanging in the air as if the collapse just happened — yet your torch flame doesn't flicker or dim in the supposedly dust-thick air, and no new dust settles on your boots as you approach.",
    solution: "The 'cave-in' is an illusion meant to turn parties back toward a different, trapped route the dungeon's builders actually wanted intruders to take. The absence of dust in the air affecting torchlight or settling on the party is the tell — real settling dust from a fresh collapse would be thick enough to see drifting and would coat anything that walked through it.",
    note: "Investigation DC 14, or automatic for a player who explicitly tests the rubble by touch (their hand passes through, or the debris feels wrong/insubstantial). Wasting time trying to dig through triggers a wandering monster check but nothing worse. Reward: bypassing it also means bypassing whatever trap the illusion was steering the party toward instead."
  },
  {
    title: "The Weeping Prisoner",
    prompt: "Chained in an alcove, a ragged figure begs for release, sobbing that they've been trapped here for weeks and know a safe way out if you'll just free them. Their story is compelling and their fear seems genuine — but they cast no reflection in the small puddle of water pooling near their chains.",
    solution: "The 'prisoner' is a hag, fey, or other shapechanging predator using an illusory guise to lure the party into freeing and trusting it, at which point it leads them into a genuine trap or attacks once vulnerable. The missing reflection is a classic, fair tell for illusion/glamour magic. The real prisoner, if there is one, is elsewhere in the dungeon and can be found through other clues.",
    note: "Perception DC 15 to notice the missing reflection, or Insight DC 13 if the character presses the 'prisoner' with pointed questions that don't quite add up. If unmasked before being freed, the creature can flee or negotiate rather than immediately fighting — don't make this an automatic ambush. Reward: information about the dungeon (if talked down) or standard treasure if defeated."
  },
  {
    title: "The Endless Hallway Mural",
    prompt: "This hallway seems to stretch on and on, torch-lit sconces receding into the distance — but as you walk, the far end never seems to get any closer, and the sconces never actually flicker or cast new shadows as you pass them.",
    solution: "The 'continuing hallway' beyond a certain point is a forced-perspective mural painted directly onto a flat end wall, expertly shrinking in scale to fool the eye at a glance. The real exit is a side door, easy to miss because attention is drawn forward down the false corridor rather than to the sides.",
    note: "Investigation DC 13 to notice the sconces never actually illuminate anything as the party 'passes' them, or to notice brushstrokes up close once within a few feet of the wall. No danger in walking into it beyond a bruised pride. Reward: the true side door, once found, leads onward without further delay — a time-saved reward is enough here."
  },
  {
    title: "The Hum in the Floor",
    prompt: "Thick, unnatural fog fills this low chamber, reducing visibility to a few feet in any direction. Standing still, you can feel a faint, rhythmic vibration through the soles of your boots, coming from somewhere beneath the floor.",
    solution: "Visibility is deliberately useless here — the room is meant to be solved by touch. The vibration leads to a hidden floor panel concealing a lever or mechanism (tied to a nearby water wheel, bellows, or clockwork device) that, when found and pulled, clears the fog or opens the true exit. Players relying only on sight-based checks will flounder; those who describe feeling along the floor succeed.",
    note: "No roll needed if a player explicitly gets down and feels along the floor for the vibration's source; otherwise Perception DC 14 (allow advantage for anyone kneeling or crawling). Wasting time swinging blindly at fog does nothing but waste a round. Reward: the mechanism, once triggered, also disarms a minor trap elsewhere tied to the same fog generator."
  }
];
const TIMELOOP_PUZZLES = [
  {
    title: "The Pendulum Corridor",
    prompt: "Three massive stone pendulums swing across this corridor at staggered intervals, blunted enough not to be lethal but heavy enough to knock a person flat. Watching for a full cycle reveals the rhythm — but it takes patience to time a run all the way through.",
    solution: "The pendulums swing on a fixed, unchanging rhythm (suggest an 18-second cycle with a 4-second safe gap for each). Getting struck simply knocks the character prone and slides them back to the corridor's entrance — no damage, just a reset. Players who count beats or assign someone to watch and call timing can pass safely once they've observed one full cycle.",
    note: "Reward Investigation/Perception DC 10 checks with an early read on the pattern, but let any party simply watching for a full cycle figure it out without rolling. Getting hit deals no damage (or trivial 1 HP for the sting) and resets the character to the entrance; other party members' progress is unaffected. Reward: a small cache of alchemical supplies in a niche near the corridor's midpoint, only reachable by pausing there mid-pattern."
  },
  {
    title: "The Watching Statues",
    prompt: "Stone sentries line this gallery, spears crossed to bar the way — but each time you look away, or so it seems, their positions have subtly shifted, as if they only move when unobserved. Getting caught mid-motion by a returning gaze causes the nearest statue to seize the offender and hurl them bodily back to the gallery entrance.",
    solution: "The statues genuinely only move when no one is looking directly at them (magically animated, tied to line of sight rather than distance). The party must coordinate so someone is always watching a given statue while others advance past ones no one is looking at, essentially playing 'Red Light, Green Light' in reverse. Progress isn't retained on a catch — the caught character is simply returned to the start, unharmed, and must try again with the knowledge gained.",
    note: "No roll needed to understand the rule once a player observes it happen once (make this explicit and fair — call out the shift after their first turned back). Being caught means a shove back to the entrance, no damage, just wasted time. Reward: at the gallery's end, a shrine offers a minor blessing to the first character through unassisted."
  },
  {
    title: "The Sweeping Beacon",
    prompt: "A brilliant magical light rotates slowly around this circular vault like a lighthouse beam, sweeping every few seconds. Standing in its beam sets off a blaring alarm that summons the vault's guardians — but stepping into shadow the instant before it passes keeps you hidden.",
    solution: "The beam completes a full rotation every 12 seconds (2 rounds), sweeping a 90-degree arc each pass. Getting caught in the light doesn't harm anyone or force a full reset — it simply triggers guardians to investigate the vault for several rounds, and the party keeps whatever progress they'd made (they just need to hide and wait it out, or fight the guardians if caught in the open). Careful timing lets the party avoid the alarm's attention entirely.",
    note: "Perception DC 12 to accurately predict the beam's next sweep after watching one rotation. A triggered alarm summons 1d4 guardians (scale to party level) rather than an instant failure state — a fair fight or a stealth recovery, not a game over. Reward: bypassing the beam entirely, alarm-free, grants a bonus — perhaps a surprise round against the vault's actual occupant, or extra time before a later deadline."
  },
  {
    title: "The Shifting Gas Vents",
    prompt: "Vents in the walls of this narrow passage hiss open at intervals, releasing puffs of thick, sleep-inducing gas that drift across the corridor before dissipating. The timing feels familiar at first — but each time the vents cycle, the gap between eruptions is subtly different than the last.",
    solution: "The vents are on a semi-randomized magical timer that shifts slightly every cycle (rather than a fixed rhythm), meaning memorizing one 'safe count' won't reliably work twice. Success requires watching the vents actively each time and reacting to the current cycle rather than relying purely on rote memorization — rewarding players who stay engaged with the room instead of just running the previously 'solved' pattern.",
    note: "Perception DC 13 each attempt to read the current cycle's timing (rather than a single check that solves it forever). Breathing gas causes a short, harmless sleep (1 minute, no damage) and the sleeping character is gently deposited back at the passage's entrance by a magical current in the floor. Reward: a satchel of alchemical reagents at the passage's far end, undisturbed because most who pass through never notice it in their hurry."
  },
  {
    title: "The Realigning Platforms",
    prompt: "A series of stone platforms hover over a bottomless-seeming shaft, drifting and rotating into new configurations every few moments. Reaching the far side means leaping from platform to platform as they align — and any platform you've successfully stood on locks in place once you've cleared it, no longer drifting.",
    solution: "Each platform, once successfully used as a stepping stone, magically anchors in its current position, meaning the puzzle gets progressively easier as the party advances — later attempts (or later party members) benefit from the platforms already secured by those who went first. A fall just triggers a Feather Fall-enchanted safety net effect built into the shaft, gently returning the faller to the starting ledge with no damage.",
    note: "Athletics/Acrobatics DC 12 per leap, with disadvantage if attempting without having watched at least one full drift cycle. Falling triggers the automatic safety effect (no damage, no roll needed) and returns the character to the start, but any platforms already anchored by earlier successes stay anchored. Reward: a chest embedded in the far wall, visible only once the shaft is fully crossed and lit properly."
  },
  {
    title: "The Flooding Chamber",
    prompt: "Water begins pouring into this sealed chamber the moment the door shuts behind you, rising steadily. A row of levers along one wall, each marked with a different rune, must be pulled in some order to open the exit — but the water reaches the ceiling well before you can test them all thoughtfully.",
    solution: "The correct lever sequence is written, in a language the party may need to translate, on a plaque half-submerged near the floor — visible only once the water is high enough to swim down and read it, rewarding players who explore rather than panic. If the water reaches the top before the sequence is solved, the door simply unseals automatically (a safety failsafe) and drains the room, resetting the puzzle but costing time and requiring the party to re-enter.",
    note: "Investigation DC 12 to spot the submerged plaque once the water is deep enough; the sequence is a genuine, fair clue rather than a guess. A failed attempt costs a lever-pull (with a brief harmless jolt of static from a wrong pull) but the flooding/drain-and-reset cycle means no permanent danger of drowning if the DM telegraphs the failsafe clearly. Reward: the exit, once opened correctly, also reveals a alcove with minor treasure that only appears once the water fully drains."
  },
  {
    title: "The Clockwork Patrol",
    prompt: "Two suits of animated armor march fixed routes through this intersection of corridors, crossing paths every so often but never quite colliding. Slipping past unseen requires timing your movement to the gaps in their patrol — but you notice that after each full circuit, one of the two guards pauses a beat longer than before, as if slowly winding down.",
    solution: "The patrol pattern isn't perfectly static: one construct's clockwork mechanism is gradually running slower, meaning the safe window to slip past grows slightly with each cycle. Parties who wait and observe multiple cycles get an easier crossing than those who rush the first attempt — rewarding patience over a single memorized 'solution.'",
    note: "Perception DC 12 to time a crossing correctly; being spotted triggers a brief, non-lethal grapple/shove from the construct that ejects the character back to the intersection's entrance (no damage, might make noise that risks a wandering monster check). Reward: past the intersection, a supply room the constructs are guarding holds useful consumables."
  },
  {
    title: "The Drumbeat Floor",
    prompt: "This tiled room hums with a steady drumbeat that seems to come from nowhere and everywhere. Certain tiles glow faintly in time with the beat; stepping on a glowing tile in rhythm is safe, but stepping out of time triggers a small jolt of force that knocks you back a few tiles.",
    solution: "The safe path is literally choreographed to the drumbeat, meant to be learned by ear and rhythm rather than sight alone — deaf or non-hearing characters (or a Silence spell cast carelessly) would need an alternate method, like counting a visible flicker in the glow instead. Getting bumped only sends the character back a short distance within the room, not all the way to the start, preserving progress made toward the far side.",
    note: "Performance or Perception DC 11 to internalize the rhythm after one failed attempt (advantage on subsequent tries once the pattern's been experienced once). A wrong step costs a few tiles of backward progress and a mildly startling jolt (no damage). Reward: a ceremonial drum at the room's center, a minor magic item that lets its bearer always sense rhythm-based traps in the future."
  },
  {
    title: "The Spinning Spike Pillars",
    prompt: "In this circular chamber, four stone pillars bristling with dulled iron spikes rotate slowly around a central dais, sweeping close to the walls on each pass. Reaching the dais means timing a dash between rotations — and the spikes, while blunted enough not to kill, will absolutely knock the wind out of anyone caught.",
    solution: "The pillars rotate at a steady, learnable rhythm (suggest a 4-count cycle with a brief gap every fourth beat). A hit deals no real damage but knocks the character prone and pushes them back toward the chamber's outer wall, effectively resetting their approach without harming them. The rhythm is consistent throughout, rewarding players who count beats and coordinate a dash together.",
    note: "No check strictly required if the party watches and counts; otherwise Perception DC 10 to catch the rhythm faster. A hit is 1 damage (flavor: bruising, not real harm) plus a shove back to the wall. Reward: the dais holds a minor magic item or a lever that stops the pillars permanently for the rest of the dungeon, a nice quality-of-life reward for solving it once."
  },
  {
    title: "The Duel That Never Ends",
    prompt: "A ghostly image of two duelists replays over and over in this hall, locked in the same exchange of blows — advance, parry, advance, and always the same fatal thrust at the same moment. Somewhere in that repeating memory, one duelist drops a key that skitters across the floor and vanishes when the loop resets.",
    solution: "The vision is a residual haunting, not a threat — it can't actually harm the party. Timing an intervention to grab the key at the exact moment it's dropped (just before the fatal thrust, when the losing duelist's hand opens) yields the real, physical key, which persists in the material world even after the vision resets. A mistimed grab just means waiting for the loop to restart, no penalty beyond lost time.",
    note: "Perception DC 12 to catch the precise moment the key drops on the first viewing (advantage on subsequent loops once players know what to watch for). No danger from a failed attempt — the vision can't harm the living. Reward: the key opens a locked door elsewhere tied to this hall's history, likely holding treasure or lore relevant to the duelists' story."
  },
  {
    title: "The Alternating Vents",
    prompt: "Floor vents around this chamber alternate between gouts of flame and blasts of biting frost, roughly in time with glowing runes set into the floor that flicker between red and blue. Standing on a rune matching the room's current 'safe' element keeps you unharmed; standing on the mismatched one stings badly.",
    solution: "The safe rune color alternates on a readable timer synced to the vents (red runes are safe during the fire phase, blue during frost, and vice versa is dangerous). The pattern is consistent and learnable by watching a cycle, but crossing the room requires hopping between rune tiles as the phase changes, since no single tile stays safe the whole way across.",
    note: "Perception DC 11 to read the sync between runes and vents after observing one cycle. A mistimed step deals minor fire/cold damage (1d4, non-lethal) and staggers the character back to the room's entrance. Reward: the far wall holds a sconce with a permanently lit variant of one of the runes, a minor trinket useful for a later fire- or cold-related trap elsewhere."
  },
  {
    title: "The Crumbling Checkerboard",
    prompt: "The floor of this chamber is a checkerboard of stone tiles, and every few seconds, one tile at random crumbles away and reforms a moment later. Crossing safely means reading which tiles are about to give and avoiding them — or reacting fast enough to leap clear if you're standing on one when it starts to crack.",
    solution: "Tiles telegraph their coming collapse with a visible spiderweb of cracks a full second before crumbling, giving attentive players fair warning. Falling through isn't lethal — beneath the floor is a padded catch-pit with a ladder leading back up to the chamber's entrance, meaning a fall costs time and dignity but no real harm.",
    note: "Perception DC 10 to notice the crack-warning in time to react; Dexterity save DC 12 to leap clear once cracking starts. A fall deals no damage (soft landing) and requires climbing the ladder back up, effectively a reset for that character alone while others may continue. Reward: a chest bolted to the chamber's far wall, reachable only once the party learns to read the tile-cracking pattern reliably."
  },
  {
    title: "The Bell Choir",
    prompt: "Six bronze bells hang from the ceiling of this round chamber, each connected to a pull-cord. A hidden mechanism rings them in a specific sequence once, then falls silent, waiting for the sequence to be repeated correctly. Get it wrong, and the bells reset — but you notice the demonstrated sequence isn't quite the same the second time it plays.",
    solution: "The 'lesson' sequence changes slightly each time the mechanism demonstrates it (say, cycling through three related but distinct patterns), meaning brute-force memorization of one sequence won't work forever — the party needs to watch and repeat whichever sequence was just shown, staying attentive rather than assuming a single fixed answer. This discourages splitting the party to 'divide and conquer' by memory alone.",
    note: "Perception DC 12 to accurately recall the just-demonstrated sequence (advantage if a player is specifically designated to watch and count). A wrong sequence just resets the demonstration and mutes the bells for a few seconds before trying again — no damage, no lockout. Reward: a correct sequence causes a hidden panel to open, revealing a small shrine offering a temporary blessing (advantage on the next saving throw, or similar)."
  },
  {
    title: "The Levitating Stepping Stones",
    prompt: "Flat stone discs hover in a loose line across this chasm, rising and sinking gently like they're breathing. Some are at a walkable height only briefly before dipping below reach; timing a crossing means watching the rhythm of the rise and fall.",
    solution: "Each disc rises to a crossable height on its own independent, slow cycle, meaning the safe path across shifts constantly rather than being a fixed sequence — success is about reading the current state of the stones in the moment rather than memorizing a single 'correct' order. A misstep just means stepping onto empty air where a disc has dipped, triggering a soft-landing enchantment (a cushioning rune network below) that gently deposits the faller back on the starting ledge.",
    note: "Acrobatics DC 12 for a well-timed leap; Perception DC 10 to read a disc's current rhythm before committing. A fall triggers the cushioning effect (no damage) and returns the character to the start ledge. Reward: the far ledge holds a small cairn with a minor magic trinket left by a previous, more careful traveler."
  },
  {
    title: "The Blunted Turret Gallery",
    prompt: "Wall-mounted crossbow turrets line this long gallery, firing padded bolts at intervals down its length. Getting struck doesn't wound so much as it startles and shoves — but the turrets seem to fire in a rotating sequence rather than all at once, and standing in the wrong alcove at the wrong moment is uncomfortable rather than dangerous.",
    solution: "The turrets fire in a fixed rotating order (turret 1, then 2, then 3, repeating), with alcoves along the gallery offering brief cover between shots. A hit only pushes the character back a few feet and costs a few seconds recovering, rather than sending them all the way back to the start — this puzzle is meant to be forgiving enough that a party can push through with minor setbacks rather than needing a perfect run.",
    note: "No formal check needed to learn the rotation after witnessing one full cycle; Dexterity save DC 10 to avoid a shove-back if caught in the open when a turret fires. Being hit is 1 damage (bruising) plus a few feet of lost ground, not a hard reset. Reward: the gallery's far end holds the turret control mechanism, which can be jammed to disable the trap permanently for later trips."
  },
  {
    title: "The Scent-Blind Hounds",
    prompt: "Spectral hounds patrol this passage, noses low, hunting by scent rather than sight. A row of wind chimes along the ceiling stirs occasionally, masking sound and scent alike whenever a faint breeze rolls through — the hounds pause and sniff the air in confusion each time the chimes ring.",
    solution: "The hounds can be evaded by timing movement to the intermittent chime-triggering breeze (on a semi-regular but not perfectly fixed interval, encouraging active attention rather than rote counting). Being noticed doesn't provoke an attack — the hounds are guardians meant to escort intruders back out, not kill them, so a 'failure' here simply means being firmly, harmlessly herded back to the passage's entrance.",
    note: "Stealth DC 13 to move during a masking breeze, or Perception DC 11 to correctly predict the next gust after observing a couple of cycles. Being caught means an escort back to the start (no damage, mildly embarrassing). Reward: successfully slipping past reveals the hounds are guarding a den with a resting, non-hostile creature willing to trade information or an item for being left in peace."
  },
  {
    title: "The Turning Garden Maze",
    prompt: "A hedge-and-statue garden maze fills this courtyard, and every few minutes, a great stone dial beneath the central fountain grinds and rotates several of the hedge-walls into new configurations. Once a path segment has been crossed and the party has passed a small waystone marker along it, that segment seems to lock in place regardless of the dial's later turns.",
    solution: "Waystone markers, scattered at intervals through the maze, anchor whatever path configuration is active when a character passes them, meaning earlier progress isn't lost to later rotations — the maze becomes progressively 'solved' as the party advances rather than resetting punishingly. This lets the party push forward incrementally across multiple attempts rather than starting over each time the dial turns.",
    note: "Survival or Investigation DC 12 to navigate confidently between rotations; no penalty for being caught mid-rotation beyond needing to wait out the current shift before continuing. Reward: the maze's center holds a fountain blessed with a minor boon (a free short rest's worth of healing, or similar) for whoever reaches it."
  },
  {
    title: "The Gong and the Rockslide",
    prompt: "A deep gong echoes through this sloped tunnel every so often, and moments after each toll, a rumble of loose stone comes cascading down from side passages above, sweeping across the tunnel floor. Alcoves are cut into the walls at intervals, just large enough to duck into.",
    solution: "The gong is a reliable warning cue — the rockslide always follows a set number of seconds after the toll, giving attentive players fair time to reach the nearest alcove. The 'rocks' are enchanted to be more startling than dangerous (a safety measure built by whoever uses this passage regularly), dealing minor bruising damage and knocking a caught character back to the last alcove they successfully reached rather than all the way to the tunnel's start.",
    note: "Perception DC 10 to catch the gong as a warning cue; Dexterity save DC 12 to reach cover in time. A failed save deals 1d4 damage and repositions the character to their last-cleared alcove, preserving partial progress. Reward: a niche near the tunnel's end, only reachable by ducking into every alcove along the way, holds a stash left by a previous cautious traveler."
  },
  {
    title: "The Grieving Echo",
    prompt: "A spectral figure relives its final moments in this chamber over and over — reaching for a fallen sword, calling out a name, and fading just before its hand closes on the hilt. Each time, the vision resets and begins again from the start.",
    solution: "The spirit is stuck in a loop of unfinished business; interacting at the right moment (offering the sword, speaking the name it calls, or simply providing what it reaches for) breaks the pattern and lets the vision resolve differently, granting the party its blessing or a key it was guarding. A mistimed or wrong interaction just causes the vision to reset and start over — no harm, just another chance to get it right, and each viewing gives more context about what the spirit actually needs.",
    note: "Insight DC 13 to piece together what the spirit is failing to complete after watching it loop at least once. A failed attempt to help simply restarts the vision with no consequence. Reward: successfully resolving the spirit's memory grants a permanent boon to the character who helped (advantage on a specific save type, or a whispered piece of dungeon lore) plus whatever physical item the vision was tied to."
  },
  {
    title: "The Four Braziers",
    prompt: "Four unlit braziers stand in this square chamber, and a brief flash of ghostly flame flickers across them in a specific order the instant you enter, then dies. Lighting the real braziers in that same order should open the far door — but if you get it wrong, all four braziers douse with a puff of smoke and a mild static shock.",
    solution: "The order shown in the initial flash is the genuine, fair answer — meant to be memorized on the spot, and it doesn't change between attempts, rewarding a party member who watches carefully at the start. A wrong sequence doesn't punish position or progress; the party stays exactly where they are and can simply try again once the smoke clears, with no penalty beyond time.",
    note: "Perception DC 12 to catch the initial flash-sequence clearly (advantage if a player specifically says they're watching closely from the start). A wrong attempt douses all braziers and delivers a harmless static shock (no damage, just startling) before resetting for another try. Reward: lighting it correctly opens the door and leaves one brazier permanently lit with a everburning flame, useful as a light source later."
  }
];
const ANTIPUZZLE_PUZZLES = [
  {
    title: "The Lightest Stone",
    prompt: "A row of pressure plates sits before a sealed gate, each meant to hold a weight from a nearby pile of stones. Every other pressure-plate puzzle you've faced in this dungeon so far has demanded the heaviest stone available to force the mechanism. This time, the inscription above the gate simply reads: 'Only a feather may pass.'",
    solution: "This gate wants the lightest possible weight — an actual feather, an empty hand, or the smallest pebble nearby — rather than the heaviest stone the party has been trained to reach for by every previous plate in the dungeon. Placing a heavy stone here jams the mechanism (harmlessly) rather than opening it.",
    note: "Use this kind of reversal sparingly — once, maybe twice, per dungeon. It only lands if you've clearly established 'heaviest stone wins' as the pattern in at least two earlier pressure-plate rooms first; without that setup this is just an arbitrary gotcha, not a twist. A wrong (heavy) attempt simply jams the plate with a soft clunk and it resets after a few seconds — no damage, no lockout. Reward: a small utility item (a permanent light source or minor trinket) behind the gate."
  },
  {
    title: "The Counter-Clockwise Lock",
    prompt: "A series of engraved dials on this vault door must be turned to align a set of symbols — and by now, your party has learned that every lock you've faced in this dungeon turns clockwise to open. This final dial resists turning clockwise entirely, but gives slightly when nudged the other way.",
    solution: "This particular lock was installed by a different, more paranoid hand than the rest of the dungeon's builders, specifically turning counter-clockwise as a deliberate security measure against thieves who'd learned the dungeon's usual convention. Turning it the 'wrong' way is correct here.",
    note: "Use sparingly — once per dungeon at most. This only works as a twist if you've established 'clockwise opens locks' clearly across at least two or three earlier locked doors/vaults; otherwise it's just an unfair guess. Forcing it clockwise doesn't break anything, it just doesn't budge — no penalty beyond wasted time. Reward: this vault, being harder to crack by design, holds better treasure than the dungeon's other locked doors."
  },
  {
    title: "The Guardian's Question",
    prompt: "A carved sphinx-like guardian has posed riddles to you twice already in this dungeon, and both times, speaking the answer aloud caused a door to open. This time, after posing its riddle, the guardian falls silent and simply waits, watching you expectantly, as if speaking the answer isn't what it wants at all.",
    solution: "This guardian wants to be asked a question in return, not given an answer — it's testing curiosity rather than knowledge, subverting the 'answer promptly' habit the previous two guardians trained into the party. Asking it a genuine question (about itself, the dungeon, or the riddle) is what actually satisfies it and opens the way.",
    note: "Use this kind of reversal sparingly — once per dungeon, twice at the absolute most. It only lands as a twist if you've established at least two prior riddle-guardians that reward a direct spoken answer; otherwise players have no reasonable basis to expect anything different. Speaking a straight answer here doesn't punish the party — the guardian just tilts its head and repeats itself, waiting, rather than doing anything harmful. Reward: a genuine question earns not just passage but a piece of useful lore or a hint about a later challenge."
  },
  {
    title: "The Empty Dial",
    prompt: "A numbered stone dial sits at the center of this chamber, and every similar dial puzzle you've solved in this dungeon has required turning it to the highest number etched on its face. This dial's highest number is scratched out and re-carved with a small, deliberate zero.",
    solution: "Someone altered this particular dial specifically to punish parties running on autopilot from earlier 'highest number wins' rooms — the correct setting here is zero (or the lowest available value), the opposite of what every prior dial has trained the party to reach for.",
    note: "Use sparingly — this should appear once, maybe twice, per dungeon at most, or it teaches players to distrust every dial and stops feeling clever. It only works if 'turn to the highest number' has been clearly established across at least two earlier dial puzzles. Setting it to the highest number here doesn't trigger anything harmful, it simply fails to open the mechanism — allow another attempt without penalty. Reward: correctly reading the altered dial reveals a stash the dungeon's builders hid specifically from copycat thieves."
  },
  {
    title: "The Honest Red Door",
    prompt: "Throughout this dungeon, red-painted doors have consistently marked danger (trapped rooms, guarded vaults) while blue doors have marked safe passage — a pattern you've now relied on several times. Here, a red door and a blue door stand side by side, but the blue door's paint looks suspiciously fresh, as if recently redone.",
    solution: "A trickster (or the dungeon's original owner, wary of intruders who'd catch on to the color code) repainted the doors here specifically to invert the established pattern: the red door is actually safe, and the freshly-painted blue door is the trap. The telltale fresh paint is the fair clue that something's been tampered with.",
    note: "Use this sparingly — once per dungeon at most, and only after the red/blue safety convention has been clearly and consistently established across at least two or three earlier door choices; otherwise this just feels like an arbitrary punishment for trusting established rules. Opening the trapped blue door triggers a minor, survivable trap (a dart, a puff of stinking gas — nothing lethal) rather than serious harm. Reward: the red door leads to a room the dungeon's users specifically wanted overlooked, containing better-than-usual loot."
  },
  {
    title: "The Smaller Flask",
    prompt: "Two potions sit on a pedestal: a large, ornately corked flask brimming with glowing liquid, and a small, plain vial with barely a mouthful inside. Every alchemical choice you've faced in this dungeon so far has rewarded picking the larger, more impressive-looking option.",
    solution: "The large flask is a decoy — showy but inert or even mildly harmful (a sleeping draught, a weak poison) — while the unassuming small vial holds the genuinely potent potion. This subverts the 'bigger is better' assumption the dungeon's earlier alchemy puzzles trained into the party.",
    note: "Use sparingly — once per dungeon. This only lands if 'the bigger/showier option is correct' has been established across at least two earlier choices; without that setup it's just a coin flip dressed up as a puzzle. Drinking the large flask causes a mild, temporary setback (disadvantage on the next check, brief drowsiness) rather than serious harm. Reward: the small vial's potion is meaningfully strong — a genuine combat or utility boost, worth the subversion."
  },
  {
    title: "The Descending Stair",
    prompt: "At three points earlier in this dungeon, choosing to climb upward at a fork has always led to treasure or safe passage, while descending led to danger or dead ends. At this fork, a faint draft of fresh, cool air rises from the downward stair — air that shouldn't exist if it only led to a dead end.",
    solution: "This time the treasure and the true path both lie below, not above — the 'always go up' pattern from earlier forks was true for this dungeon's upper levels but doesn't hold once the party reaches its lower foundations, which connect to natural caverns rather than the built structure above. The fresh air is a genuine, fair clue that the downward path leads somewhere real.",
    note: "Use this kind of reversal sparingly — once per dungeon. It only works as a twist if 'up is safe/good' has been clearly reinforced across at least two or three earlier forks; otherwise it reads as arbitrary. Choosing to go up here just leads to a mundane dead end or a previously-explored area, wasting time but causing no harm. Reward: the downward stair leads to a genuinely better area — perhaps the dungeon's true final chamber."
  },
  {
    title: "The Servant's Greeting",
    prompt: "A row of statues depicting a noble household stands in this hall — a lord, a knight, a scholar, and, at the end, a simple servant carrying a tray. Every ritual you've performed in this dungeon so far has required addressing or greeting the highest-ranking figure present first.",
    solution: "This hall inverts the expectation: the household actually wants visitors to greet the servant first, out of respect for the person who did the real work keeping the household running — a value the family apparently held dear, subverting the 'greet the most important-looking one' instinct built up by earlier rituals.",
    note: "Use sparingly — once per dungeon at most. This only lands if 'address the highest-ranking figure first' has been established through at least two earlier ritual or greeting puzzles; without that setup it's an arbitrary guess dressed as lore. Greeting the lord or knight first simply does nothing (no trap, no harm) and the ritual can be reattempted with the servant addressed instead. Reward: successfully greeting the servant first unlocks a hidden compartment in the servant statue's tray, containing a small keepsake or key."
  },
  {
    title: "The Even Lever",
    prompt: "A bank of eleven numbered levers lines this wall. In two earlier rooms, pulling any odd-numbered lever safely triggered the intended mechanism, while even-numbered levers were trapped — a pattern you've come to rely on. Here, a small brass plaque beside the levers reads 'Maintenance Access — Reversed Wiring,' half-covered in dust.",
    solution: "This particular bank was rewired at some point (as the half-hidden plaque genuinely warns, if noticed), inverting the odd/even safety pattern from earlier rooms — here, the even-numbered levers are safe and the odd ones are trapped. The plaque is a fair, findable clue that something about this room's wiring differs from the others.",
    note: "Use this reversal sparingly — once per dungeon. It only works if the odd/even safety pattern has been clearly established across at least two earlier lever rooms, and the maintenance plaque here must be genuinely noticeable (not hidden behind an unreasonable check) for the twist to feel fair rather than a gotcha. Investigation DC 12 to spot and read the dusty plaque before pulling anything. Pulling a wrong (trapped) lever delivers a minor jolt or noise (no real damage) rather than serious harm. Reward: correctly reading the room grants safe access to whatever the levers control, plus the satisfaction of catching the dungeon's inconsistency."
  },
  {
    title: "The False Trail of Motes",
    prompt: "A trail of soft, glowing motes drifts through the air ahead, and in two previous chambers, following such a trail led safely to the exit. Here, the motes drift invitingly toward a shadowed archway — but the floor beneath them is scuffed with old claw marks, and no motes drift anywhere else in the room.",
    solution: "These motes are being deliberately generated by something lurking beyond the archway (a predator or trap-rigger that has learned intruders follow the dungeon's usual light-motes) to lure prey into a killing ground, inverting the 'glowing motes mean safety' pattern from earlier rooms. The claw marks are the fair, physical clue that something dangerous uses this route regularly.",
    note: "Use sparingly — once per dungeon. This only works if glowing motes have been established as a safe/reliable trail-marker in at least two earlier rooms; otherwise this just punishes normal exploration. Investigation or Survival DC 13 to notice the claw marks and the motes' unnaturally narrow, single-purpose drift. Walking into the archway triggers a fair, telegraphed combat encounter rather than an ambush kill (give the party a chance to notice something's wrong just inside the doorway before anything attacks). Reward: the true safe path, once found by ignoring the motes, is marked by a genuinely subtle but honest clue (a worn handrail, old boot-scuffs) leading the correct way."
  },
  {
    title: "The Whispered Answer",
    prompt: "A booming stone guardian has, twice now, rewarded the party for shouting their answers boldly and confidently to its riddles, its voice approving of conviction. This time, after posing its question, it leans in close and murmurs, 'This is not a hall for shouting.'",
    solution: "This guardian explicitly signals the change itself — it wants the answer whispered or spoken quietly this time, valuing discretion over the confidence the earlier guardians rewarded. This is a fair subversion specifically because the guardian tells the party outright that the old approach won't work here, rather than silently punishing them for guessing wrong.",
    note: "Use sparingly — once per dungeon. This lands well specifically because the guardian gives a direct, in-fiction hint about the change; without a clear signal like this, don't invert the expected behavior. Shouting the answer here simply causes the guardian to shake its head and repeat the question rather than punishing the party — allow another attempt. Reward: a correctly whispered answer grants passage plus a quiet word of genuine, useful advice from the guardian."
  },
  {
    title: "The Unbalanced Scale",
    prompt: "A great stone scale straddles the doorway ahead, and in every previous weighing-room in this dungeon, placing equal weight on both sides was the key to opening the way forward. This scale is engraved with two words above its pans: 'Mercy' and 'Justice' — and it will not balance no matter what you place on it.",
    solution: "This scale isn't meant to be balanced at all — it's a values test, not an arithmetic one, and it wants deliberate imbalance in favor of whichever virtue the dungeon's builders (or the story established earlier) actually prized, likely 'Mercy' outweighing 'Justice' or vice versa depending on the campaign's established themes. Trying to force equal weight, the pattern from earlier rooms, never triggers anything.",
    note: "Use sparingly — once per dungeon. This only lands if 'balance both sides equally' has been clearly established as the solution in at least two earlier weighing puzzles, and if the campaign has given some earlier hint (an NPC's story, an inscription) about which virtue this dungeon's builders valued more. Failing to balance it simply does nothing — no trap, just a door that won't open — so players can experiment freely. Reward: correctly weighting the scale reveals it was a values test all along, and the door beyond holds a reward thematically tied to whichever virtue won."
  },
  {
    title: "The Names, Not Numbers",
    prompt: "Floor tiles numbered one through twelve have, twice before, needed to be crossed in strict ascending numerical order to avoid triggering a trap. This chamber's tiles bear no numbers at all — only names, matching a memorial plaque the party passed several rooms back.",
    solution: "This room drops the numeric convention entirely and instead wants the tiles crossed in the order the names appear on that earlier memorial plaque — a detail only available to parties who actually read and remembered it. This isn't a trap for trap's sake; it rewards attention paid to lore and detail rather than pattern-matching on 'find the ascending sequence' from the earlier number rooms.",
    note: "Use sparingly — once per dungeon. This only works fairly if the party had a genuine, undisguised opportunity to read that memorial plaque earlier (make sure it was presented clearly, not buried in an obscure check), and if 'cross tiles in ascending numeric order' was clearly established beforehand. A wrong tile order triggers a minor, survivable jolt trap and resets the tiles rather than causing serious harm. Reward: crossing correctly triggers a respectful chime and opens the way, sometimes with a small tribute reward left for those who honor the names."
  },
  {
    title: "The Tarnished Key",
    prompt: "A ring of keys hangs by this chest, ranging from an enormous, gleaming ceremonial key down to a small, tarnished, unremarkable one. Every locked chest you've opened in this dungeon so far has responded to the largest, most impressive-looking key on hand.",
    solution: "This chest's lock is worn smooth and only accepts the small, tarnished key — an old working key actually used by the household, as opposed to the larger ceremonial keys that were always more decorative than functional in the dungeon's earlier chests. The subversion rewards players who examine rather than assume based on size and shine.",
    note: "Use sparingly — once per dungeon. This only lands as a twist if 'biggest/showiest key opens the chest' has been established across at least two earlier locked chests; otherwise it's an arbitrary guess. Trying the large key just doesn't fit or turn — no trap, no penalty, try again. Reward: this chest, guarded by an unassuming lock, holds notably better treasure than the more ornate chests the party has already opened."
  },
  {
    title: "The Untrustworthy Reflection",
    prompt: "In an earlier chamber, a pair of doors flanked a mirror, and choosing the door matching your mirrored reflection's side was the correct, safe choice. Here, a similar mirror hangs between two more doors — but its surface is subtly warped, rippling faintly even when nothing moves in front of it.",
    solution: "This mirror is cursed or enchanted to show a reversed, false reflection, meaning the door that matches the reflection here is actually the trapped one — the party needs to choose the door that does NOT match what the warped mirror shows, inverting the rule the earlier, honest mirror taught them. The visibly rippling, imperfect surface is the fair clue that this mirror can't be trusted the same way.",
    note: "Use sparingly — once per dungeon. This only works if an earlier, trustworthy mirror-and-doors puzzle has clearly established 'match the reflection' as correct; otherwise there's no convention to subvert. Investigation or Perception DC 13 to notice the mirror's surface is subtly wrong (rippling, warped, or slightly delayed) compared to the earlier one. Choosing the matching door here triggers a minor, telegraphed trap (a puff of gas, a startling noise) rather than serious harm. Reward: the correct, non-matching door leads onward without incident, plus the curious detail rewards players who investigate rather than pattern-match on autopilot."
  },
  {
    title: "The Anti-Key Symbols",
    prompt: "A combination lock on this vault has, in earlier rooms, always opened when its dial was turned to match a set of symbols shown on a nearby plaque. Here, the plaque's symbols are etched with a small skull in the corner, and the vault's designer apparently had a taste for irony.",
    solution: "This vault was deliberately built to punish thieves who'd cracked the dungeon's earlier combination-matching convention — the correct solution is to dial in the exact opposite (mirror-image or inverse) of the symbols shown, not the symbols themselves. The skull icon is a genuine, if grim, warning for those who know to look for it.",
    note: "Use sparingly — once per dungeon. This only lands if 'match the shown symbols exactly' has been clearly established across at least two earlier combination locks; otherwise it's an unfair guess. Investigation DC 13 to notice the skull icon and consider that it's a deliberate warning rather than decoration. Dialing in the matching (expected) symbols triggers a minor alarm or harmless dye trap rather than anything lethal. Reward: this vault, built specifically to deter the dungeon's usual thieves, holds a noticeably better prize than its counterparts."
  },
  {
    title: "The Reversed Arrow",
    prompt: "Carved directional arrows have guided you correctly through this dungeon by consistently pointing right at every fork so far. At this final fork, the arrow is carved pointing right as always — but it's been chipped and re-carved at some point, and if you look closely, the original groove beneath the newer carving pointed left.",
    solution: "Someone altered this last arrow, most likely a rival treasure-hunter or the dungeon's original guardians trying to mislead pursuers, covering the true leftward path with a fresh, false rightward carving. The genuine route is left, revealed by the older groove still faintly visible beneath the tampering.",
    note: "Use sparingly — once per dungeon. This only works as a fair twist if 'follow the right-pointing arrow' has been clearly and repeatedly established at earlier forks, and the tampering here needs to be genuinely visible on a reasonable check, not hidden behind an unfairly high DC. Investigation DC 14 to notice the re-carving and the older groove underneath. Following the false right-pointing arrow just leads to a dead end or previously explored area, costing time but not harm. Reward: the true left path leads to the dungeon's actual final treasure, appropriately better than a dead end would offer."
  },
  {
    title: "The Reversed Candle Code",
    prompt: "Throughout this dungeon, a blue-burning candle flame has reliably marked the safe path at every fork, while orange flames marked danger — a code the party has used with confidence several times now. In this last hallway, every candle burns blue, and the hallway is a dead end rigged with a trap.",
    solution: "The dungeon's original architect, anticipating that intruders might crack the color code after enough exposure, deliberately reversed it in this one final passage specifically to catch anyone relying on the pattern without further scrutiny — there's no flame-based clue distinguishing safety here, and the party needs another method entirely (checking for a genuinely open passage, testing for drafts, or simply noticing the hallway looks structurally like a dead end) rather than trusting the candles blindly one more time.",
    note: "Use this very sparingly — once, at most, in an entire dungeon, and ideally as a late/climactic twist rather than an early one. It only works if the blue/orange candle code has been firmly and repeatedly established across at least three earlier forks; without heavy prior reinforcement, this reads as pure unfairness rather than a satisfying twist. The trap itself should be a minor, telegraphed setback (a startling noise trap, a minor snare) rather than lethal, since the whole point is to teach a lesson, not punish severely. Reward: recognizing the trick (through Investigation DC 14 on the hallway's structure, independent of the candles) reveals the true path was a side passage overlooked earlier, looping back to unclaimed treasure."
  },
  {
    title: "The Minority Report",
    prompt: "A series of stone plaques line this hall, each bearing a statement — some true, some false, according to a nearby inscription that reads 'Trust the many.' In two earlier rooms, following whichever answer the majority of plaques agreed on was the safe, correct choice. Here, seven of nine plaques agree on one answer, and two disagree.",
    solution: "This room's builders anticipated that intruders would default to 'majority rules' after earlier rooms taught that lesson, so here the seven agreeing plaques are deliberately false (a coordinated deception), while the two dissenting plaques tell the truth. The inscription 'Trust the many' is itself part of the trap, playing on the established habit rather than offering honest guidance.",
    note: "Use sparingly — once per dungeon at most. This only lands as a fair twist if 'the majority answer is correct' has been clearly established across at least two earlier plaque or statement puzzles; otherwise it's an arbitrary coin flip. Insight or Investigation DC 14 to notice subtle tells that the majority plaques share suspiciously identical phrasing or carving style, as if made by the same hand at the same time (a fair, findable clue they're coordinated). Following the majority's false answer triggers a minor, non-lethal trap (a startling noise, a puff of harmless smoke) rather than serious harm. Reward: trusting the honest minority opens the way and yields a genuine reward, plus the narrative satisfaction of catching the dungeon's cleverest trick."
  }
];
const RESOURCE_PUZZLES = [
  {
    title: "The Weeping Brazier",
    prompt: "A squat iron brazier stands in the center of a circular chamber, its coals long dead and cold. Carved into the rim in a dozen languages is the same phrase: 'Warmth for warmth. Give what you will not miss, and I will not open for you.' The only exit is a stone door on the far wall, sealed with no visible mechanism, seams glowing faintly orange when anyone approaches the brazier.",
    solution: "The brazier is keyed to genuine sacrifice, not cleverness. Any character can drop coins into the brazier; the door's glow brightens with the total value thrown in. It unseals permanently once at least 100 gp (adjust to roughly one-third of the party's current gold for their level) has been burned away — the coins visibly blacken and fuse to the brazier's floor, unrecoverable. Tricks like tossing in a single valuable gem and reclaiming it later fail: the brazier evaluates value at the moment of contact and consumes it instantly, leaving nothing behind to retrieve.",
    note: "Hard cost: real party gold, permanently removed from their sheet, no refund and no recovery by any means (identify, dispel magic, etc. do nothing). Set the threshold to something that stings but is affordable — you want groaning, not a TPK-by-poverty. If players try to pay with a Fabricated or Minor Illusion coin, have the brazier's glow simply not respond, making clear it senses real value leaving the party's hands, not the coin's appearance."
  },
  {
    title: "The Font of Red Vows",
    prompt: "A basin of black stone sits beneath a dripping stalactite, its surface unnervingly still. A shallow groove leads from the basin's lip to a slot in the wall shaped like a hand. An inscription reads: 'Blood remembers what gold forgets. Bleed, and be known.' Nothing else in the room reacts to searching, prying, or spellcraft aimed at the door beyond.",
    solution: "Any creature that presses a hand into the slot and willingly takes damage (a fixed amount — recommend 1d10, or 2d10 for a more dramatic threshold) causes the door to grind open. The damage is real, current hit point loss that can only be healed through normal means afterward — it cannot be shrugged off with resistance or temporary hit points, since the font specifically drains blood, not force.",
    note: "Hard cost: real, current hit point loss (suggest 1d10, non-lethal cap allowed for tension without real death risk) with no in-the-moment recovery — healing spells work afterward as normal, but nothing negates the cost at the font itself. If a player offers an alternative like a self-inflicted cut with a dagger for narrative flavor, allow it and simply apply the same damage roll — reward the roleplay, not a workaround that avoids the cost."
  },
  {
    title: "The Warded Threshold",
    prompt: "The corridor ends in a shimmering curtain of violet light that hums faintly, clearly a ward keyed against intrusion. A weathered plaque beside it reads: 'Only true magic may unmake me. Cheap tricks will only feed me.' Anyone who steps into the light without countering it takes a jolt of force damage and is shoved back.",
    solution: "The ward can only be unraveled by a spellcaster expending an actual spell slot of 2nd level or higher directed at the curtain (any spell works — the ward consumes the slot's raw magic, not the spell's specific effect). The slot is spent and gone the instant the spell resolves against the curtain, whether or not the caster 'aimed' correctly; the ward simply feeds on the expended magic and dissolves for one minute, long enough for the party to pass through.",
    note: "Hard cost: burning a real spell slot of 2nd level or higher, permanently spent for the day (recoverable only on the caster's next long or short rest, per class), no refund. Cantrips and lower-level slots do not satisfy it — make this explicit if asked. If the party has no spellcasters, allow a scroll or a one-use magic item that expends a charge to work identically, preserving the 'real cost, no trick' spirit."
  },
  {
    title: "The Rustbound Vault",
    prompt: "A vault door is fused shut with corroded iron bands. Etched above it: 'Feed me steel and I will remember how to open.' A narrow slot at hand height is clearly sized to accept a blade or similar tool, and the bands visibly flex when metal is pressed near them.",
    solution: "The vault requires a real weapon or tool made of metal to be fed into the slot and left there — it dissolves the item to fuel the mechanism, and the bands crumble away over the next minute, opening the vault. Any metal weapon or tool of at least minor value works; the vault cannot be fooled by mundane scrap metal that isn't a crafted item (a handful of nails does nothing, but a dagger, a crowbar, or a suit of armor's buckles all work).",
    note: "Hard cost: permanent loss of one metal weapon, tool, or piece of gear, no way to retrieve or repair it afterward. Let players choose which item to sacrifice — reward strategic thinking if they offer up something already broken or low-value, as long as it's a genuine crafted metal item and not a joke substitution."
  },
  {
    title: "The Grieving Loom",
    prompt: "An ancient loom sits motionless, threaded with a half-finished tapestry of gray cloth. A spectral weaver's voice, heard only as a whisper on the air, says: 'Give me something that mattered to you, and I will weave you a path.' The loom does not respond to gold, food, or anything offered without genuine personal significance.",
    solution: "The loom is testing sincerity, not value — it wants an item the owning player can describe as personally meaningful (a keepsake, a gift from a mentor, a trophy from an old victory), regardless of gold value. Once such an item is placed on the loom and the player briefly explains its significance aloud, the tapestry completes itself, depicting a hidden passage that then opens in the wall. The item is absorbed into the weave and cannot be recovered.",
    note: "Hard cost: permanent loss of a chosen personal item (DM's call on what counts as 'meaningful' — be generous, this is about roleplay investment, not appraised value). If a player tries to bluff sentimental value onto a random inventory item, ask one follow-up question about it; genuine engagement should always be accepted even if invented on the spot."
  },
  {
    title: "The Hollow Choir Organ",
    prompt: "A vast pipe organ dominates a sunken chapel, its pipes cracked and silent. Sheet music on the stand reads simply: 'Sustain the note, and the dead will listen.' The moment anyone begins to play (or casts a spell to simulate music), ghostly shapes gather at the chapel's edges, waiting.",
    solution: "Success requires a caster to maintain concentration on a spell (any concentration spell suffices, cast at the organ) for ten full minutes without it breaking, while the rest of the party fends off the gathering spectral choir, which attacks anyone who isn't the concentrating caster. If concentration breaks even once, the ritual resets and must be started over from a fresh casting.",
    note: "Hard cost: the caster's action economy and spell slot for the full duration, plus real risk to the rest of the party who must hold the line unsupported by that caster's other spells. This is a 'genuinely painful trade-off' puzzle — it removes your best support caster from the fight for ten minutes. If the table wants a workaround, allow a Bard's Song of Rest-style continuous performance (an actual instrument, ten minutes of real playing) to substitute for the spell, provided it's just as costly in attention and vulnerability."
  },
  {
    title: "The Sundered Mirror",
    prompt: "A tall mirror, frame tarnished with age, shows not the room but a twisting corridor beyond. Runes along the frame read: 'A shard of true power will let you pass through.' The mirror's surface ripples invitingly whenever a magic item is held near it.",
    solution: "The mirror requires a permanently attuned or charged magic item to have one charge (or, for items without charges, a small but real fragment of its power) drawn out and fed into the glass. This is represented as one charge being permanently removed from a wand, staff, or similar item (not recoverable at dawn like normal recharging) — the item's maximum charges are reduced by one, forever. Once fed, the mirror's surface turns to mist and the party may step through into the corridor beyond.",
    note: "Hard cost: a permanent charge (not a daily-recharging one) removed from a magic item, reducing its maximum charges forever — this is a steep, painful cost and should feel like it. If the party has no chargeable item, allow instead the permanent sacrifice of any one magic item's attunement (it becomes permanently non-magical, mundane from then on) as an equally weighty substitute."
  },
  {
    title: "The Beggar King's Toll",
    prompt: "A ragged figure sits cross-legged before a bridge of loose planks, palm open. 'None cross the Beggar King's bridge without paying his toll,' he rasps. 'Fifty gold a head, no haggling, no credit.' Behind him, the bridge sways ominously over a chasm with no other visible crossing.",
    solution: "This is exactly what it appears to be: a flat, non-negotiable toll of a fixed amount of gold per party member to cross the bridge safely. Anyone who tries to cross without paying finds the planks rotten and collapsing beneath them, forcing a Dexterity save or a fall. The beggar cannot be intimidated, charmed, or persuaded below his price — he is bound by an old pact to charge exactly this amount, no more, no less.",
    note: "Hard cost: a fixed gold amount per party member (suggest 25–75 gp depending on party wealth), spent and gone with no refund. This is meant to be one of the easier, lower-tension entries in this category — a clean toll rather than a dilemma. If players try to fight or rob the beggar, the bridge itself becomes hostile (treat as a trap that collapses), making violence strictly worse than paying."
  },
  {
    title: "Altar of the First Cut",
    prompt: "A blood-dark altar stands at the heart of a ruined shrine, ringed with old scars in the stone floor. A carved inscription reads: 'Every door you have opened here has cost the shrine something. Now it asks for yours.' The altar seems to specifically recall how many locked doors, traps, or wards the party has already bypassed to reach it.",
    solution: "The altar demands hit points scaled to how many obstacles the party bypassed to reach it (suggest 1d4 per prior obstacle overcome in this dungeon, split however the party chooses among willing participants). Once the damage is taken by however many characters step forward to share the burden, the altar's light flares and reveals a hidden reward or passage. The damage is real and current, not negated by resistances tied to 'sacred' or 'ritual' sources.",
    note: "Hard cost: current hit point loss scaled to dungeon progress (track how many doors/traps/wards were bypassed as you run the level). Let the party choose how to distribute the damage among willing members — this creates a genuine tactical/roleplay decision about who can afford to bleed. No amount of Insight, Arcana, or Religion checks reduces the toll; only paying it opens the way."
  },
  {
    title: "The Sleeping Lantern",
    prompt: "A shaft of absolute darkness stretches ahead, swallowing all light the moment it crosses the threshold — torches gutter out, and even magical light dims to nothing within a few feet of the boundary. A carved warning beside the entrance reads: 'The dark remembers light. Give it yours, and it will let you keep your eyes.'",
    solution: "The passage is roughly 100 feet of true magical darkness that suppresses all light sources, magical and mundane alike, for anyone who enters normally. However, if the party permanently extinguishes and abandons a light source (a torch left burning and sacrificed at the threshold, or a charge of a magical light item spent and never renewed) before entering, the darkness instead reads it as an offering and allows the party through with darkvision-equivalent sight for the crossing, no further light loss.",
    note: "Hard cost: permanent loss of a light source — a torch that cannot be relit, or (for the steeper version) a wand of light or similar item's charge that can never be recovered. Without paying, the party can still cross but must do so blind (heavily obscured, no light works), which is its own real cost in time and danger — make sure both paths are viable so the puzzle is a genuine choice, not a wall."
  },
  {
    title: "The Hungry Ledger",
    prompt: "A massive tome floats inches above a pedestal, pages turning themselves. Where a blank page settles, spidery handwriting appears: 'Name a spell you know. I will take it, and give you passage.' The book does not close or react to any answer except a genuine, spoken spell name.",
    solution: "A spellcaster who knows spells by selection (Sorcerer, Warlock, Ranger, and similar 'spells known' classes, not classes that prepare from a full list like Wizard or Cleric) may name one spell they currently know. That spell is stricken from their known spells permanently until they would normally have the opportunity to swap a spell known (level up, or a class feature that allows retraining). The book then snaps shut and the passage beyond unlocks.",
    note: "Hard cost: permanent loss of a known spell for 'spells known' casters until their next legitimate spell-swap opportunity (which may be levels away) — this is a steep, painful cost, so flag it clearly to the player before they commit. For prepared casters (Wizard, Cleric, Druid), allow the equivalent cost of permanently losing a spell recorded in a spellbook or holy text (torn out and consumed) instead, so every table has a real option. If no caster is willing, the book will also accept the permanent destruction of a spell scroll fed into its pages."
  },
  {
    title: "The Widow's Toll Bridge",
    prompt: "A narrow bridge of black stone crosses a ravine, guarded by a suit of ancient plate armor bolted to the railing. A plaque reads: 'The Widow takes a piece of your protection, not your gold.' The armor's gauntlet is open, palm up, clearly waiting to receive something.",
    solution: "The Widow requires a piece of armor be placed in its gauntlet and left there permanently — a shield, a set of armor, or similar protective gear. Whatever is given is fused into the statue and cannot be reclaimed; the character who gave it suffers a permanent reduction to their Armor Class equal to what that item provided until they acquire a replacement. Once given, the statue steps aside and the bridge is safe to cross.",
    note: "Hard cost: permanent loss of an actual piece of armor or shield, reducing the giver's AC until replaced through ordinary means (buying or finding new gear) — no in-dungeon recovery. If the party has no spare armor to give, allow a weapon of at least moderate value to satisfy the Widow instead, at DM discretion, since the spirit of the puzzle is 'give up something that protects you,' not armor specifically."
  },
  {
    title: "The Reliquary of Names",
    prompt: "In a chamber of drifting fog, a robed fey judge with no visible face addresses the party directly: 'I will open the way. In return, you will tell me your true name, and I will keep it. You may go by whatever title you please from then on — but I will always know which one is hollow.'",
    solution: "This is a roleplay-driven cost with a light mechanical tail. The character who gives their true name to the judge suffers disadvantage on Charisma checks made against fey creatures specifically for the rest of the campaign (the judge's kin can always sense the 'hollowness' of a borrowed name), unless a powerful remedy (a wish, a boon from an archfey, or similar high-level magic) restores it. In exchange, the fog parts and the way forward opens immediately.",
    note: "Hard cost: a narrative and mechanical debit (disadvantage on Charisma checks vs. fey) that lingers for the rest of the campaign with no ordinary recovery — treat it as genuinely permanent, reversible only by significant future magic you control as DM. This is a great one to let a roleplay-hungry player opt into for flavor; don't force it on a reluctant table — offer the Beggar King's Toll or another entry as an alternate route if no one wants to pay this particular price."
  },
  {
    title: "The Bone Dial",
    prompt: "A sundial of pale bone sits in an overgrown courtyard, its shadow pointing to numerals that shift and rearrange themselves. Beneath it, carved deep: 'Time opens what time has closed. Give me years, and I will give you the door.' The dial's shadow seems to lean toward whoever reads the inscription aloud.",
    solution: "Touching the dial and accepting its price ages the character permanently by a number of years (suggest 2d10, or a flat 10 for predictability) — this manifests as a genuine, permanent aging effect (as per magical aging effects), not merely cosmetic, with no in-story cure short of a spell like greater restoration or wish. The moment the price is accepted, the courtyard's far door grinds open.",
    note: "Hard cost: permanent magical aging (recommend 2d10 years, or scale to taste), curable only by greater restoration or equivalent high-level magic — flag this cost's severity explicitly before the player commits, since it can meaningfully affect long-lived vs. short-lived races differently (a rare fair twist: elves shrug this off far more easily than a human or halfling, which the party may realize and use to their advantage by choosing who touches the dial)."
  },
  {
    title: "The Font of Diamonds",
    prompt: "A small stone basin sits at the base of a statue with its hands cupped, palms up, toward the ceiling. Water drips steadily from the statue's eyes into the basin below. An inscription reads: 'The price of second chances belongs here, not in your pocket.' The basin seems built to hold something small and precious.",
    solution: "The statue requires a diamond worth at least 300 gp (or higher, at DM discretion, to raise the stakes) be placed in the basin, where it dissolves into light and is gone forever. Once given, a hidden mechanism in the statue's base opens, revealing the passage onward. This is deliberately the same value and type of gem used as a material component for spells like Revivify — the puzzle exists to make the party feel the loss of that safety net.",
    note: "Hard cost: permanent consumption of a diamond worth 300 gp or more, meaning the party may be knowingly spending their 'emergency resurrection insurance.' Be explicit with the table about this parallel before they commit, since it's the entire point of the puzzle's tension — don't spring the realization on them after the fact as a gotcha. If they have no such diamond, the statue will also accept an equivalent-value gem of any kind, just without the grim resonance."
  },
  {
    title: "The Piper's Toll",
    prompt: "A weathered stone piper stands at a crossroads shrine, his carved flute pointed toward a locked gate. Etched at his feet: 'I will play your song's price. Give me the thing you have bound to yourself, and I will let you pass unbound as well.' The gate's lock has no keyhole — only a smooth indentation the size of a ring or amulet.",
    solution: "The shrine requires a currently attuned magic item to be removed from attunement and placed in the indentation, where it fuses permanently into the statue and cannot be reclaimed by any means. The moment attunement is broken and the item placed, the gate unlocks. This is one of the steepest costs in this list and should be reserved for parties with a magic item they're genuinely willing to part with, or a moment where the DM wants real weight behind a locked door.",
    note: "Hard cost: permanent loss of one attuned magic item, no recovery, no substitution with a lesser item (the shrine only responds to something the giver has bound themselves to via attunement). This should be flagged clearly as the most painful entry on this list — consider offering an alternate route around the gate entirely for parties unwilling to pay, so it never becomes a forced wall."
  },
  {
    title: "The Bloodroot Well",
    prompt: "A well of dark, faintly steaming water sits at the center of a moss-choked garden. A ladle hangs beside it on a rusted chain. Words carved into the well's rim read: 'Drink deep of what heals slowly, and the garden will show you its heart.' Nothing else in the garden responds to searching or spellcraft.",
    solution: "Drinking from the well costs the character one Hit Die, spent as though used during a short rest but with no accompanying healing roll — it's simply gone from their pool until their next long rest. The moment the Hit Die is spent this way, the garden's overgrowth parts to reveal a hidden path or object at its heart.",
    note: "Hard cost: one Hit Die spent with no healing benefit, unavailable again until the character's next long rest — a genuinely minor, low-stakes cost meant to give an 'easy call' entry in this category, useful when you want tension without real jeopardy. If a character has no Hit Dice remaining, the well simply will not respond to them, but any other party member can pay in their place."
  },
  {
    title: "The Effigy of Silence",
    prompt: "A hooded effigy sits slumped against a wall, hollow-eyed, in an otherwise empty meditation chamber. A plaque at its feet reads: 'Share my weariness, and I will share what I have seen.' Nothing happens until someone sits beside the effigy and remains still.",
    solution: "A character who sits with the effigy and voluntarily accepts a level of exhaustion is shown a vision (DM's choice — a clue, a map, a warning about what's ahead) and the effigy itself crumbles to dust, leaving behind a small item or key. The exhaustion level is real and persists exactly as the exhaustion rules dictate until removed by rest or magic.",
    note: "Hard cost: one level of exhaustion (per the standard exhaustion track), removed only through normal recovery (a long rest reduces it by one level, or appropriate magic) — meaningful but not devastating, useful as a mid-tier cost. If the party has a character already at a dangerous exhaustion level, let them substitute a different resource cost from elsewhere on this list rather than risk a death spiral; the DM should never let this puzzle be the thing that kills someone outright."
  },
  {
    title: "The Sanctum of Broken Wands",
    prompt: "Shelves of shattered wands line a circular sanctum, and at its center a stone pedestal waits with a groove cut for exactly one item. A voice, ancient and tired, echoes from nowhere: 'Feed the sanctum a working spell, unspent, and it will remember how to open doors.'",
    solution: "The pedestal requires an unused spell scroll to be placed and allowed to burn away completely, unread and uncast — its magic feeds directly into the sanctum's wards rather than being cast normally. The moment a scroll of any level is consumed this way, a section of the wall grinds open to reveal the sanctum's inner vault.",
    note: "Hard cost: permanent loss of one spell scroll, consumed without ever getting its effect, no refund. This is a good 'easy call' entry for parties sitting on scrolls they haven't found a use for — but make sure they understand consuming it here means never casting it, which can occasionally still sting if it was something rare."
  },
  {
    title: "The Last Ration Hearth",
    prompt: "A cold hearth dominates an abandoned watchtower room, its stones blackened with old soot. Scratched into the mantle: 'This hearth has not been fed in a hundred years. Feed it what sustains you, and it will remember how to burn.' A basket beside it waits, empty.",
    solution: "The hearth requires the party to place all of their remaining rations (or a specified large portion, such as a full week's worth) into the basket, where they vanish in a puff of gray smoke and the hearth roars to life, illuminating a hidden passage and providing warmth/light for the rest of the dungeon (a minor ongoing benefit as a small consolation).",
    note: "Hard cost: the party's food supply, permanently gone, creating real downstream pressure (forced foraging, hunger rules if you use them, or simply a ticking clock to resupply). This is a good 'slow burn' cost — the pain isn't felt immediately, but several sessions later when supplies run short. Track this cost explicitly on your prep notes so you remember to call it back later."
  },
  {
    title: "The Idol of Open Hands",
    prompt: "A squat golden idol sits at the center of a shrine, its outstretched palms worn smooth from countless offerings over centuries. Faded script at its base reads: 'The idol does not want your gold. It wants your tool.' A dozen small dishes are arranged around it, all empty, all clearly meant to hold something.",
    solution: "The idol responds only to a mundane (non-magical) tool of trade being placed in one of the dishes and left there permanently — thieves' tools, a smith's hammer, a healer's kit, an artisan's instrument, and similar items all qualify. Whatever tool is given crumbles to gold dust, which the idol absorbs, and its eyes flare briefly before a hidden compartment opens elsewhere in the shrine.",
    note: "Hard cost: permanent loss of a mundane tool or kit (thieves' tools, healer's kit, artisan's tools, etc.), no refund, meaning that character loses access to whatever proficiency or utility that tool provided until they buy or find a replacement. This is a moderate cost that specifically targets a party's out-of-combat utility rather than combat power, which is a nice change of pace — let players debate which of their tools they can most afford to lose."
  },
  {
    title: "The Gate of Last Words",
    prompt: "A colossal stone gate is inscribed with hundreds of names in dozens of hands, clearly added over centuries. A final blank space waits at the bottom, along with a stylus of black iron. The inscription above reads: 'Sign here, and the gate remembers you specifically. What it takes from a name, it takes only once — but it always takes something.'",
    solution: "Any character can sign the gate using the stylus, which draws a small but real cost from them at random (roll or choose from this list to suit the moment: 1 permanent point of exhaustion recovery lost this rest, one random cantrip or minor spell forgotten until next level, one point of a chosen ability score reduced until a long rest, or a permanent scar with a minor roleplay consequence). The gate then swings open for the whole party, and that character's name is added permanently to its surface, meaning the gate will always open easily for them in the future (a nice long-term payoff for recurring dungeons).",
    note: "Hard cost: DM's choice from a short menu of minor-but-real costs (see solution), applied once per signer, non-negotiable and non-refundable. Because the exact cost is randomized/DM-chosen rather than known in advance, warn the players clearly that it's a real cost of unknown shape before anyone signs — never spring an unknowable permanent cost on a player without that disclosure."
  }
];
const LORE_PUZZLES = [
  {
    title: "The Password at the Old Mill",
    prompt: "A locked door bars the way, fitted with a small speaking-grate at head height. A muffled voice on the other side says only: 'Say the words, or be gone.' There is no other way through — no visible lock to pick, no hinges to force.",
    solution: "The correct password is [the exact phrase your NPC used offhand when first mentioning this location or faction, planted earlier in the campaign — e.g., a smuggler's old code phrase, a miller's toast, a guard's watchword]. If the party recalls and speaks it, the door opens without further challenge.",
    note: "Seed the phrase naturally in an earlier session — have an NPC say it in passing dialogue, write it on a note the party skims, or have it appear as a throwaway detail in a rumor table. If the table genuinely doesn't remember, allow a fair fallback: a second, harder-to-find clue nearby (a scrap of parchment, a carving, an NPC who can be persuaded or paid to recall it) rather than leaving them permanently stuck. Never make forgetting an in-the-moment fact an unwinnable wall."
  },
  {
    title: "A Face Half-Remembered",
    prompt: "A hooded figure meets the party in a crowded tavern, refusing to lower their hood. 'You know me,' they say. 'Or you should. Prove it, and I'll talk business.' The party must identify who this is without seeing their face.",
    solution: "The figure is [an NPC the party met earlier and was only ever described verbally, never shown as a portrait or token — e.g., 'a woman with a voice like gravel and a missing left ear' from a witness's description]. The party should recognize them from a distinguishing verbal detail dropped earlier: a scar, a limp, a manner of speech, a specific turn of phrase they use.",
    note: "When you first introduce this NPC, deliberately describe one or two memorable, spoken (not written) identifying details rather than relying on a visual token or portrait, so players must recall description rather than recognize an image. If the table is stuck, have the figure supply a second, more obvious verbal tic or repeat a phrase they used before as a gentle nudge rather than simply revealing themselves."
  },
  {
    title: "The Comment That Marked the Place",
    prompt: "The party needs to find a specific location, but the only map available is old, damaged, and unlabeled in the relevant area. Someone recalls that an NPC once mentioned this place, though never gave an address.",
    solution: "The location is identifiable only through [an offhand comment an NPC made earlier — e.g., 'that's near where the old bell tower fell into the river' or 'you can't miss it, it always smells like burnt cedar']. Cross-referencing that detail with the physical world (a fallen bell tower, a cedar grove) should let the party pinpoint the map location themselves.",
    note: "Plant this kind of throwaway, sensory detail during ordinary NPC dialogue well before it becomes relevant — the less deliberate it sounds at the time, the more satisfying the recall later. If forgotten, allow a local (a farmer, guard, or innkeeper) to supply the same detail again for a small price or favor, keeping the door open rather than locking the party out of content."
  },
  {
    title: "The Sigil on the Banner",
    prompt: "A banner hangs in a great hall, its heraldry faded and half-obscured by smoke damage. An NPC official asks the party to identify which house it belongs to before granting them an audience.",
    solution: "The sigil belongs to [a house or faction whose heraldry was described in an earlier session — on a letter, a soldier's tabard, or in an NPC's description of an old enemy or ally]. The party should be able to match the surviving details (a color, an animal, a shape) to what was established earlier.",
    note: "When you first introduce a house or faction's heraldry, describe at least two or three concrete visual elements (a color, a creature, a shape) in narration so players have enough to pattern-match later, even under partial obscuring. If stuck, let an NPC bystander in the hall offer to identify it for a favor or coin, preserving forward progress without punishing memory lapses."
  },
  {
    title: "The Unfinished Verse",
    prompt: "A bard's tune drifts from a locked shrine door, playing the same melody over and over, always stopping short. A brass plaque reads: 'Finish the song, and I will finish opening.' The melody is one the party has heard before.",
    solution: "The missing verse is [a line or two of a song taught, sung, or referenced earlier in the campaign — by a bard NPC, at a festival, or as a clue on a scrap of sheet music]. Singing, playing, or simply reciting the correct missing words causes the door to open.",
    note: "Introduce the song in full at least once earlier, ideally performed by a memorable NPC or during a notable scene, so it sticks. If the party can't recall the words, allow a Perform, History, or Investigation check (or simply asking a local bard) to jog the memory as a fair fallback rather than leaving an unsolvable stumper."
  },
  {
    title: "The Date on the Ledger",
    prompt: "A vault's combination lock has three dials, each showing numbers instead of letters. A steward mutters, 'Only a date this family would never forget could open it.' No further hints are given in the room itself.",
    solution: "The correct combination is [a specific date mentioned earlier — in a diary, a gravestone, an NPC's story about a wedding, tragedy, or founding event]. The three dials correspond to day, month, and year (adapt to your calendar system) as established in that earlier detail.",
    note: "Plant the date as a small, specific detail in a document or spoken story well before this puzzle — a gravestone inscription or diary entry works well since it can be revisited. If forgotten, allow the party to find or reread the original source document again (assuming it's still accessible), or have a family member NPC supply the date if pressed, rather than treating it as unrecoverable."
  },
  {
    title: "The Order of the Story",
    prompt: "Three levers sit beside a door, unlabeled, each connected to a different carved relief on the wall depicting scenes from a story. A caretaker earlier told the party this exact story, in this exact order, as a bit of local color.",
    solution: "The levers must be pulled in [the order the events occurred in the story an NPC told earlier — e.g., the levers correspond to the hero's departure, trial, and return, and must be pulled in that narrative sequence]. Pulling them in the wrong order resets the mechanism harmlessly (make it a puzzle you can retry, not a trap).",
    note: "When the NPC first tells the story, make the sequence of events clear and memorable — three distinct beats work best. If the party is stuck, let them find a stained-glass window, a mural, or a child playing out the story nearby that silently reinforces the correct order as a fair, low-cost hint."
  },
  {
    title: "The Name on Dying Lips",
    prompt: "A dying NPC from an earlier encounter (or an NPC recounting one) whispered a name before the end. Now, a gatekeeper demands the party speak the name of 'the one who was lost' before they'll be allowed passage.",
    solution: "The correct name is [the name whispered by the dying character or mentioned in the aftermath of that earlier scene]. Speaking it satisfies the gatekeeper, who reacts with visible emotion, tying the moment back to the earlier loss.",
    note: "Make sure the name is said clearly and repeated at least once during the original scene so it has a chance to land. If the party genuinely can't recall it, the gatekeeper (who may have known the deceased too) can offer a grieving, roundabout hint — 'it started with...' — rather than refusing passage outright."
  },
  {
    title: "The Scent of the Place",
    prompt: "Blindfolded or in total darkness, the party must identify which of several unmarked doors leads onward, based only on smell. An NPC once described this specific place using a distinctive scent.",
    solution: "The correct door is [the one that matches a scent detail an NPC used earlier to describe this location — e.g., 'always smelled of lavender and old rain']. Have a scent cue (an incense, a description of the air) actually present at the correct door for players to notice.",
    note: "When first describing the location secondhand, use a specific and unusual scent detail so it's memorable and distinct from generic dungeon smells. If forgotten, allow a Perception or Investigation check to notice which door has a scent at all, narrowing the choice even without full recall."
  },
  {
    title: "The Riddle of the Witnessed Event",
    prompt: "An old stone sphinx blocks the passage and speaks in riddles referencing an event the party themselves witnessed or caused earlier in the campaign — not a myth, but their own history. 'Answer for what you saw, travelers, and I will let you pass.'",
    solution: "The riddle's answer is [a specific detail from an event the party directly experienced earlier — a battle they won, a bridge they burned, a bargain they struck]. The sphinx is testing their memory of their own deeds, not general trivia.",
    note: "Reference your campaign's session log or notes to pick a genuinely memorable past event the whole table experienced together — this works best a few sessions removed, not something from last week. If they're stuck, the sphinx can offer a second, more literal restatement of the riddle rather than a total dead end."
  },
  {
    title: "The Shape of the Old Key",
    prompt: "A locksmith's puzzle box requires a key the party doesn't have — but a blacksmith they met earlier described, in detail, a key from an old legend they once forged a replica of. The box's keyhole matches an unusual shape.",
    solution: "The party must describe or sketch [the specific and unusual key shape described earlier by an NPC — e.g., 'shaped like a raven's wing, with three false teeth']. If they can accurately recall and describe it to a locksmith or craftsman, that NPC can forge a working replica.",
    note: "When the NPC first describes the key, give it one or two vivid, unusual visual details rather than a generic 'ornate key.' If forgotten, let the same NPC (or their apprentice) recall it again for a fee or favor — this puzzle should never be a hard stop if the party still has access to that NPC or their notes."
  },
  {
    title: "The Alibi That Doesn't Match",
    prompt: "A prisoner or suspect gives the party their account of events, claiming innocence. Something in their story contradicts what the party already knows from an earlier session — if they catch it, the prisoner breaks.",
    solution: "The contradiction is [a specific detail from earlier testimony, a letter, or an eyewitness account the party already gathered, that conflicts with what this NPC now claims — e.g., they claim to have been elsewhere during an event the party knows they attended]. Pointing out the exact discrepancy causes the NPC to crack and reveal the truth.",
    note: "Make sure the original, true account was delivered clearly enough to be remembered or, better, recorded in writing the party can revisit (a journal, a letter, a written statement). If the table can't recall the specific contradiction, allow an Insight check to at least sense the lie is there, prompting them to go re-examine their notes or return to the original source."
  },
  {
    title: "The Forged Seal",
    prompt: "Two documents are presented, both bearing the same noble house's wax seal, and the party must determine which is the forgery before acting on its contents. Nothing about them looks obviously different at a glance.",
    solution: "The genuine seal has [a small, specific quirk established earlier when the party first saw this house's real seal — a chipped edge, a reversed detail, an extra small mark]. The forged document is missing or gets that detail wrong.",
    note: "The first time the party encounters this house's authentic seal, describe one small, distinctive imperfection or detail in the wax that a forger might miss. If they don't recall it, allow a History or Investigation check to compare the two side by side and notice the discrepancy exists, even without perfect recall of what the original looked like."
  },
  {
    title: "The Coordinates from the Torn Map",
    prompt: "A partially burned map fragment shows a location with no labels, just terrain. The party needs to determine where it depicts. They were shown a fuller version of this map, or discussed this terrain, earlier in the campaign.",
    solution: "The location is [wherever the map fragment was first shown or discussed in full, or a place an NPC described using the same landmarks now visible on the torn piece — e.g., the twin cliffs, the dead forest, the river bend]. Matching the remaining landmarks against earlier context reveals the destination.",
    note: "When you first show a map (even briefly, even as a prop), keep a copy or clear notes of what it depicted so you (and the players, if they took notes or a photo) can reference it later. If the party lacks any record, allow a Survival or Nature check on the fragment's terrain features to make an educated guess, keeping the puzzle solvable without perfect memory."
  },
  {
    title: "The Oath Half-Remembered",
    prompt: "A faction's inner sanctum door demands the party recite the oath sworn by initiates — an oath the party heard once, during an induction ceremony or overheard from a member, earlier in the campaign.",
    solution: "The oath's key line is [the specific phrase or creed established when the party first encountered this faction — e.g., a knightly order's vow, a cult's creed, a guild's pledge]. Reciting it correctly (or close enough in spirit) satisfies the door's ward.",
    note: "When first introducing a faction's oath or creed, have it spoken aloud in-scene by an NPC at least once, ideally memorably or ceremonially. If the party can't recall it, allow a sympathetic member of the faction to prompt them with the opening words as a fair nudge, rather than demanding word-perfect recall."
  },
  {
    title: "The Mark on the Skin",
    prompt: "A prisoner or suspicious NPC bears a tattoo the party needs to identify to know which gang, cult, or organization they belong to. The party has seen this mark once before, in passing, on someone else.",
    solution: "The tattoo matches [a symbol described or shown earlier — on a corpse, a wanted poster, or a member the party fought or spoke with previously]. Recognizing the match reveals the NPC's true allegiance.",
    note: "Establish the symbol clearly and reuse it consistently (the same described shape and placement) whenever this group's members appear, so it becomes recognizable over time. If forgotten, a local guard, sage, or rival gang member can identify the mark for the party, at the cost of a favor or coin, rather than leaving them clueless."
  },
  {
    title: "The Toast That Opens Doors",
    prompt: "A rowdy tavern hides a secret back room. The bouncer says only, 'Buy me a drink and give the right toast, and maybe I'll forget you were ever here.' An NPC taught the party a specific toast earlier, in an unrelated context.",
    solution: "The correct toast is [a specific phrase or drinking toast an NPC used earlier, established as a marker of belonging to a particular circle — smugglers, veterans of a specific battle, members of a guild]. Saying it correctly signals the party as 'in the know' and the bouncer waves them through.",
    note: "Introduce the toast in a earlier social scene where it feels like flavor rather than a future key — repeated once by the NPC teaching it helps it stick. If forgotten, allow the party to simply buy a round and strike up conversation, letting the bouncer or another patron reveal the toast again in exchange for buying them a drink."
  },
  {
    title: "The Color That Means Danger",
    prompt: "A smuggling operation marks its safe houses and danger zones with colored ribbons or chalk marks. The party must determine which color means 'safe to enter' versus 'trap, stay away,' based on a system they were told about earlier.",
    solution: "The colors correspond to [a code explained by an informant or discovered on a note earlier in the campaign — e.g., blue means clear, red means watched, no ribbon means abandoned]. Recognizing the current mark tells the party whether to proceed.",
    note: "When the code is first revealed, have the informant state it plainly and, ideally, give the party a written note they can keep and reference later (an actual physical prop, if playing at a table, is ideal). If lost or forgotten, allow the same informant (if still alive and reachable) to be asked again, or allow an Investigation check to notice a pattern by observing several marks in the field."
  },
  {
    title: "The Name in the Letter",
    prompt: "An NPC needs the party to identify a specific relative — a nephew, a estranged sibling, a long-lost parent — by name, to prove they're trustworthy enough to be told a family secret. That relative's name was mentioned once, in a letter or a story, earlier.",
    solution: "The correct name is [the relative's name as mentioned in a letter, journal, or offhand family story established earlier in the campaign]. Providing it correctly convinces the NPC of the party's legitimacy or diligence.",
    note: "When first introducing this family detail, put the name in a document the party can keep or revisit (a letter they're holding onto is ideal, since it's a permanent reference rather than something that relies purely on memory). If the letter is lost, allow the NPC to describe the relative in enough detail (appearance, notable trait) for the party to make an educated guess, rather than demanding the exact name from memory alone."
  },
  {
    title: "The Hiding Place Mentioned in Passing",
    prompt: "The party needs to find an item an NPC hid before dying or disappearing. That NPC once mentioned, casually and without emphasis, where they liked to keep important things safe.",
    solution: "The item is hidden [wherever the NPC casually mentioned they 'always keep the important things' earlier in the campaign — under a specific floorboard, inside a hollow statue, behind a particular painting]. No further searching elsewhere in the location will find it.",
    note: "Plant this detail as genuine incidental dialogue, ideally during a calm, low-stakes scene so it doesn't stand out as foreshadowing at the time. If the party doesn't recall it, allow a thorough search of the location (Investigation checks, describing a methodical room-by-room sweep) to eventually turn it up anyway, just more slowly and at the cost of in-game time — never make it truly unfindable."
  }
];
const META_PUZZLES = [
  {
    title: "The Three-Symbol Convergence",
    prompt: "TEMPLATE: A final lock, seal, or ritual requires three (or more) distinct symbols to be combined, each of which the party encountered separately, sessions apart, in contexts that seemed unrelated at the time. WORKED EXAMPLE: A symbol glimpsed on a tapestry in a noble's hall (session 3), a symbol scratched into a prison cell wall by a previous captive (session 6), and a symbol tattooed on a cultist the party interrogated (session 9) turn out to be three pieces of the same sigil, each rotated or partial. When the party finally faces a locked reliquary door, they realize the three fragments they've separately sketched, remembered, or rubbing-copied fit together into one complete mark.",
    solution: "FRAMEWORK: Design the final symbol first, then split it into 2-4 visually distinct fragments (different rotations, different partial views, or literally different pieces of a whole image) and plant each one in a genuinely separate context, ideally 2+ sessions apart, tied to different NPCs or locations so the connection isn't obvious in the moment. The 'click' moment happens when the party, faced with the final lock, is prompted to recall or lay out everything symbol-related they've seen — the DM should describe the final lock's incomplete shape in a way that echoes the fragments precisely enough for players to make the connection themselves. WORKED EXAMPLE RESOLUTION: The tapestry symbol is the top third of a three-part sigil, the cell-wall scratching is the middle third (mirrored), and the cultist's tattoo is the bottom third — stacked together in memory or on paper, they form the reliquary's ward-breaking mark.",
    note: "Keep a private tracking document (a simple list works: 'Symbol Fragment 1 — planted session 3, tapestry, noble's hall — Fragment 2 — planted session 6, cell wall — Fragment 3 — planted session 9, cultist tattoo') so you don't lose track of what's been seeded and where. If the payoff session arrives and players have forgotten an early fragment, have an NPC who was present at that original scene resurface briefly, or let a Perception/Investigation check on the final lock reveal a faint impression matching what they saw before, nudging memory without simply handing over the answer."
  },
  {
    title: "The Accumulating Number",
    prompt: "TEMPLATE: Scattered across multiple encounters, the party notices numbers in contexts that seem like flavor or minor details — a room number, a count of something, a date — which are actually digits of a single combination needed much later. WORKED EXAMPLE: A cell door is numbered '4' (session 2), a merchant mentions losing '7' caravans to bandits (session 5), and a gravestone bears the number '2' as part of an otherwise illegible epitaph (session 8). Much later, a vault requires a three-digit code, and the party realizes 4-7-2 was scattered across their journey all along.",
    solution: "FRAMEWORK: Decide on the final code first (length and digits), then plant each digit inside a piece of information that has an obvious, unrelated reason to include a number — a room label, a loss count, a date, an age, a price — so it never reads as a clue in the moment. Space the plants across several sessions and, ideally, different types of scenes (a location, a conversation, an object) so the pattern isn't obvious until the final puzzle explicitly asks for a multi-digit code and prompts the players to search their memory or notes. WORKED EXAMPLE RESOLUTION: The vault's dial has three wheels; entering 4-7-2 in order (matching the order the party encountered the digits, or a logical order like 'least to most recent') causes it to open.",
    note: "Track exactly which digit was planted where and in what order (a simple table: digit, value, session, context). Because number-based clues are especially easy to forget, err generous with the fallback: when the vault puzzle finally comes up, allow a Investigation or Intelligence check to let a character 'recall a nagging detail' and supply one digit for free, or have an NPC companion who was present at all three moments casually mention the numbers again as in-character small talk."
  },
  {
    title: "The Phrase Chain",
    prompt: "TEMPLATE: A single distinctive phrase or turn of speech recurs from different NPCs across the campaign, seemingly as unrelated verbal color, until the party realizes it's actually a password, code, or shared identifier tying those NPCs together. WORKED EXAMPLE: A drunk sailor toasts 'to the tide that never asks twice' (session 4). Months later, a merchant closing a deal murmurs the same odd phrase under her breath (session 7). Finally, a hooded stranger at a secret meeting demands the party 'speak the tide's blessing' to be let in (session 11) — and the party realizes they've heard this phrase from two people they didn't previously connect.",
    solution: "FRAMEWORK: Write the phrase once, then hand it to two or three unrelated NPCs to use in ways that don't call attention to it (a toast, a mutter, a footnote in a letter) at intervals of several sessions. The final 'lock' scene should explicitly ask for a password or blessing, at which point the phrase's earlier, seemingly incidental appearances should surface in players' memory, ideally with a DM prompt like 'this feels familiar' if you sense they're close but not quite there. WORKED EXAMPLE RESOLUTION: Speaking 'to the tide that never asks twice' at the meeting reveals both the sailor and the merchant belong to the same smuggling network the party is now infiltrating.",
    note: "Note down every NPC you've had say the phrase and when, so you can consistently attribute it and avoid contradicting yourself later. If the party is stuck at the final gate, have the hooded stranger repeat the phrase's first few words as a prompt ('to the tide that...'), or let an ally NPC who's overheard it before supply the ending, keeping the scene moving without a hard stop."
  },
  {
    title: "The Map Fragment Jigsaw",
    prompt: "TEMPLATE: The party collects incomplete map pieces or descriptions of terrain across several unrelated encounters, which only combine into a usable whole much later when a specific destination needs to be found. WORKED EXAMPLE: A torn corner of a map is looted from a bandit camp (session 3). A different fragment is traded for information from an eccentric cartographer (session 6). A third piece is found tucked into a book in a ruined library (session 10). None alone shows a full route, but laid together they reveal the path to a hidden vault.",
    solution: "FRAMEWORK: Draw or describe the complete map first, then physically or narratively divide it into pieces distributed across separate, unrelated encounters, ideally via different means of acquisition (combat loot, a trade, a discovery) so players don't immediately suspect they're collecting a set. The payoff moment should occur when a new quest explicitly requires a route or location the party doesn't have full information for, prompting them to dig out everything map-related they've collected. WORKED EXAMPLE RESOLUTION: Laying the three fragments together (literally, if using physical or digital map props) reveals a path through a swamp that none of the individual pieces showed on their own.",
    note: "If you're using physical or digital map handouts, keep a master copy showing exactly what you've handed out and when so you can answer questions about it confidently later. If the party has lost track of a fragment, allow them to recall roughly what it showed via a check or by having them describe what they remember, and let that suffice — physical props get lost at real tables, and the puzzle shouldn't die because of it."
  },
  {
    title: "The Star Alignment Countdown",
    prompt: "TEMPLATE: An astronomer, prophecy, or ritual references a rare celestial alignment that will occur on a specific in-game date, mentioned once early on and easy to forget, which becomes critically relevant much later when the party needs to time an action correctly. WORKED EXAMPLE: An old astronomer mentions offhand that 'the red star only rises alone once every generation, and next it'll be midwinter of this very year' (session 2). Sessions later, a ritual site requires the party to perform an action only during that exact alignment, and the party must recall or rediscover the timing.",
    solution: "FRAMEWORK: Decide on an in-game date or celestial event early, mention it once clearly through a memorable NPC (ideally tied to their characterization, like an astronomer or druid), and then let significant in-game time pass before it becomes mechanically relevant. The payoff is a puzzle or ritual site that explicitly requires 'the right time,' prompting players to recall the earlier mention or investigate to rediscover it. WORKED EXAMPLE RESOLUTION: The party arrives at the ritual site during midwinter, and the red star's light through a carved aperture reveals a hidden mechanism only visible during the alignment.",
    note: "Track the specific in-game date you established and cross-reference it against your campaign's actual passage of time, since players (and DMs) lose track of in-game calendars easily over a long campaign. If the party has missed or forgotten the date, allow a local sage, almanac, or the same original NPC (if still alive) to be consulted again to re-derive the timing, so a forgotten detail costs time and effort rather than ending the questline."
  },
  {
    title: "The Color Sequence",
    prompt: "TEMPLATE: A recurring visual motif — colored flags, gemstones, robes, or banners — appears in a consistent but seemingly decorative order across multiple unrelated locations, and later turns out to encode a sequence needed to solve a puzzle (a series of levers, gems to press, or doors to open in order). WORKED EXAMPLE: A shrine's stained glass windows are arranged blue-green-red-gold (session 4). A merchant's display cases in an unrelated town use the same order for unrelated goods (session 7). A dying knight's banner has stripes in that same order (session 9). A vault finally requires four gems to be placed in a specific order to open.",
    solution: "FRAMEWORK: Establish a specific color (or symbol) order once, clearly enough to notice, then repeat that exact order in at least two or three other visually distinct contexts across sessions so it reads as thematic consistency rather than a clue. The final puzzle should require ordering something (levers, gems, switches) and explicitly invite the party to think about where they've 'seen this order before.' WORKED EXAMPLE RESOLUTION: Pressing the vault's four gems in the order blue-green-red-gold (matching every prior appearance) causes it to unlock.",
    note: "Keep a simple note of the exact order you've established and every place you've repeated it, since even a single accidental inconsistency will confuse players later. If they don't connect the pattern, let an NPC scholar or the vault itself offer a partial hint (showing two of the four correctly, for instance) so the party can reason out the rest rather than needing perfect recall."
  },
  {
    title: "The Recurring Dream",
    prompt: "TEMPLATE: One character (or the whole party) experiences a recurring, fragmentary dream or vision across multiple sessions, each installment adding a new piece of imagery, which only forms a complete picture — and a usable clue — once enough fragments have accumulated. WORKED EXAMPLE: A dream shows a burning tower (session 3), then the same dream adds a raven circling it (session 6), then a voice saying a single word, 'beneath' (session 9). Eventually the party realizes the dream depicts a real tower they've seen, and that something is hidden beneath it.",
    solution: "FRAMEWORK: Plan the full 'completed vision' first, then deliver it in small installments during quiet moments (long rests, level-ups, or after significant events) roughly every few sessions, each time adding one new concrete detail without over-explaining its meaning. The payoff arrives when the party encounters the real-world location or object matching the dream's imagery, and should be prompted (by the DM asking 'does this remind you of anything?') to recall the vision's fragments. WORKED EXAMPLE RESOLUTION: Arriving at a familiar burning-tower ruin, the party recalls the dream's word 'beneath' and thinks to search below ground level, finding a hidden chamber.",
    note: "Log each dream fragment delivered, its session, and its imagery so you can keep the dream consistent and avoid contradicting earlier details. If players don't connect the dream to the real location when it matters, have the dreaming character experience one final, more explicit installment of the vision on-site as a natural, in-fiction nudge, rather than relying purely on out-of-game memory."
  },
  {
    title: "The Villain's Scattered Identity",
    prompt: "TEMPLATE: Clues to a major villain's true identity are scattered across multiple unrelated NPCs and encounters long before the reveal, so that the eventual unmasking feels earned rather than arbitrary. WORKED EXAMPLE: A merchant mentions a noble who 'always wears gloves, even indoors' (session 2). A prisoner recalls their captor had 'a voice too smooth for a soldier' (session 6). A forged letter uses a distinctive phrase the party has heard the noble use in an unrelated context (session 10). Individually forgettable, together they identify the noble as the villain in disguise.",
    solution: "FRAMEWORK: Decide on the villain's identity and one or two distinguishing, hard-to-fake traits (a mannerism, a phrase, a physical quirk) early, then have unrelated NPCs mention those traits about 'someone' without naming the villain, spread across several sessions. The unmasking moment should happen when the party is in a scene with a disguised or unrevealed villain and a trait resurfaces — reward players who independently connect the dots with confirmation, rather than requiring a specific action to trigger it. WORKED EXAMPLE RESOLUTION: When the 'noble' finally removes their gloves in front of the party, the mismatched detail (scarred hands the prisoner also mentioned) confirms their identity even before any formal reveal.",
    note: "Keep an explicit private list of every trait you've planted, when, and through whom, since consistency here is what sells the reveal. If the party reaches the unmasking scene without having connected the earlier clues, let a loyal NPC ally voice the realization aloud in the moment ('wait... the gloves...') so the payoff still lands even if the players didn't piece it together entirely on their own."
  },
  {
    title: "The Triangulated Rumor",
    prompt: "TEMPLATE: No single NPC knows the full truth about a hidden location or secret, but three or more NPCs across different sessions each know a partial, sometimes contradictory piece, and only by comparing all accounts does the truth (and a location) become clear. WORKED EXAMPLE: A fisherman says a strange light appears over the lake 'every few months, always at the old dock' (session 3). A drunk historian insists there's no dock, only ruins, and the light is 'probably swamp gas' (session 6). A child claims to have seen 'a door made of light' out there once (session 8). Together, the accounts triangulate a submerged, periodically-active magical portal at the ruined dock.",
    solution: "FRAMEWORK: Design the true fact first, then create 2-4 NPCs who each know a distorted or partial piece of it (rumor, folklore, personal sighting), planted across different sessions and ideally different locations, so players have to actively seek out and compare accounts rather than getting a single clean answer. The 'click' moment comes when a player explicitly lays the accounts side by side (encourage this by having a party member with good memory or notes prompt it). WORKED EXAMPLE RESOLUTION: Comparing all three accounts, the party deduces a periodic magical event at a specific location, and can plan to arrive at the right time.",
    note: "Track which NPC said what and how distorted or reliable each account is meant to be, so you can play each consistently if revisited. If the party never circles back to compare the accounts, have a new NPC (a folklorist, a curious scholar) offer to help them compile the rumors for a fee, effectively doing the triangulation with them rather than leaving the thread permanently dangling."
  },
  {
    title: "The Item's Long Journey",
    prompt: "TEMPLATE: A cursed or significant item passes through several unrelated hands across the campaign — sold, stolen, gifted — before the party finally needs to trace its provenance to solve a mystery or lift a curse. WORKED EXAMPLE: A pawnbroker mentions selling an odd ring 'to a traveling monk, years back' (session 2). A monk NPC later mentions having given the same ring away to settle a debt (session 5). A debt collector's ledger names the final recipient (session 9). Tracing the ring's path leads the party to whoever currently holds it — and to understanding what it actually does.",
    solution: "FRAMEWORK: Decide the item's full chain of ownership in advance (who had it, when, and why they parted with it), then reveal each link through a different, unrelated NPC or document across several sessions, without initially flagging the item as important. When the item's true nature or a curse tied to it finally becomes relevant, prompt the party to trace its provenance backward or forward through the chain they've now heard piecemeal. WORKED EXAMPLE RESOLUTION: Following the chain (pawnbroker to monk to debt collector to final owner), the party locates the ring's current holder and, with it, the means to end its curse.",
    note: "Keep a simple provenance chart (owner, session mentioned, how it changed hands) so you can answer follow-up questions confidently. If the party loses the thread partway through the chain, let the next link in the chain resurface naturally in an unrelated scene (the debt collector shows up demanding payment from the party themselves, for instance), organically pulling them back onto the trail."
  },
  {
    title: "The Cameo Pattern",
    prompt: "TEMPLATE: A minor, easily-dismissed NPC appears briefly in several unrelated encounters across the campaign — always in the background, never central — until the party realizes this person has been watching or influencing events all along. WORKED EXAMPLE: A quiet figure in a gray coat is glimpsed at the edge of a market crowd (session 2), then briefly serves drinks at a noble's party (session 6), then is spotted leaving a crime scene just as the party arrives (session 10). No single appearance seems significant, but the pattern reveals a recurring watcher.",
    solution: "FRAMEWORK: Create a minor NPC with a consistent, brief visual signature (an unusual coat, a distinct way of standing, a specific detail) and have them appear silently or peripherally in 3-5 otherwise unrelated scenes across many sessions, never drawing direct attention. The payoff comes when a player finally asks 'wait, haven't I seen that person before?' — reward that instinct immediately by confirming the pattern is real and meaningful. WORKED EXAMPLE RESOLUTION: Once flagged, the party can investigate the figure directly, discovering they're an agent of a faction that has been quietly tracking the party's movements the entire campaign.",
    note: "Log every appearance of the cameo NPC (session, location, what they were doing) so you can keep their movements internally consistent and prove the pattern was real when questioned. If no one notices the pattern by the time it matters, have the figure appear once more, this time clearly and directly (making eye contact, or being caught in the act of something), forcing the connection into the open."
  },
  {
    title: "The Coin Mark Trail",
    prompt: "TEMPLATE: Coins or tokens bearing an unusual minting mark or symbol turn up in unrelated transactions and locations across the campaign, eventually revealing a smuggling route or hidden organization when the party notices the mark keeps recurring. WORKED EXAMPLE: A coin with a tiny anchor stamped into it is received as change at a tavern (session 3). The same anchor mark appears on a coin found in a bandit's pouch (session 7). A merchant later refuses to accept 'anchor coins' at all, muttering about bad luck (session 9). The party realizes the mark identifies currency tied to a specific smuggling ring.",
    solution: "FRAMEWORK: Invent a small, distinct mint mark or symbol and have it appear on coins or tokens in at least three unrelated transactions or discoveries across sessions, with NPCs treating the coins as unremarkable each time. The reveal comes when an NPC finally reacts strongly to the mark (refusing it, recognizing it, warning about it), prompting the party to realize they've been collecting or spending marked currency for sessions. WORKED EXAMPLE RESOLUTION: Following the marked coins' trail of transactions backward leads the party to the smuggling ring's hidden counting house.",
    note: "Track exactly which transactions included marked coins so you can have NPCs respond consistently if the party asks pointed questions. If the party has already spent their marked coins and lost the physical trail, allow a coin-collector, moneylender, or guard with a good eye to remember handling similar coins recently and help reconstruct the trail through secondhand testimony."
  },
  {
    title: "The Architectural Echo",
    prompt: "TEMPLATE: A distinctive architectural style, building material, or construction technique appears in several unrelated locations, eventually revealing that they were all built by the same hidden group or in service of the same hidden purpose. WORKED EXAMPLE: An abandoned watchtower uses unusually smooth, seamless stonework unlike normal masonry (session 4). A wealthy merchant's cellar has the same seamless stone walls (session 8). A ruin deep in the wilderness the party assumed was ancient turns out to use identical construction (session 12). The party realizes all three were built using the same lost technique, tying them to a single ancient order.",
    solution: "FRAMEWORK: Invent a distinctive, describable construction detail (a stone-fitting technique, a specific rune carved into foundations, an unusual building material) and use it consistently across three or more otherwise unrelated locations spread across many sessions, without initially explaining its significance. The connection clicks when the party, standing in a new location, notices the same detail and a player says 'wait, this looks like—' — confirm the link and let them investigate why. WORKED EXAMPLE RESOLUTION: Realizing all three sites share the same construction, the party investigates who built them and uncovers a hidden order operating across centuries.",
    note: "Keep a running list of every location where you've used the shared architectural detail, described precisely enough that you can repeat the description consistently. If players don't notice the echo on their own, have a stonemason, architect, or scholar NPC point it out when the party describes a location to them, effectively doing the pattern recognition on the party's behalf as a fair assist."
  },
  {
    title: "The Prophecy Fulfilled Sideways",
    prompt: "TEMPLATE: A prophecy or cryptic prediction is delivered early in the campaign in vague, symbolic terms; its true meaning only becomes clear much later when unrelated party actions accidentally fulfill it, letting the DM reveal that the 'signs' were happening all along. WORKED EXAMPLE: A seer warns that 'when the wolf wears a crown, the old wall will fall' (session 2). Sessions later, the party defeats a bandit chief who happens to wear a wolfskin cloak and a stolen circlet (session 9), and that same week (unrelated to the prophecy at the time) they help collapse a section of an ancient wall during an unrelated fight (session 10). Looking back, the prophecy was fulfilled by their own actions without them realizing it in the moment.",
    solution: "FRAMEWORK: Write a vague, symbolic prophecy with two or three flexible images (an animal, an object, an event) early on, then watch for or gently steer opportunities across the campaign where party actions could plausibly match those images, even loosely. The reveal doesn't need to be 'solved' by the party directly — instead, have an NPC (the original seer, or another mystic) point out after the fact that the prophecy has already come true, retroactively re-contextualizing earlier sessions. WORKED EXAMPLE RESOLUTION: The seer returns and tells the party the prophecy is fulfilled, revealing that their unrelated victories were the 'wolf' and the 'wall' all along, and that the next stage of the prophecy is now beginning.",
    note: "Keep the prophecy's exact original wording written down verbatim so you can quote it precisely when revealing the connection — the payoff depends on the words matching cleanly. This technique is intentionally forgiving of player memory since the DM actively looks for and confirms the connection, but if you want players to feel clever for spotting it themselves, drop the seer's original wording again as a reminder a session or two before the reveal."
  },
  {
    title: "The Ritual Requiring Multiple Factions' Pieces",
    prompt: "TEMPLATE: A powerful ritual or mechanism can only be completed using components or knowledge held separately by two or more factions the party has dealt with across different arcs of the campaign, forcing them to recall and revisit relationships built much earlier. WORKED EXAMPLE: A binding ritual needs a rare reagent the party knows only the Sunspire druids possess (session 5 arc), a specific incantation only taught to initiates of a mage's college the party attended (session 9 arc), and permission or blessing from a border lord the party allied with (session 13 arc). No single arc gave the party everything; the ritual can only be completed by returning to all three.",
    solution: "FRAMEWORK: Design the final ritual's full requirements first, then deliberately distribute the pieces (an item, a password/incantation, a permission or blessing) across separate story arcs and factions established well apart in the campaign's timeline. The payoff moment is when the party, facing the ritual, must inventory what they have and realize they need to revisit factions from earlier arcs, testing whether those relationships were maintained. WORKED EXAMPLE RESOLUTION: The party returns to the Sunspire druids, the mage's college, and the border lord in turn, and whether each faction still helps them may depend on how those earlier relationships were left.",
    note: "Maintain a clear checklist of every faction, what piece they hold, and the state of the party's relationship with them, since this technique doubles as a callback to prior roleplay choices. If the party has badly damaged a relationship needed for a piece, don't hard-block them — offer an alternate, harder path to the same piece (a rival within that faction, a black-market substitute) so consequences matter without ending the questline outright."
  },
  {
    title: "The Minor NPC Becomes the Key",
    prompt: "TEMPLATE: A background NPC introduced early for flavor or a single small interaction turns out, many sessions later, to hold the final piece of a major puzzle or questline, rewarding players who treated even minor characters with attention and kindness. WORKED EXAMPLE: A stable boy the party tipped generously for watching their horses (session 2) is, unbeknownst to them, the estranged heir to a merchant house whose seal the party desperately needs much later (session 14). Because they were kind to him early on, he's willing to help when they finally realize who he is.",
    solution: "FRAMEWORK: Pick an early, low-stakes NPC interaction and quietly decide (even if only in your private notes) that this character has a larger role to play later. Let the character reappear once or twice in between, in small ways, before the final payoff scene where their true significance is revealed, ideally in a way that rewards how the party originally treated them. WORKED EXAMPLE RESOLUTION: The party, needing the merchant house's seal, tracks down the heir and finds the stable boy they were kind to years ago, now willing to help because of that first impression.",
    note: "Note down which minor NPCs you've earmarked for a future callback, including how the party treated them, so the eventual payoff can genuinely reflect earlier choices rather than being generic. If the party doesn't remember the NPC at all when the reveal comes, let the NPC remember them clearly and reference the specific earlier interaction themselves, refreshing the connection from the NPC's side rather than requiring player recall."
  },
  {
    title: "The Nightmare Password",
    prompt: "TEMPLATE: A cursed or haunted location causes visiting characters to share the same recurring nightmare across sessions, each time revealing a new fragment of a phrase; only by comparing notes after multiple exposures does the party assemble a password or ritual phrase needed to lift the curse. WORKED EXAMPLE: Sleeping within a day's travel of a cursed manor, one character dreams the words 'ash remembers' (session 4). A different character has the same dream weeks later, hearing 'ash remembers what fire forgets' (session 8). A third exposure completes it: 'ash remembers what fire forgets, and so must you' (session 11).",
    solution: "FRAMEWORK: Write the complete phrase first, then split it into sequential fragments delivered as dream content to characters who spend time near the cursed source, spaced across sessions so no single dream gives the whole answer. The party should be encouraged to keep notes on dream content specifically because it recurs — the 'click' happens when they lay multiple dream transcripts together and notice they form one continuous sentence. WORKED EXAMPLE RESOLUTION: Speaking the full assembled phrase at the heart of the cursed manor breaks the curse.",
    note: "Track exactly which fragment was delivered to which character and when, since consistency in dream content across a long campaign is easy to lose track of. If the party hasn't collected all fragments by the time they attempt the ritual, allow one final, complete dream to occur to whichever character is present at the climax, ensuring the payoff always lands even if earlier fragments were missed or forgotten."
  },
  {
    title: "The Long-Foreshadowed Return",
    prompt: "TEMPLATE: A defeated or departed threat from early in the campaign is explicitly not fully resolved (escapes, is sealed rather than killed, or vanishes), and small, spread-out hints of their survival and growing influence are planted across many later sessions until a final confrontation recontextualizes the entire campaign. WORKED EXAMPLE: A cult leader the party drove off rather than killed (session 3) is rumored to have been seen alive by a trader (session 8), their symbol reappears on a captured raider's banner (session 13), and a captured lieutenant refuses to say the leader's name 'out of fear, not loyalty' (session 17) — building dread toward their eventual full return.",
    solution: "FRAMEWORK: Decide early that a defeated threat survives in some form, then plant deliberately sparse, spaced-out confirmations of their continued existence and growing power across many sessions — a rumor, a symbol, a fearful reaction — without ever fully re-engaging them until the intended finale. The payoff is a climactic reappearance where the accumulated hints are explicitly acknowledged, giving the return weight because the players have been watching the pattern build (even subconsciously) for a long time. WORKED EXAMPLE RESOLUTION: The cult leader reappears in person, now far more powerful, and the DM can call back each planted hint ('you first heard he still lived from a trader, all those months ago') to underline how long this has been building.",
    note: "Keep a dedicated tracking note for this specific long-arc threat: every hint planted, its session, and its source, since this is the highest-risk-of-forgetting technique on this list given how spread out it is. If you sense the players have entirely lost the thread by the time of the return, have the returning villain themselves recap their own survival in a gloating monologue — letting the antagonist do the reminding is both narratively natural and forgiving of a table that missed earlier clues."
  }
];
