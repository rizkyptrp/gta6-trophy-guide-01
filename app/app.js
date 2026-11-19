// Leonida Trophy Guide — tracker logic.
// Loads data/trophies.json, renders the checklist, saves earned trophies in
// localStorage, and filters by kind, grade, earned state, text and spoilers.
// Classic script (no modules) so the guide also opens straight from file://.

const STORAGE_KEY = "leonida-trophy-progress-v1";
const SPOILER_KEY = "leonida-trophy-spoilers-v1";

const cardsEl = document.getElementById("cards");
const earnedCountEl = document.getElementById("earned-count");
const progressFillEl = document.getElementById("progress-fill");
const progressTextEl = document.getElementById("progress-text");
const shownCountEl = document.getElementById("shown-count");
const spoilerNoteEl = document.getElementById("spoiler-note");
const emptyNoteEl = document.getElementById("empty-note");
const kindFilterEl = document.getElementById("kind-filter");
const gradeFilterEl = document.getElementById("grade-filter");
const earnedFilterEl = document.getElementById("earned-filter");
const searchEl = document.getElementById("search");
const spoilerToggleEl = document.getElementById("spoiler-toggle");

let earned = loadEarned();
let hideSpoilers = loadSpoilerSetting();
let trophies = [];

// Deep links: #kind=story, #view=missable, #spoilers=off — handy for sharing a
// filtered view and for the entry's screenshots.
const deepLink = new URLSearchParams(location.hash.slice(1));
if (deepLink.get("spoilers") === "off") hideSpoilers = false;
if (deepLink.get("kind")) kindFilterEl.value = deepLink.get("kind");
if (deepLink.get("view")) earnedFilterEl.value = deepLink.get("view");
if (deepLink.get("grade")) gradeFilterEl.value = deepLink.get("grade");
spoilerToggleEl.checked = hideSpoilers;

async function init() {
  const doc = await (await fetch("data/trophies.json")).json();
  trophies = doc.trophies;
  renderRoadmap(document.getElementById("stages"));
  render();
}

init();

function loadEarned() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return new Set(Array.isArray(saved) ? saved.filter((n) => typeof n === "string") : []);
  } catch {
    return new Set();
  }
}

function loadSpoilerSetting() {
  return localStorage.getItem(SPOILER_KEY) !== "off";
}

function saveEarned() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...earned]));
}

function gradeLabel(grade) {
  return grade === "platinum" ? "Platinum" : grade[0].toUpperCase() + grade.slice(1);
}

function kindLabel(kind) {
  const labels = {
    story: "Story",
    side: "Side strand",
    collectibles: "Collectibles",
    activities: "Activities",
    robbery: "Robbery",
    freeroam: "Free roam",
    money: "Money",
    platinum: "Platinum & 100%",
  };
  return labels[kind] ?? kind;
}

function isStorySpoiler(trophy) {
  return trophy.hidden && (trophy.kind === "story" || trophy.kind === "side");
}

