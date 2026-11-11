// THE SCORE — Act IV, "The ledger and the river". Shots and lines from docs/shotlist.md and
// docs/script.md. Times come from the measured voice lengths (durations.js).
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const SDT = node ? require('./shared/timeline') : globalThis.SDT;
  let DUR = {};
  if (node) { try { DUR = require('./durations'); } catch (e) { DUR = {}; } } else DUR = globalThis.VOICE_DUR || {};

  const shots = [
    { id: '4-1', min: 10, lead: 1.2, tail: 1.4, lines: [
      { id: '4.1', who: 'N', hi: 'पर एक ताक़त और थी — चीन। सीपेक और ग्वादर में उसके अरबों डॉलर लगे थे।', en: 'But there was one more power — China. It had billions of dollars in CPEC and Gwadar.' },
    ] },
    { id: '4-2', min: 8, lead: 1.2, tail: 1.8, lines: [
      { id: '4.2', who: 'N', hi: 'उसकी फ़ौजें सरहद पर जमा होने लगीं।', en: 'Its troops began to mass at the border.' },
    ] },
    { id: '4-3', min: 8, lead: 1.4, tail: 1.4, lines: [
      { id: '4.3', who: 'F', hi: 'भास्कर, अब?', en: 'Bhaskar — now what?', gap: 0.9 },
      { id: '4.4', who: 'B', hi: 'अब गोली नहीं, मैडम। बही-खाता।', en: 'Not bullets now, Madam. The ledger.' },
    ] },
    { id: '4-4', min: 6.5, lead: 1.2, tail: 1.2, lines: [
      { id: '4.5', who: 'N', hi: 'पर्दे के पीछे, भास्कर ने तीन पत्ते चले।', en: 'Behind the curtain, Bhaskar played three cards.' },
    ] },
    { id: '4-5', min: 12, lead: 1.2, tail: 1.4, lines: [
      { id: '4.6', who: 'N', hi: 'पहला — व्यापार। भारत के साथ चीन का भारी व्यापार अधिशेष। जंग हुई, तो वह बाज़ार बंद।', en: "First — trade. China's large trade surplus with India. In a war, that market closes." },
    ] },
    { id: '4-6', min: 12, lead: 1.2, tail: 1.4, lines: [
      { id: '4.7', who: 'N', hi: 'दूसरा — बलोचिस्तान के साथ एक अहदनामा। स्वायत्तता, और अपनी खनिज संपदा पर रॉयल्टी।', en: 'Second — a covenant with Balochistan. Autonomy, and royalties on its own mineral wealth.' },
    ] },
    { id: '4-7', min: 11, lead: 1.2, tail: 1.4, lines: [
      { id: '4.8', who: 'N', hi: 'तीसरा — क़र्ज़। चीन का एक-एक पैसा लौटाया जाएगा। किस्तों में, गारंटी के साथ।', en: 'Third — the debt. Every rupee owed to China would be repaid. In instalments, with guarantees.' },
    ] },
    { id: '4-8', min: 12, lead: 1.4, tail: 1.6, lines: [
      { id: '4.9', who: 'B', hi: 'आपको बंदरगाह चाहिए, या अपना पैसा? पैसा मिलेगा। बंदरगाह व्यापार का रहेगा — किसी फ़ौज का नहीं।', en: 'Do you want a port, or your money? You will get the money. The port stays for trade — not for any army.' },
    ] },
    { id: '4-9', min: 11, lead: 1.6, tail: 2, lines: [
      { id: '4.10', who: 'N', hi: 'ग्वादर एक व्यावसायिक बंदरगाह बन गया। और चीन की फ़ौजें लौट गईं।', en: "Gwadar became a commercial port. And China's troops went home." },
    ] },
    { id: '4-10', min: 12, lead: 2, tail: 1.6, lines: [
      { id: '4.11', who: 'N', hi: 'और फिर, सिंधु के तट पर — भारत, पाकिस्तान और बांग्लादेश के नेता, एक ही मेज़ पर।', en: 'And then, on the bank of the Indus — the leaders of India, Pakistan and Bangladesh, at one table.' },
    ] },
    { id: '4-11', min: 12, lead: 1.2, tail: 1.8, lines: [
      { id: '4.12', who: 'N', hi: 'तीन देश। तीन झंडे। तीन संविधान। और एक साझा संघ — खुली सरहदें, साझा बाज़ार।', en: 'Three nations. Three flags. Three constitutions. And one shared union — open borders, a common market.' },
    ] },
    { id: '4-12', min: 18, lead: 1.2, tail: 1.8, lines: [
      { id: '4.13', who: 'N', hi: 'संधि की प्रस्तावना भास्कर ने लिखी थी।', en: 'The preamble to the treaty was written by Bhaskar.', gap: 1 },
      { id: '4.14', who: 'B', hi: 'बंबई के एक बैरिस्टर ने कभी हमारी एकता को काटा था; बंबई का ही एक अधिवक्ता, तिलक की ज्योति लेकर, आज यह स्थापित करता है — कि यह मिट्टी हम सबको बाँधती है।', en: 'A barrister from Bombay once severed our unity; an advocate from Bombay, bearing the flame of Tilak, establishes that the soil binds us all.' },
    ] },
    { id: '4-13', min: 9, lead: 1.6, tail: 1.6, lines: [
      { id: '4.15', who: 'F', hi: 'आस्था मिट्टी के आगे झुकती है। मिट्टी, आस्था के आगे नहीं।', en: 'Faith bends to the soil. Not the soil to faith.' },
    ] },
    { id: '4-14', min: 8, lead: 1.4, tail: 3.4, lines: [
      { id: '4.16', who: 'N', hi: 'इसे नाम मिला — सिंधु समझौता।', en: 'It was named — the Sindhu Accord.' },
    ] },
  ];

  const P = SDT.part({ shots, dur: DUR, U });
  const by = P.byId, L = P.lineById;
  const at = (id, k) => +(L[id].t + L[id].dur * k).toFixed(3);
  const ev = {
    route0: L['4.1'].t + 1, route1: L['4.1'].end, // the corridor draws on
    troops: [0, 1, 2, 3, 4, 5].map((i) => +(L['4.2'].t + 0.2 + i * 0.5).toFixed(3)),
    flip1: by['4-5'].t0 + 0.6, bars: at('4.6', 0.3), shutter: at('4.6', 0.78),
    flip2: by['4-6'].t0 + 0.6, scroll: at('4.7', 0.3), coins: at('4.7', 0.62),
    flip3: by['4-7'].t0 + 0.6, ticks: [0, 1, 2, 3, 4, 5].map((i) => +(at('4.8', 0.45) + i * 0.5).toFixed(3)),
    slide: at('4.9', 0.42), // he slides the ledger across
    leave: at('4.10', 0.55), // the warships turn away
    ring0: at('4.12', 0.55), ring1: L['4.12'].end + 0.4, // the ring of light joins the three
    sign: by['4-13'].t0 + 0.8,
    seal: L['4.16'].end + 0.5, // the seal comes down
  };
  const mid = (id) => (by[id].t0 + by[id].t1) / 2;
  const markers = {
    corridor: ev.route1 + 0.6, troops: ev.troops[5] + 0.8, window: mid('4-3'), cards: mid('4-4'), trade: ev.shutter + 1, covenant: ev.coins + 1.5,
    ledger: ev.ticks[5] + 0.6, meeting: ev.slide + 1.5, gwadar: ev.leave + 2, indus: mid('4-10'), union: ev.ring1 + 0.6, preamble: L['4.14'].end + 0.6,
    signing: mid('4-13'), seal: { t: ev.seal, sync: 'av' }, sealed: ev.seal + 1.5,
  };

  const SCORE = { ...P, ev, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
