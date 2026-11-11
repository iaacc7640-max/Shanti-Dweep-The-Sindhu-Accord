# AGENTS.md — workspace of Shanti-Dweep-The-Sindhu-Accord

Instructions for coding agents. Humans: read PROJECT.md first.

## Read before you write anything
1. `PROJECT.md` — what we build and why, and who to ask.
2. `ARCHITECTURE.md` — the boxes and their names.
3. `CONSTITUTION.md` — non-negotiable rules.
4. `CONTRACTS/` — what each repo promises the others.
5. `DECISIONS/` — RFCs (proposals, approved or not) and the ADRs they left behind.

## Tooling defaults
- Python repos use `uv` (`uv add`, `uv sync`, `uv run`) — never `pip`. Each repo commits its own `uv.lock`.
- Each repo records its code layout (`groundwork.py layout`, run inside it): the GroundWork standard folders, or "keep" —
  its own structure, where new code follows the existing patterns. Follow what the repo recorded.

## Code quality
Run `groundwork.py verify` after every change (it runs the commands below) and fix what fails. Never weaken a rule,
add an ignore comment or skip a test to make it pass; an ignore needs a reason on the same line.

- (none yet: they appear when code is added)

1. Reuse before writing: look in CODEMAP.md and search for an existing function first. Never copy-paste a block.
2. Make the smallest change that meets the spec. No speculative abstractions, options or layers.
3. Never swallow errors (no empty catch, no blind `except Exception`). Handle them at the entry point.
4. Validate input where it enters (routes, commands, consumers). Parameterised SQL only; no shell built from input.
5. Add a dependency only with the package manager, after checking it exists and is maintained; prefer what is already used.
6. Comments say why, never what. No commented-out code; no TODO without a tracked item.
7. Names come from the domain (PROJECT.md glossary); no Manager/Helper/Util names.
8. Test behaviour through public functions; mock only connectors to outside systems. A test must fail when the code is wrong.
9. Log through the project's logger, never print in core code, and never log secrets or personal data.
10. Keep files under the size limit and functions short; split by responsibility.

## Film commands
Run from the repo root unless a line says otherwise. Each was run in the session of 2026-11-10.
- Speech engine (once per machine): `uv tool install piper-tts`
- Voice files (once per machine): download `hi_IN-pratham-medium`, `hi_IN-rohan-medium`, `hi_IN-priyamvada-medium` and `ur_PK-aegis_female-medium` (`.onnx` and `.onnx.json`) from `huggingface.co/rhasspy/piper-voices` into `film/voices/`
- Copy the engine and shared code into a part: `node film/sync.js <part>` (no name = every part). Run it after every edit to `film/shared/`.
- Speak and measure a part's lines: `node film/tools/speak.js <part>` → `film/<part>/durations.js` and `out/vo/`. Run it after changing any spoken line.
- Build a part, from inside `film/<part>`: `node song.js` (sound), `node engine/render.js video` (picture, about 6 frames a second), `node engine/render.js mux` (→ `out/<part>.mp4`), then `node engine/render.js verify --allow-unclear` and `node engine/render.js qa`.
- Sound levels: `STEMS=1 node song.js && node engine/tools/levels.js out/music.wav out/stem-voice.wav out/stem-flute.wav`
- Join the film: `node film/build.js` → `out/shanti-dweep.mp4`, `out/shanti-dweep.srt`, `out/build-report.json`; exits 1 if a check fails.
- Vertical teasers: `node film/tools/teasers.js [T1 ...]` → `out/teasers/`
- Stills of a part: `cd film/<part> && node engine/render.js stills <seconds...>` → `out/stills/`
- Character audition: `cd film/<part> && node engine/render.js cast` → `out/cast.png`
- Never edit `film/engine/` or the copies under `film/<part>/engine` and `film/<part>/shared`.
- No `Math.random` or clock time in film code: parallel render workers must draw identical frames.

## Working across repos
- This is the **workspace**: it owns boundaries. Each repo owns its craft.
- Stay in the repo you were asked about. A change that needs another repo is a conversation,
  not a quiet cross-repo edit — say what the other repo needs and let the user decide.
- Anything two repos must agree on is settled here first (RFC, then CONTRACTS/), then built
  in each repo against a pinned contract version.

## Process (enforced by the groundwork plugin)
Interview → RFC → human approval → spec → plan → tasks → evals → implement → handover.
You cannot approve documents; only the user can, with `/groundwork-specflow:approve`.

## Repositories
Shanti-Dweep-The-Sindhu-Accord — `.` — the film: script, source and documents
