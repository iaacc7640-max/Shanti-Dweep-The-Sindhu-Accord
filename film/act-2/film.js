// THE FILM — Act II: thirty years in a montage, the world changing on maps, the election night,
// and Fatima's oath.
(function () {
  const G = globalThis.G, U = globalThis.U, S = globalThis.SCORE, SD = globalThis.SD, Data = globalThis.Data, GEO = globalThis.GEO;
  const W = G.W, H = G.H, X = SD.X, Y = SD.Y, { ramp, lerp, clamp, rect } = SD;
  const ev = S.ev, INK = SD.PAL.ink, PAPER = SD.PAL.paper;
  const pop = (t, t0, d = 0.3) => U.ease.outBack(clamp((t - t0) / d), 2.2);
  Object.assign(GEO.cities, { Brussels: [4.35, 50.85] });

  // Bhaskar between 33 and 63: the same design, the hair going grey
  const mixHex = (a, b, k) => '#' + [1, 3, 5].map((i) => Math.round(lerp(parseInt(a.slice(i, i + 2), 16), parseInt(b.slice(i, i + 2), 16), k)).toString(16).padStart(2, '0')).join('');
  const bhaskarAt = (k) => ({ ...SD.CAST.bhaskarYoung, hair: mixHex(SD.CAST.bhaskarYoung.hair, SD.CAST.bhaskarOld.hair, k) });
  const fatimaAt = (k) => ({ ...SD.CAST.fatimaYoung, hair: mixHex(SD.CAST.fatimaYoung.hair, SD.CAST.fatimaOld.hair, k) });

  // ---------- sets ----------
  function emptyHall(ctx, t) {
    SD.sky(ctx, [[0, '#4A4658'], [1, '#6A6070']]);
    rect(ctx, X(120), Y(120), X(1680), Y(90), '#7C2F2B'); // a plain cloth banner, no words, no symbol
    rect(ctx, 0, Y(640), W, Y(440), '#55495A');
    rect(ctx, X(240), Y(560), X(520), Y(90), '#6B4A30'); // the dais
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { // rows of folding chairs, almost all empty
      const cx = X(900 + i * 112 - r * 50), cy = Y(790 + r * 100), k = 0.8 + r * 0.16;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.fillStyle = '#B8A88A'; ctx.fillRect(-34, -90, 68, 60); ctx.fillRect(-36, -24, 72, 12);
      ctx.fillStyle = '#6E6456'; ctx.fillRect(-34, -30, 6, 76); ctx.fillRect(28, -30, 6, 76); ctx.restore();
    }
    SD.glow(ctx, X(500), Y(380), X(700), 'rgba(255,220,170,0.9)', 0.35);
    void t;
  }
  function lane(ctx, t, scroll) {
    SD.sky(ctx, [[0, '#D9C8A8'], [1, '#EBDDBE']]);
    for (let i = -1; i < 9; i++) { // a row of shop fronts with their shutters down
      const x = X(i * 300) - (scroll % X(300)), hue = ['#B59A7A', '#A88E72', '#C2A888'][((i + Math.floor(scroll / X(300))) % 3 + 3) % 3];
      rect(ctx, x, Y(180), X(292), Y(640), hue);
      rect(ctx, x + X(30), Y(430), X(232), Y(390), '#7E8588', { seed: 9 });
      for (let k = 0; k < 9; k++) { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.14)'; ctx.fillRect(x + X(30), Y(450 + k * 42), X(232), 4); ctx.restore(); }
      rect(ctx, x + X(20), Y(300), X(252), Y(70), '#5E4A3A');
    }
    rect(ctx, 0, Y(820), W, Y(260), '#9A8468');
    void t;
  }
  function nightDesk(ctx, t) {
    SD.sky(ctx, [[0, '#20222E'], [1, '#34303A']]);
    rect(ctx, X(1250), Y(120), X(420), Y(380), '#1B2444', { stroke: '#5E4A3A', lw: 10 }); // a window on the night
    for (let i = 0; i < 14; i++) { ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 1.3 + i * 2); ctx.fillStyle = '#FFE9B8'; ctx.fillRect(X(1280 + G.rnd(i, 1) * 360), Y(150 + G.rnd(i, 2) * 320), 4, 4); ctx.restore(); }
    for (let r = 0; r < 3; r++) { rect(ctx, X(80), Y(140 + r * 150), X(900), Y(130), '#2C2019'); for (let i = 0; i < 30; i++) { ctx.fillStyle = ['#5A2522', '#263B33', '#463A22', '#1F2748'][Math.floor(G.rnd(i, r, 5) * 4)]; ctx.fillRect(X(90 + i * 29.5), Y(160 + r * 150) + Y(20 * G.rnd(i, r)), X(22), Y(106) - Y(20 * G.rnd(i, r))); } }
    rect(ctx, 0, Y(780), W, Y(300), '#2A2220');
  }
  function nightDeskFront(ctx, t, pile) {
    rect(ctx, X(380), Y(760), X(1240), Y(40), '#5E3B24', { stroke: INK, lw: 2 }); rect(ctx, X(420), Y(800), X(1160), Y(280), '#4A3222');
    for (let i = 0; i < Math.round(pile); i++) rect(ctx, X(540 + (i % 3) * 6), Y(748 - i * 7), X(210), Y(9), i % 2 ? '#FBF5E6' : '#EFE6D2', { stroke: 'rgba(0,0,0,0.25)', lw: 1, seed: 100 + i });
    ctx.save(); ctx.strokeStyle = '#1B1614'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(X(1400), Y(760)); ctx.lineTo(X(1400), Y(600)); ctx.lineTo(X(1330), Y(560)); ctx.stroke();
    ctx.fillStyle = '#2F6F73'; ctx.beginPath(); ctx.moveTo(X(1260), Y(606)); ctx.lineTo(X(1350), Y(526)); ctx.lineTo(X(1396), Y(580)); ctx.closePath(); ctx.fill(); ctx.restore();
    SD.glow(ctx, X(1180), Y(700), X(620), 'rgba(255,205,130,0.95)', 0.55 + 0.02 * Math.sin(t * 7));
  }
  function studio(ctx, t) {
    SD.sky(ctx, [[0, '#10182A'], [1, '#1E2C48']]);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { // a wall of screens
      const x = X(120 + i * 430), y = Y(90 + r * 300);
      rect(ctx, x, y, X(390), Y(260), '#0B111E', { stroke: '#3C5A7A', lw: 3 });
      const kind = (i + r * 2) % 4;
      if (kind === 0) { for (let b = 0; b < 6; b++) { const hgt = Y(40 + 150 * (0.5 + 0.5 * Math.sin(t * 0.9 + b + i))); ctx.fillStyle = b % 2 ? '#8FA7B5' : '#9A8F7E'; ctx.fillRect(x + X(40 + b * 54), y + Y(230) - hgt, X(36), hgt); } }
      else if (kind === 1) { ctx.save(); ctx.strokeStyle = '#F2B84B'; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k <= 12; k++) { const px = x + X(30 + k * 27), py = y + Y(130) + Math.sin(t * 1.2 + k * 0.8 + i) * Y(60); if (k) ctx.lineTo(px, py); else ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
      else if (kind === 2) SD.seats(ctx, x + X(195), y + Y(220), X(150), { total: 180, left: Math.round(88 * clamp((Math.sin(t * 0.5) + 1.4) / 2.4)), right: Math.round(88 * clamp((Math.cos(t * 0.4) + 1.4) / 2.4)) });
      else { SD.hindi(ctx, 'गिनती जारी', x + X(195), y + Y(120), { size: 44, color: '#E9EEF2' }); SD.latin(ctx, String(120 + Math.floor(t * 3) % 380), x + X(195), y + Y(200), { size: 60, color: '#F2B84B', weight: 800 }); }
    }
    rect(ctx, 0, Y(720), W, Y(360), '#0B111E');
    rect(ctx, 0, Y(700), W, Y(64), '#B5332B'); // the red ticker band
    SD.hindi(ctx, 'समाचार 24', X(190), Y(748), { size: 44, color: '#FFFFFF' });
    const tick = 'चुनाव परिणाम  •  गिनती के अंतिम दौर  •  किसी दल को स्पष्ट बहुमत नहीं  •  ';
    ctx.save(); ctx.beginPath(); ctx.rect(X(360), Y(700), W - X(360), Y(64)); ctx.clip();
    SD.hindi(ctx, tick + tick, X(360) - ((t * 140) % X(1500)), Y(746), { size: 36, color: '#FFFFFF', align: 'left', weight: 400 }); ctx.restore();
    rect(ctx, X(560), Y(860), X(800), Y(220), '#22304A', { stroke: '#3C5A7A', lw: 3 }); // the anchor's desk
  }
  function bhavan(ctx, t) {
    SD.sky(ctx, [[0, '#7FB0D0'], [0.7, '#D9E6DC'], [1, '#F3E7C6']], 0, 0, W, Y(820));
    const b = '#D9B48A';
    rect(ctx, X(160), Y(470), X(1600), Y(260), b);
    for (let i = 0; i < 26; i++) rect(ctx, X(190 + i * 60), Y(500), X(22), Y(230), '#C39A70'); // the colonnade
    rect(ctx, X(160), Y(450), X(1600), Y(40), '#B88E62');
    ctx.save(); ctx.fillStyle = '#B88E62'; ctx.beginPath(); ctx.ellipse(X(960), Y(450), X(200), Y(200), 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#9A7450'; ctx.fillRect(X(760), Y(430), X(400), Y(26)); ctx.fillRect(X(954), Y(200), X(12), Y(60)); ctx.restore();
    rect(ctx, 0, Y(730), W, Y(350), '#C9A47A'); // the forecourt
    // the national flag on its mast
    const fx = X(1420), fy = Y(250);
    ctx.save(); ctx.fillStyle = '#5E4A3A'; ctx.fillRect(fx - 5, fy, 10, Y(480));
    const wave = (i) => Math.sin(t * 2 + i * 0.7) * Y(8);
    ['#FF9933', '#FFFFFF', '#138808'].forEach((c, k) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(fx + 5, fy + k * Y(46)); for (let i = 0; i <= 6; i++) ctx.lineTo(fx + 5 + i * X(35), fy + k * Y(46) + wave(i)); for (let i = 6; i >= 0; i--) ctx.lineTo(fx + 5 + i * X(35), fy + (k + 1) * Y(46) + wave(i)); ctx.fill(); });
    ctx.strokeStyle = '#000080'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(fx + X(110), fy + Y(69) + wave(3), Y(17), 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI; ctx.beginPath(); ctx.moveTo(fx + X(110) - Math.cos(a) * Y(17), fy + Y(69) + wave(3) - Math.sin(a) * Y(17)); ctx.lineTo(fx + X(110) + Math.cos(a) * Y(17), fy + Y(69) + wave(3) + Math.sin(a) * Y(17)); ctx.lineWidth = 1.5; ctx.stroke(); }
    ctx.restore();
  }

  // ---------- maps ----------
  const world = Data.map({ region: 'world', x: 0, y: Y(40), w: W, h: Y(940) });
  const trade = Data.map({ region: [-14, 4, 100, 62], x: 0, y: Y(20), w: W, h: Y(960) });
  const gulf = Data.map({ region: [22, 8, 100, 46], x: 0, y: Y(20), w: W, h: Y(960) });
  const india = Data.map({ region: [66, 6, 99, 38], x: X(40), y: Y(60), w: X(900), h: Y(960) });
  const EU = ['France', 'Germany', 'Italy', 'Spain', 'Poland', 'Netherlands', 'Belgium', 'Sweden', 'Greece', 'Portugal', 'Austria', 'Romania', 'Ireland', 'Finland', 'Denmark', 'Czechia', 'Hungary', 'Bulgaria'];
  const LAND = '#DED6C6';

  SD.stage({
    cuts: ['2-3', '2-8', '2-9', '2-11', '2-12'],
    shots: {
      // a wall calendar: the pages blow away, the years roll forward
      '2-1'(ctx, t, s) {
        G.bg(ctx, '#E9DFC8');
        const year = Math.floor(lerp(0, 30, ramp(s.lt, 0.5, s.dur - 0.6, (x) => x)));
        rect(ctx, X(660), Y(190), X(600), Y(700), '#FBF5E6', { stroke: INK, lw: 3 });
        rect(ctx, X(660), Y(190), X(600), Y(130), '#7C2F2B');
        SD.hindi(ctx, 'बरस', W / 2, Y(280), { size: 64, color: '#FBF5E6' });
        SD.latin(ctx, '+' + year, W / 2, Y(640), { size: 240, weight: 800, color: INK });
        for (let i = 0; i < 9; i++) { // pages flying off to the right
          const u = (s.lt - 0.5 - i * 0.55) / 1.1; if (u <= 0 || u >= 1) continue;
          ctx.save(); ctx.translate(lerp(W / 2, W + X(400), u * u), lerp(Y(560), Y(200 + (i % 3) * 160), u)); ctx.rotate(u * (2 + (i % 3))); ctx.globalAlpha = 1 - u * 0.4;
          ctx.fillStyle = '#FBF5E6'; ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 2; ctx.fillRect(-X(280), -Y(280), X(560), Y(520)); ctx.strokeRect(-X(280), -Y(280), X(560), Y(520)); ctx.restore();
        }
      },
      '2-2'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1.25, 1.0, ramp(s.lt, 0, s.dur)), fx: X(520), fy: Y(560) }, () => {
          emptyHall(ctx, t);
          SD.person(ctx, fatimaAt(0.15), { x: X(500), y: Y(660), s: 1.05, gesture: 'point', look: 0.5, mouth: { open: 0.2 + 0.2 * Math.sin(t * 8), wide: 0.5, talking: true } });
          for (const [x, y] of [[1012, 790], [1410, 890], [1560, 990]]) SD.silHead(ctx, X(x), Y(y - 60), 0.8, '#2B2630'); // three listeners
        });
      },
      // invented newspapers; each headline slaps onto the frame
      '2-3'(ctx, t) {
        G.bg(ctx, '#3A3440');
        const items = [['फ़तवा', 'दैनिक प्रभात', 420, 330, -0.08], ['बहिष्कार', 'नगर समाचार', 1380, 300, 0.06], ['सभा रद्द', 'जन वाणी', 560, 760, 0.05], ['"वह हममें से नहीं"', 'संध्या टाइम्स', 1340, 740, -0.05]];
        items.forEach(([head, paper, x, y, r], i) => {
          const k = pop(t, ev.papers[i], 0.22); if (k <= 0) return;
          ctx.save(); ctx.translate(X(x), Y(y)); ctx.rotate(r); ctx.scale(lerp(1.5, 1, k), lerp(1.5, 1, k));
          G.tornPaper(ctx, -X(380), -Y(190), X(760), Y(380), { fill: '#EFE6D2', seed: 200 + i, shadow: true });
          SD.hindi(ctx, paper, 0, -Y(120), { size: 34, weight: 400, color: '#5A4A3A' });
          ctx.fillStyle = '#5A4A3A'; ctx.fillRect(-X(330), -Y(100), X(660), 3);
          SD.hindi(ctx, head, 0, Y(20), { size: head.length > 8 ? 78 : 120, color: '#1B1614' });
          for (let l = 0; l < 3; l++) { ctx.fillStyle = 'rgba(60,50,40,0.35)'; ctx.fillRect(-X(320), Y(70 + l * 30), X(640) * (l === 2 ? 0.6 : 1), 8); }
          ctx.restore();
        });
      },
      // she walks a girl to school past closed shutters
      '2-4'(ctx, t, s) {
        const scroll = s.lt * X(150);
        lane(ctx, t, scroll);
        const w = t * 1.6;
        SD.person(ctx, fatimaAt(0.35), { x: X(820), y: Y(980), s: 1.3, pose: 'walk', walk: w, mouth: s.talking('F') ? s.mouth('F') : 'flat', brows: 'determined', handL: [-96, -150] });
        SD.person(ctx, { skin: '#C99A72', hair: '#1B1614', hairStyle: 'ponytail', outfit: 'dress', shirt: '#3F6FA8', build: 'slim' }, { x: X(1040), y: Y(980), s: 0.78, pose: 'walk', walk: w + 0.5, mouth: 'smile', handR: [150, -190] });
        rect(ctx, X(1052), Y(766), X(64), Y(74), '#B5533C', { stroke: INK, lw: 2 }); // her school bag
        SD.shade(ctx, X(960), Y(500), X(600), X(1500), '#B8A898');
      },
      // Bhaskar writes through the years; the pile grows and his hair greys
      '2-5'(ctx, t, s) {
        const age = ramp(s.lt, 1, s.dur - 1, (x) => x);
        SD.cam(ctx, { zoom: lerp(1, 1.08, s.u), fx: X(1000), fy: Y(560) }, () => {
          nightDesk(ctx, t);
          SD.person(ctx, bhaskarAt(age), { x: X(1000), y: Y(790), s: 1.5, pose: 'sit', gesture: 'typing', lookY: 0.7, mouth: 'flat', handR: [84 + 10 * Math.sin(t * 9), -128] });
          nightDeskFront(ctx, t, 2 + age * 16);
        });
      },
      // one page, clause after clause
      '2-6'(ctx, t, s) {
        rect(ctx, -20, -20, W + 40, H + 40, '#4A3222');
        SD.cam(ctx, { zoom: lerp(1, 1.1, s.u), fx: W / 2, fy: Y(480) }, () => {
          ctx.save(); ctx.translate(W / 2, Y(540)); ctx.rotate(0.02); G.tornPaper(ctx, -X(620), -Y(480), X(1240), Y(960), { fill: '#FBF5E6', seed: 91, shadow: true }); ctx.restore();
          SD.hindi(ctx, 'संविधान', W / 2, Y(200), { size: 76, color: '#7C2F2B' });
          const n = 6, shown = lerp(0, n, ramp(s.lt, 0.3, s.dur - 0.8, (x) => x));
          for (let i = 0; i < n; i++) {
            const u = clamp(shown - i); if (u <= 0) break;
            SD.hindi(ctx, `धारा ${i + 1}`, X(420), Y(320 + i * 96), { size: 44, color: INK, align: 'left' });
            ctx.save(); ctx.strokeStyle = 'rgba(42,35,32,0.75)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath();
            const x0 = X(640), x1 = x0 + X(820) * u * (0.72 + 0.28 * G.rnd(i, 4));
            for (let x = x0; x <= x1; x += 14) ctx.lineTo(x, Y(306 + i * 96) + Math.sin(x * 0.09 + i) * 5);
            ctx.stroke(); ctx.restore();
          }
        });
        SD.glow(ctx, X(1300), Y(300), X(900), 'rgba(255,205,130,0.9)', 0.3);
      },
      // America turns inward: it dims, and a door closes over it
      '2-7'(ctx, t) {
        G.bg(ctx, PAPER);
        const k = ramp(t, ev.door - 1.2, ev.door);
        SD.drawMap(ctx, world, { highlight: { 'United States of America': mixHex('#8FA7B5', '#B9B4AC', k), India: SD.PAL.india }, land: LAND, lw: 1.5 });
        const [ux, uy] = world.proj(-98, 39), dw = X(190), dh = Y(230);
        ctx.save(); ctx.fillStyle = '#5E3B24'; ctx.strokeStyle = INK; ctx.lineWidth = 3;
        for (const side of [-1, 1]) { const x = ux + side * lerp(dw * 1.6, dw / 2, k) - dw / 2; ctx.globalAlpha = clamp(k * 3); ctx.fillRect(x, uy - dh / 2, dw, dh); ctx.strokeRect(x, uy - dh / 2, dw, dh); ctx.fillStyle = '#E2A93B'; ctx.beginPath(); ctx.arc(x + dw / 2 - side * dw * 0.34, uy, 9, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#5E3B24'; }
        ctx.restore();
        SD.hindi(ctx, 'अमेरिका: अपने भीतर', ux, uy + dh / 2 + Y(70), { size: 46, color: INK, alpha: clamp((t - ev.door) / 0.5) });
      },
      // India and Europe: a bright trade route, two counters climbing
      '2-8'(ctx, t) {
        G.bg(ctx, PAPER);
        SD.drawMap(ctx, trade, { highlight: { India: SD.PAL.india, ...Object.fromEntries(EU.map((c) => [c, '#9DB7C9'])) }, land: LAND, lw: 1.5 });
        const A = trade.city('Delhi'), B = trade.city('Brussels');
        Data.route(ctx, A, B, { t, t0: ev.route, t1: ev.routeEnd, color: SD.PAL.gold, lw: 7, arc: -0.22, icon: 'dot' });
        Data.route(ctx, B, A, { t, t0: ev.route + 0.4, t1: ev.routeEnd, color: SD.PAL.teal, lw: 7, arc: -0.12, icon: 'dot' });
        const a = clamp((t - ev.route) / 0.5);
        ctx.save(); ctx.globalAlpha = a; G.tornPaper(ctx, X(600), Y(590), X(660), Y(410), { fill: '#FBF5E6', seed: 61, shadow: true }); ctx.restore();
        SD.hindi(ctx, 'भारत – यूरोपीय संघ', X(930), Y(660), { size: 50, color: INK, alpha: a });
        SD.hindi(ctx, 'व्यापार समझौता', X(930), Y(730), { size: 60, color: '#9A6A12', alpha: a });
        if (a > 0) { Data.counter(ctx, { x: X(810), y: Y(880), from: 100, to: 260, t, t0: ev.route, t1: ev.routeEnd, size: 96, color: SD.PAL.teal }); Data.counter(ctx, { x: X(1070), y: Y(880), from: 100, to: 310, t, t0: ev.route + 0.4, t1: ev.routeEnd, size: 96, color: '#9A6A12' }); }
        SD.hindi(ctx, 'निर्यात', X(810), Y(930), { size: 30, weight: 400, color: '#5A4A3A', alpha: a }); SD.hindi(ctx, 'आयात', X(1070), Y(930), { size: 30, weight: 400, color: '#5A4A3A', alpha: a });
        SD.latin(ctx, 'index, start = 100 (fictional)', X(930), Y(970), { size: 22, weight: 400, color: '#7A6858', alpha: a });
      },
      // the money lines out of Riyadh and Ankara are cut, one by one
      '2-9'(ctx, t) {
        G.bg(ctx, PAPER);
        SD.drawMap(ctx, gulf, { highlight: { India: SD.PAL.india, 'Saudi Arabia': '#C7B48A', Turkey: '#C7B48A' }, land: LAND, lw: 1.5 });
        const src = [gulf.city('Riyadh'), gulf.city('Ankara')];
        const ends = [[58, 14], [38, 12], [50, 44], [28, 44], [62, 40], [44, 32]]; // anonymous far ends, on no country in particular
        ends.forEach(([lo, la], i) => {
          const A = src[i % 2], B = gulf.proj(lo, la), cut = clamp((t - ev.snips[i]) / 0.5);
          const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
          ctx.save(); ctx.strokeStyle = '#B5533C'; ctx.lineWidth = 6; ctx.setLineDash([16, 12]); ctx.lineDashOffset = -t * 40 * (1 - cut); ctx.globalAlpha = 1 - 0.75 * cut;
          const gap = 36 * cut, d = Math.hypot(B[0] - A[0], B[1] - A[1]), ux = (B[0] - A[0]) / d, uy = (B[1] - A[1]) / d;
          ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(M[0] - ux * gap, M[1] - uy * gap); ctx.moveTo(M[0] + ux * gap, M[1] + uy * gap + cut * 30); ctx.lineTo(B[0], B[1] + cut * 30); ctx.stroke(); ctx.restore();
          if (cut > 0 && cut < 1) G.star(ctx, M[0], M[1], 26 * (1 - cut) + 8, { fill: '#F2B84B', seed: 40 + i });
          ctx.save(); ctx.globalAlpha = 1 - 0.75 * cut; ctx.fillStyle = '#6E5A48'; ctx.beginPath(); ctx.arc(B[0], B[1] + cut * 30, 10, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        });
        for (const [c, name] of [[src[0], 'रियाद'], [src[1], 'अंकारा']]) { ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(c[0], c[1], 12, 0, Math.PI * 2); ctx.fill(); ctx.restore(); SD.hindi(ctx, name, c[0], c[1] - 24, { size: 34, color: INK }); }
        const done = clamp((t - ev.snips[5] - 0.3) / 0.5);
        ctx.save(); ctx.globalAlpha = done; G.tornPaper(ctx, X(560), Y(820), X(800), Y(130), { fill: '#FBF5E6', seed: 62, shadow: true }); ctx.restore();
        SD.hindi(ctx, 'कट्टरपंथ का पैसा — बंद', X(960), Y(905), { size: 56, color: '#7C2F2B', alpha: done });
      },
      '2-10'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1, 1.1, s.u), fx: X(960), fy: Y(620) }, () => {
          studio(ctx, t);
          SD.person(ctx, SD.extra(3, { hairStyle: 'short', outfit: 'suit', robe: '#3A4A66', shirt: '#F4F1E8', trim: '#B5332B', hair: '#1B1614', facialHair: 'none' }), { x: X(960), y: Y(1180), s: 1.5, mouth: s.talking('NEWS') ? s.mouth('NEWS') : 'flat', brows: s.talking('NEWS') ? 'up' : 'neutral', gesture: s.talking('NEWS') ? 'point' : undefined });
          rect(ctx, X(560), Y(980), X(800), Y(100), '#22304A', { stroke: '#3C5A7A', lw: 3 });
        });
      },
      // the count stops three seats short
      '2-11'(ctx, t) {
        G.bg(ctx, PAPER);
        const k = ramp(t, ev.fill0, ev.fill1, U.ease.outCubic), n = Math.round(270 * k);
        SD.hindi(ctx, 'त्रिशंकु लोकसभा', W / 2, Y(150), { size: 96, color: INK, alpha: clamp((t - ev.fill1) / 0.4) });
        SD.seats(ctx, W / 2, Y(880), X(520), { total: 543, left: n, right: n });
        SD.latin(ctx, String(n), X(420), Y(940), { size: 90, weight: 800, color: '#4F6675' }); SD.latin(ctx, String(n), X(1500), Y(940), { size: 90, weight: 800, color: '#5E5548' });
        SD.hindi(ctx, 'बहुमत: 272', W / 2, Y(820), { size: 50, color: '#5A4A3A', weight: 400 });
        if (t > ev.fill1) { const p = 0.5 + 0.5 * Math.sin((t - ev.fill1) * 6); ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * p; ctx.strokeStyle = '#B5332B'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(W / 2, Y(880) - X(380), X(150), 0, Math.PI * 2); ctx.stroke(); ctx.restore(); SD.hindi(ctx, '3 सीटें कम', W / 2, Y(270), { size: 56, color: '#B5332B' }); }
      },
      // three pins on India; three seats turn gold
      '2-12'(ctx, t) {
        G.bg(ctx, PAPER);
        SD.drawMap(ctx, india, { highlight: { India: SD.PAL.india }, land: LAND, lw: 2, clip: true });
        const pins = [['Mumbai', 'मुंबई', 'left'], ['Meerut', 'पश्चिमी उत्तर प्रदेश', 'right'], ['Kolkata', 'पश्चिम बंगाल', 'right']];
        pins.forEach(([city, label, side], i) => {
          const [px, py] = india.city(city);
          Data.pin(ctx, px, py, { t, at: ev.pins[i], color: SD.PAL.gold, size: 32 });
          SD.hindi(ctx, label, px + (side === 'left' ? -X(28) : X(28)), py - Y(6), { size: 32, align: side === 'left' ? 'right' : 'left', color: INK, alpha: clamp((t - ev.pins[i] - 0.3) / 0.3) });
        });
        const gold = t >= ev.gold ? 3 : 0;
        SD.seats(ctx, X(1400), Y(560), X(430), { total: 543, left: 270, right: 270, gold });
        if (gold) SD.glow(ctx, X(1400), Y(560) - X(290), X(160), 'rgba(242,184,75,0.9)', 0.6 * (0.6 + 0.4 * Math.sin((t - ev.gold) * 5)));
        SD.hindi(ctx, 'तीन सीटें', X(1400), Y(680), { size: 72, color: '#9A6A12', alpha: clamp((t - ev.pins[0]) / 0.4) });
        SD.hindi(ctx, 'एम.एन.पी.', X(1400), Y(770), { size: 60, color: INK, alpha: clamp((t - ev.gold) / 0.4) });
      },
      // a plain room: Bhaskar and three figures seen only from behind
      '2-13'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1, 1.08, s.u), fx: X(960), fy: Y(520) }, () => {
          SD.sky(ctx, [[0, '#C9BDA4'], [1, '#B4A78C']]);
          rect(ctx, X(700), Y(140), X(520), Y(300), '#EAF1EA', { stroke: '#8C7355', lw: 8 });
          rect(ctx, 0, Y(760), W, Y(320), '#8C7355');
          SD.person(ctx, 'bhaskarOld', { x: X(960), y: Y(830), s: 1.35, pose: 'sit', mouth: s.mouth('B'), brows: 'determined', gesture: s.talking('B') ? 'point' : undefined });
          rect(ctx, X(360), Y(760), X(1200), Y(46), '#5E3B24', { stroke: INK, lw: 2 });
          for (const x of [520, 960, 1400]) SD.silHead(ctx, X(x), Y(1010), 1.7, '#2B2622');
        });
      },
      // the oath
      '2-14'(ctx, t, s) {
        const oath = t >= ev.oath - 0.4;
        SD.cam(ctx, { zoom: lerp(1, 1.14, ramp(s.lt, 0, s.dur)), fx: X(820), fy: Y(600) }, () => {
          bhavan(ctx, t);
          SD.person(ctx, 'fatimaOld', { x: X(820), y: Y(1000), s: 1.4, mouth: s.talking('F') ? s.mouth('F') : 'flat', brows: 'determined', handR: oath ? [64, -330] : undefined });
          rect(ctx, X(690), Y(770), X(260), Y(230), '#6B4A30', { stroke: INK, lw: 2 }); rect(ctx, X(670), Y(752), X(300), Y(26), '#55392A');
          ctx.save(); ctx.strokeStyle = '#2A2320'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(X(880), Y(752)); ctx.lineTo(X(868), Y(650)); ctx.stroke(); ctx.fillStyle = '#2A2320'; ctx.beginPath(); ctx.arc(X(866), Y(642), 12, 0, Math.PI * 2); ctx.fill(); ctx.restore();
          for (let i = 0; i < 12; i++) SD.silHead(ctx, X(80 + i * 165), Y(1090 + (i % 2) * 20), 1.2, '#3A2E26');
        });
        SD.slug(ctx, 'New Delhi', { alpha: ramp(s.lt, 0.4, 1.2) });
      },
      // Bhaskar, one step behind
      '2-15'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1.3, 1.42, s.u), fx: X(1250), fy: Y(600) }, () => {
          bhavan(ctx, t);
          ctx.fillStyle = '#B88E62'; ctx.fillRect(X(1000), Y(300), X(130), Y(780)); ctx.fillStyle = '#9A7450'; ctx.fillRect(X(980), Y(280), X(170), Y(36)); // the pillar he stands beside
          SD.person(ctx, 'bhaskarOld', { x: X(1250), y: Y(1010), s: 1.25, look: -0.7, mouth: s.after('2.15') > -2 ? 'smile' : 'flat' });
        });
      },
    },
  });
})();
