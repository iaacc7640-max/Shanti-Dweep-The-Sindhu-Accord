# Shanti-Dweep-The-Sindhu-Accord — Architecture

> High-level technical truth. Names used here are the names used everywhere else — do not
> invent parallel vocabulary. Update in the same change as the thing it describes.

## Overview
The film is drawn and scored entirely in code with the `animation-studio` skill. Every frame is
drawn on a canvas in headless Chrome; every sound is synthesized in JavaScript; speech comes from
the Piper text-to-speech engine. Each act is its own small film project. The acts are rendered
separately and joined into one film.

```
docs/ (script, shot list)  ->  film/<act>/score.js  ->  song.js  -> out/music.wav
                                                    ->  film.js  -> out/video.mp4
                                                                 -> mux -> out/<act>.mp4
film/<act>/out/*.mp4  ->  ffmpeg concat  ->  out/shanti-dweep.mp4 (+ .srt, teasers)
```

## Components and repositories
| Component | Responsibility | Tech | Owner |
| --- | --- | --- | --- |
| docs/ | Script, shot list, character notes: the approved words and shots | Markdown | iaacc7640-max |
| film/<act>/score.js | The timeline: tempo, music, voice lines, subtitles, every event | JavaScript | iaacc7640-max |
| film/<act>/song.js | Synthesizes the soundtrack and voices from the score | Node 22 | iaacc7640-max |
| film/<act>/film.js | Draws frame `t` from the score | Canvas in headless Chrome | iaacc7640-max |
| film/<act>/engine/ | The skill's toolkit, copied in, never edited per film | JavaScript | animation-studio skill |
| film/shared/ | Character designs and helpers reused by every act | JavaScript | iaacc7640-max |

## Data flow
`score.js` is the single source of truth. `song.js` reads it and writes the audio. The renderer
calls `window.renderAt(t)` for every frame and pipes PNGs to ffmpeg. `mux` joins picture and sound.
The acts are then concatenated with ffmpeg.

## Tech stack and tools
Node 22, ffmpeg, Google Chrome (headless), the `animation-studio` engine, Piper text-to-speech with
Hindi and Urdu voice files from Hugging Face. No npm dependencies.

## Deployment and environments
There is no server. Output is video files. Rendering runs in the Claude Code cloud session.
Publishing to YouTube is done by the owner, by hand.

## Boundaries and contracts
None. One repo, no outside services at run time.

## Cross-cutting concerns
- No secrets are needed.
- Rendering cost: about 21,600 frames for 12 minutes at 30 fps; acts render one at a time.
- Rendered video and audio (`out/` folders) and downloaded voice files are not committed to git.

## Local development
Exact commands are recorded in AGENTS.md once the first act project is scaffolded.
