# gta6-trophy-guide-01

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/rizkyptrp/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/rizkyptrp/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

**Leonida Trophy Guide** — a free, open-source, offline trophy guide and tracker for Grand Theft Auto VI on PlayStation 5. It covers all **55 official trophies — 1 platinum, 2 gold, 6 silver and 46 bronze, 28 of them hidden** — each with its official name, description and grade exactly as PlayStation publishes them, plus a guide in my own words that cites its sources: what to do, where and how, and when it can be missed.

There are no online trophies, so the whole platinum is earnable solo, in a single playthrough of about 200 hours — but there is no mission replay, so the guide is built around saving by hand and not missing anything along the way.

## What it does

- **Tracker** — tick trophies off on a checklist; progress is saved in the browser (localStorage) and can be exported to a JSON file and imported back, so a backup survives a cleared browser.
- **Filters** — by kind (story, side strands, collectibles, activities, robbery, free roam, money, platinum & 100%), by grade, by earned / not earned / missable / hidden, plus free-text search across names, descriptions, guides and steps.
- **Spoiler setting** — on by default, it hides the names and descriptions of hidden story trophies until you earn them, so browsing the list does not spoil the story.
- **A guide for every trophy** — each of the 55 has its own guide with steps where they help, written in my own words. Every guide names its sources beside it.
- **Works offline** — plain static files under `app/`, no build step, no network request at run time. Open it with the network off and it still works.
- **Deep links** — share a filtered view with a hash, for example `#kind=story`, `#view=missable`, `#grade=gold` or `#spoilers=off`.

## Roadmap to the platinum

The roadmap is a five-stage route to the platinum, built from the official trophy descriptions:

1. **Stage 1 — Play the story** (12 trophies): Chapters 1 to 5 and the final mission. Save by hand at the start of every chapter — there is no mission replay.
2. **Stage 2 — Side strands** (8 trophies): the five side-character finales, Bret's hunt, and the stranger strands.
3. **Stage 3 — Partner & robbery** (16 trophies): partner trophies, bank vaults, jewelry and armored trucks, the VCIA plane, the Rhino tank, and hidden free-roam moments.
4. **Stage 4 — Collectibles & grinds** (17 trophies): cards, WAiNK locations, vehicles, stunts, races, the shooting range, challenges, marked bills, spending and garages.
5. **Stage 5 — 100% & platinum** (2 trophies): clear the 100% checklist under Progress, Stats, 100% Completion after the story; **A Long Road** pops, then the platinum, **Vice Got a Price!**

Keep one manual save at the start of every chapter and one untouched save from just before the final mission. There are 15 manual save slots plus one autosave.

### The one missable trophy

**Positive Mental Attitude** — meditate at all 18 spots across Leonida. One spot, Lucia's balcony meditation in Chapter 1, disappears when the chapter ends: after Lucia is home, check the kitchen in the morning (a morning after the mission Down to Earth is the usual time), follow her to the balcony of Jason's house and accept the optional task. Keep a Chapter 1 save until it pops.

Also time-sensitive, not missable: the Race Against Yago in Chapter 3 carries an hourglass icon and counts toward the Strangers & Freaks strand — race the moment it appears.

## Sources

Official names, descriptions, grades and hidden flags are shown exactly as PlayStation publishes them, as listed by **Exophase** and **PSNProfiles** (18 November 2026), who agree on all 55. Unlock methods, counts and the missable warning are drawn from **Output Lag — GTA 6 Trophy List** (18 November 2026), **Press-Start — GTA 6 trophy list** (18 November 2026), and **GTABase / PowerPyx** (missable flag). Every trophy's guide names its sources beside it, and all guide text is my own words — nothing is copied from another guide.

This is an unofficial fan guide, not affiliated with Rockstar Games. No Rockstar logo, official artwork or game screenshots are used.

## How to use it

1. Open the app (see [Run it](#run-it) below, or serve `app/` with any static server — `node serve.ts` serves it on http://localhost:8080).
2. Read the roadmap at the top and keep a manual save at the start of every chapter.
3. Tick off each trophy as you earn it — your progress is saved in this browser automatically.
4. Use the filters and search to find what to do next: filter by kind or grade, show only what is not earned yet, or show only the missable trophy.
5. Keep the spoiler setting on if you do not want story trophies revealed before you earn them.
6. Export your progress to a JSON file now and then, so you have a backup.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That copies `app/` and `screenshots/` into `out/` and writes `out/dossier.json` (the hand-in summary the judge reads). Needs Node.js 22.18 or later; no other install step, no build step.

To just try the guide locally, serve `app/` with any static server — `node serve.ts` serves it on http://localhost:8080 — or open `app/index.html` straight from the files. It also opens from `file://`.

## Layout

- `main.ts` — the hand-in program: copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the kit's `vendor/makefun-frontend.ts` library.
- `serve.ts` — a tiny static server for trying the guide locally (Node standard library only).
- `app/index.html` — the guide page: roadmap, filters, checklist, sources.
- `app/app.js` — tracker logic: rendering, filters, search, spoiler setting, localStorage progress, export/import.
- `app/roadmap.js` — the five roadmap stages.
- `app/style.css` — the guide's own look.
- `app/data/trophies.json` — all 55 trophies: official name, description, grade, hidden flag, kind, roadmap stage, guide, steps and sources.
- `screenshots/` — four real renders of the guide running: cover, checklist, roadmap, missable trophy.

---

<sub>Entered on [make.fun](https://make.fun/?ref=67v2e6cq&utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>