function matchesFilters(trophy) {
  const kind = kindFilterEl.value;
  if (kind !== "all" && trophy.kind !== kind) return false;
  if (gradeFilterEl.value !== "all" && trophy.grade !== gradeFilterEl.value) return false;
  const view = earnedFilterEl.value;
  const isEarned = earned.has(trophy.name);
  if (view === "todo" && isEarned) return false;
  if (view === "earned" && !isEarned) return false;
  if (view === "missable" && !trophy.missable) return false;
  if (view === "hidden" && !trophy.hidden) return false;
  const query = searchEl.value.trim().toLowerCase();
  if (query) {
    const haystack = `${trophy.name} ${trophy.description} ${trophy.guide} ${(trophy.steps ?? []).join(" ")}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }
  return true;
}

function buildCard(trophy) {
  const isEarned = earned.has(trophy.name);
  const card = document.createElement("article");
  card.className = "card" + (isEarned ? " earned" : "") + (trophy.missable ? " missable-card" : "");

  const head = document.createElement("div");
  head.className = "card-head";
  const box = document.createElement("input");
  box.type = "checkbox";
  box.checked = isEarned;
  box.setAttribute("aria-label", `Mark ${trophy.name} as earned`);
  box.addEventListener("change", () => {
    if (box.checked) earned.add(trophy.name);
    else earned.delete(trophy.name);
    saveEarned();
    render();
  });
  const titleWrap = document.createElement("div");
  const title = document.createElement("div");
  title.className = "card-title";
  const desc = document.createElement("div");
  desc.className = "card-desc";
  const spoilerHidden = hideSpoilers && isStorySpoiler(trophy) && !isEarned;
  if (spoilerHidden) {
    title.textContent = "Hidden trophy — earn it to reveal its name";
    desc.textContent = "Story trophy, hidden on PlayStation until earned. Turn the spoiler setting off to see it.";
    desc.classList.add("spoiler-hidden");
  } else {
    title.textContent = trophy.name;
    desc.textContent = trophy.description;
  }
  titleWrap.append(title, desc);
  head.append(box, titleWrap);
  card.append(head);

  const badges = document.createElement("div");
  badges.className = "badges";
  const gradeBadge = document.createElement("span");
  gradeBadge.className = `badge ${trophy.grade}`;
  gradeBadge.textContent = gradeLabel(trophy.grade);
  badges.append(gradeBadge);
  const kindBadge = document.createElement("span");
  kindBadge.className = "badge kind-badge";
  kindBadge.textContent = kindLabel(trophy.kind);
  badges.append(kindBadge);
  if (trophy.hidden) {
    const hiddenBadge = document.createElement("span");
    hiddenBadge.className = "badge hidden-badge";
    hiddenBadge.textContent = "Hidden";
    badges.append(hiddenBadge);
  }
  if (trophy.missable) {
    const missableBadge = document.createElement("span");
    missableBadge.className = "badge missable-badge";
    missableBadge.textContent = "⚠ Missable";
    badges.append(missableBadge);
  }
  if (trophy.count) {
    const countBadge = document.createElement("span");
    countBadge.className = "badge";
    countBadge.textContent = `Count: ${trophy.count.toLocaleString()}`;
    badges.append(countBadge);
  }
  card.append(badges);

  const guide = document.createElement("p");
  guide.className = "card-guide";
  const guideLabel = document.createElement("strong");
  guideLabel.textContent = "How to get it: ";
  guide.append(guideLabel);
  if (spoilerHidden) {
    guide.append(document.createTextNode("Hidden until earned — the guide is behind the spoiler setting too."));
  } else {
    guide.append(document.createTextNode(trophy.guide));
  }
  card.append(guide);

  if (!spoilerHidden && Array.isArray(trophy.steps) && trophy.steps.length) {
    const steps = document.createElement("ol");
    steps.className = "steps";
    for (const step of trophy.steps) {
      const item = document.createElement("li");
      item.textContent = step;
      steps.append(item);
    }
    card.append(steps);
  }

  const sources = document.createElement("p");
  sources.className = "card-sources";
  sources.textContent = spoilerHidden
    ? "Sources: Exophase · PSNProfiles (revealed when earned)"
    : `Sources: ${(trophy.sources ?? ["Exophase", "PSNProfiles"]).join(" · ")}`;
  card.append(sources);
  return card;
}

function renderProgress() {
  const total = trophies.length;
  const count = earned.size;
  earnedCountEl.textContent = String(count);
  const percent = Math.round((count / total) * 100);
  progressFillEl.style.width = `${percent}%`;
  progressTextEl.textContent = `${count} of ${total} earned · ${percent}% to the platinum`;
}

function render() {
  renderProgress();
  const visible = trophies.filter(matchesFilters);
  cardsEl.replaceChildren(...visible.map(buildCard));
  shownCountEl.textContent = `Showing ${visible.length} of ${trophies.length} trophies.`;
  spoilerNoteEl.textContent = hideSpoilers
    ? "Spoiler setting on: story trophies stay hidden until you earn them."
    : "Spoiler setting off: all story trophies are shown.";
  emptyNoteEl.hidden = visible.length > 0;
}

function exportProgress() {
  const payload = { game: "Grand Theft Auto VI", exportedAt: new Date().toISOString(), earned: [...earned] };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "gta6-trophy-progress.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

async function importProgress(file) {
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const names = Array.isArray(data) ? data : data.earned;
    if (!Array.isArray(names)) throw new Error("not a progress file");
    const known = new Set(trophies.map((t) => t.name));
    earned = new Set(names.filter((n) => typeof n === "string" && known.has(n)));
    saveEarned();
    render();
  } catch {
    alert("That file is not a trophy progress export from this guide.");
  }
}

document.getElementById("export-btn").addEventListener("click", exportProgress);
document.getElementById("import-file").addEventListener("change", (event) => {
  importProgress(event.target.files[0]);
  event.target.value = "";
});
document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Clear all earned trophies?")) {
    earned = new Set();
    saveEarned();
    render();
  }
});
spoilerToggleEl.addEventListener("change", () => {
  hideSpoilers = spoilerToggleEl.checked;
  localStorage.setItem(SPOILER_KEY, hideSpoilers ? "on" : "off");
  render();
});
for (const el of [kindFilterEl, gradeFilterEl, earnedFilterEl]) el.addEventListener("change", render);
searchEl.addEventListener("input", render);
