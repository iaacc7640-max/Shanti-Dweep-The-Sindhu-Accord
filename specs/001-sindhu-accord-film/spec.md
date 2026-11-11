---
id: 001-sindhu-accord-film
rfc: RFC-0001
title: Sindhu Accord Film
status: approved
created: 2026-11-10
author: iaacc7640-max
requested_by: iaacc7640-max
owner: iaacc7640-max
implemented_by: []
support: []
extends: []
depends_on: []
builds_against: []
amends: []
approved_by: [noreply@anthropic.com]
---

# Spec: Sindhu Accord Film

## 1. Problem
The owner wants a 12-minute speculative-fiction film, "Shanti Dweep: The Sindhu Accord", for the
Hindi-speaking public on YouTube. Nothing exists yet but the approved script (`docs/script.md`).
See RFC-0001 for the decision and its trade-offs.

## 2. Users and context
- **Viewers:** Hindi speakers on YouTube; many watch on phones, some with sound off.
- **Owner:** iaacc7640-max, who approves each stage and publishes the film by hand.

## 3. User stories
- **US-1**: As a viewer, I want to follow the story in Hindi with English subtitles so that I understand it with or without sound.
- **US-2**: As the owner, I want to approve the shot list, the designs and each act before the next step so that nothing is built that I would reject.
- **US-3**: As the owner, I want one vertical teaser per act so that I can promote the film on Shorts.

## 4. Functional requirements
- **FR-1**: The film MUST contain six parts in this order: Cold Open, Act I, Act II, Act III, Act IV, Epilogue, following `docs/shotlist.md`.
- **FR-2**: Every spoken line MUST come from `docs/script.md`, in Hindi; Fatima's address (script rows 3.12–3.16) MUST be spoken in Urdu.
- **FR-3**: Every spoken line MUST show its English subtitle from the script while it is spoken.
- **FR-4**: The first card of the film MUST read "A work of fiction." with the Hindi line "यह एक काल्पनिक कथा है।".
- **FR-5**: Bhaskar and Fatima MUST each have one young and one old design, drawn from one shared design file, and look the same in every shot of that age.
- **FR-6**: Real historic figures (Tilak, Jinnah) MUST appear only as solid silhouettes with no facial features. No living or recent real politician may be drawn or named as a character.
- **FR-7**: Every map that shows India MUST show all of Jammu and Kashmir and Ladakh, including Gilgit-Baltistan and Aksai Chin, inside India's outline, as on the official Survey of India map.
- **FR-8**: The film MUST show no party logo or election symbol, no blood, no gore and no killing. The terror strike appears only on news screens; the crushed protests only as aftermath.
- **FR-9**: The look MUST be the watercolor style: full colour for the present, sepia for the 1916 and 1947 flashback.
- **FR-10**: The soundtrack MUST carry three themes: Bhaskar (Konkan), Fatima (Hindustani) and the Accord (both combined), plus sound effects for court, chai stall, crowds, war room, train, fireworks and river.
- **FR-11**: Three distinct voices MUST be used: narrator, Bhaskar and Fatima. The news reader and the minister may reuse a voice at a different pitch.
- **FR-12**: The film MUST end on the Devanagari line "गिलगित से गारो तक... आज़ादी पर्व मनाएंगे." followed by credits that repeat the fiction notice.
- **FR-13**: Five vertical 9:16 teasers MUST be delivered: one each for Act I, Act II, Act III, Act IV and the Epilogue (the Cold Open is part of the Act I teaser). Each is 20–45 seconds and is a framed cut: the finished wide picture, uncropped, sits in a tall frame with the fiction tag, the title and a hook line.
- **FR-14**: An English subtitle file (`.srt`) MUST be delivered with the film.
- **FR-15**: A known-issues list MUST be delivered with the film.

## 5. Non-functional requirements
- **NFR-1**: The film is 1920x1080, 30 frames per second, between 11:00 and 13:00 long. Teasers are 1080x1920, 30 fps.
- **NFR-2**: Each subtitle appears within 0.3 seconds of its spoken line starting.
- **NFR-3**: Loudness is about -14 LUFS, with speech clearly above music.
- **NFR-4**: Subtitle and on-screen text stays inside the safe area and is readable on a phone.
- **NFR-5**: Nothing in words or pictures demeans any religion, people or country.

