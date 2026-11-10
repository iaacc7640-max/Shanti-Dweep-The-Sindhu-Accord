// THE DESIGN SHEET — six stills: the cast, then five style frames. One frame per two seconds.
(function () {
  const G = globalThis.G, S = globalThis.SCORE, Studio = globalThis.Studio, SD = globalThis.SD, Data = globalThis.Data;
  const W = G.W, H = G.H, X = SD.X, Y = SD.Y;

  const frames = {
    cast(ctx) {
      G.bg(ctx, SD.PAL.paper);
      SD.latin(ctx, 'Shanti Dweep — character sheet', W / 2, Y(84), { size: 54, weight: 800, color: SD.PAL.ink });
      const ground = Y(800), k = 1.02;
      const row = [
        ['bhaskarYoung', 'Bhaskar, 33', 250, {}],
        ['bhaskarOld', 'Bhaskar, 63', 530, {}],
        ['bhaskarRiver', 'Bhaskar, 63 (river)', 810, { handL: [-12, -236], handR: [12, -236], eyes: 'closed' }],
        ['fatimaYoung', 'Fatima, 41', 1110, { mouth: 'smile' }],
        ['fatimaOld', 'Fatima, 71', 1390, { brows: 'determined' }],
      ];
      for (const [who, label, x, o] of row) {
        SD.person(ctx, who, { x: X(x), y: ground, s: k, mouth: 'flat', ...o });
        SD.tag(ctx, label, X(x), ground + Y(64));
      }
      SD.silTilak(ctx, X(1640), ground, 0.8);
      SD.silJinnah(ctx, X(1800), ground, 0.8);
      SD.tag(ctx, 'Historic figures:', X(1720), ground + Y(64));
      SD.tag(ctx, 'silhouettes only', X(1720), ground + Y(102));
      SD.tag(ctx, 'Watercolor look · one design per age, reused in every shot · no real likenesses', W / 2, Y(1010), { size: 28, weight: 400 });
    },
    river(ctx, t) {
      const r = SD.river(ctx, t, { sun: 0.75 });
      SD.person(ctx, 'bhaskarRiver', { x: X(640), y: Y(1010), s: 1.5, handL: [-12, -236], handR: [12, -236], eyes: 'closed', mouth: 'flat', shadow: false });
      SD.riverFront(ctx, t, Y(900));
      SD.glow(ctx, r.sunX, r.sunY, X(900), 'rgba(255,190,110,0.8)', 0.35);
      SD.subtitle(ctx, 'A sixty-three-year-old lawyer stands before the sun, as he does every day.');
    },
    court(ctx, t) {
      const c = SD.court(ctx, t);
      SD.silJudge(ctx, c.benchX, c.benchY, 1.0);
      SD.silTilak(ctx, c.dockX, c.dockY + Y(60), 1.05);
      SD.courtFront(ctx);
      SD.silJinnah(ctx, c.barX, c.barY, 1.5);
      SD.sepia(ctx);
      SD.slug(ctx, 'Bombay High Court, 1916');
      SD.subtitle(ctx, 'That day, a lawyer was a patriot\'s shield.');
    },
    chai(ctx, t) {
      const c = SD.chai(ctx, t, { train: 0.42 });
      SD.person(ctx, 'fatimaYoung', { x: X(560), y: c.ground + Y(150), s: 1.25, look: 0.6, mouth: 'smile', handR: [70, -230] });
      SD.person(ctx, 'bhaskarYoung', { x: X(980), y: c.ground + Y(150), s: 1.25, look: -0.6, mouth: 'flat', gesture: 'think' });
      SD.chaiTable(ctx, X(770), c.ground + Y(150));
      SD.shade(ctx, X(1300), Y(450), X(500), X(1500), '#8E84A8');
      SD.subtitle(ctx, 'Then in Bharat too, the theology must bend — not the soil.');
    },
    election(ctx, t) {
      G.bg(ctx, SD.PAL.paper);
      const map = Data.map({ region: [66, 6, 99, 38], x: X(40), y: Y(60), w: X(900), h: Y(960) });
      SD.drawMap(ctx, map, { highlight: { India: SD.PAL.india }, land: '#DED6C6', lw: 2, clip: true });
      const pins = [['Mumbai', 'मुंबई', 'left'], ['Meerut', 'पश्चिमी उत्तर प्रदेश', 'right'], ['Kolkata', 'पश्चिम बंगाल', 'right']];
      for (const [city, label, side] of pins) {
        const [px, py] = map.city(city);
        Data.pin(ctx, px, py, { t: 10, at: 0, color: SD.PAL.gold, size: 30 });
        SD.hindi(ctx, label, px + (side === 'left' ? -X(26) : X(26)), py - Y(6), { size: 30, align: side === 'left' ? 'right' : 'left', color: SD.PAL.ink });
      }
      SD.hindi(ctx, 'त्रिशंकु लोकसभा', X(1400), Y(210), { size: 84, color: SD.PAL.ink });
      SD.seats(ctx, X(1400), Y(760), X(420), { total: 543, left: 270, right: 270, gold: 3 });
      SD.hindi(ctx, 'बहुमत: 272', X(1400), Y(850), { size: 44, color: '#5A4A3A', weight: 400 });
      SD.hindi(ctx, 'तीन सीटें तय करेंगी', X(1400), Y(930), { size: 50, color: '#9A6A12' });
      SD.subtitle(ctx, 'The key to government lay with just three seats.');
    },
    warroom(ctx, t) {
      SD.warTable(ctx, t);
      const map = Data.map({ region: [58, 20, 84, 39], x: X(60), y: Y(40), w: X(1300), h: Y(940) });
      SD.drawMap(ctx, map, { highlight: { India: '#3B5B66', Pakistan: '#2C4A52' }, land: '#182A3A', stroke: 'rgba(150,220,230,0.75)', lw: 2 });
      const bases = [[72.4, 32.1], [73.1, 33.6], [67.2, 24.9], [68.4, 28.3], [71.4, 29.9]];
      const from = [[76.8, 30.7], [75.8, 26.9], [72.6, 23.0]];
      bases.forEach(([lo, la], i) => {
        const B = map.proj(lo, la), A = map.proj(...from[i % 3]);
        Data.route(ctx, A, B, { t: 10, t0: 0, t1: 1, color: '#F2B84B', lw: 3, arc: 0.22, dash: [10, 8] });
        ctx.save(); ctx.strokeStyle = '#F2B84B'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(B[0], B[1], 16, 0, Math.PI * 2); ctx.moveTo(B[0] - 24, B[1]); ctx.lineTo(B[0] + 24, B[1]); ctx.moveTo(B[0], B[1] - 24); ctx.lineTo(B[0], B[1] + 24); ctx.stroke(); ctx.restore();
      });
      SD.clock(ctx, 72 * 3600 - 41 * 3600 - 1260, X(1600), Y(240));
      SD.hindi(ctx, 'बहत्तर घंटे', X(1600), Y(330), { size: 44, color: '#CFE8EA', weight: 400 });
      SD.hindi(ctx, 'केवल सैन्य ठिकाने', X(1600), Y(520), { size: 40, color: '#F2B84B' });
      SD.latin(ctx, 'military targets only', X(1600), Y(570), { size: 28, color: '#9FC4C8', weight: 400 });
      SD.subtitle(ctx, 'Seventy-two hours. Precision strikes — on military targets only.');
    },
  };

  Studio.film({
    fadeOut: 0,
    post: (t) => (S.FRAMES[Math.min(S.FRAMES.length - 1, Math.floor(t / S.HOLD))] === 'warroom' ? { paper: 0.25, vignette: 0.4 } : {}),
    draw(ctx, t) {
      const name = S.FRAMES[Math.min(S.FRAMES.length - 1, Math.floor(t / S.HOLD))];
      frames[name](ctx, t);
    },
  });
})();
