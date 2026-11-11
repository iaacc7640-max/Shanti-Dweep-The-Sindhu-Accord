// THE SCORE — Act III, "Seventy-two hours". Shots and lines from docs/shotlist.md and docs/script.md.
// Script rows 3.1 and 3.10 are each spoken in two halves (a, b) so each half sits on its own shot.
// Times come from the measured voice lengths (durations.js).
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const SDT = node ? require('./shared/timeline') : globalThis.SDT;
  let DUR = {};
  if (node) { try { DUR = require('./durations'); } catch (e) { DUR = {}; } } else DUR = globalThis.VOICE_DUR || {};

  const shots = [
    { id: '3-1', min: 8, lead: 1.2, tail: 1.2, lines: [
      { id: '3.1a', who: 'N', hi: 'सरहद के उस पार, पाकिस्तान की अर्थव्यवस्था ढह गई।', en: "Across the border, Pakistan's economy collapsed." },
    ] },
    { id: '3-2', min: 8, lead: 1.2, tail: 1.6, lines: [
      { id: '3.1b', who: 'N', hi: 'आटे की क़तारें। बुझे हुए शहर।', en: 'Queues for flour. Cities gone dark.' },
    ] },
    { id: '3-3', min: 10, lead: 1.6, tail: 2, lines: [
      { id: '3.2', who: 'N', hi: 'लोग सड़कों पर उतरे। फ़ौजी हुकूमत ने उन्हें कुचल दिया।', en: 'People took to the streets. The military regime crushed them.' },
    ] },
    { id: '3-4', min: 9, lead: 1.4, tail: 1.6, lines: [
      { id: '3.3', who: 'N', hi: 'और फिर — भारत में एक आतंकी हमला।', en: 'And then — a terror strike in India.' },
    ] },
    { id: '3-5', min: 7, lead: 0.8, lines: [
      { id: '3.4', who: 'NEWS', hi: 'देश स्तब्ध है। पूरा देश जवाब माँग रहा है।', en: 'The nation is stunned. The whole country is demanding an answer.' },
    ] },
    { id: '3-6', min: 10, lead: 1.6, tail: 1.2, lines: [
      { id: '3.5', who: 'MIN', hi: 'प्रधानमंत्री जी, देश बदला चाहता है।', en: 'Prime Minister, the country wants revenge.', gap: 1 },
      { id: '3.6', who: 'F', hi: 'बदला नहीं। बदलाव।', en: 'Not revenge. Change.' },
    ] },
    { id: '3-7', min: 10, lead: 1.2, tail: 1.6, lines: [
      { id: '3.7', who: 'B', hi: 'क़ब्ज़ा करने वाले शहीद पैदा करते हैं। संविधान, नागरिक पैदा करते हैं।', en: 'Occupiers create martyrs; constitutions create citizens.' },
    ] },
    { id: '3-8', min: 6.5, lead: 1, tail: 1.4, lines: [
      { id: '3.8', who: 'F', hi: 'हम ज़मीन नहीं लेंगे। हम ज़ंजीर तोड़ेंगे।', en: 'We will not take land. We will break a chain.' },
    ] },
    { id: '3-9', min: 12, lead: 1.4, tail: 2, lines: [
      { id: '3.9', who: 'N', hi: 'बहत्तर घंटे। सटीक वार — सिर्फ़ फ़ौजी ठिकानों पर।', en: 'Seventy-two hours. Precision strikes — on military targets only.' },
    ] },
    { id: '3-10', min: 8, lead: 1, tail: 1.6, lines: [
      { id: '3.10a', who: 'N', hi: 'साइबर हमले से कमान ठप।', en: 'A cyber campaign froze the command.' },
    ] },
    { id: '3-11', min: 8, lead: 1, tail: 2, lines: [
      { id: '3.10b', who: 'N', hi: 'परमाणु ठिकाने, सुरक्षित घेरे में।', en: 'The nuclear sites were secured.' },
    ] },
    { id: '3-12', min: 8, lead: 1.2, lines: [
      { id: '3.11', who: 'N', hi: 'और फिर प्रधानमंत्री ने सरहद पार के लोगों से बात की — उर्दू में।', en: 'And then the Prime Minister spoke to the people across the border — in Urdu.' },
    ] },
    { id: '3-13', min: 13, lead: 1.4, tail: 0.9, lines: [
      { id: '3.12', who: 'FU', ur: 'میرے پاکستانی بہنو اور بھائیو۔', en: 'My Pakistani sisters and brothers.', gap: 0.9 },
      { id: '3.13', who: 'FU', ur: 'یہ جنگ آپ سے نہیں ہے۔ یہ اُن سے ہے جنہوں نے آپ کی روٹی چھینی، اور آپ کے بچوں کے ہاتھ میں بندوق دی۔', en: "This war is not with you. It is with those who took your bread, and put a gun in your children's hands." },
    ] },
    { id: '3-14', min: 12, lead: 0.9, tail: 0.9, lines: [
      { id: '3.14', who: 'FU', ur: 'ہم آپ کی زمین نہیں چاہتے۔ ہم آپ کے ایمان کو نہیں چھیڑیں گے۔', en: 'We do not want your land. We will not touch your faith.', gap: 0.8 },
      { id: '3.15', who: 'FU', ur: 'آپ کی مٹی آپ کی ہے۔ آپ کا آئین آپ خود لکھیں گے۔', en: 'Your soil is yours. Your constitution, you will write yourselves.' },
    ] },
    { id: '3-15', min: 7, lead: 1, tail: 2.2, lines: [
      { id: '3.16', who: 'FU', ur: 'اُٹھیے۔ اپنا ملک واپس لیجیے۔', en: 'Rise. Take your country back.' },
    ] },
    { id: '3-16', min: 14, lead: 2, tail: 2.4, lines: [
      { id: '3.17', who: 'N', hi: 'उस रात, लाहौर से कराची तक, लोग छावनियों की ओर चल पड़े। निहत्थे। लाखों।', en: 'That night, from Lahore to Karachi, people walked toward the garrisons. Unarmed. In their hundreds of thousands.' },
    ] },
    { id: '3-17', min: 14, lead: 2.4, tail: 3.2, lines: [
      { id: '3.18', who: 'N', hi: 'सुबह तक फ़ौजी हुकूमत ने हथियार डाल दिए। एक भी शहर पर क़ब्ज़ा नहीं हुआ।', en: 'By morning the junta had laid down its arms. Not one city was occupied.' },
    ] },
  ];

  const P = SDT.part({ shots, dur: DUR, U });
  const by = P.byId, L = P.lineById;
  const ev = {
    fall: L['3.1a'].t + L['3.1a'].dur * 0.55, // the chart drops
    breaking: by['3-4'].t0 + 1, // the TV cuts to breaking news
    hand: L['3.8'].end - 0.3, // her hand comes down on the table
    clock0: by['3-9'].t0, clock1: by['3-11'].t1, // the 72-hour clock runs across three shots
    arcs: [0, 1, 2, 3, 4].map((i) => +(L['3.9'].t + 1.4 + i * 0.9).toFixed(3)),
    nodes: [0, 1, 2, 3, 4, 5, 6].map((i) => +(by['3-10'].t0 + 1 + i * 0.5).toFixed(3)),
    rings: [0, 1, 2].map((i) => +(by['3-11'].t0 + 1.2 + i * 0.9).toFixed(3)),
    onAir: by['3-12'].t1 - 1.2,
    lights0: by['3-16'].t0 + 1, lights1: by['3-16'].t1 - 2,
    gates: by['3-17'].t0 + 1.6, // the gates open
    cloth: by['3-17'].t0 + 4.2, // the white cloth goes up
  };
  const mid = (id) => (by[id].t0 + by[id].t1) / 2;
  const markers = {
    chart: ev.fall + 1.5, queue: mid('3-2'), avenue: mid('3-3'), tv: ev.breaking + 2, screens: mid('3-5'), cabinet: mid('3-6'), bhaskar: mid('3-7'),
    hand: { t: ev.hand, sync: 'a' }, strikes: ev.arcs[4] + 1, cyber: ev.nodes[6] + 0.5, shields: ev.rings[2] + 0.8, mic: mid('3-12'), address: mid('3-13'),
    homes: mid('3-14'), rise: mid('3-15'), crowd: mid('3-16'), dawn: ev.cloth + 2,
  };

  const SCORE = { ...P, ev, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
