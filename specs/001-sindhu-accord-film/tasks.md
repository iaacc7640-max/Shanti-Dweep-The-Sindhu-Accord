---
id: 001-sindhu-accord-film
spec: spec.md
spec_version: b07d9003b51818d9bbb271e72d92fed5b79320474b996a2ba86cf772c18b696a
plan: plan.md
created: 2026-11-10
---

# Tasks: Sindhu Accord Film

> One task = one reviewable change, ordered so the suite stays green after each.
> `[P]` marks tasks on disjoint files. Legend: `[ ]` not started · `[~]` in progress · `[x]` done.
> Mark a task `[x]` only after its "done when" is verified.

- [x] **T001** — Install Piper and the four voice files; prove each voice speaks a test line
  - **Files:** `film/voices/` (git-ignored), `.gitignore`, `AGENTS.md`
  - **Done when:** four test `.wav` files exist with non-zero sound
  - **Covers:** FR-2, FR-11
- [x] **T002** — Scaffold `film/design-sheet` and the shared cast and look files
  - **Files:** `film/design-sheet/`, `film/shared/cast.js`, `film/shared/look.js`
  - **Done when:** a character sheet still shows Bhaskar and Fatima, young and old, plus the two silhouettes
  - **Covers:** FR-5, FR-6, FR-9
- [x] **T003** — Draw the India outline and map helpers; render a map still
  - **Files:** `film/shared/maps.js`
  - **Done when:** the map still shows all of Jammu and Kashmir and Ladakh inside India
  - **Covers:** FR-7
- [x] **T004** — Render five style frames (river dawn, sepia court, chai stall, election map, war-room map) and stop for the owner's OK
  - **Files:** `film/design-sheet/film.js`, `docs/designs/`
  - **Done when:** the stills are in `docs/designs/` and the owner has approved them
  - **Covers:** FR-8, FR-9, NFR-4
- [x] **T005** — Write the three music themes and the sound effects
  - **Files:** `film/shared/themes.js`, `film/shared/voices.js`
  - **Done when:** a test render of each theme and effect has measurable level
  - **Covers:** FR-10
- [x] **T006** — Build and render the Cold Open; stop for the owner's OK
  - **Files:** `film/cold-open/`
  - **Done when:** the act file exists, checks pass or are listed, and the owner has approved it
  - **Covers:** FR-1, FR-2, FR-3, FR-4
- [x] **T007** — Build and render Act I; stop for the owner's OK
  - **Files:** `film/act-1/`
  - **Done when:** as T006
  - **Covers:** FR-1, FR-2, FR-3, FR-6, FR-9
- [~] **T008** — Build and render Act II; stop for the owner's OK
  - **Files:** `film/act-2/`
  - **Done when:** as T006
  - **Covers:** FR-1, FR-2, FR-3, FR-7, FR-8
- [ ] **T009** — Build and render Act III; stop for the owner's OK
  - **Files:** `film/act-3/`
  - **Done when:** as T006, and the address is in the Urdu voice
  - **Covers:** FR-1, FR-2, FR-3, FR-8
- [ ] **T010** — Build and render Act IV; stop for the owner's OK
  - **Files:** `film/act-4/`
  - **Done when:** as T006
  - **Covers:** FR-1, FR-2, FR-3, FR-7
- [ ] **T011** — Build and render the Epilogue and credits; stop for the owner's OK
  - **Files:** `film/epilogue/`
  - **Done when:** as T006, and the closing Devanagari line is on screen
  - **Covers:** FR-1, FR-12
- [ ] **T012** — Join the parts, merge the subtitles, probe the film
  - **Files:** `film/build.js`, `out/`
  - **Done when:** `out/shanti-dweep.mp4` is 1920x1080, 30 fps, 11–13 minutes, with `out/shanti-dweep.srt`
  - **Covers:** FR-1, FR-14, NFR-1, NFR-2
- [ ] **T013** — Render the five vertical teasers
  - **Files:** `film/*/`, `out/teasers/`
  - **Done when:** five 1080x1920 files of 20–45 seconds exist
  - **Covers:** FR-13
- [ ] **T014** — Final checks and the known-issues list
  - **Files:** `out/KNOWN-ISSUES.md`
  - **Done when:** every row of `evals.md` is marked passed or listed as a known issue
  - **Covers:** FR-15, NFR-3, NFR-4, NFR-5

## Verification
- [ ] **T900** — `groundwork.py verify` passes (format, lint, types, tests)
- [ ] **T901** — every FR in the spec maps to at least one completed task
- [ ] **T902** — the spec's manual-test section was run by hand and matches
- [ ] **T903** — foundation docs (ARCHITECTURE/AGENTS/CONTRACTS/PROJECT) updated or explicitly unchanged; `groundwork.py fresh` is clean
