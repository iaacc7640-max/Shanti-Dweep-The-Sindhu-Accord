// Cuts the five vertical (9:16) teasers from the rendered parts.
//   node film/tools/teasers.js [T1 T2 ...]
// A "framed cut": the finished wide footage sits in the middle of a tall frame, over a blurred copy of
// itself, with the fiction tag and the title above and a hook line below (owner's choice, 2026-11-11).
// Each teaser is a list of spoken lines; a clip runs from just before its first line to just after its last.
// Writes out/teasers/<name>.mp4 (1080x1920, 30 fps).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const film = path.join(__dirname, '..');
const outDir = path.join(film, '..', 'out', 'teasers');
const work = path.join(outDir, '.work');
const fonts = path.join(film, 'engine', 'fonts');

// [part, first line id, last line id, extra seconds after]; a shot id instead of lines = that whole shot
const TEASERS = {
  'T1-what-if': { hook: 'अगर ऐसा होता, तो?', en: 'What if it had happened?', clips: [['cold-open', 'C6', 'C6', 0.3], ['act-1', '1.4', '1.4', 1.6], ['act-1', '1.14', '1.14', 0.2], ['act-1', '1.19', '1.20', 0.2], ['act-1', '1.21', '1.21', 2.4]] },
  'T2-three-seats': { hook: 'तीन सीटें। एक शर्त।', en: 'Three seats. One condition.', clips: [['act-2', '2.10', '2.10', 0.4], ['act-2', '2.11', '2.11', 0.8], ['act-2', '2.12', '2.12', 0.3], ['act-2', '2.13', '2.13', 0.8]] },
  'T3-not-revenge': { hook: 'बदला नहीं। बदलाव।', en: 'Not revenge. Change.', clips: [['act-3', '3.5', '3.6', 0.4], ['act-3', '3.7', '3.7', 0.5], ['act-3', '3.12', '3.13', 0.2], ['act-3', '3.17', '3.17', 0.6], ['act-3', '3.18', '3.18', 1.6]] },
  'T4-the-ledger': { hook: 'अब गोली नहीं। बही-खाता।', en: 'Not bullets. The ledger.', clips: [['act-4', '4.3', '4.4', 0.3], ['act-4', '4.5', '4.5', 0.3], ['act-4', '4.9', '4.9', 0.4], ['act-4', '4.10', '4.10', 0.6], ['act-4', '4.14', '4.14', 1]] },
  'T5-gilgit-to-garo': { hook: 'गिलगित से गारो तक...', en: 'From Gilgit to Garo...', clips: [['epilogue', 'E1', 'E1', 2.2], ['epilogue', 'E3', 'E4', 1], ['epilogue', 'E-4', null, 0]] },
};

const W = 1080, H = 1920, BAND_H = Math.round((W * 9) / 16), BAND_Y = 700; // the wide picture sits a little above centre
const run = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: ['ignore', 'inherit', 'inherit'] });

// the text layer, drawn once per teaser by headless Chrome so Devanagari is shaped properly
async function overlay(name, t) {
  const { chromium } = require('playwright');
  const css = `@font-face{font-family:Deva;src:url(file://${fonts}/NotoSansDevanagari-Bold.ttf)}@font-face{font-family:Lat;src:url(file://${fonts}/Inter-700.ttf)}
    body{margin:0;width:${W}px;height:${H}px;background:transparent;color:#FFF4D8;text-align:center;font-family:Deva,Lat,sans-serif}
    .tag{position:absolute;top:250px;left:0;right:0;font:700 34px Lat;letter-spacing:1px;color:#F2B84B}
    .title{position:absolute;top:330px;left:60px;right:60px;font-size:74px;line-height:1.25;text-shadow:0 4px 18px rgba(0,0,0,.6)}
    .sub{position:absolute;top:560px;left:0;right:0;font:700 34px Lat;color:#E9DFC8}
    .hook{position:absolute;top:${BAND_Y + BAND_H + 70}px;left:60px;right:200px;font-size:68px;line-height:1.25;color:#F2B84B;text-shadow:0 4px 18px rgba(0,0,0,.6)}
    .en{position:absolute;top:${BAND_Y + BAND_H + 190}px;left:60px;right:200px;font:700 36px Lat;color:#FFFFFF}`;
  const html = `<html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="tag">A WORK OF FICTION · काल्पनिक कथा</div><div class="title">शांति द्वीप: सिंधु समझौता</div><div class="sub">Shanti Dweep: The Sindhu Accord</div><div class="hook">${t.hook}</div><div class="en">${t.en}</div></body></html>`;
  const page = path.join(work, `${name}.html`), png = path.join(work, `${name}.png`);
  fs.writeFileSync(page, html);
  const browser = await chromium.launch();
  const tab = await browser.newPage({ viewport: { width: W, height: H } });
  await tab.goto(`file://${page}`); await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: png, omitBackground: true });
  await browser.close();
  return png;
}

