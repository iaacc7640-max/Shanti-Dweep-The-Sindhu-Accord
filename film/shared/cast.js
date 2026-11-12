// THE CAST — the only place Bhaskar and Fatima are defined (spec: one shared design per age).
// Every part loads this file; no part redefines a lead.
(function () {
  const G = globalThis.G, Ch = globalThis.Ch;
  const SD = (globalThis.SD = globalThis.SD || {});

  const SKIN_B = '#B98A62', SKIN_F = '#CDA07A';
  const BLACK = '#1B1614', GREY = '#B9B4AC', SILVER = '#D2CEC6';

  const bhaskarBase = { skin: SKIN_B, hairStyle: 'short', facialHair: 'mustache', glasses: 'round', glassesColor: '#2A2320', build: 'slim', shoes: '#1B1B1B' };
  const fatimaBase = { skin: SKIN_F, hairStyle: 'bun', outfit: 'sari', build: 'regular', shoes: '#5A3A2A' };

  SD.CAST = {
    // Bhaskar at 33: black advocate's coat, white shirt and bands
    bhaskarYoung: { ...bhaskarBase, hair: BLACK, outfit: 'suit', robe: '#222228', shirt: '#F4F1E8', trim: '#F4F1E8', bottoms: 'pants', shorts: '#3A3A42' },
    // Bhaskar at 63: the same man, grey; the same coat at work
    bhaskarOld: { ...bhaskarBase, hair: GREY, outfit: 'suit', robe: '#222228', shirt: '#F4F1E8', trim: '#F4F1E8', bottoms: 'pants', shorts: '#3A3A42' },
    // Bhaskar at 63 by the river: white kurta
    bhaskarRiver: { ...bhaskarBase, hair: GREY, outfit: 'kameez', shirt: '#F6F2E6', trim: '#E4DCC8', bottoms: 'shalwar', shorts: '#F6F2E6', shoes: SKIN_B },
    // Fatima at 41: teal sari with a gold border
    fatimaYoung: { ...fatimaBase, hair: BLACK, robe: '#2F6F73', shirt: '#1F4E52', trim: '#D9B45A' },
    // Fatima at 71: ivory sari with the same teal as its border, silver hair, glasses
    fatimaOld: { ...fatimaBase, hair: SILVER, glasses: 'square', glassesColor: '#3A3A42', robe: '#EFE6D2', shirt: '#2F6F73', trim: '#2F6F73' },
    // Bhaskar's grown children (epilogue)
    son: { skin: SKIN_B, hair: BLACK, hairStyle: 'short', glasses: 'none', outfit: 'kameez', shirt: '#E9DFC8', bottoms: 'pants', shorts: '#5A5F6E', build: 'regular' },
    daughter: { skin: SKIN_B, hair: BLACK, hairStyle: 'ponytail', outfit: 'kameez', shirt: '#C9603F', bottoms: 'shalwar', shorts: '#F1E7D0', build: 'slim' },
  };
  globalThis.CAST = SD.CAST; // for `render.js cast`

  // Generic extras: plain, varied, never a likeness of anyone.
  const EXTRA_SKIN = ['#B98A62', '#CDA07A', '#A8774F', '#D9B08A'];
  const EXTRA_SHIRT = ['#E9DFC8', '#8FA7B5', '#C9B48A', '#9A8F7E', '#B5795E', '#6F8A7A'];
  SD.extra = (i, over = {}) => ({
    skin: EXTRA_SKIN[i % 4], hair: i % 5 === 3 ? GREY : BLACK, hairStyle: ['short', 'quiff', 'buzz', 'bun', 'long'][i % 5],
    facialHair: ['none', 'mustache', 'none', 'none', 'none'][i % 5], outfit: i % 5 >= 3 ? 'kameez' : 'shirt',
    shirt: EXTRA_SHIRT[i % 6], bottoms: 'pants', shorts: '#4A4A52', build: ['regular', 'slim', 'broad'][i % 3], ...over,
  });

  // ---- Historic silhouettes: solid shapes, no facial features (spec: silhouettes only) ----
  const sil = (ctx, x, y, s, color, draw) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    draw(ctx); ctx.restore();
  };
  // A broad figure in a Puneri turban and shawl, standing in the dock (Tilak).
  SD.silTilak = (ctx, x, y, s = 1, color = '#2B1D12') => sil(ctx, x, y, s, color, (c) => {
    c.beginPath(); // body + shawl
    c.moveTo(-95, 0); c.quadraticCurveTo(-112, -150, -86, -238); c.quadraticCurveTo(-60, -276, -22, -282);
    c.lineTo(22, -282); c.quadraticCurveTo(64, -276, 88, -236); c.quadraticCurveTo(116, -150, 98, 0); c.closePath(); c.fill();
    c.beginPath(); c.ellipse(0, -318, 40, 46, 0, 0, Math.PI * 2); c.fill(); // head
    c.beginPath(); // turban: a round, close-wound pagdi sitting low on the head, a small knot at the crown
    c.moveTo(-46, -332); c.quadraticCurveTo(-58, -392, 0, -398); c.quadraticCurveTo(58, -392, 46, -332); c.quadraticCurveTo(0, -346, -46, -332); c.closePath(); c.fill();
    c.beginPath(); c.ellipse(14, -398, 16, 10, -0.3, 0, Math.PI * 2); c.fill();
  });
  // A tall slim figure in a barrister's gown, one arm raised in argument (Jinnah).
  SD.silJinnah = (ctx, x, y, s = 1, color = '#2B1D12') => sil(ctx, x, y, s, color, (c) => {
    c.beginPath(); // gown
    c.moveTo(-70, 0); c.quadraticCurveTo(-66, -200, -44, -318); c.quadraticCurveTo(-24, -342, 0, -344);
    c.quadraticCurveTo(26, -342, 44, -318); c.quadraticCurveTo(70, -200, 78, 0); c.closePath(); c.fill();
    c.beginPath(); c.ellipse(0, -384, 30, 38, 0, 0, Math.PI * 2); c.fill(); // head
    c.beginPath(); c.moveTo(-10, -356); c.lineTo(10, -356); c.lineTo(8, -336); c.lineTo(-8, -336); c.closePath(); c.fill(); // neck
    c.lineWidth = 26; c.beginPath(); c.moveTo(36, -310); c.quadraticCurveTo(96, -330, 132, -410); c.stroke(); // raised arm
    c.beginPath(); c.ellipse(136, -420, 13, 16, 0.4, 0, Math.PI * 2); c.fill(); // hand
    c.beginPath(); // gown sleeve hanging from the raised arm
    c.moveTo(30, -322); c.quadraticCurveTo(84, -330, 112, -372); c.quadraticCurveTo(108, -290, 62, -250); c.closePath(); c.fill();
  });
  // A judge on a high bench: wig and robe, back-lit.
  SD.silJudge = (ctx, x, y, s = 1, color = '#2B1D12') => sil(ctx, x, y, s, color, (c) => {
    c.beginPath(); c.moveTo(-80, 0); c.quadraticCurveTo(-84, -110, -40, -140); c.lineTo(40, -140); c.quadraticCurveTo(84, -110, 80, 0); c.closePath(); c.fill();
    c.beginPath(); c.ellipse(0, -172, 30, 34, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.moveTo(-40, -150); c.quadraticCurveTo(-52, -214, 0, -216); c.quadraticCurveTo(52, -214, 40, -150); c.quadraticCurveTo(0, -176, -40, -150); c.fill();
  });

  // A plain standing figure seen from behind, as a solid shape (crowds, onlookers, backs of heads).
  SD.silFigure = (ctx, x, y, s = 1, color = '#231710', { child = false } = {}) => sil(ctx, x, y, s * (child ? 0.62 : 1), color, (c) => {
    c.beginPath(); c.moveTo(-58, 0); c.quadraticCurveTo(-62, -170, -40, -226); c.quadraticCurveTo(0, -246, 40, -226); c.quadraticCurveTo(62, -170, 58, 0); c.closePath(); c.fill();
    c.beginPath(); c.ellipse(0, -272, child ? 40 : 34, child ? 44 : 40, 0, 0, Math.PI * 2); c.fill();
  });
  // head and shoulders from behind, for the bottom edge of a frame
  SD.silHead = (ctx, x, y, s = 1, color = '#231710') => sil(ctx, x, y, s, color, (c) => {
    c.beginPath(); c.ellipse(0, -96, 40, 46, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(0, 0, 86, 66, 0, 0, Math.PI * 2); c.fill();
  });

  // Draw a lead with sensible defaults; `o` is any Ch.person option.
  // Watercolor washes are see-through, so a person is painted on a spare sheet first and laid down
  // three times: the washes build up to solid colour and the background no longer shows through.
  let sheet = null;
  SD.person = (ctx, who, o) => {
    const opts = { pose: 'stand', s: 1, ...o, style: typeof who === 'string' ? SD.CAST[who] : who };
    const cv = ctx.canvas;
    if (!sheet || sheet.width !== cv.width || sheet.height !== cv.height) sheet = G.makeCanvas(cv.width, cv.height);
    const sx = sheet.getContext('2d');
    sx.setTransform(1, 0, 0, 1, 0, 0); sx.clearRect(0, 0, sheet.width, sheet.height); sx.setTransform(ctx.getTransform());
    const out = Ch.person(sx, opts);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    for (let i = 0; i < 3; i++) ctx.drawImage(sheet, 0, 0);
    ctx.restore();
    return out;
  };
})();
