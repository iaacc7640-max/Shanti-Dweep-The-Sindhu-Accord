// THE SCORE — Epilogue, "Home". Shots and lines from docs/shotlist.md and docs/script.md.
// Times come from the measured voice lengths (durations.js).
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const SDT = node ? require('./shared/timeline') : globalThis.SDT;
  let DUR = {};
  if (node) { try { DUR = require('./durations'); } catch (e) { DUR = {}; } } else DUR = globalThis.VOICE_DUR || {};

  const shots = [
    { id: 'E-1', min: 10, lead: 1.6, tail: 2, lines: [
      { id: 'E1', who: 'N', hi: 'उस रात, गिलगित से गारो तक, आसमान जगमगा उठा।', en: 'That night, from Gilgit to Garo, the sky lit up.' },
    ] },
    { id: 'E-2', min: 9, lead: 1.4, tail: 1.4, lines: [
      { id: 'E2', who: 'N', hi: 'भास्कर ने जश्न नहीं मनाया। उसने रात की गाड़ी पकड़ी — घर की।', en: 'Bhaskar did not celebrate. He took the night train — home.' },
    ] },
    { id: 'E-3', min: 12, lead: 1.6, tail: 1.8, lines: [
      { id: 'E3', who: 'N', hi: 'और सुबह, वशिष्ठी के किनारे। इस बार अकेला नहीं — अपने बच्चों के साथ।', en: 'And at dawn, by the Vashishti. This time not alone — with his children.', gap: 1.2 },
      { id: 'E4', who: 'B', hi: 'ॐ सूर्याय नमः।', tts: 'ओम सूर्याय नमः।', en: 'Om Suryaya Namah.' },
    ] },
    { id: 'E-4', min: 8 }, // the closing line, brushed on
    { id: 'E-5', min: 10 }, // credits
  ];

  const P = SDT.part({ shots, dur: DUR, U });
  const by = P.byId;
  // fireworks travel from Gilgit in the north-west to the Garo hills in the east; a seeded list, so
  // the sound and the picture burst together
  const rnd = U.mulberry32(1947);
  const fireworks = [];
  for (let i = 0; i < 16; i++) {
    const u = i / 15;
    fireworks.push({ t: +(by['E-1'].t0 + 1.4 + u * 6.2 + rnd() * 0.25).toFixed(3), u, dx: rnd() - 0.5, dy: rnd() - 0.5, seed: 10 + i, size: 0.8 + rnd() * 0.7, hue: i % 4 });
  }
  for (let i = 0; i < 5; i++) fireworks.push({ t: +(by['E-2'].t0 + 1 + i * 1.5 + rnd() * 0.4).toFixed(3), u: -1, dx: rnd(), dy: rnd(), seed: 40 + i, size: 0.7 + rnd() * 0.5, hue: i % 4 }); // seen from the train
  const ev = {
    closing: by['E-4'].t0 + 1, closingEnd: by['E-4'].t0 + 4.4, // the Devanagari line brushes on
    credits: by['E-5'].t0 + 0.6,
  };
  const mid = (id) => (by[id].t0 + by[id].t1) / 2;
  const markers = { fireworks: by['E-1'].t0 + 6, train: mid('E-2'), family: mid('E-3'), closing: ev.closingEnd + 1.5, credits: ev.credits + 5 };

  const SCORE = { ...P, ev, fireworks, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