async function build(name) {
  const t = TEASERS[name];
  if (!t) throw new Error(`no teaser "${name}" (have: ${Object.keys(TEASERS).join(', ')})`);
  const png = await overlay(name, t);
  const segs = t.clips.map(([part, a, b, tail], i) => {
    const src = path.join(film, part, 'out', `${part}.mp4`);
    if (!fs.existsSync(src)) throw new Error(`${part} is not rendered yet: ${src}`);
    const sc = require(path.join(film, part, 'score.js'));
    const t0 = b === null ? sc.byId[a].t0 : Math.max(0, sc.lineById[a].t - 0.35), t1 = b === null ? sc.byId[a].t1 : sc.lineById[b].end + 0.35 + tail, d = t1 - t0;
    const seg = path.join(work, `${name}-${i}.mp4`);
    // blurred, darkened copy fills the tall frame; the sharp wide picture is laid over it; sound fades at both ends of the clip
    const fc = `[0:v]split[a][b];[a]scale=${H * 16 / 9}:${H},crop=${W}:${H},boxblur=30:4,eq=brightness=-0.22:saturation=0.8[bg];[b]scale=${W}:${BAND_H}[fg];[bg][fg]overlay=0:${BAND_Y},format=yuv420p[v];[0:a]afade=t=in:d=0.12,afade=t=out:st=${(d - 0.2).toFixed(3)}:d=0.2[au]`;
    run(['-ss', t0.toFixed(3), '-t', d.toFixed(3), '-i', src, '-filter_complex', fc, '-map', '[v]', '-map', '[au]', '-r', '30', '-c:v', 'libx264', '-crf', '17', '-preset', 'fast', '-c:a', 'aac', '-b:a', '192k', seg]);
    return seg;
  });
  const list = path.join(work, `${name}.txt`);
  fs.writeFileSync(list, segs.map((s) => `file '${s}'`).join('\n') + '\n');
  const joined = path.join(work, `${name}-joined.mp4`), out = path.join(outDir, `${name}.mp4`);
  run(['-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', joined]);
  const len = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', joined], { encoding: 'utf8' }));
  run(['-i', joined, '-i', png, '-filter_complex', `[0:v][1:v]overlay=0:0,fade=t=out:st=${(len - 0.6).toFixed(2)}:d=0.6,format=yuv420p[v];[0:a]afade=t=out:st=${(len - 0.8).toFixed(2)}:d=0.8[a]`, '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out]);
  console.log(`${name}: ${len.toFixed(1)}s -> ${path.relative(path.join(film, '..'), out)}`);
}

(async () => {
  fs.mkdirSync(work, { recursive: true });
  const names = process.argv.slice(2).length ? process.argv.slice(2).map((n) => Object.keys(TEASERS).find((k) => k.startsWith(n)) || n) : Object.keys(TEASERS);
  for (const n of names) await build(n);
  fs.rmSync(work, { recursive: true, force: true });
})().catch((e) => { console.error(e.message); process.exit(1); });
