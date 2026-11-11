// THE SCORE — Act II, "Thirty years". Shots and lines from docs/shotlist.md and docs/script.md.
// Times come from the measured voice lengths (durations.js).
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const SDT = node ? require('./shared/timeline') : globalThis.SDT;
  let DUR = {};
  if (node) { try { DUR = require('./durations'); } catch (e) { DUR = {}; } } else DUR = globalThis.VOICE_DUR || {};

  const shots = [
    { id: '2-1', min: 7, lead: 1.6, lines: [
      { id: '2.1', who: 'N', hi: 'अगले तीस बरस आसान नहीं थे।', en: 'The next thirty years were not easy.' },
    ] },
    { id: '2-2', min: 9, lead: 1, lines: [
      { id: '2.2', who: 'N', hi: 'फ़ातिमा पर फ़तवे आए। बहिष्कार हुए। सभाओं में कुर्सियाँ खाली रहीं।', en: 'Fatwas came for Fatima. Boycotts. Empty chairs at her meetings.' },
    ] },
    { id: '2-3', min: 5 }, // headlines
    { id: '2-4', min: 9, lead: 1.4, tail: 1.2, lines: [
      { id: '2.3', who: 'F', hi: 'मुझे जो चाहो कह लो। पर बेटियों को स्कूल जाने से मत रोको।', en: 'Call me what you like. But do not stop the daughters from going to school.' },
    ] },
    { id: '2-5', min: 11, lead: 1, lines: [
      { id: '2.4', who: 'N', hi: 'और भास्कर? वह लिखता रहा। दल का संविधान। सुधारों के मसौदे। एक-एक धारा, एक-एक रात।', en: "And Bhaskar? He kept writing. The party's constitution. Drafts of reform. Clause by clause, night by night." },
    ] },
    { id: '2-6', min: 7, lead: 1, tail: 1.2, lines: [
      { id: '2.5', who: 'B', hi: 'नारे एक दिन चलते हैं। धाराएँ सौ साल।', en: 'Slogans last a day. Clauses last a hundred years.' },
    ] },
    { id: '2-7', min: 10, lead: 1.2, tail: 1.4, lines: [
      { id: '2.6', who: 'N', hi: 'इस बीच दुनिया बदल रही थी। अमेरिका अपने भीतर सिमट गया।', en: 'Meanwhile the world was changing. America turned inward.' },
    ] },
    { id: '2-8', min: 10, lead: 1.2, tail: 1.6, lines: [
      { id: '2.7', who: 'N', hi: 'भारत और यूरोपीय संघ के बीच एक ऐतिहासिक व्यापार समझौता हुआ।', en: 'India and the European Union signed a historic trade deal.' },
    ] },
    { id: '2-9', min: 10, lead: 1.2, tail: 1.8, lines: [
      { id: '2.8', who: 'N', hi: 'सऊदी अरब और तुर्किये ने कट्टरपंथी संगठनों का पैसा बंद कर दिया।', en: 'Saudi Arabia and Turkey cut off funding to radical groups.' },
    ] },
    { id: '2-10', min: 9, lead: 1.2, lines: [
      { id: '2.9', who: 'N', hi: 'और फिर आई चुनाव की वह रात।', en: 'And then came that election night.', gap: 0.8 },
      { id: '2.10', who: 'NEWS', hi: 'त्रिशंकु लोकसभा! किसी को बहुमत नहीं।', en: 'A hung parliament! No one has a majority.' },
    ] },
    { id: '2-11', min: 7 }, // the seats stop three short
    { id: '2-12', min: 12, lead: 1, tail: 1.4, lines: [
      { id: '2.11', who: 'N', hi: 'सरकार की चाबी थी सिर्फ़ तीन सीटों के पास। मुंबई। पश्चिमी उत्तर प्रदेश। पश्चिम बंगाल। तीनों — एम.एन.पी. की।', tts: 'सरकार की चाबी थी सिर्फ़ तीन सीटों के पास। मुंबई। पश्चिमी उत्तर प्रदेश। पश्चिम बंगाल। तीनों — एम एन पी की।', en: "The key to government lay with just three seats. Mumbai. Western UP. West Bengal. All three — the MNP's." },
    ] },
    { id: '2-13', min: 8, lead: 1.2, tail: 1.2, lines: [
      { id: '2.12', who: 'B', hi: 'हमारी एक ही शर्त है। परचम आपका रहे — प्रधानमंत्री हमारी।', en: 'We have one condition. Keep your banner — the Prime Minister is ours.' },
    ] },
    { id: '2-14', min: 14, lead: 1.2, tail: 1.4, lines: [
      { id: '2.13', who: 'N', hi: 'एन.डी.ए. का परचम वही रहा। और प्रधानमंत्री बनीं — फ़ातिमा हुसैन।', tts: 'एन डी ए का परचम वही रहा। और प्रधानमंत्री बनीं — फ़ातिमा हुसैन।', en: 'The NDA kept its banner. And the Prime Minister was — Fatima Hussain.', gap: 0.9 },
      { id: '2.14', who: 'F', hi: 'मैं, फ़ातिमा हुसैन, शपथ लेती हूँ कि मैं भारत के संविधान के प्रति सच्ची श्रद्धा और निष्ठा रखूँगी।', en: 'I, Fatima Hussain, do swear that I will bear true faith and allegiance to the Constitution of India.' },
    ] },
    { id: '2-15', min: 9, lead: 1, tail: 2.6, lines: [
      { id: '2.15', who: 'N', hi: 'और भास्कर विष्णु खरे बने — प्रधान विधि सलाहकार। हमेशा की तरह, एक क़दम पीछे।', en: 'And Bhaskar Vishnu Khare became Principal Legal Advisor. As always, one step behind.' },
    ] },
  ];

  const P = SDT.part({ shots, dur: DUR, U });
  const by = P.byId, L = P.lineById;
  const split = (id, k, n) => +(L[id].t + (L[id].dur * k) / n).toFixed(3);
  const ev = {
    papers: [0.6, 1.5, 2.4, 3.3].map((d) => +(by['2-3'].t0 + d).toFixed(3)), // each headline slaps on
    door: L['2.6'].t + L['2.6'].dur * 0.55, // America's door closes
    route: L['2.7'].t + 0.6, routeEnd: L['2.7'].end + 0.6,
    snips: [0, 1, 2, 3, 4, 5].map((i) => +(L['2.8'].t + L['2.8'].dur * 0.5 + i * 0.42).toFixed(3)),
    sting: by['2-10'].t0 + 0.3,
    fill0: by['2-11'].t0 + 0.4, fill1: by['2-11'].t0 + 4.2, // the seats fill, then stop three short
    pins: [split('2.11', 3.1, 8), split('2.11', 4.0, 8), split('2.11', 5.2, 8)], // Mumbai, Western UP, West Bengal
    gold: split('2.11', 6.6, 8), // the three seats turn gold
    oath: L['2.14'].t,
  };
  const mid = (id) => (by[id].t0 + by[id].t1) / 2;
  const markers = {
    calendar: mid('2-1'), hall: mid('2-2'), headlines: ev.papers[3] + 0.6, lane: mid('2-4'), desk: mid('2-5'), clause: mid('2-6'),
    america: ev.door + 1.2, trade: ev.routeEnd + 0.5, funding: ev.snips[5] + 0.6, studio: mid('2-10'), hung: ev.fill1 + 1,
    pin1: { t: ev.pins[0], sync: 'a' }, pin3: ev.pins[2] + 0.4, gold: ev.gold + 0.8, room: mid('2-13'), oath: ev.oath + 3, pillar: mid('2-15'),
  };

  const SCORE = { ...P, ev, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
