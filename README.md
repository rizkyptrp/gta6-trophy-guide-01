# gta6-trophy-guide-01

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/rizkyptrp/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/rizkyptrp/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

## Leonida Trophy Guide

An entry for the make.fun bounty **gta6-trophy-guide-01**: "Build the best GTA 6 trophy guide" ($250).

Leonida Trophy Guide is a free, open-source, offline GTA 6 trophy guide and tracker — a static web app that works from its own files, no network, no account sync. It covers all 55 official trophies with name, description and grade, plus a guide to each in the entrant's own words that cites its sources.

- Tracker: a checklist saved in the browser, with export and import, filters by kind, grade, earned, missable and hidden, plus search and a spoiler setting that hides story trophies until earned
- 5-stage roadmap to the platinum, with the missables flagged — Positive Mental Attitude is the one missable trophy
- 28 hidden trophies researched from Exophase, PSNProfiles and Output Lag; 5 trophies with no confirmed trigger are explicitly marked unconfirmed rather than guessed
- Works offline from static files; everything runs in the browser

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `app/` and `screenshots/` to `out/` and writes `out/dossier.json`. Run it twice and compare — the output is deterministic.

Serve the app locally with `node serve.ts`, then open http://localhost:8080.

---

<sub>Entered on [make.fun](https://make.fun/?ref=67v2e6cq&utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>
