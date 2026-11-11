// THE SCORE — Act I, "The barrister and the advocate". Shots and lines from docs/shotlist.md and
// docs/script.md. Times come from the measured voice lengths (durations.js).
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const SDT = node ? require('./shared/timeline') : globalThis.SDT;
  let DUR = {};
  if (node) { try { DUR = require('./durations'); } catch (e) { DUR = {}; } } else DUR = globalThis.VOICE_DUR || {};

  const shots = [
    { id: '1-1', min: 5.5 }, // the High Court from outside
    { id: '1-2', min: 8, lead: 1, lines: [
      { id: '1.1', who: 'N', hi: 'बंबई, उन्नीस सौ सोलह। हाई कोर्ट में लोकमान्य तिलक पर राजद्रोह का मुक़दमा है।', en: 'Bombay, 1916. In the High Court, Lokmanya Tilak faces a charge of sedition.' },
    ] },
    { id: '1-3', min: 10, lead: 0.9, tail: 1.2, lines: [
      { id: '1.2', who: 'N', hi: 'उनके बचाव में खड़ा है बंबई का एक युवा बैरिस्टर — मोहम्मद अली जिन्ना।', en: 'Rising in his defence is a young barrister of Bombay — Mohammad Ali Jinnah.', gap: 0.8 },
      { id: '1.3', who: 'N', hi: 'उस दिन एक वकील, एक देशभक्त की ढाल बना था।', en: "That day, a lawyer was a patriot's shield." },
    ] },
    { id: '1-4', min: 10, lead: 1.2, tail: 1.6, lines: [
      { id: '1.4', who: 'N', hi: 'इकतीस बरस बाद, उसी बैरिस्टर की ज़िद पर, एक नक्शा दो टुकड़ों में टूट गया।', en: "Thirty-one years later, at that same barrister's insistence, a map cracked in two." },
    ] },
    { id: '1-5', min: 5.5 }, // the two pieces drift apart
    { id: '1-6', min: 9, lead: 1.4, lines: [
      { id: '1.5', who: 'N', hi: 'चिपलूण का खरे परिवार। चार पीढ़ियों से संघ के स्वयंसेवक।', en: 'The Khare family of Chiplun. Sangh volunteers for four generations.' },
    ] },
    { id: '1-7', min: 8, lead: 1.2, tail: 1.3, lines: [
      { id: '1.6', who: 'N', hi: 'उन्नीस सौ अड़तालीस में घर जला, खेत छूटे — पर हिम्मत नहीं छूटी।', en: 'In 1948 the house burned and the fields were lost — but not their resolve.' },
    ] },
    { id: '1-8', min: 9, lead: 1, lines: [
      { id: '1.7', who: 'N', hi: 'उसी घर का बेटा, भास्कर। गवर्नमेंट लॉ कॉलेज, मुंबई। फिर फोर्ट की एक तंग गली में छोटा-सा चेंबर।', en: 'A son of that house: Bhaskar. Government Law College, Mumbai. Then a small chamber in a narrow lane of Fort.' },
    ] },
    { id: '1-9', min: 9, lead: 2, tail: 1.4, lines: [
      { id: '1.8', who: 'B', hi: 'क़ानून तलवार नहीं है। क़ानून धागा है — जो फटे हुए को सीता है।', en: 'The law is not a sword. The law is a thread — it stitches what is torn.' },
    ] },
    { id: '1-10', min: 11, lead: 1.2, lines: [
      { id: '1.9', who: 'N', hi: 'उसी कॉलेज के एक व्याख्यान में उसकी मुलाक़ात हुई — फ़ातिमा हुसैन से।', en: 'At a lecture in that same college, he met Fatima Hussain.', gap: 0.7 },
      { id: '1.10', who: 'N', hi: 'उत्तर प्रदेश में जन्मी। एक रूढ़िवादी निकाह की क़ैद से निकलकर, अपने दम पर वकील बनी।', en: 'Born in Uttar Pradesh. She walked out of an orthodox marriage and became a lawyer on her own strength.' },
    ] },
    { id: '1-11', min: 8, lead: 0.9, lines: [
      { id: '1.11', who: 'F', hi: 'खरे साहब, आप संघ के आदमी हैं। मुझसे बहस करेंगे, या चाय पिएँगे?', en: 'Mr Khare, you are a Sangh man. Will you argue with me, or have tea?', gap: 0.7 },
      { id: '1.12', who: 'B', hi: 'दोनों। पहले चाय।', en: 'Both. Tea first.' },
    ] },
    { id: '1-12', min: 6 }, // the chai stall, a train passes
    { id: '1-13', min: 12, lead: 0.8, tail: 1.2, lines: [
      { id: '1.13', who: 'F', hi: 'फ़ारस में इस्लाम फ़िरदौसी के साथ ढल गया। जावा में, रामायण के साथ।', en: 'In Persia, Islam adapted to Firdowsi. In Java, to the Ramayana.', gap: 0.8 },
      { id: '1.14', who: 'F', hi: 'तो भारत में भी धर्मशास्त्र को झुकना होगा — मिट्टी को नहीं।', en: 'Then in Bharat too, the theology must bend — not the soil.' },
    ] },
    { id: '1-14', min: 12, lead: 0.7, tail: 1, lines: [
      { id: '1.15', who: 'B', hi: 'और आपके आदर्श कौन हैं?', en: 'And who are your ideals?', gap: 0.7 },
      { id: '1.16', who: 'F', hi: 'जस्टिस छागला। डॉक्टर कलाम। परमवीर अब्दुल हमीद। उस्ताद ज़ाकिर हुसैन।', en: 'Justice Chagla. Dr Kalam. Param Vir Abdul Hamid. Ustad Zakir Hussain.', gap: 0.7 },
      { id: '1.17', who: 'F', hi: 'इनसे कभी किसी ने नहीं पूछा — पहले मज़हब, या पहले मुल्क।', en: 'No one ever had to ask them — faith first, or country first.' },
    ] },
    { id: '1-15', min: 11, lead: 0.8, tail: 1, lines: [
      { id: '1.18', who: 'B', hi: 'तो इस विचार को एक नाम दीजिए।', en: 'Then give this idea a name.', gap: 0.7 },
      { id: '1.19', who: 'F', hi: 'इस्लाम-ए-भारती। और आप क्या करेंगे?', tts: 'इस्लाम ए भारती। और आप क्या करेंगे?', en: 'Islam-e-Bharati. And what will you do?', gap: 0.7 },
      { id: '1.20', who: 'B', hi: 'मैं इसका संविधान लिखूँगा।', en: 'I will write its constitution.' },
    ] },
    { id: '1-16', min: 12, lead: 1.2, tail: 3, lines: [
      { id: '1.21', who: 'N', hi: 'उस शाम, चाय की दो प्यालियों के बीच, एक आंदोलन जन्मा — इस्लाम-ए-भारती। और एक छोटा-सा दल — एम.एन.पी.।', tts: 'उस शाम, चाय की दो प्यालियों के बीच, एक आंदोलन जन्मा — इस्लाम ए भारती। और एक छोटा-सा दल — एम एन पी।', en: 'That evening, between two cups of tea, a movement was born — Islam-e-Bharati. And a small party — the MNP.' },
    ] },
  ];

  const P = SDT.part({ shots, dur: DUR, U });
  const by = P.byId, L = P.lineById;
  const icons = L['1.16']; // the four honoured names stamp on, one per quarter of the line
  const ev = {
    gavel: by['1-2'].t0 + 0.5,
    rise: L['1.2'].t + 0.3, // the barrister rises
    crack: L['1.4'].t + L['1.4'].dur * 0.62, // "...a map cracked in two"
    year1947: by['1-5'].t0 + 0.8,
    icons: [0, 1, 2, 3].map((i) => +(icons.t + (icons.dur * i) / 4 + 0.05).toFixed(3)),
    firdowsi: L['1.13'].t + 0.9, java: L['1.13'].t + L['1.13'].dur * 0.62,
    write: L['1.20'].t, // he starts writing on the napkin
    name1: L['1.21'].t + L['1.21'].dur * 0.5, // "इस्लाम-ए-भारती" appears
    name2: L['1.21'].t + L['1.21'].dur * 0.86, // "MNP" appears
    clink: L['1.21'].end + 0.9,
  };
  const mid = (id) => (by[id].t0 + by[id].t1) / 2;
  const markers = {
    court: mid('1-2'), barrister: ev.rise + 3, crack: ev.crack, pieces: mid('1-5'), chiplun: mid('1-6'), burnt: mid('1-7'),
    college: mid('1-8'), chamber: mid('1-9'), lecture: mid('1-10'), corridor: mid('1-11'), chai: mid('1-12'), steam: ev.java + 1.5,
    icons: ev.icons[3] + 0.8, twoShot: mid('1-15'), napkin: ev.name2 + 0.8, clink: { t: ev.clink, sync: 'a' },
  };

  const SCORE = { ...P, ev, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
