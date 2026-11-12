---
id: 001-sindhu-accord-film
spec: spec.md
spec_version: 08ab239ec85d57da955bf5671857b56c5c116613211bc91227a9fa1848839b33
created: 2026-11-10
---

# Evaluations: Sindhu Accord Film

| ID | Scenario | Input | Expected | Covers | How checked |
| --- | --- | --- | --- | --- | --- |
| E1 | All six parts present, in order | Contact sheet of the joined film | Cold Open, Acts I–IV, Epilogue appear in shot-list order | AC-1 | Manual: read the contact sheet against `docs/shotlist.md` |
| E2 | Spoken lines match the script | Voice lines in each timeline vs `docs/script.md` | Every row present, same text; rows 3.12–3.16 use the Urdu voice | AC-2 | Automated: comparison script |
| E3 | Subtitles in sync | Subtitle start vs voice-line start | Difference of 0.3 s or less on every line | AC-3 | Automated: comparison script |
| E4 | Fiction card first | Still at 2 s | "A work of fiction." and the Hindi line on screen | AC-4 | Manual: still |
| E5 | Characters consistent | Character sheet vs one still per act | Same hair, face, glasses, dress per age | AC-5 | Manual: stills side by side |
| E6 | Silhouettes only | Courtroom stills | Tilak and Jinnah are solid shapes with no facial features | AC-6 | Manual: stills |
| E7 | India's border | Every map still | Jammu and Kashmir and Ladakh, with Gilgit-Baltistan and Aksai Chin, inside India | AC-7 | Manual: stills beside the Survey of India outline |
| E8 | No forbidden content | Contact sheet, 2 s spacing | No party logo, election symbol, blood, gore or killing | AC-8 | Manual: read every frame of the sheet |
| E9 | Looks | Style frames | Present in colour watercolor; 1916 and 1947 in sepia | AC-9 | Manual: stills |
| E10 | Speech above music | Per-section levels of voice and music stems | Voice louder than music in every spoken section; about -14 LUFS overall | AC-10 | Automated: level meter |
| E11 | Closing line | Still at the Epilogue's text shot | "गिलगित से गारो तक... आज़ादी पर्व मनाएंगे." then credits | AC-11 | Manual: still |
| E12 | Deliverables complete | Listing of `out/` | Film, five teasers, `.srt`, known-issues list | AC-12 | Automated: listing |
| E13 | Technical format | `ffprobe` on each file | Film 1920x1080, 30 fps, 11–13 min; teasers 1080x1920, 30 fps, 20–45 s | AC-13 | Automated: probe |
| E14 | Text stays readable | Sampled frames through the text check | No text outside the safe area or under the minimum size | AC-14 | Automated: skill's `qa` |
| E15 | Hindi and Urdu spelling | All on-screen and subtitle text | Matches the approved script character for character | FR-2, FR-12 | Automated: comparison script; manual read of Urdu stills |
| E16 | Urdu draws correctly | Still of the address | Nastaliq text joined and right-to-left | FR-2 | Manual: still |
| E17 | A voice file is missing | Run a build without one voice | The build says which voice is missing; nothing is delivered as finished | Failure behaviour | Manual: run once |
| E18 | Joins are clean | Stills and levels at each act boundary | No black flash, no click: both sides start and end on silence | AC-1, AC-10 | Automated: levels; manual: stills |

## Scenario catalogue (things real users will do that nobody wrote down)
- Watching on a phone with the sound off: subtitles alone must carry the story.
- Watching only a teaser: it must say it is fiction without the main film.
- Pausing on any map and taking a screenshot: the border must be right in every frame, including mid-animation.
- Pausing on the terror-strike or protest shots: no single frame may show a person being hurt.
- Reading the Urdu without the English: it must stand alone and be respectful.
- A viewer from Pakistan or Bangladesh watching the signing: their country is shown as an equal, with its own flag and constitution.
