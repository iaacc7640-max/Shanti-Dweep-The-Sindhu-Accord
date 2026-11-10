// Speaks every line of one part with Piper and measures it.
//   node film/tools/speak.js <part>
// Writes film/<part>/out/vo/<lineId>.f32 (48 kHz mono) and film/<part>/durations.js, which the
// part's score.js reads to place lines, shots and subtitles. Run it again after changing any line.
// If a voice file or Piper is missing it stops with the name of what is missing: no silent stand-ins.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

const part = process.argv[2];
if (!part) throw new Error('usage: node film/tools/speak.js <part>');
const root = path.join(__dirname, '..', part);
const VOICES = require('../shared/voices');
const { SR } = require('../engine/audio/dsp');
const Voice = require('../engine/audio/voice');

const cacheDir = path.join(VOICES.dir, 'cache');
const outDir = path.join(root, 'out', 'vo');
fs.mkdirSync(cacheDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

// cut silence at both ends, keep 30 ms
function trim(x) {
  const hop = SR / 100, n = Math.floor(x.length / hop), e = new Float32Array(n);
  let pk = 0;
  for (let i = 0; i < n; i++) { let s = 0; for (let j = 0; j < hop; j++) s += x[i * hop + j] ** 2; e[i] = Math.sqrt(s / hop); pk = Math.max(pk, e[i]); }
  let a = 0, b = n;
  while (a < b && e[a] < pk * 0.02) a++;
  while (b > a && e[b - 1] < pk * 0.02) b--;
  return x.slice(Math.max(0, (a - 3) * hop), Math.min(x.length, (b + 3) * hop));
}
// play faster or slower by resampling: pitch and speed move together
function resample(x, factor) {
  if (Math.abs(factor - 1) < 1e-3) return x;
  const n = Math.floor(x.length / factor), y = new Float32Array(n);
  for (let i = 0; i < n; i++) { const p = i * factor, k = Math.floor(p), u = p - k; y[i] = x[k] * (1 - u) + (x[k + 1] ?? x[k]) * u; }
  return y;
}
// every line to the same loudness
function level(x, target = 0.12) {
  let s = 0, c = 0;
  for (let i = 0; i < x.length; i++) if (Math.abs(x[i]) > 0.01) { s += x[i] * x[i]; c++; }
  const g = c ? Math.min(6, target / Math.sqrt(s / c)) : 0;
  const y = new Float32Array(x.length);
  for (let i = 0; i < x.length; i++) y[i] = x[i] * g;
  return y;
}

function synth(voice, text) {
  if (!fs.existsSync(voice.model)) throw new Error(`voice file missing: ${voice.model} (see AGENTS.md, "Film commands")`);
  // Piper's length scale stretches time without changing pitch; `pitch` is then applied by resampling,
  // so the length scale is multiplied by it to keep the pace where `slow` put it.
  const scale = +(voice.slow * voice.pitch).toFixed(3);
  const key = crypto.createHash('sha1').update(JSON.stringify([path.basename(voice.model), scale, text])).digest('hex').slice(0, 16);
  const wav = path.join(cacheDir, key + '.wav');
  if (!fs.existsSync(wav)) {
    const r = spawnSync('piper', ['--model', voice.model, '--length-scale', String(scale), '--sentence-silence', '0.28', '--output_file', wav], { input: text, encoding: 'utf8' });
    if (r.error || r.status !== 0) throw new Error(`piper failed for "${text.slice(0, 40)}": ${r.error || r.stderr}`);
  }
  return resample(trim(Voice.decode(wav)), voice.pitch);
}

const score = require(path.join(root, 'score.js'));
const dur = {};
for (const l of score.lines) {
  const voice = VOICES[l.who];
  if (!voice) throw new Error(`line ${l.id}: no voice for "${l.who}"`);
  const audio = level(synth(voice, l.tts || l.hi || l.ur));
  fs.writeFileSync(path.join(outDir, `${l.id}.f32`), Buffer.from(audio.buffer, audio.byteOffset, audio.byteLength));
  dur[l.id] = +(audio.length / SR).toFixed(3);
  console.log(`${l.id.padEnd(6)} ${l.who.padEnd(5)} ${dur[l.id].toFixed(2)}s`);
}
const js = `// Measured length of each spoken line, in seconds. Written by film/tools/speak.js — do not edit by hand.\n(function () {\n  const D = ${JSON.stringify(dur, null, 2).replace(/\n/g, '\n  ')};\n  if (typeof module !== 'undefined' && module.exports) module.exports = D; else globalThis.VOICE_DUR = D;\n})();\n`;
fs.writeFileSync(path.join(root, 'durations.js'), js);
const total = Object.values(dur).reduce((a, b) => a + b, 0);
console.log(`wrote ${part}/durations.js — ${Object.keys(dur).length} lines, ${total.toFixed(1)}s of speech`);
