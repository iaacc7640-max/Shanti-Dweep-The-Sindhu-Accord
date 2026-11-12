// Joins the rendered parts into the film, writes the English subtitle file, and checks the result.
//   node film/build.js
// Needs every part's out/<part>.mp4 (see AGENTS.md, "Film commands"). Writes out/shanti-dweep.mp4,
// out/shanti-dweep.srt and out/build-report.json. Exits 1 if a check fails.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = __dirname;
const outDir = path.join(root, '..', 'out');
const PARTS = ['cold-open', 'act-1', 'act-2', 'act-3', 'act-4', 'epilogue'];
const probe = (file, entries) => execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', entries, '-of', 'default=nw=1:nk=1', file], { encoding: 'utf8' }).trim().split('\n');

fs.mkdirSync(outDir, { recursive: true });
const files = PARTS.map((p) => path.join(root, p, 'out', `${p}.mp4`));
const missing = files.filter((f) => !fs.existsSync(f));
if (missing.length) { console.error(`not rendered yet: ${missing.map((f) => path.relative(root, f)).join(', ')}`); process.exit(1); }

// ---- join: picture is copied as rendered, sound is re-encoded once so the joins carry no gap ----
const list = path.join(outDir, 'parts.txt');
fs.writeFileSync(list, files.map((f) => `file '${f}'`).join('\n') + '\n');
const film = path.join(outDir, 'shanti-dweep.mp4');
execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', film], { stdio: 'inherit' });
fs.rmSync(list);

// ---- subtitles: each part's lines, shifted by the real length of the parts before it ----
const stamp = (s) => { const ms = Math.round(s * 1000), p = (n, w = 2) => String(n).padStart(w, '0'); return `${p(Math.floor(ms / 3600000))}:${p(Math.floor((ms % 3600000) / 60000))}:${p(Math.floor((ms % 60000) / 1000))},${p(ms % 1000, 3)}`; };
const script = fs.readFileSync(path.join(root, '..', 'docs', 'script.md'), 'utf8');
const flatten = (s) => s.replace(/\s+/g, ' ');
const scriptFlat = flatten(script);
let offset = 0, n = 0, srt = '', worstSync = 0;
const report = { parts: [], problems: [] };
PARTS.forEach((p, i) => {
  const sc = require(path.join(root, p, 'score.js'));
  const real = parseFloat(probe(files[i], 'format=duration')[0]);
  if (Math.abs(real - sc.DURATION) > 0.1) report.problems.push(`${p}: rendered ${real.toFixed(2)}s but the score says ${sc.DURATION.toFixed(2)}s — render it again`);
  for (const sub of sc.subtitles) {
    const line = sc.lineById[sub.id];
    worstSync = Math.max(worstSync, Math.abs(sub.t - line.t)); // a subtitle starts with its spoken line
    const spoken = flatten(line.hi || line.ur);
    if (!scriptFlat.includes(spoken)) report.problems.push(`${p} line ${line.id}: spoken text is not in docs/script.md`);
    if (!scriptFlat.includes(flatten(line.en))) report.problems.push(`${p} line ${line.id}: subtitle is not in docs/script.md`);
    srt += `${++n}\n${stamp(offset + sub.t)} --> ${stamp(offset + sub.end)}\n${sub.text}\n\n`;
  }
  report.parts.push({ part: p, start: +offset.toFixed(3), seconds: real, lines: sc.lines.length });
  offset += real;
});
fs.writeFileSync(path.join(outDir, 'shanti-dweep.srt'), srt);

// ---- probe the film ----
const [width, height, fps] = probe(film, 'stream=width,height,r_frame_rate');
const seconds = parseFloat(probe(film, 'format=duration')[0]);
Object.assign(report, { file: 'out/shanti-dweep.mp4', width: +width, height: +height, fps, seconds, minutes: `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`, subtitles: n, worstSubtitleOffsetSeconds: worstSync });
if (+width !== 1920 || +height !== 1080) report.problems.push(`size is ${width}x${height}, want 1920x1080`);
if (fps !== '30/1') report.problems.push(`frame rate is ${fps}, want 30/1`);
if (seconds < 660 || seconds > 780) report.problems.push(`length is ${seconds.toFixed(1)}s, want 11 to 13 minutes`);
if (worstSync > 0.3) report.problems.push(`a subtitle starts ${worstSync.toFixed(2)}s away from its line, want 0.3s or less`);
fs.writeFileSync(path.join(outDir, 'build-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
process.exit(report.problems.length ? 1 : 0);