## 6. Acceptance criteria
- **AC-1**: Given the finished film, when its parts are listed against the shot list, then all six appear in order. (covers FR-1)
- **AC-2**: Given the film's voice lines, when compared with the script, then every line matches and rows 3.12–3.16 use the Urdu voice. (covers FR-2, FR-11)
- **AC-3**: Given the subtitle file, when compared with the voice timings, then each subtitle starts within 0.3 s of its line. (covers FR-3, FR-14, NFR-2)
- **AC-4**: Given the first five seconds, when viewed, then the fiction card is on screen. (covers FR-4)
- **AC-5**: Given the character sheet, when compared with stills from each act, then hair, face, glasses and dress match for each age. (covers FR-5)
- **AC-6**: Given the courtroom stills, when viewed, then both figures are featureless silhouettes. (covers FR-6)
- **AC-7**: Given every map still, when laid beside the Survey of India outline, then India's northern border matches it. (covers FR-7)
- **AC-8**: Given a contact sheet of the whole film, when reviewed, then no logo, blood, gore or killing appears. (covers FR-8, NFR-5)
- **AC-9**: Given the style frames, when viewed, then present-day shots are watercolor in colour and flashbacks are sepia. (covers FR-9)
- **AC-10**: Given the sound levels per section, when measured, then speech is above music, and each theme and effect is present in its scene. (covers FR-10, NFR-3)
- **AC-11**: Given the last twenty seconds, when viewed, then the Devanagari closing line and the credits appear. (covers FR-12)
- **AC-12**: Given the delivery folder, when listed, then it holds the film, five teasers, the `.srt` and the known-issues list. (covers FR-13, FR-14, FR-15)
- **AC-13**: Given each delivered video, when probed, then size, frame rate and length match NFR-1. (covers NFR-1)
- **AC-14**: Given the text check on sampled frames, when run, then no text leaves the safe area. (covers NFR-4)

## 7. Failure behaviour
- If a voice mispronounces a name or word, the line is respelled for the voice only; the on-screen text stays correct. If it still fails, it is listed as a known issue.
- If a check fails and cannot be fixed, the film is still delivered with the failure named in the known-issues list.
- If a full act cannot be rendered in the session, the owner is told which act and why, and no partial act is passed off as complete.

## 8. Manual test
1. Open `out/shanti-dweep.mp4` in any player. The first card reads "A work of fiction."
2. Turn on `out/shanti-dweep.srt`. Watch one scene per act; each subtitle appears as its line is spoken.
3. Jump to about 7:30. Fatima's address is in Urdu, with Urdu text and English subtitles.
4. Pause on any map of India. The whole of Jammu and Kashmir and Ladakh is inside India.
5. Jump to the last 20 seconds. The line "गिलगित से गारो तक... आज़ादी पर्व मनाएंगे." appears, then credits.
6. Open each file in `out/teasers/`. Each is vertical and plays 20–45 seconds.
7. Read `out/KNOWN-ISSUES.md`.

## 9. Out of scope
Painted or AI-generated image frames; human voice recordings; publishing to YouTube; realistic
likenesses of real people; a Marathi accent for Bhaskar's voice; dubbed versions in other languages.

## 10. Constitution check
- Fiction, stated → FR-4, FR-12.
- Unity is the theme → NFR-5, FR-8.
- Owner approves each stage → US-2; the stops are the shot list, designs and style frames, and each act.
- One timeline → kept in the plan; each act has a single timeline for sound and picture.
- Consistent characters → FR-5.
- Guardrails (logos, gore, likenesses, map, slurs) → FR-6, FR-7, FR-8, NFR-5.

## Changes
- 2026-11-11 — FR-13 changed from "re-staged for vertical" to "framed cut". Why: re-staging means redrawing every chosen shot; the owner chose the framed cut when asked on 2026-11-11.
