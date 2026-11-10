---
id: RFC-0001
title: Make the film 'Shanti Dweep: The Sindhu Accord'
status: draft
classification: internal
signoffs_required: 1
requested_by: iaacc7640-max
request_source: Claude Code session brief, 2026-11-10
owner: iaacc7640-max
supersedes: []
related_rfcs: []
author: iaacc7640-max
created: 2026-11-10
---

# RFC-0001 — Make the film 'Shanti Dweep: The Sindhu Accord'

## 1. Summary
Make a 12-minute animated film, "Shanti Dweep: The Sindhu Accord", with the `animation-studio`
skill: code-drawn watercolor frames, a synthesized soundtrack, and synthetic Hindi and Urdu voices
from Piper. Build it act by act, with the owner's approval after the script, the shot list, the
character designs and style frames, and each act's render.

## 2. The need
**User scenario:** The owner wants to publish a speculative-fiction film on YouTube for the
Hindi-speaking public. Its theme is unity across the subcontinent.
**Done means:** One 1920x1080, 30 fps film of about 12 minutes with Hindi speech and synced English
subtitles (Urdu for Fatima's address), one vertical teaser per act, and a list of known issues.

## 3. Interview record
| # | Question | Answer | Effect |
| --- | --- | --- | --- |
| 1 | What is the film? | Title, genre, story, six-part scene plan, characters, audio and safety rules as given in the brief of 2026-11-10 | Confirmed |
| 2 | The skill `skills/lemo-opuscar` is missing. What now? | "Skip it and create the video with all available skills" | Confirmed |
| 3 | Whose name is recorded as requester and owner? | GitHub handle only: iaacc7640-max | Confirmed |
| 4 | Who watches it, and where? | YouTube, general public | Confirmed |
| 5 | The working skill draws hand-drawn 2D in code, not painted 2.5D. Which look? | Watercolor | Confirmed |
| 6 | May Piper and Hindi/Urdu voice files be installed? | Yes, install Piper | Confirmed |
| 7 | At which points must work stop for approval? | After the script, the shot list, character designs and style frames, and each act's render | Confirmed |
| 8 | Painted or AI-generated image frames? | Not available in this session; watercolor chosen instead | Out of scope |
| 9 | Publishing to YouTube? | Not requested | Out of scope |

### Read-back
- **Confirmed:** A 12-minute, 16:9, 1080p fiction film in Hindi with English subtitles; Urdu address
  subtitled; watercolor code-drawn look; Piper voices; six parts (Cold Open, Acts I–IV, Epilogue);
  one 9:16 teaser per act; four approval stops; the safety rules in CONSTITUTION.md.
- **Tensions:** The brief asked for a painted 2.5D motion comic; the owner accepted the watercolor
  code-drawn look instead. The brief asked for a Marathi-accented Bhaskar; Piper's Hindi voices
  have no accent control.
- **Open decisions:** None.
- **Docs to update after approval:** AGENTS.md (exact render commands, once the first act is scaffolded).

## 4. Proposal
- **Words first.** `docs/script.md` holds every narration and dialogue line in Hindi (Devanagari),
  the Urdu address in Urdu script, and the English subtitle for each line.
- **Then shots.** `docs/shotlist.md` lists every shot with its time, picture, camera move and sound.
- **Then designs.** One shared character file draws Bhaskar and Fatima, young and old. Style frames
  show the watercolor look, the sepia flashback, a map and an infographic.
- **Then acts.** Each of the six parts is its own film project under `film/`. Each has one timeline
  that both the sound and the picture read, so they cannot drift. Acts are rendered one at a time
  and joined with ffmpeg. Teasers are re-staged for 9:16 from the same timelines.
- **Voices.** Narrator and Bhaskar use two different Piper Hindi male voices; Fatima uses the Hindi
  female voice, and an Urdu female voice for her address.
- **Music.** Three synthesized themes: Bhaskar (Konkan, flute-like and gentle), Fatima (Hindustani,
  harmonium and tabla), and the Accord (both together).
- **Maps.** Animated maps are drawn in code. India is drawn to the Survey of India outline,
  including all of Jammu and Kashmir and Ladakh.
- **Checks before delivery.** Resolution, frame rate, length, subtitle sync, Hindi and Urdu spelling.

## 5. Alternatives considered
- **Wait for `lemo-opuscar` or an image-generation tool for painted frames.** Rejected by the owner:
  proceed with what is available.
- **A 3–4 minute condensed cut first.** Not chosen: the brief asks for about 12 minutes. Building act
  by act gives the same early feedback.
- **Subtitles only, no voices.** Rejected by the owner: install Piper.

## 6. Risks and objections
- **Length.** The skill is built for 15–60 second films. Twelve minutes is about 21,600 frames.
  Limited motion and held frames keep this practical, but render time is not yet measured.
- **Look.** Code-drawn watercolor is simpler than a painted graphic novel. Faces are stylised.
- **Voices.** Piper sounds synthetic. Pronunciation of names and Urdu words may need respelling.
  No one can listen to the result inside the session; audio is checked by measurement only.
- **Subject.** The story shows a war, a surrender and a union of real countries. It must stay
  clearly fictional and respectful; the constitution's guardrails apply to every shot.
- **Maps.** The engine's built-in map data may not match the Survey of India outline; if so the
  outline is drawn by hand and checked against the official map.

## 7. Impact
**Repos touched:** Shanti-Dweep-The-Sindhu-Accord only. No existing feature is extended or amended.
**Constitution check:** Complies. Fiction card opens the film (principle 1); unity theme
(principle 2); four approval stops (principle 3); one timeline per act (principle 4); one shared
character file (principle 5). All five guardrails are carried into the script and shot list.
**Cost / performance / security notes:** No secrets. Piper and voice files (about 60 MB each) are
downloaded from PyPI and Hugging Face. Rendered video is not committed to git.

## 8. Cross-repo contract (only if classification is `api`)
N/A, internal.

## 9. Out of scope
- Painted or AI-generated image frames.
- Human voice recordings.
- Publishing to YouTube.
- Realistic likenesses of real people.

## 10. Open questions
_None._
