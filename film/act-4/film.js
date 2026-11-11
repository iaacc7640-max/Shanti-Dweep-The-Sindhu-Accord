// THE FILM — Act IV: the corridor and the troops, Bhaskar's three cards, Gwadar as a trading port,
// the signing on the Indus, three nations in one union, the preamble and the seal.
(function () {
  const G = globalThis.G, U = globalThis.U, S = globalThis.SCORE, SD = globalThis.SD, Data = globalThis.Data, GEO = globalThis.GEO;
  const W = G.W, H = G.H, X = SD.X, Y = SD.Y, { ramp, lerp, clamp, rect } = SD;
  const ev = S.ev, INK = SD.PAL.ink, PAPER = SD.PAL.paper;
  const flat = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
  const pop = (t, t0, d = 0.3) => U.ease.outBack(clamp((t - t0) / d), 2.2);
  Object.assign(GEO.cities, { Kashgar: [75.99, 39.47], Gwadar: [62.33, 25.13] });

  // ---------- maps ----------
  const LAND = '#DED6C6';
  const region = Data.map({ region: [56, 20, 92, 42], x: 0, y: Y(20), w: W, h: Y(960) });
  const union = Data.map({ region: [58, 5, 100, 39], x: X(160), y: Y(40), w: X(1100), h: Y(1000) });
  const balo = Data.map({ region: [58, 22, 76, 34], x: X(40), y: Y(120), w: X(1000), h: Y(820) });
  // Balochistan province, hand-plotted and stylised; it is drawn clipped to Pakistan's outline
  const BALOCH = [[61.6, 25.0], [64.5, 25.1], [66.5, 25.3], [66.9, 25.9], [67.3, 26.7], [67.6, 27.9], [68.6, 28.3], [69.7, 28.9], [70.2, 29.9], [69.9, 31.0], [69.3, 31.9], [68.2, 31.8], [67.0, 31.2], [66.4, 30.9], [66.3, 29.9], [64.0, 29.5], [62.5, 29.4], [60.8, 29.9], [61.7, 28.3], [62.8, 27.2], [63.2, 26.6], [62.3, 26.4], [61.6, 25.8]];
  // the corridor, north to south: Kashgar, the Khunjerab pass, Gilgit, Islamabad, down the Indus plain, Gwadar
  const CPEC = [[75.99, 39.47], [75.42, 36.85], [74.3, 35.9], [73.05, 33.7], [71.5, 30.2], [68.9, 27.7], [66.0, 26.0], [62.33, 25.13]];
  function corridor(ctx, map, k, color = '#B5332B') {
    const pts = CPEC.map(([lo, la]) => map.proj(lo, la));
    let total = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); total += d; }
    let left = total * clamp(k);
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    let tip = pts[0];
    for (let i = 1; i < pts.length && left > 0; i++) { const u = Math.min(1, left / seg[i - 1]); tip = [lerp(pts[i - 1][0], pts[i][0], u), lerp(pts[i - 1][1], pts[i][1], u)]; ctx.lineTo(tip[0], tip[1]); left -= seg[i - 1]; }
    ctx.stroke(); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(tip[0], tip[1], 12, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
  // a block of troop markers: plain rectangles, the map symbol for a unit
  function unit(ctx, x, y, a, color = '#8C2F2B') {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y - (1 - clamp(a)) * 40);
    ctx.fillStyle = color; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.fillRect(-34, -22, 68, 44); ctx.strokeRect(-34, -22, 68, 44);
    ctx.strokeStyle = '#FBF5E6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-34, -22); ctx.lineTo(34, 22); ctx.moveTo(34, -22); ctx.lineTo(-34, 22); ctx.stroke(); ctx.restore();
  }
  const UNITS = [[79.5, 37.2], [81.6, 36.6], [83.6, 35.6], [82.4, 33.6], [84.6, 32.6], [86.4, 31.4]]; // north and east of India's outline

  // ---------- flags, drawn plainly and with care ----------
  function flag(ctx, kind, x, y, w, h, t) {
    ctx.save(); ctx.translate(x, y);
    const wave = (i) => Math.sin(t * 2.2 + i * 0.8 + kind) * h * 0.04;
    const band = (c, y0, y1, x0 = 0, x1 = 1) => { ctx.fillStyle = c; ctx.beginPath(); for (let i = 0; i <= 8; i++) { const u = lerp(x0, x1, i / 8); ctx.lineTo(u * w, y0 * h + wave(u * 8)); } for (let i = 8; i >= 0; i--) { const u = lerp(x0, x1, i / 8); ctx.lineTo(u * w, y1 * h + wave(u * 8)); } ctx.fill(); };
    if (kind === 0) { // India
      band('#FF9933', 0, 1 / 3); band('#FFFFFF', 1 / 3, 2 / 3); band('#138808', 2 / 3, 1);
      ctx.strokeStyle = '#000080'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(w / 2, h / 2 + wave(4), h * 0.13, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(w / 2 - Math.cos(a) * h * 0.13, h / 2 + wave(4) - Math.sin(a) * h * 0.13); ctx.lineTo(w / 2 + Math.cos(a) * h * 0.13, h / 2 + wave(4) + Math.sin(a) * h * 0.13); ctx.stroke(); }
    } else if (kind === 1) { // Pakistan
      band('#FFFFFF', 0, 1, 0, 0.25); band('#01411C', 0, 1, 0.25, 1);
      const cx = w * 0.62, cy = h * 0.5 + wave(5), r = h * 0.3;
      ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#01411C'; ctx.beginPath(); ctx.arc(cx + r * 0.28, cy - r * 0.22, r * 0.86, 0, Math.PI * 2); ctx.fill();
      G.star(ctx, cx + r * 0.42, cy - r * 0.36, r * 0.3, { fill: '#FFFFFF', stroke: null, seed: 3, rot: 0.3 });
    } else { // Bangladesh
      band('#006A4E', 0, 1); ctx.fillStyle = '#F42A41'; ctx.beginPath(); ctx.arc(w * 0.45, h * 0.5 + wave(3.6), h * 0.3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
  const mast = (ctx, kind, x, y, h, t) => { flat(ctx, x - 4, y - h, 8, h, '#5E4A3A'); flag(ctx, kind, x + 4, y - h, h * 0.42, h * 0.27, t); };

  // ---------- sets ----------
  function nightWindow(ctx, t) {
    SD.sky(ctx, [[0, '#262230'], [1, '#3A3440']]);
    flat(ctx, X(300), Y(110), X(1320), Y(600), '#0E1630');
    for (let i = 0; i < 240; i++) { const x = X(310 + G.rnd(i, 1) * 1300), y = Y(430 + G.rnd(i, 2) * 270); ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * (0.5 + G.rnd(i, 3)) + i)); ctx.fillStyle = i % 5 ? '#FFD68C' : '#BFE0FF'; ctx.fillRect(x, y, 4 + 4 * G.rnd(i, 4), 3); }
    ctx.globalAlpha = 1;
    ctx.save(); ctx.strokeStyle = '#5E4A3A'; ctx.lineWidth = 16; ctx.strokeRect(X(300), Y(110), X(1320), Y(600)); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(X(960), Y(110)); ctx.lineTo(X(960), Y(710)); ctx.stroke(); ctx.restore();
    flat(ctx, 0, Y(800), W, Y(280), '#2A2428');
    SD.glow(ctx, X(960), Y(900), X(900), 'rgba(255,205,130,0.9)', 0.25);
  }
  // a card on green baize: face down, or turned to show its word
  function card(ctx, x, y, t, flipAt, word, sub, n) {
    const k = clamp((t - flipAt) / 0.4), face = k > 0.5, sx = Math.abs(Math.cos(k * Math.PI));
    ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.04, sx), 1);
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(-X(128), -Y(182), X(270), Y(380));
    ctx.fillStyle = face ? '#FBF5E6' : '#7C2F2B'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-X(135), -Y(190), X(270), Y(380), 18); ctx.fill(); ctx.stroke();
    if (!face) { ctx.strokeStyle = '#E2A93B'; ctx.lineWidth = 3; ctx.strokeRect(-X(110), -Y(165), X(220), Y(330)); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-X(110), -Y(165) + i * Y(66)); ctx.lineTo(X(110), -Y(165) + (i + 1) * Y(66) - Y(66)); ctx.stroke(); } }
    ctx.restore();
    if (face && sx > 0.6) { SD.latin(ctx, String(n), x - X(96), y - Y(130), { size: 44, weight: 800, color: '#7C2F2B' }); SD.hindi(ctx, word, x, y + Y(10), { size: 64, color: INK }); SD.latin(ctx, sub, x, y + Y(80), { size: 28, weight: 400, color: '#6B5A4A' }); }
  }
  const baize = (ctx) => { flat(ctx, 0, 0, W, H, '#1F4A3A'); SD.shade(ctx, W / 2, Y(520), X(500), X(1400), '#7AA890'); };
  const cardRow = (ctx, t) => { card(ctx, X(280), Y(300), t, ev.flip1, 'व्यापार', 'trade', 1); card(ctx, X(590), Y(300), t, ev.flip2, 'अहदनामा', 'covenant', 2); card(ctx, X(900), Y(300), t, ev.flip3, 'क़र्ज़', 'debt', 3); };
  function gwadar(ctx, t, leave) {
    const horizon = Y(520);
    SD.sky(ctx, [[0, '#7FB6D6'], [1, '#E9E2C8']], 0, 0, W, horizon);
    SD.hills(ctx, { y: horizon, amp: Y(150), color: '#C9A878', seed: 23, freq: 0.0016, yFloor: horizon + 4 }); // the hammerhead headland
    SD.sky(ctx, [[0, '#6FB0C8'], [1, '#2F6F8C']], 0, horizon, W, H - horizon);
    for (let i = 0; i < 22; i++) { const y = horizon + 20 + (i / 22) * (H - horizon), x = ((i * 331) % 1900) + Math.sin(t * 0.6 + i) * 30; ctx.save(); ctx.globalAlpha = 0.2; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(x), y); ctx.quadraticCurveTo(X(x + 70), y - 6, X(x + 160), y); ctx.stroke(); ctx.restore(); }
    // warships, as plain grey shapes, turning and leaving
    for (let i = 0; i < 2; i++) { const x = lerp(X(1250 + i * 260), W + X(500 + i * 200), leave), y = horizon + Y(26 + i * 20); ctx.save(); ctx.globalAlpha = 1 - leave * 0.6; ctx.fillStyle = '#6E7A84'; ctx.beginPath(); ctx.moveTo(x - X(110), y); ctx.lineTo(x + X(120), y); ctx.lineTo(x + X(90), y + Y(22)); ctx.lineTo(x - X(90), y + Y(22)); ctx.fill(); ctx.fillRect(x - X(30), y - Y(26), X(60), Y(26)); ctx.fillRect(x - 3, y - Y(52), 6, Y(26)); ctx.restore(); }
    // the quay, its cranes and a container ship
    flat(ctx, 0, Y(760), X(980), Y(320), '#8A8478'); flat(ctx, 0, Y(748), X(980), Y(16), '#5E5A52');
    for (let i = 0; i < 3; i++) { const cx = X(180 + i * 270), top = Y(360); ctx.save(); ctx.strokeStyle = '#C9603F'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(cx - X(40), Y(760)); ctx.lineTo(cx - X(40), top); ctx.moveTo(cx + X(40), Y(760)); ctx.lineTo(cx + X(40), top); ctx.moveTo(cx - X(70), top + Y(30)); ctx.lineTo(cx + X(220), top + Y(30)); ctx.moveTo(cx - X(40), top); ctx.lineTo(cx + X(160), top + Y(30)); ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 3; const dy = Y(120) + Math.sin(t * 0.7 + i) * Y(50); ctx.beginPath(); ctx.moveTo(cx + X(170), top + Y(30)); ctx.lineTo(cx + X(170), top + Y(30) + dy); ctx.stroke(); ctx.fillStyle = ['#2F6F73', '#E2A93B', '#B5533C'][i]; ctx.fillRect(cx + X(134), top + Y(30) + dy, X(72), Y(34)); ctx.restore(); }
    const sx = X(1120), sy = Y(700);
    ctx.save(); ctx.fillStyle = '#27305C'; ctx.beginPath(); ctx.moveTo(sx - X(260), sy); ctx.lineTo(sx + X(300), sy); ctx.lineTo(sx + X(250), sy + Y(80)); ctx.lineTo(sx - X(220), sy + Y(80)); ctx.fill(); ctx.restore();
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) flat(ctx, sx - X(220) + c * X(72), sy - Y(36) - r * Y(36), X(68), Y(32), ['#B5533C', '#2F6F73', '#E2A93B', '#8FA7B5'][(r + c) % 4]);
    flat(ctx, sx + X(220), sy - Y(120), X(60), Y(120), '#EFE6D2');
    // fishing boats and gulls
    for (let i = 0; i < 3; i++) { const bx = X(1380 + i * 170) + Math.sin(t * 0.4 + i) * 20, byy = Y(860 + i * 56); ctx.save(); ctx.fillStyle = '#5E3B24'; ctx.beginPath(); ctx.moveTo(bx - 60, byy); ctx.quadraticCurveTo(bx, byy + 34, bx + 70, byy); ctx.fill(); ctx.fillStyle = '#FBF5E6'; ctx.beginPath(); ctx.moveTo(bx, byy); ctx.lineTo(bx, byy - 80); ctx.lineTo(bx + 44, byy - 8); ctx.fill(); ctx.restore(); }
    for (let i = 0; i < 6; i++) { const gx = X(300 + i * 250) + Math.sin(t * 0.5 + i * 2) * 60, gy = Y(200 + (i % 3) * 60) + Math.cos(t * 0.7 + i) * 20, f = Math.sin(t * 6 + i) * 10; ctx.save(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(gx - 22, gy + f); ctx.quadraticCurveTo(gx - 10, gy - 10, gx, gy); ctx.quadraticCurveTo(gx + 10, gy - 10, gx + 22, gy + f); ctx.stroke(); ctx.restore(); }
  }
  function indus(ctx, t) {
    const horizon = Y(520);
    SD.sky(ctx, [[0, '#4A5A8C'], [0.5, '#F0A878'], [0.75, '#FBD9A0']], 0, 0, W, horizon + 6);
    SD.glow(ctx, X(960), horizon - Y(60), X(700), 'rgba(255,214,140,0.95)', 0.9);
    ctx.save(); ctx.fillStyle = '#FFF3D0'; ctx.beginPath(); ctx.arc(X(960), horizon - Y(50), X(70), 0, Math.PI * 2); ctx.fill(); ctx.restore();
    SD.hills(ctx, { y: horizon - Y(10), amp: Y(120), color: '#6E6A8A', seed: 33, freq: 0.002, yFloor: horizon + 6 });
    SD.sky(ctx, [[0, '#F7D29A'], [1, '#C98A5A']], 0, horizon, W, H - horizon); // the wide river, gold
    for (let i = 0; i < 40; i++) { const u = i / 40, y = horizon + 10 + u * u * (H - horizon), w = X(60 + 400 * u) * (0.6 + 0.4 * Math.sin(t * 1.2 + i)); ctx.save(); ctx.globalAlpha = 0.6 - 0.4 * u; ctx.fillStyle = '#FFF1C8'; ctx.beginPath(); ctx.ellipse(X(960) + Math.sin(t * 0.6 + i * 2) * X(20 + 60 * u), y, w / 2, 3 + 5 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    G.poly(ctx, [[-20, Y(800)], [X(500), Y(770)], [X(1100), Y(790)], [W + 20, Y(760)], [W + 20, H + 20], [-20, H + 20]], { fill: '#8A6A48', stroke: null, seed: 35 }); // the near bank
  }
  // a long cloth-covered table with three flags and three figures, far away and from behind
  function signingTable(ctx, t, s = 1) {
    const cx = X(960), y = Y(900);
    for (let i = 0; i < 3; i++) mast(ctx, i, cx + (i - 1) * X(300) * s - X(60) * s, y - Y(40) * s, Y(330) * s, t);
    for (let i = 0; i < 3; i++) SD.silFigure(ctx, cx + (i - 1) * X(300) * s, y + Y(40) * s, 0.85 * s, '#2B211B');
    rect(ctx, cx - X(520) * s, y - Y(90) * s, X(1040) * s, Y(34) * s, '#FBF5E6', { stroke: 'rgba(0,0,0,0.3)', lw: 2 }); flat(ctx, cx - X(500) * s, y - Y(58) * s, X(1000) * s, Y(120) * s, '#EFE6D2');
  }

  const Fold = (ctx, s, o) => SD.person(ctx, 'fatimaOld', { mouth: s.talking('F') ? s.mouth('F') : 'flat', ...o });
  const Bold = (ctx, s, o) => SD.person(ctx, 'bhaskarOld', { mouth: s.talking('B') ? s.mouth('B') : 'flat', ...o });
  const PRE = ['बंबई के एक बैरिस्टर ने कभी', 'हमारी एकता को काटा था;', 'बंबई का ही एक अधिवक्ता,', 'तिलक की ज्योति लेकर,', 'आज यह स्थापित करता है —', 'कि यह मिट्टी हम सबको बाँधती है।'];

  SD.stage({
    cuts: ['4-2', '4-5', '4-6', '4-7', '4-14'],
    shots: {
      // the corridor from the north to Gwadar, and what it cost
      '4-1'(ctx, t) {
        G.bg(ctx, PAPER);
        SD.drawMap(ctx, region, { highlight: { India: SD.PAL.india, Pakistan: SD.PAL.pakistan, China: SD.PAL.china }, land: LAND, lw: 2 });
        corridor(ctx, region, (t - ev.route0) / (ev.route1 - ev.route0));
        const g = region.city('Gwadar'); Data.pin(ctx, g[0], g[1], { t, at: ev.route1, color: '#B5332B', size: 30 });
        SD.hindi(ctx, 'ग्वादर', g[0] - 30, g[1] + 54, { size: 36, color: INK, alpha: clamp((t - ev.route1) / 0.4) });
        const a = clamp((t - ev.route0) / 0.5);
        ctx.save(); ctx.globalAlpha = a; G.tornPaper(ctx, X(80), Y(700), X(560), Y(250), { fill: '#FBF5E6', seed: 71, shadow: true }); ctx.restore();
        SD.hindi(ctx, 'सीपेक गलियारा', X(360), Y(780), { size: 50, color: '#8C2F2B', alpha: a });
        if (a > 0) Data.counter(ctx, { x: X(360), y: Y(880), from: 0, to: 62, t, t0: ev.route0, t1: ev.route1, size: 84, color: INK, prefix: '$', suffix: ' bn' });
        SD.latin(ctx, 'fictional figure', X(360), Y(925), { size: 22, weight: 400, color: '#7A6858', alpha: a });
      },
      // troop markers gather on the northern mountains
      '4-2'(ctx, t) {
        G.bg(ctx, PAPER);
        SD.drawMap(ctx, region, { highlight: { India: SD.PAL.india, Pakistan: SD.PAL.pakistan, China: SD.PAL.china }, land: LAND, lw: 2 });
        corridor(ctx, region, 1);
        UNITS.forEach(([lo, la], i) => { const [x, y] = region.proj(lo, la); unit(ctx, x, y, (t - ev.troops[i]) / 0.35); });
        SD.shade(ctx, X(1100), Y(500), X(700), X(1700), '#C9B0A8');
      },
      // a window at night, Delhi below
      '4-3'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1.05, 1.14, s.u), fy: Y(560) }, () => {
          nightWindow(ctx, t);
          Fold(ctx, s, { x: X(720), y: Y(1040), s: 1.5, look: 0.6, brows: 'worried' });
          Bold(ctx, s, { x: X(1200), y: Y(1040), s: 1.5, look: -0.6, gesture: s.talking('B') ? 'pointUp' : undefined });
        });
      },
      // three cards, face down
      '4-4'(ctx, t, s) { baize(ctx); SD.cam(ctx, { zoom: lerp(1.5, 1.7, s.u), fx: X(590), fy: Y(300) }, () => cardRow(ctx, t)); },
      // card one: trade. One bar far taller than the other; a shutter comes down over it
      '4-5'(ctx, t) {
        baize(ctx); cardRow(ctx, t);
        G.tornPaper(ctx, X(1120), Y(90), X(720), Y(820), { fill: '#FBF5E6', seed: 81, shadow: true });
        SD.hindi(ctx, 'चीन ⇄ भारत व्यापार', X(1480), Y(190), { size: 52, color: INK });
        const k = ramp(t, ev.bars, ev.bars + 1.4, U.ease.outCubic), base = Y(760), xs = [X(1320), X(1640)], hs = [Y(480), Y(110)];
        const lab = [['चीन से भारत', '#B5533C'], ['भारत से चीन', '#2F6F73']];
        xs.forEach((x, i) => { flat(ctx, x - X(90), base - hs[i] * k, X(180), hs[i] * k, lab[i][1]); SD.hindi(ctx, lab[i][0], x, base + Y(56), { size: 34, weight: 400, color: INK }); });
        ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(1180), base); ctx.lineTo(X(1780), base); ctx.stroke(); ctx.restore();
        const sh = ramp(t, ev.shutter, ev.shutter + 0.9, U.ease.outBounce); // the market closes
        if (sh > 0) { const top = base - hs[0] - Y(20), h = (hs[0] + Y(20)) * 0.62 * sh; flat(ctx, xs[0] - X(110), top, X(220), h, '#7E8588'); for (let y = top + 10; y < top + h; y += 22) flat(ctx, xs[0] - X(110), y, X(220), 4, 'rgba(0,0,0,0.25)'); SD.hindi(ctx, 'बाज़ार बंद?', X(1480), Y(880), { size: 44, color: '#8C2F2B', alpha: sh }); }
        SD.latin(ctx, 'illustrative, not to scale', X(1480), Y(250), { size: 22, weight: 400, color: '#7A6858' });
      },
      // card two: a covenant with Balochistan. Autonomy, and royalties flowing back to the province
      '4-6'(ctx, t) {
        baize(ctx);
        ctx.save(); ctx.globalAlpha = 0.35; cardRow(ctx, t); ctx.restore();
        G.tornPaper(ctx, X(30), Y(90), X(1040), Y(880), { fill: '#F4EDE0', seed: 82, shadow: true });
        ctx.save(); ctx.beginPath(); ctx.rect(X(50), Y(110), X(1000), Y(840)); ctx.clip();
        SD.drawMap(ctx, balo, { highlight: { India: SD.PAL.india, Pakistan: SD.PAL.pakistan }, land: LAND, lw: 2 });
        // the province, clipped to Pakistan's own outline
        const pk = SD.outline(balo, 'Pakistan'); ctx.beginPath(); pk.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.clip();
        ctx.fillStyle = '#E2A93B'; ctx.globalAlpha = 0.85 * ramp(t, ev.flip2 + 0.4, ev.flip2 + 1.2); ctx.beginPath(); BALOCH.forEach(([lo, la], i) => { const [x, y] = balo.proj(lo, la); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill();
        ctx.restore();
        const c = balo.proj(64.6, 26.5);
        SD.hindi(ctx, 'बलोचिस्तान', c[0], c[1], { size: 44, color: INK, alpha: ramp(t, ev.flip2 + 0.8, ev.flip2 + 1.4) });
        // a mine, and coins flowing from it back into the province
        const mine = balo.proj(63.2, 29.0), home = balo.proj(67.2, 29.4);
        ctx.save(); ctx.fillStyle = '#5E4A3A'; ctx.beginPath(); ctx.moveTo(mine[0] - 30, mine[1] + 20); ctx.lineTo(mine[0], mine[1] - 26); ctx.lineTo(mine[0] + 30, mine[1] + 20); ctx.fill(); ctx.restore();
        for (let i = 0; i < 9; i++) { const u = ((t - ev.coins) * 0.45 - i * 0.11); if (u < 0) continue; const w = u % 1, x = lerp(mine[0], home[0], w), y = lerp(mine[1], home[1], w) - Math.sin(w * Math.PI) * 50; ctx.save(); ctx.fillStyle = '#F2B84B'; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore(); }
        // the covenant scroll
        const un = ramp(t, ev.scroll, ev.scroll + 1.2, U.ease.outCubic);
        if (un > 0) { const x = X(1170), y = Y(150), w = X(640), h = Y(700) * un; rect(ctx, x, y, w, h, '#FBF5E6', { stroke: INK, lw: 3 }); flat(ctx, x - 14, y - 16, w + 28, 32, '#8A5A3A'); flat(ctx, x - 14, y + h - 16, w + 28, 32, '#8A5A3A');
          ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
          SD.hindi(ctx, 'अहदनामा', x + w / 2, y + Y(110), { size: 64, color: '#7C2F2B' });
          SD.hindi(ctx, '१. स्वायत्तता', x + X(70), y + Y(240), { size: 46, color: INK, align: 'left' }); SD.latin(ctx, 'autonomy', x + X(74), y + Y(286), { size: 26, weight: 400, color: '#6B5A4A', align: 'left' });
          SD.hindi(ctx, '२. खनिज पर रॉयल्टी', x + X(70), y + Y(400), { size: 46, color: INK, align: 'left' }); SD.latin(ctx, 'royalties on its minerals', x + X(74), y + Y(446), { size: 26, weight: 400, color: '#6B5A4A', align: 'left' });
          ctx.strokeStyle = '#27305C'; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k < 40; k++) ctx.lineTo(x + X(330) + k * 6, y + Y(590) + Math.sin(k * 0.9) * 14); ctx.stroke();
          ctx.restore(); }
      },
      // card three: the debt, repaid in instalments
      '4-7'(ctx, t) {
        baize(ctx); cardRow(ctx, t);
        ctx.save(); ctx.translate(X(1480), Y(520)); ctx.rotate(0.02); G.tornPaper(ctx, -X(360), -Y(440), X(720), Y(880), { fill: '#FBF5E6', seed: 83, shadow: true }); ctx.restore();
        SD.hindi(ctx, 'बही-खाता', X(1480), Y(200), { size: 60, color: '#7C2F2B' });
        flat(ctx, X(1180), Y(240), X(600), 4, INK);
        for (let i = 0; i < 6; i++) {
          const y = Y(320 + i * 96), done = t >= ev.ticks[i];
          SD.hindi(ctx, `किस्त ${i + 1}`, X(1210), y, { size: 42, color: INK, align: 'left', weight: 400 });
          flat(ctx, X(1420), y - 14, X(230), 6, 'rgba(60,50,40,0.35)');
          if (done) { const k = pop(t, ev.ticks[i], 0.25); ctx.save(); ctx.translate(X(1730), y - 14); ctx.scale(k, k); ctx.strokeStyle = '#2F7B4A'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-6, 16); ctx.lineTo(22, -18); ctx.stroke(); ctx.restore(); }
        }
        SD.hindi(ctx, 'गारंटी के साथ', X(1480), Y(900), { size: 40, color: '#2F7B4A', alpha: clamp((t - ev.ticks[5] - 0.2) / 0.4) });
      },
      // a plain room: Bhaskar slides the ledger across to chairs seen only from behind
      '4-8'(ctx, t, s) {
        const k = ramp(t, ev.slide, ev.slide + 1.2, U.ease.outCubic);
        SD.cam(ctx, { zoom: lerp(1, 1.14, ramp(s.lt, 0, s.dur)), fx: X(960), fy: Y(700) }, () => {
          SD.sky(ctx, [[0, '#BDB4A4'], [1, '#A89E8C']]);
          flat(ctx, 0, Y(780), W, Y(300), '#6E6456');
          Bold(ctx, s, { x: X(960), y: Y(830), s: 1.4, pose: 'sit', brows: 'determined', handR: k > 0 && k < 1 ? [90, -130] : undefined });
          rect(ctx, X(260), Y(770), X(1400), Y(46), '#5E3B24', { stroke: INK, lw: 2 });
          ctx.save(); ctx.translate(X(1040), lerp(Y(790), Y(900), k)); ctx.scale(lerp(1, 1.5, k), lerp(0.3, 0.5, k)); ctx.fillStyle = '#7C2F2B'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.fillRect(-X(110), -Y(70), X(220), Y(140)); ctx.strokeRect(-X(110), -Y(70), X(220), Y(140)); ctx.fillStyle = '#E2A93B'; ctx.fillRect(-X(60), -Y(20), X(120), Y(40)); ctx.restore(); // the ledger
          for (const x of [520, 960, 1400]) { rect(ctx, X(x - 130), Y(880), X(260), Y(260), '#3A2E26', { stroke: INK, lw: 2 }); } // chair backs: no one is shown
        });
      },
      // Gwadar: cranes, containers, fishing boats; the grey ships turn away
      '4-9'(ctx, t, s) {
        const leave = ramp(t, ev.leave, ev.leave + 3.2);
        SD.cam(ctx, { zoom: 1.1, dx: lerp(X(80), -X(80), s.u) }, () => gwadar(ctx, t, leave));
        SD.slug(ctx, 'Gwadar', { alpha: ramp(s.lt, 0.4, 1.2) });
      },
      // the Indus at sunrise: one table, three flags
      '4-10'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1, 1.16, ramp(s.lt, 0, s.dur)), fx: X(960), fy: Y(760) }, () => { indus(ctx, t); signingTable(ctx, t, 0.72); });
        SD.slug(ctx, 'On the Indus', { alpha: ramp(s.lt, 0.4, 1.2) });
      },
      // three nations, three colours, their own borders — and one ring of light around them
      '4-11'(ctx, t) {
        G.bg(ctx, PAPER);
        SD.drawMap(ctx, union, { highlight: { India: SD.PAL.india, Pakistan: SD.PAL.pakistan, Bangladesh: SD.PAL.bangladesh }, land: LAND, lw: 2 });
        const k = ramp(t, ev.ring0, ev.ring1);
        if (k > 0) { // the ring: an ellipse drawn on around all three
          const c = union.proj(78.5, 23), rx = X(560), ry = Y(470);
          ctx.save(); ctx.strokeStyle = '#E2A93B'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.shadowColor = '#F2B84B'; ctx.shadowBlur = 40; ctx.beginPath(); ctx.ellipse(c[0], c[1], rx, ry, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); ctx.stroke(); ctx.restore();
        }
        const l = S.lineById['4.12'], step = (i) => l.t + (l.dur * 0.5 * i) / 3;
        [['तीन देश', 0], ['तीन झंडे', 1], ['तीन संविधान', 2]].forEach(([w, i]) => SD.hindi(ctx, w, X(1560), Y(240 + i * 96), { size: 60, color: INK, alpha: clamp((t - step(i)) / 0.3) }));
        for (let i = 0; i < 3; i++) { const a = clamp((t - step(1) - i * 0.15) / 0.3); if (a > 0) { ctx.save(); ctx.globalAlpha = a; flag(ctx, i, X(1380 + i * 130), Y(500), X(104), Y(66), t); ctx.restore(); } }
        SD.hindi(ctx, 'एक साझा संघ', X(1560), Y(720), { size: 76, color: '#9A6A12', alpha: clamp((t - ev.ring0) / 0.4) });
        SD.hindi(ctx, 'खुली सरहदें · साझा बाज़ार', X(1560), Y(810), { size: 40, weight: 400, color: INK, alpha: clamp((t - ev.ring0 - 0.8) / 0.4) });
      },
      // the treaty page: the preamble is written line by line as he speaks it
      '4-12'(ctx, t, s) {
        flat(ctx, 0, 0, W, H, '#4A3222');
        SD.cam(ctx, { zoom: lerp(1, 1.06, s.u), fy: Y(480) }, () => {
          ctx.save(); ctx.translate(W / 2, Y(520)); ctx.rotate(-0.012); G.tornPaper(ctx, -X(800), -Y(480), X(1600), Y(960), { fill: '#FBF5E6', seed: 93, shadow: true }); ctx.restore();
          SD.hindi(ctx, 'प्रस्तावना', W / 2, Y(170), { size: 70, color: '#7C2F2B' }); flat(ctx, W / 2 - X(160), Y(196), X(320), 4, '#E2A93B');
          const l = s.line('4.14'), total = PRE.reduce((a, b) => a + b.length, 0); let done = 0;
          const k = clamp((t - l.t) / l.dur) * total;
          PRE.forEach((ln, i) => { const u = clamp((k - done) / ln.length); done += ln.length; SD.brushOn(ctx, u, W / 2, Y(300 + i * 92), X(1400), Y(90), () => SD.hindi(ctx, ln, W / 2, Y(300 + i * 92), { size: 62, color: i === 5 ? '#9A6A12' : INK })); });
        });
        SD.glow(ctx, X(1400), Y(240), X(900), 'rgba(255,205,130,0.9)', 0.3);
      },
      // Fatima signs, and looks up at him
      '4-13'(ctx, t, s) {
        const signing = t > ev.sign && t < ev.sign + 1.6, up = t > ev.sign + 1.8;
        SD.cam(ctx, { zoom: lerp(1.05, 1.16, s.u), fx: X(860), fy: Y(640) }, () => {
          indus(ctx, t);
          mast(ctx, 0, X(200), Y(900), Y(520), t); mast(ctx, 1, X(1560), Y(900), Y(520), t); mast(ctx, 2, X(1760), Y(900), Y(520), t);
          Bold(ctx, s, { x: X(1250), y: Y(1010), s: 1.35, look: -0.6, mouth: up ? 'smile' : 'flat' });
          Fold(ctx, s, { x: X(760), y: Y(900), s: 1.5, pose: 'sit', look: up ? 0.8 : 0.1, lookY: up ? -0.3 : 0.8, mouth: s.talking('F') ? s.mouth('F') : up ? 'smile' : 'flat', handR: signing ? [70 + 10 * Math.sin(t * 16), -120] : undefined });
          flat(ctx, X(300), Y(840), X(1000), Y(40), '#FBF5E6'); flat(ctx, X(320), Y(880), X(960), Y(240), '#EFE6D2');
          flat(ctx, X(760), Y(822), X(200), Y(22), '#FFFFFF'); // the treaty on the table
        });
      },
      // the seal: "सिंधु समझौता"
      '4-14'(ctx, t) {
        G.bg(ctx, '#FBF5E6');
        SD.glow(ctx, W / 2, Y(520), X(900), 'rgba(226,169,59,0.5)', 0.3, 'multiply');
        const hit = t >= ev.seal, k = hit ? 1 + 0.5 * Math.exp(-(t - ev.seal) * 14) : 0;
        if (hit) {
          ctx.save(); ctx.translate(W / 2, Y(500)); ctx.rotate(-0.06); ctx.scale(k, k);
          ctx.strokeStyle = '#8C2F2B'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(0, 0, X(330), 0, Math.PI * 2); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, X(296), 0, Math.PI * 2); ctx.stroke();
          for (let i = 0; i < 36; i++) { const a = (i / 36) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a) * X(346), Math.sin(a) * X(346)); ctx.lineTo(Math.cos(a) * X(366), Math.sin(a) * X(366)); ctx.lineWidth = 6; ctx.stroke(); }
          ctx.restore();
          ctx.save(); ctx.translate(W / 2, Y(500)); ctx.rotate(-0.06);
          SD.hindi(ctx, 'सिंधु समझौता', 0, Y(10), { size: 104 * k, color: '#8C2F2B' }); SD.latin(ctx, 'THE SINDHU ACCORD', 0, Y(100), { size: 38 * k, weight: 800, color: '#8C2F2B' });
          for (let i = 0; i < 3; i++) flag(ctx, i, -X(170) + i * X(120), -Y(190), X(100), Y(62), t);
          ctx.restore();
          if (t < ev.seal + 0.3) { ctx.save(); ctx.globalAlpha = 0.7 * (1 - (t - ev.seal) / 0.3); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
        } else SD.hindi(ctx, 'इसे नाम मिला —', W / 2, Y(520), { size: 64, weight: 400, color: '#5A4636', alpha: clamp((t - S.lineById['4.16'].t) / 0.5) });
      },
    },
  });
})();
