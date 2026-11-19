// Roadmap to the platinum: five stages in the order the trophies should be earned.
// Stage numbers match the "stage" field on each trophy in data/trophies.json.
// Loaded as a classic script before app.js; app.js calls renderRoadmap.
const ROADMAP_STAGES = [
  {
    stage: 1,
    title: "Stage 1 — Play the story",
    text: "Chapters 1 to 5 and the final mission: 12 story trophies plus the gold for finishing. Save by hand at the start of each chapter — there is no mission replay.",
    trophies: 12,
  },
  {
    stage: 2,
    title: "Stage 2 — Side strands",
    text: "The five side-character finales (Andy, Kenton, Billy, Randy, Tyrone), Bret's hunt, and 8 stranger strands. Do Lucia's balcony meditation in Chapter 1 first — it is the only missable trophy.",
    trophies: 8,
  },
  {
    stage: 3,
    title: "Stage 3 — Partner & robbery",
    text: "Partner trophies (Hot Together, Retail Therapy), bank vaults, jewelry and armored trucks, the VCIA plane, the Rhino tank, and the hidden free-roam moments.",
    trophies: 16,
  },
  {
    stage: 4,
    title: "Stage 4 — Collectibles & grinds",
    text: "Cards, WAiNK locations, vehicles, stunts, races, the shooting range, challenges, marked bills, spending and garages. Keep going past each trophy's number — 100% wants more.",
    trophies: 17,
  },
  {
    stage: 5,
    title: "Stage 5 — 100% & platinum",
    text: "Open the 100% checklist under Progress, Stats, 100% Completion after the story and clear what is left. A Long Road pops, then the platinum.",
    trophies: 2,
  },
];

// Render the five roadmap stages into the ordered list on the page.
function renderRoadmap(listElement) {
  listElement.replaceChildren();
  for (const stage of ROADMAP_STAGES) {
    const item = document.createElement("li");
    const title = document.createElement("b");
    title.textContent = stage.title;
    const body = document.createElement("p");
    body.textContent = stage.text;
    const count = document.createElement("span");
    count.className = "stage-count";
    count.textContent = `${stage.trophies} trophies`;
    item.append(title, body, count);
    listElement.append(item);
  }
}
