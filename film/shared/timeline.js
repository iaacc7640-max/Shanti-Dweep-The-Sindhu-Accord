// THE TIMELINE BUILDER — turns a part's list of shots and spoken lines into times.
// Each line's length comes from the measured voice file (durations.js, written by film/tools/speak.js),
// so shots stretch to fit their words and picture, sound and subtitles all read the same numbers.
// Works in Node (song.js, tools) and in the browser (film.js).
(function () {
  const node = typeof module !== 'undefined' && module.exports;

  // rough length of an unmeasured line, so a part can be laid out before its voices exist
  const guess = (text) => 0.6 + String(text).split(/\s+/).length * 0.42;

  // shots: [{ id, min, lead, tail, lines: [{ id, who, hi, en, ur, tts, gap }] }]
  // dur:   { lineId: seconds }
  function build({ shots, dur = {}, lead = 0.7, tail = 0.7, gap = 0.45, start = 0 }) {
    const out = [], lines = [];
    let t = start;
    for (const sh of shots) {
      const t0 = t;
      let cursor = t0 + (sh.lead ?? lead);
      const mine = [];
      for (const l of sh.lines || []) {
        const d = dur[l.id] ?? guess(l.tts || l.hi || l.ur);
        const at = cursor + (l.wait || 0);
        const line = { ...l, shot: sh.id, t: +at.toFixed(3), end: +(at + d).toFixed(3), dur: d, measured: dur[l.id] != null };
        mine.push(line); lines.push(line);
        cursor = at + d + (l.gap ?? gap);
      }
      const spoken = mine.length ? mine[mine.length - 1].end + (sh.tail ?? tail) : t0;
      const t1 = Math.max(t0 + (sh.min || 0), spoken);
      out.push({ ...sh, t0: +t0.toFixed(3), t1: +t1.toFixed(3), lines: mine });
      t = t1;
    }
    // English subtitles: on with the voice, off shortly after, never overlapping the next line
    const subtitles = lines.map((l, i) => {
      const next = lines[i + 1];
      return { id: l.id, t: l.t, end: +Math.min(l.end + 0.35, next ? next.t - 0.05 : l.end + 0.35).toFixed(3), text: l.en, who: l.who };
    });
    const byId = Object.fromEntries(out.map((s) => [s.id, s]));
    const lineById = Object.fromEntries(lines.map((l) => [l.id, l]));
    return { shots: out, lines, subtitles, byId, lineById, DURATION: +t.toFixed(3) };
  }

  // the fields every part's score exports, built from its shots
  function part({ shots, dur, U, format = '16:9' }) {
    const TL = build({ shots, dur });
    return {
      FPS: 30, FORMAT: U.pickFormat(format), STYLE: 'watercolor', DURATION: TL.DURATION,
      S: Object.fromEntries(TL.shots.map((s) => [s.id, [s.t0, s.t1]])),
      shots: TL.shots, lines: TL.lines, lineById: TL.lineById, byId: TL.byId, subtitles: TL.subtitles,
    };
  }

  const API = { build, guess, part };
  if (node) module.exports = API; else globalThis.SDT = API;
})();
