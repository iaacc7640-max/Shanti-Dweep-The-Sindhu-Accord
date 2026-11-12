// THE SCORE — Cold Open. Shots and spoken lines from docs/shotlist.md and docs/script.md.
// Times are computed from the measured voice lengths (durations.js), so sound, picture and
// subtitles cannot drift apart.
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const SDT = node ? require('./shared/timeline') : globalThis.SDT;
  let DUR = {};
  if (node) { try { DUR = require('./durations'); } catch (e) { DUR = {}; } } else DUR = globalThis.VOICE_DUR || {};

  const FPS = 30, FORMAT = U.pickFormat('16:9'), STYLE = 'watercolor';

  const shots = [
    { id: 'C-1', min: 5 }, // fiction card
    { id: 'C-2', min: 9, lead: 2.2, lines: [
      { id: 'C2', who: 'N', hi: 'सह्याद्रि की गोद में, वशिष्ठी नदी पर सुबह उतर रही है।', en: 'In the lap of the Sahyadris, dawn settles on the Vashishti river.' },
    ] },
    { id: 'C-3', min: 8, lead: 1.2, lines: [
      { id: 'C3', who: 'N', hi: 'तिरसठ बरस का एक वकील, रोज़ की तरह, सूर्य के सामने खड़ा है।', en: 'A sixty-three-year-old lawyer stands before the sun, as he does every day.' },
    ] },
    { id: 'C-4', min: 6, lead: 1.6, tail: 1.6, lines: [
      { id: 'C4', who: 'B', hi: 'ॐ सूर्याय नमः।', tts: 'ओम सूर्याय नमः।', en: 'Om Suryaya Namah.' },
    ] },
    { id: 'C-5', min: 9, lead: 1, tail: 1.2, lines: [
      { id: 'C5', who: 'N', hi: 'उसका नाम है भास्कर विष्णु खरे। और यह कहानी... कभी घटी नहीं।', en: 'His name is Bhaskar Vishnu Khare. And this story... never happened.', gap: 0.9 },
      { id: 'C6', who: 'N', hi: 'पर सोचिए — अगर घटती, तो?', en: 'But imagine — what if it had?' },
    ] },
    { id: 'C-6', min: 7.5 }, // title card
  ];

  const TL = SDT.build({ shots, dur: DUR });
  const by = TL.byId;
  const S = Object.fromEntries(TL.shots.map((s) => [s.id, [s.t0, s.t1]]));
  const ev = {
    card: 0.6, // the fiction card appears
    title: by['C-6'].t0 + 0.9, // the title starts to brush on
    titleEn: by['C-6'].t0 + 3.2,
  };
  const markers = {
    fiction: 2.5, river: by['C-2'].t0 + 4, bhaskar: by['C-3'].t0 + 4, prayer: by['C-4'].t0 + 3, wide: by['C-5'].t0 + 5,
    title: ev.title + 2.6, titleEn: ev.titleEn + 1.5,
  };

  const SCORE = { FPS, FORMAT, STYLE, DURATION: TL.DURATION, S, shots: TL.shots, lines: TL.lines, lineById: TL.lineById, byId: by, subtitles: TL.subtitles, ev, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
