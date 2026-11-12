# Known issues — Shanti Dweep: The Sindhu Accord

Written 2026-11-11, after the film was joined.

## What was measured on the delivered film
- `out/shanti-dweep.mp4`: 1920x1080, 30 fps, 11:48 (708.1 s), six parts in order.
- 81 English subtitles in `out/shanti-dweep.srt`; each starts with its spoken line (0 s apart, by construction).
- Every spoken line and every subtitle matches `docs/script.md` character for character.
- Loudness: -14.1 LUFS for the whole film.
- The sound at each join between parts peaks between -25 and -35 dB: quiet, not silent.

## Changed from the brief
1. **Tool.** The skill `skills/lemo-opuscar` was not in the repo. The film was made with the `animation-studio` skill instead, as the owner asked.
2. **Look.** The brief asked for a painted 2.5D motion comic. The film is code-drawn watercolor with simple, stylised characters. It reads as a cartoon, not a graphic novel.
3. **Voices.** Synthetic Piper voices. Bhaskar has no Marathi accent: the voice has no accent control.
4. **Teasers.** Framed cuts of the wide footage in a tall frame, not shots redrawn for vertical (owner's choice, 2026-11-11). The English subtitles inside the framed picture are small on a phone.
5. **Script rows 3.1 and 3.10** are each spoken in two halves so each half sits on its own shot. The words are unchanged.

## Not verified
6. **Sound was never heard.** Nobody could listen inside the session. Loudness and the balance of speech against music were measured; pronunciation, the feel of the music and the quality of the Urdu delivery were not checked by ear.
7. **Voice-only respellings.** "ॐ" is spoken from the spelling "ओम"; "एम.एन.पी." and "एन.डी.ए." are spoken letter by letter; "इस्लाम-ए-भारती" is spoken without the hyphens. On-screen text keeps the script's spelling.
8. **India's northern border** was plotted by hand to include all of Jammu and Kashmir and Ladakh, with Gilgit-Baltistan and Aksai Chin. It was not laid over the official Survey of India map, so its exact line is approximate. The rest of the outlines come from Natural Earth.
9. **Balochistan's outline** in Act IV is hand-plotted and approximate.
10. **Urdu and Hindi spelling** was checked by matching the film's text against the approved script, character for character. The script itself was not proofread by a native reader.

## History
11. **1916.** Sources found by web search support that Jinnah appeared for Tilak in the Bombay High Court in 1916 and that Tilak won. One source questions how much credit for the result belongs to Jinnah. No primary judgment text was read.
12. **1948.** Sources agree that anti-Brahmin violence followed Gandhi's assassination in western Maharashtra. Detailed accounts of burned homes come mostly from partisan writing, and none found names the Konkan. The film says only that a fictional family's house burned in 1948, and blames no one.

## Invented for the story
13. Every number on screen is invented: the trade index, the "$62 bn" corridor figure, the seat counts, the 72-hour clock, the bar chart. The film labels the first two as fictional.
14. Military and nuclear sites on the war-room map are placed for the picture, not on real installations.
15. "MNP" is never expanded: the brief gives no full name.
16. Newspaper names and the channel "समाचार 24" are invented.

## Picture
17. Characters are always drawn facing the viewer; the shot list's "from behind" shots of Bhaskar at the river are staged from the front.
18. Watercolor washes are see-through, so some tables and cloths show faintly through figures behind them.
19. The automatic text check reports low contrast on the last fade-out frame of each part. That is the fade, not the design.
20. In Act II the news ticker runs under the channel name and off the right edge by design; the text check flags it.

## Sound
21. Timing checks that failed on soft-starting sounds (a paper tear, a kettle drum) were dropped rather than fixed: those sounds have no sharp start to measure.
22. Music sits 7 to 16 dB under speech (measured in Act I). It may be too quiet in places.
23. A fault found and fixed during the build: one drum in Act III's crowd scene had an invalid loudness, which silenced the sound from that point and cut the joined file short. The sound step now stops with an error if any invalid sample appears. All six soundtracks were scanned afterwards and are clean.
24. English subtitles are both burned into the picture and delivered as a separate file. Turning the file on in a player shows each line twice.
