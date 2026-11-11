# Handover — Sindhu Accord Film

> Repo-local facts for one spec, kept in `specs/NNN-slug/handover.md`. A handover is a snapshot:
> lasting facts live in ARCHITECTURE.md, the contracts and the decision record — link, don't copy.
> Test: a new engineer can continue without asking why each major decision was made.

**Status:** open
**RFC:** RFC-0001 — rationale, rejected alternatives and deploy order live there, not here.
**Cross-repo handover:** none — internal RFC

## What this repo changed
Everything in the repo is new. The lasting picture is in ARCHITECTURE.md and CODEMAP.md.
- `docs/` — the approved script, shot list and six design pictures.
- `film/shared/` — cast, look, maps (India's outline), sets, timeline builder, shot player, sound.
- `film/<part>/` — six parts: `cold-open`, `act-1` to `act-4`, `epilogue`; plus `design-sheet`.
- `film/tools/` — `speak.js` (voices) and `teasers.js`; `film/build.js` joins and checks the film.
- `out/` — `shanti-dweep.srt`, `build-report.json`, `contact-sheet.png`, `KNOWN-ISSUES.md`. Video is git-ignored.

## State: done / in progress / deliberately deferred
- **Done:** the film (11:48, 1920x1080, 30 fps), the English subtitle file, five vertical teasers, the known-issues list. Every stage was approved by the owner: script, shot list, designs, and each of the six parts.
- **Deliberately not done:** painted frames, human voices, a Marathi accent, publishing. See RFC-0001 §9.
- **Not verified:** the sound was measured, never heard. India's northern border was hand-plotted and not laid over the Survey of India map.

## Contracts used or provided
None.

## Known limitations and edge cases
The full list is `out/KNOWN-ISSUES.md` (24 items). The ones a maintainer must know:
- Video files and voice files are not in git. A fresh clone must download the voices and render every part (about an hour) before `film/build.js` works.
- A part's timeline comes from its measured voice lengths. After changing any spoken line, run `film/tools/speak.js <part>` before anything else, or sound and picture will not match the words.
- After editing `film/shared/`, run `node film/sync.js`: each part renders from its own git-ignored copy.
- The engine's own render steps can fail without stopping a shell pipeline that pipes them through `tail`. Always compare the joined file's length with the score; `film/build.js` does this for every part.
- The sound step stops with an error on any invalid sample. If it does, look for a gain or time computed from a missing field.

## How to run, test and deploy
Exact commands are in AGENTS.md under "Film commands". Test: `node film/build.js` exits 0 and prints no problems. By hand: the spec's section 8. Deploy: none; the owner publishes by hand.

## Ownership and support
**Owner:** iaacc7640-max
**Requested by:** iaacc7640-max
**Implemented by:** iaacc7640-max, via Claude Code
**Deployed by / how to deploy:** not deployed; the owner uploads `out/shanti-dweep.mp4` and the teasers to YouTube by hand.
**Support (first contact, escalation, hours):** iaacc7640-max (GitHub). No escalation path or hours were given.

## Next three recommended actions
1. Listen to the whole film once, with a Hindi and an Urdu speaker if possible, and note any mispronounced word; each is fixed by a voice-only respelling in that part's `score.js`.
2. Lay India's outline in `film/shared/maps.js` over the official Survey of India map and correct the hand-plotted northern edge if it differs.
3. Decide whether to keep the burned-in English subtitles or render a clean version and rely on the subtitle file.
