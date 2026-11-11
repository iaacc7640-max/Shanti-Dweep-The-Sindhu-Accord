---
id: 001-sindhu-accord-film
spec: spec.md
spec_version: 08ab239ec85d57da955bf5671857b56c5c116613211bc91227a9fa1848839b33
created: 2026-11-10
---

# Plan: Sindhu Accord Film

## 1. Approach
Build with the `animation-studio` skill, one small film project per part, joined at the end.

- **Six projects** under `film/`: `cold-open`, `act-1`, `act-2`, `act-3`, `act-4`, `epilogue` (FR-1). Each has its own timeline (`score.js`), sound (`song.js`) and picture (`film.js`). The engine is copied in by the skill's scaffold script and never edited.
- **Shared code** in `film/shared/`: the cast (FR-5), silhouettes (FR-6), the India outline and map helpers (FR-7), the three music themes and the sound effects (FR-10), the watercolor and sepia looks (FR-9), subtitle drawing (FR-3, NFR-4). Each act loads these files; none copies them.
- **Words** are copied from `docs/script.md` into each act's timeline as voice lines with their English subtitles (FR-2, FR-3). A voice-only respelling may be given per line; the on-screen text stays as in the script.
- **Voices** (FR-11): Piper, installed with `uv`. Narrator `hi_IN-pratham`, Bhaskar `hi_IN-rohan`, Fatima `hi_IN-priyamvada`; her Urdu address `ur_PK-aegis_female`. News reader and minister reuse voices at a shifted pitch. Voice files live in `film/voices/`, not in git.
- **Maps** (FR-7): the engine's Natural Earth outlines are used for neighbours. India's outline is drawn from a hand-made point list that includes all of Jammu and Kashmir and Ladakh, checked by eye against the Survey of India political map.
- **Order of work** matches the owner's stops: designs and style frames first (a `film/design-sheet` project that renders stills only), then one act at a time, each shown before the next.
- **Joining**: ffmpeg concatenates the six act files into `out/shanti-dweep.mp4`; the subtitle files are merged with time offsets into `out/shanti-dweep.srt` (FR-14, NFR-1).
- **Teasers** (FR-13): `film/tools/teasers.js` cuts each teaser from the rendered parts by spoken line, lays the wide picture over a blurred copy of itself in a 1080x1920 frame, and adds the fiction tag, the title and a hook line.
- **Loudness** (NFR-3): each act is mastered to -14 LUFS with music ducked under speech.

## 2. Affected modules and files
The repo keeps its own structure; new code follows the skill's project layout.
- `film/shared/cast.js` — Bhaskar and Fatima, young and old; generic extras; silhouettes.
- `film/shared/look.js` — watercolor and sepia helpers, text and subtitle drawing, camera helpers.
- `film/shared/maps.js` — India outline, region maps, pins, routes.
- `film/shared/themes.js` — the three music themes and the sound effects.
- `film/shared/voices.js` — which voice speaks which role.
- `film/design-sheet/` — character sheet and style frames (stills only).
- `film/<part>/score.js`, `song.js`, `film.js`, `index.html`, `engine/` — one set per part.
- `film/build.js` — joins the parts, merges subtitles, probes the result.
- `out/` — delivered files (film, `.srt`, teasers, `KNOWN-ISSUES.md`); video is git-ignored.
- `AGENTS.md`, `ARCHITECTURE.md`, `CODEMAP.md` — updated with the real commands and folders.

## 3. Data model and migrations
None.

## 4. Interfaces and contracts
None across repos. Inside the repo, each part exports from its `score.js`: frame rate, format, duration, sections, voice lines, subtitles and markers, as the skill requires.

## 5. Failure modes and edge cases
- A voice mispronounces a name or reads digits wrongly → numbers are written as words; a voice-only respelling is used; leftovers go to the known-issues list.
- Urdu text reads left-to-right or breaks its joins → rendered with the bundled Nastaliq font and checked in stills.
- A long act is too slow to render → render in draft first; split the act into two timelines if needed, joined without a gap.
- Parallel render workers draw different frames → no `Math.random` or clock time; seeded randomness only.
- Joining acts causes a click or a jump → every act starts and ends on silence and a held frame; all acts share one encode setting.
- Piper or a voice file fails to download → the act is built with silent placeholder timing and the owner is told; it is not passed off as finished.

## 6. Test strategy
- Stills and contact sheets, read shot by shot, prove the picture requirements (AC-1, AC-4 to AC-9, AC-11).
- The skill's text check (`qa`) on sampled frames proves safe-area and size (AC-14).
- The skill's `verify` and per-section level meter prove sync and balance (AC-10).
- A script compares voice-line start times with subtitle start times (AC-3) and voice text with `docs/script.md` (AC-2).
- `ffprobe` on every delivered file proves size, frame rate and length (AC-13); a folder listing proves the deliverables (AC-12).
- No one can listen inside the session: audio is measured, not heard, and that is stated at delivery.

## 7. Rollout and rollback
Each stage is committed and pushed to the working branch. Nothing is published. Rolling back is a git revert of that stage's commit.

## 8. Constitution check
- Fiction, stated → the cold open's first shot and the credits (FR-4, FR-12).
- Unity theme and guardrails → staged as in the approved shot list (FR-6, FR-7, FR-8, NFR-5).
- Owner approves each stage → work stops after the design sheet and after each act.
- One timeline → each part's `score.js` is the only place times are written.
- Consistent characters → `film/shared/cast.js` is the only place the two leads are defined (FR-5).
