// THE FILM — Act III: collapse across the border, a strike seen only on screens, the cabinet's
// choice, seventy-two hours on a map, the Urdu address, and a surrender without a city occupied.
// Nothing here shows a person being hurt: aftermath, screens and maps only.
(function () {
  const G = globalThis.G, U = globalThis.U, S = globalThis.SCORE, SD = globalThis.SD, Data = globalThis.Data;
  const W = G.W, H = G.H, X = SD.X, Y = SD.Y, { ramp, lerp, clamp, rect } = SD;
  const ev = S.ev, INK = SD.PAL.ink, PAPER = SD.PAL.paper;
  const flat = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };

  // ---------- sets ----------
  // a city skyline at dusk; `dark` 0..1 puts its lights out block by block
  function skyline(ctx, t, dark, base, color = '#2C2F45') {
    for (let i = 0; i < 26; i++) {
      const bx = X(i * 78 - 20), bw = X(70), bh = Y(120 + G.rnd(i, 1) * 300);
      flat(ctx, bx, base - bh, bw, bh, color);
      const out = dark * 26 > (i * 7) % 26; // blocks go dark in a scattered order
      for (let r = 0; r < Math.floor(bh / Y(40)); r++) for (let c = 0; c < 3; c++) {
        if (G.rnd(i, r, c) < 0.35) continue;
        ctx.fillStyle = out ? 'rgba(20,22,34,0.9)' : `rgba(255,214,140,${0.6 + 0.3 * Math.sin(t * 2 + i + r)})`;
        ctx.fillRect(bx + X(10 + c * 20), base - bh + Y(14 + r * 40), X(12), Y(18));
      }
    }
  }
  function flourQueue(ctx, t, s) {
    const ground = Y(840);
    SD.sky(ctx, [[0, '#3A3560'], [0.6, '#A8686A'], [1, '#D9A070']], 0, 0, W, ground);
    skyline(ctx, t, ramp(s.lt, 1, s.dur - 0.5, (x) => x), Y(660));
    rect(ctx, 0, Y(650), W, ground - Y(650), '#4A4458');
    // a shuttered shop with a plain sign
    rect(ctx, X(1300), Y(420), X(520), ground - Y(420), '#6E6456', { stroke: INK, lw: 2 });
    rect(ctx, X(1350), Y(560), X(420), ground - Y(560), '#7E8588'); for (let k = 0; k < 7; k++) flat(ctx, X(1350), Y(580 + k * 38), X(420), 4, 'rgba(0,0,0,0.18)');
    rect(ctx, X(1340), Y(450), X(440), Y(80), '#EFE6D2', { stroke: INK, lw: 2 });
    SD.urdu(ctx, 'آٹا', X(1560), Y(510), { size: 50, color: INK });
    rect(ctx, 0, ground, W, H - ground, '#5A5058');
    // the queue: plain figures from behind, shuffling
    for (let i = 0; i < 13; i++) { const x = X(1260 - i * 96), bob = Math.sin(t * 1.2 + i) * 3; SD.silFigure(ctx, x, Y(990) + bob + (i % 2) * Y(14), 0.86 + (i % 3) * 0.05, i % 2 ? '#2A2630' : '#35303A'); }
    SD.shade(ctx, X(960), Y(520), X(500), X(1500), '#7A7088');
  }
  // an empty avenue at dawn after a protest: placards and shoes on the road, smoke, far vehicles
  function avenue(ctx, t) {
    const horizon = Y(560);
    SD.sky(ctx, [[0, '#5A5E78'], [0.7, '#B8A8A0'], [1, '#D9C4A8']], 0, 0, W, horizon);
    for (let side = 0; side < 2; side++) for (let i = 0; i < 6; i++) { // buildings receding on both sides
      const k = 1 - i * 0.15, w = X(300) * k, h = Y(520) * k, x = side ? W / 2 + X(120) + (X(840) * k - w) : W / 2 - X(120) - X(840) * k;
      flat(ctx, x, horizon - h * 0.82, w, h, `rgb(${70 + i * 14},${72 + i * 14},${88 + i * 12})`);
    }
    G.poly(ctx, [[W / 2 - X(110), horizon], [W / 2 + X(110), horizon], [W + X(200), H], [-X(200), H]], { fill: '#6A6468', stroke: null, seed: 7 });
    // armoured vehicles, far away, as plain shapes
    for (const dx of [-70, 20]) { ctx.save(); ctx.fillStyle = '#2B2D36'; ctx.fillRect(W / 2 + X(dx), horizon - Y(34), X(60), Y(30)); ctx.fillRect(W / 2 + X(dx + 14), horizon - Y(50), X(30), Y(18)); ctx.restore(); }
    // what was left behind
    for (let i = 0; i < 16; i++) {
      const u = 0.1 + G.rnd(i, 3) * 0.85, y = lerp(horizon + 30, H - 60, u), x = W / 2 + (G.rnd(i, 5) - 0.5) * X(1700) * u, k = 0.3 + u * 0.9;
      ctx.save(); ctx.translate(x, y); ctx.rotate((G.rnd(i, 9) - 0.5) * 1.6); ctx.scale(k, k);
      if (i % 3 === 0) { ctx.fillStyle = '#EFE6D2'; ctx.fillRect(-90, -56, 180, 112); ctx.fillStyle = '#8A7A6A'; ctx.fillRect(-8, 56, 16, 130); for (let l = 0; l < 3; l++) { ctx.fillStyle = 'rgba(60,50,40,0.5)'; ctx.fillRect(-66, -30 + l * 26, 132, 9); } } // a blank placard: no slogan
      else { ctx.fillStyle = ['#3A3036', '#5A4A42', '#2A2A30'][i % 3]; ctx.beginPath(); ctx.ellipse(0, 0, 34, 14, 0, 0, Math.PI * 2); ctx.fill(); } // a shoe
      ctx.restore();
    }
    for (let i = 0; i < 6; i++) { const u = (t * 0.04 + i / 6) % 1; ctx.save(); ctx.globalAlpha = 0.22 * (1 - u); ctx.fillStyle = '#D9D4D0'; ctx.beginPath(); ctx.arc(X(300 + i * 280) + Math.sin(u * 4 + i) * X(60), lerp(Y(760), Y(260), u), X(60 + 150 * u), 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  }
  // what a news screen shows: a skyline, a red band, words. Never a victim.
  function newsScreen(ctx, x, y, w, h, t, { big = false, channel = 'समाचार 24' } = {}) {
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#2A2238'); g.addColorStop(1, '#7A3A3A'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    for (let i = 0; i < 12; i++) { const bw = w / 12, bh = h * (0.2 + 0.3 * G.rnd(i, 21)); ctx.fillStyle = '#17141E'; ctx.fillRect(x + i * bw, y + h * 0.72 - bh, bw - 3, bh); }
    for (const sx of [0.25, 0.7]) SD.glow(ctx, x + w * sx, y + h * 0.66, w * 0.22, Math.floor(t * 2.2 + sx * 4) % 2 ? 'rgba(255,60,50,0.9)' : 'rgba(70,110,255,0.9)', 0.75); // emergency lights
    ctx.fillStyle = '#B5332B'; ctx.fillRect(x, y + h * 0.72, w, h * 0.16); ctx.fillStyle = '#17141E'; ctx.fillRect(x, y + h * 0.88, w, h * 0.12);
    ctx.restore();
    SD.latin(ctx, 'BREAKING', x + w * 0.5, y + h * 0.835, { size: h * 0.105, color: '#FFFFFF', weight: 800 });
    if (big) { SD.hindi(ctx, 'आतंकी हमला', x + w * 0.5, y + h * 0.3, { size: h * 0.15, color: '#FFFFFF', stroke: 'rgba(0,0,0,0.6)', strokeW: 8 }); SD.hindi(ctx, channel, x + w * 0.16, y + h * 0.965, { size: h * 0.075, color: '#FFFFFF', weight: 400 }); }
  }
  function livingRoom(ctx, t, live) {
    SD.sky(ctx, [[0, '#3A3440'], [1, '#2A262E']]);
    rect(ctx, X(520), Y(180), X(880), Y(520), '#17141E', { stroke: '#0B0A10', lw: 12 });
    if (live) newsScreen(ctx, X(540), Y(200), X(840), Y(480), t, { big: true });
    else { flat(ctx, X(540), Y(200), X(840), Y(480), '#3E6B8A'); SD.hindi(ctx, 'मौसम', X(960), Y(450), { size: 80, color: '#EAF4FF' }); }
    rect(ctx, X(820), Y(700), X(280), Y(60), '#2A2320'); rect(ctx, 0, Y(840), W, Y(240), '#3A3036');
    SD.glow(ctx, X(960), Y(440), X(1100), live ? 'rgba(255,90,70,0.9)' : 'rgba(120,170,220,0.9)', 0.28 + 0.05 * Math.sin(t * 6));
    for (const [x, sc, child] of [[620, 1.5, false], [900, 1.5, false], [1120, 1.5, true], [1330, 1.5, false]]) SD.silFigure(ctx, X(x), Y(1230), sc, '#141218', { child }); // a family, backs to us
    rect(ctx, X(420), Y(1000), X(1100), Y(90), '#22202A');
  }
  function cabinetRoom(ctx) {
    SD.sky(ctx, [[0, '#4A3E38'], [1, '#6A5848']]);
    for (let i = 0; i < 6; i++) rect(ctx, X(120 + i * 290), Y(120), X(230), Y(420), '#5E4E42', { stroke: '#3A2E26', lw: 4 }); // wood panelling
    rect(ctx, 0, Y(760), W, Y(320), '#3A2E26');
  }
  const longTable = (ctx) => { rect(ctx, X(200), Y(760), X(1520), Y(50), '#5E3B24', { stroke: INK, lw: 2 }); rect(ctx, X(260), Y(810), X(1400), Y(270), '#4A3222'); };
  function micPodium(ctx, t, on, flag = true) {
    SD.sky(ctx, [[0, '#1E2438'], [1, '#2E3650']]);
    rect(ctx, X(160), Y(120), X(1600), Y(560), '#27305C'); // a plain blue backdrop
    rect(ctx, 0, Y(780), W, Y(300), '#1A1E2C');
    // the national flag, hanging still
    const fx = X(1480), fy = Y(200);
    if (flag) {
    flat(ctx, fx - 6, fy - Y(30), 12, Y(640), '#C9B48A');
    ['#FF9933', '#FFFFFF', '#138808'].forEach((c, k) => flat(ctx, fx + 6, fy + k * Y(60), X(200), Y(60), c));
    ctx.save(); ctx.strokeStyle = '#000080'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(fx + 6 + X(100), fy + Y(90), Y(22), 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    }
    // the ON AIR lamp
    rect(ctx, X(220), Y(170), X(230), Y(84), on ? '#B5332B' : '#3A2A2A', { stroke: INK, lw: 3 });
    SD.latin(ctx, 'ON AIR', X(335), Y(228), { size: 40, weight: 800, color: on ? '#FFFFFF' : '#6A5A5A' });
    if (on) SD.glow(ctx, X(335), Y(212), X(260), 'rgba(255,70,60,0.9)', 0.5 + 0.1 * Math.sin(t * 5));
  }
  const mic = (ctx, x, y) => { ctx.save(); ctx.strokeStyle = '#C9CED2'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - Y(210)); ctx.stroke(); ctx.fillStyle = '#2A2320'; ctx.beginPath(); ctx.ellipse(x, y - Y(226), X(20), Y(30), 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); };
  // a home across the border, in one panel: lamp light, a radio or a phone, a family listening
  function homePanel(ctx, x, y, w, h, kind, t) {
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    SD.sky(ctx, [[0, '#3A2E3A'], [1, '#5A4438']], x, y, w, h);
    const cx = x + w / 2, floor = y + h * 0.8;
    flat(ctx, x, floor, w, h * 0.2, '#3A2A26');
    SD.glow(ctx, cx, y + h * 0.42, w * 0.9, 'rgba(255,190,110,0.95)', 0.55 + 0.04 * Math.sin(t * 7 + kind));
    if (kind === 0) { // a radio on a shelf
      flat(ctx, x + w * 0.16, y + h * 0.52, w * 0.68, 12, '#6B4A30');
      rect(ctx, cx - w * 0.2, y + h * 0.36, w * 0.4, h * 0.16, '#8A5A3A', { stroke: INK, lw: 3 }); ctx.fillStyle = '#2A2320'; ctx.beginPath(); ctx.arc(cx - w * 0.09, y + h * 0.44, h * 0.05, 0, Math.PI * 2); ctx.fill();
      for (let i = 0; i < 3; i++) { ctx.strokeStyle = `rgba(255,233,168,${0.7 - i * 0.2})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx + w * 0.2, y + h * 0.44, 20 + i * 22 + ((t * 30) % 22), -0.7, 0.7); ctx.stroke(); }
    } else if (kind === 1) { // a phone held in two hands
      rect(ctx, cx - w * 0.11, y + h * 0.26, w * 0.22, h * 0.4, '#17141E', { stroke: INK, lw: 3 }); flat(ctx, cx - w * 0.09, y + h * 0.29, w * 0.18, h * 0.32, '#27305C');
      for (let i = 0; i < 9; i++) { const hh = h * (0.03 + 0.07 * Math.abs(Math.sin(t * 6 + i * 1.3))); flat(ctx, cx - w * 0.075 + i * w * 0.018, y + h * 0.45 - hh / 2, w * 0.01, hh, '#F2B84B'); }
      for (const side of [-1, 1]) { ctx.fillStyle = '#B98A62'; ctx.beginPath(); ctx.ellipse(cx + side * w * 0.14, y + h * 0.56, w * 0.07, h * 0.1, side * 0.3, 0, Math.PI * 2); ctx.fill(); }
    } else { // a lamp on a low table
      flat(ctx, cx - 6, y + h * 0.4, 12, h * 0.26, '#5E4A3A'); ctx.fillStyle = '#F2D08A'; ctx.beginPath(); ctx.moveTo(cx - w * 0.1, y + h * 0.42); ctx.lineTo(cx + w * 0.1, y + h * 0.42); ctx.lineTo(cx + w * 0.06, y + h * 0.28); ctx.lineTo(cx - w * 0.06, y + h * 0.28); ctx.fill();
    }
    const fam = [[0.2, 1, false], [0.4, 1, true], [0.66, 1, false], [0.84, 1, true]];
    for (const [fx, sc, child] of fam) SD.silFigure(ctx, x + w * fx, y + h * 1.12, sc * (w / 520), '#1E1820', { child });
    ctx.restore();
    ctx.save(); ctx.strokeStyle = '#17120F'; ctx.lineWidth = 10; ctx.strokeRect(x, y, w, h); ctx.restore();
  }
  // a garrison wall and gate on a wide road
  function garrison(ctx, t, { open = 0, dawn = 0 } = {}) {
    const ground = Y(800);
    if (dawn) SD.sky(ctx, [[0, '#6E7FA8'], [0.6, '#F0B48A'], [1, '#FBE2B0']], 0, 0, W, ground);
    else SD.sky(ctx, [[0, '#0E1226'], [1, '#2A2A48']], 0, 0, W, ground);
    if (dawn) { SD.glow(ctx, X(960), ground - Y(40), X(900), 'rgba(255,214,140,0.95)', 0.8 * dawn); ctx.save(); ctx.fillStyle = '#FFF3D0'; ctx.beginPath(); ctx.arc(X(960), ground - Y(60) * dawn, X(64), 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    const wall = dawn ? '#8A7A6E' : '#2E3040';
    flat(ctx, 0, Y(480), X(780), ground - Y(480), wall); flat(ctx, X(1140), Y(480), X(780), ground - Y(480), wall);
    for (let i = 0; i < 16; i++) { const x = i < 8 ? X(i * 98) : X(1140 + (i - 8) * 98); flat(ctx, x, Y(440), X(60), Y(44), wall); }
    flat(ctx, X(700), Y(380), X(90), ground - Y(380), dawn ? '#7A6A5E' : '#262836'); flat(ctx, X(1130), Y(380), X(90), ground - Y(380), dawn ? '#7A6A5E' : '#262836'); // gate towers
    // the two leaves of the gate swing back
    const gw = X(170) * (1 - 0.86 * open);
    flat(ctx, X(790), Y(500), gw, ground - Y(500), '#3E3228'); flat(ctx, X(1130) - gw, Y(500), gw, ground - Y(500), '#3E3228');
    rect(ctx, 0, ground, W, H - ground, dawn ? '#A8957E' : '#22222E');
    return { ground };
  }

  // ---------- maps ----------
  const region = Data.map({ region: [58, 20, 84, 39], x: X(60), y: Y(40), w: X(1300), h: Y(940) });
  const night = Data.map({ region: [60, 22, 80, 38], x: X(1240), y: Y(90), w: X(600), h: Y(520) });
  const warMap = (ctx, t) => { SD.warTable(ctx, t); SD.drawMap(ctx, region, { highlight: { India: '#3B5B66', Pakistan: '#2C4A52' }, land: '#182A3A', stroke: 'rgba(150,220,230,0.75)', lw: 2 }); };
  const clockAt = (t) => lerp(72 * 3600, 0, clamp((t - ev.clock0) / (ev.clock1 - ev.clock0)));
  const hud = (ctx, t, hi, en) => {
    SD.clock(ctx, clockAt(t), X(1600), Y(240));
    SD.hindi(ctx, 'बहत्तर घंटे', X(1600), Y(320), { size: 40, color: '#CFE8EA', weight: 400 });
    SD.hindi(ctx, hi, X(1600), Y(520), { size: 42, color: '#F2B84B' }); SD.latin(ctx, en, X(1600), Y(570), { size: 26, color: '#9FC4C8', weight: 400 });
  };
  // fictional sites: placed for the picture, not on any real installation
  const BASES = [[72.4, 32.1], [73.1, 33.6], [67.2, 24.9], [68.4, 28.3], [71.4, 29.9]], FROM = [[76.8, 30.7], [75.8, 26.9], [72.6, 23.0]];
  const NODES = [[73.0, 33.7], [74.3, 31.5], [67.0, 24.9], [71.5, 30.2], [66.9, 30.2], [71.5, 34.0], [68.9, 27.7]];
  const SITES = [[72.0, 32.6], [69.6, 29.2], [67.6, 26.3]];

  const Fold = (ctx, s, o) => SD.person(ctx, 'fatimaOld', { mouth: s.talking('F') ? s.mouth('F') : 'flat', brows: 'determined', ...o });
  const Bold = (ctx, s, o) => SD.person(ctx, 'bhaskarOld', { mouth: s.talking('B') ? s.mouth('B') : 'flat', ...o });
  // the Urdu line being spoken, in Nastaliq, beside her
  function urduLine(ctx, t, x, y, maxW, size = 54) {
    const l = S.lines.find((q) => q.ur && t >= q.t - 0.1 && t <= q.end + 0.5); if (!l) return;
    const a = clamp((t - l.t + 0.1) / 0.35) * clamp((l.end + 0.5 - t) / 0.3), fam = SD.FONT.urdu;
    const words = l.ur.split(' '), lines = []; let cur = '';
    for (const w of words) { const nx = cur ? cur + ' ' + w : w; if (cur && G.measure(ctx, nx, size, fam, 400, 'ur') > maxW) { lines.push(cur); cur = w; } else cur = nx; }
    if (cur) lines.push(cur);
    lines.forEach((ln, i) => SD.urdu(ctx, ln, x, y + i * size * 2.1, { size, color: '#FFF4D8', alpha: a }));
  }

  SD.stage({
    cuts: ['3-2', '3-5', '3-8', '3-10', '3-11', '3-14', '3-15'],
    post: (id) => (['3-9', '3-10', '3-11'].includes(id) ? { paper: 0.25, vignette: 0.4 } : {}),
    shots: {
      // a line chart that falls off a cliff
      '3-1'(ctx, t) {
        G.bg(ctx, PAPER);
        SD.hindi(ctx, 'पाकिस्तान — अर्थव्यवस्था', W / 2, Y(150), { size: 64, color: INK });
        const x0 = X(260), x1 = X(1660), y0 = Y(840), top = Y(300);
        ctx.save(); ctx.strokeStyle = 'rgba(42,35,32,0.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, top - 30); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke(); ctx.restore();
        const val = (u) => (u < 0.62 ? 0.7 + 0.05 * Math.sin(u * 22) - u * 0.12 : Math.max(0.04, 0.62 - (u - 0.62) * 2.2 - 0.03 * Math.sin(u * 40)));
        const k = clamp((t - S.byId['3-1'].t0 - 0.6) / (ev.fall + 1.4 - S.byId['3-1'].t0 - 0.6));
        ctx.save(); ctx.strokeStyle = '#B5332B'; ctx.lineWidth = 9; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath();
        for (let i = 0; i <= 120 * k; i++) { const u = i / 120, px = lerp(x0, x1, u), py = lerp(y0, top, val(u)); if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
        ctx.stroke(); ctx.restore();
        if (k > 0.02) { const u = k, px = lerp(x0, x1, u), py = lerp(y0, top, val(u)); ctx.save(); ctx.fillStyle = '#B5332B'; ctx.beginPath(); ctx.arc(px, py, 16, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
        SD.latin(ctx, 'fictional', x1 - X(60), y0 + Y(50), { size: 24, weight: 400, color: '#7A6858' });
      },
      '3-2'(ctx, t, s) { SD.cam(ctx, { zoom: 1.1, dx: lerp(X(80), -X(80), s.u) }, () => flourQueue(ctx, t, s)); SD.slug(ctx, 'Across the border', { alpha: ramp(s.lt, 0.4, 1.2) }); },
      '3-3'(ctx, t, s) { SD.cam(ctx, { zoom: lerp(1.16, 1.04, s.u), fy: Y(620) }, () => avenue(ctx, t)); SD.shade(ctx, X(960), Y(520), X(600), X(1500), '#8A8494'); },
      // a living room in India; the television cuts to breaking news
      '3-4'(ctx, t, s) { SD.cam(ctx, { zoom: lerp(1, 1.22, ramp(s.lt, 0, s.dur)), fx: X(960), fy: Y(440) }, () => livingRoom(ctx, t, t >= ev.breaking)); },
      // a wall of screens, all red
      '3-5'(ctx, t) {
        flat(ctx, 0, 0, W, H, '#0B0A10');
        for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) newsScreen(ctx, X(40 + c * 465), Y(40 + r * 320), X(445), Y(290), t + r + c * 0.7, { big: r === 1 && (c === 1 || c === 2) });
        SD.shade(ctx, X(960), Y(540), X(600), X(1500), '#5A4A5A');
      },
      // the cabinet: ministers as plain figures; Fatima at the head, Bhaskar seated behind her
      '3-6'(ctx, t, s) {
        const pan = ramp(s.lt, 0.5, 3.5);
        SD.cam(ctx, { zoom: 1.18, fx: lerp(W, X(300), pan), fy: Y(600) }, () => {
          cabinetRoom(ctx);
          Bold(ctx, s, { x: X(250), y: Y(820), s: 1.0, pose: 'sit', look: 0.6 });
          Fold(ctx, s, { x: X(560), y: Y(830), s: 1.35, pose: 'sit', look: 0.7 });
          for (let i = 0; i < 4; i++) SD.person(ctx, SD.extra(i + 1, { outfit: i % 2 ? 'kameez' : 'suit', robe: '#3A3A42', hair: i % 2 ? '#B9B4AC' : '#1B1614' }), { x: X(980 + i * 240), y: Y(830), s: 1.15, pose: 'sit', look: -0.8, mouth: i === 0 && s.talking('MIN') ? s.mouth('MIN') : 'flat', brows: i === 0 ? 'worried' : 'neutral', gesture: i === 0 && s.talking('MIN') ? 'point' : undefined });
          longTable(ctx);
        });
      },
      // Bhaskar leans in; his line is brushed across the frame
      '3-7'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1.05, 1.2, s.u), fx: X(620), fy: Y(540) }, () => {
          cabinetRoom(ctx);
          Bold(ctx, s, { x: X(620), y: Y(900), s: 1.9, pose: 'sit', look: 0.4, brows: 'determined', gesture: s.talking('B') ? 'point' : undefined });
          rect(ctx, X(100), Y(900), X(1700), Y(60), '#5E3B24', { stroke: INK, lw: 2 }); flat(ctx, X(160), Y(960), X(1580), Y(140), '#4A3222');
        });
        const l = s.line('3.7'), u = clamp((t - l.t) / (l.dur * 0.5)), u2 = clamp((t - l.t - l.dur * 0.5) / (l.dur * 0.5));
        SD.brushOn(ctx, u, X(1320), Y(330), X(1000), Y(110), () => SD.hindi(ctx, 'क़ब्ज़ा → शहीद', X(1320), Y(330), { size: 84, color: '#E9C9B0' }));
        SD.brushOn(ctx, u2, X(1320), Y(470), X(1000), Y(110), () => SD.hindi(ctx, 'संविधान → नागरिक', X(1320), Y(470), { size: 84, color: '#F2B84B' }));
      },
      // her hand, flat on the table
      '3-8'(ctx, t, s) {
        const down = ramp(t, ev.hand - 0.35, ev.hand, U.ease.inCubic), shake = t > ev.hand ? Math.exp(-(t - ev.hand) * 9) * 10 * Math.sin((t - ev.hand) * 60) : 0;
        flat(ctx, 0, 0, W, H, '#4A3222');
        ctx.save(); ctx.translate(0, shake);
        rect(ctx, -20, Y(560), W + 40, Y(540), '#5E3B24'); for (let i = 0; i < 6; i++) flat(ctx, 0, Y(600 + i * 84), W, 4, 'rgba(0,0,0,0.12)');
        rect(ctx, X(1180), Y(640), X(360), Y(250), '#FBF5E6', { stroke: 'rgba(0,0,0,0.3)', lw: 2 }); for (let l = 0; l < 6; l++) flat(ctx, X(1220), Y(690 + l * 32), X(280) * (l === 5 ? 0.5 : 1), 6, 'rgba(60,50,40,0.4)');
        const hy = lerp(Y(300), Y(700), down);
        ctx.fillStyle = '#EFE6D2'; ctx.fillRect(X(560), hy - Y(520), X(260), Y(480)); ctx.fillStyle = SD.PAL.teal; ctx.fillRect(X(560), hy - Y(60), X(260), Y(26)); // the sleeve of her sari
        ctx.fillStyle = '#CDA07A'; ctx.beginPath(); ctx.ellipse(X(690), hy + Y(40), X(150), Y(86), 0, 0, Math.PI * 2); ctx.fill();
        for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(X(590 + i * 68), hy + Y(128), X(30), Y(66), (i - 1.5) * 0.08, 0, Math.PI * 2); ctx.fill(); }
        ctx.beginPath(); ctx.ellipse(X(850), hy + Y(60), X(64), Y(30), -0.5, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        if (t > ev.hand && t < ev.hand + 0.4) G.rays(ctx, X(700), Y(800), { n: 12, r0: 220, r1: 300 + 300 * (t - ev.hand), color: '#F2B84B', lw: 5, alpha: 1 - (t - ev.hand) * 2.5 });
      },
      // seventy-two hours: thin arcs to military sites only
      '3-9'(ctx, t) {
        warMap(ctx, t);
        BASES.forEach(([lo, la], i) => {
          const Bp = region.proj(lo, la), A = region.proj(...FROM[i % 3]), on = t >= ev.arcs[i] + 0.8;
          Data.route(ctx, A, Bp, { t, t0: ev.arcs[i], t1: ev.arcs[i] + 0.8, color: '#F2B84B', lw: 3, arc: 0.22, dash: [10, 8] });
          ctx.save(); ctx.strokeStyle = on ? '#F2B84B' : 'rgba(242,184,75,0.4)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(Bp[0], Bp[1], 16, 0, Math.PI * 2); ctx.moveTo(Bp[0] - 24, Bp[1]); ctx.lineTo(Bp[0] + 24, Bp[1]); ctx.moveTo(Bp[0], Bp[1] - 24); ctx.lineTo(Bp[0], Bp[1] + 24); ctx.stroke(); ctx.restore();
          if (on) SD.glow(ctx, Bp[0], Bp[1], 60, 'rgba(242,184,75,0.9)', Math.exp(-(t - ev.arcs[i] - 0.8) * 2));
        });
        hud(ctx, t, 'केवल सैन्य ठिकाने', 'military targets only');
      },
      // the command network goes dark, node by node
      '3-10'(ctx, t) {
        warMap(ctx, t);
        const P = NODES.map(([lo, la]) => region.proj(lo, la));
        ctx.save(); ctx.lineWidth = 2;
        for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { if ((i + j) % 2) continue; const off = t >= ev.nodes[i] || t >= ev.nodes[j]; ctx.strokeStyle = off ? 'rgba(90,110,120,0.25)' : 'rgba(120,230,240,0.8)'; ctx.setLineDash(off ? [4, 10] : []); ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke(); }
        ctx.restore();
        P.forEach(([x, y], i) => { const off = t >= ev.nodes[i]; if (!off) SD.glow(ctx, x, y, 44, 'rgba(120,230,240,0.9)', 0.6 + 0.3 * Math.sin(t * 6 + i)); ctx.save(); ctx.fillStyle = off ? '#3A4A52' : '#9FF0F4'; ctx.beginPath(); ctx.arc(x, y, 11, 0, Math.PI * 2); ctx.fill(); ctx.restore(); });
        hud(ctx, t, 'कमान ठप', 'command offline');
      },
      // shield rings close around three marked sites
      '3-11'(ctx, t) {
        warMap(ctx, t);
        SITES.forEach(([lo, la], i) => {
          const [x, y] = region.proj(lo, la), k = ramp(t, ev.rings[i], ev.rings[i] + 0.7);
          ctx.save(); ctx.fillStyle = '#E9EEF2'; ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.lineTo(x + 13, y + 10); ctx.lineTo(x - 13, y + 10); ctx.fill(); ctx.restore();
          for (let r = 0; r < 3; r++) { ctx.save(); ctx.globalAlpha = k * (1 - r * 0.25); ctx.strokeStyle = '#7FE3A8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, lerp(120, 30 + r * 16, k), 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
        });
        hud(ctx, t, 'परमाणु ठिकाने सुरक्षित', 'nuclear sites secured');
      },
      // she walks to the microphone; the lamp goes red
      '3-12'(ctx, t, s) {
        const walk = ramp(s.lt, 0.3, 4, (x) => x), arrived = walk >= 1;
        micPodium(ctx, t, t >= ev.onAir);
        Fold(ctx, s, { x: lerp(X(-160), X(960), walk), y: Y(1000), s: 1.4, pose: arrived ? 'stand' : 'walk', walk: t * 1.5, look: arrived ? 0 : 0.6 });
        mic(ctx, X(1080), Y(1000));
      },
      // the address, in Urdu
      '3-13'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1.3, 1.44, ramp(s.lt, 0, s.dur)), fx: X(700), fy: Y(560) }, () => {
          micPodium(ctx, t, true, false);
          SD.person(ctx, 'fatimaOld', { x: X(700), y: Y(1000), s: 1.4, mouth: s.mouth('F'), brows: 'determined' });
          mic(ctx, X(820), Y(1000));
        });
        urduLine(ctx, t, X(1360), Y(330), X(900));
      },
      // homes across the border, listening
      '3-14'(ctx, t, s) {
        flat(ctx, 0, 0, W, H, '#17120F');
        for (let i = 0; i < 3; i++) { const k = U.ease.outCubic(clamp((s.lt - i * 0.7) / 0.6)); ctx.save(); ctx.globalAlpha = k; homePanel(ctx, X(60 + i * 610) + (1 - k) * X(120), Y(70), X(580), Y(540), i, t); ctx.restore(); }
        urduLine(ctx, t, W / 2, Y(740), X(1500), 58);
      },
      // her face; the last line
      '3-15'(ctx, t, s) {
        SD.cam(ctx, { zoom: 1.0 }, () => {
          micPodium(ctx, t, true, false);
          SD.person(ctx, 'fatimaOld', { x: X(700), y: Y(1500), s: 2.9, mouth: s.mouth('F'), brows: 'determined' });
        });
        urduLine(ctx, t, X(1420), Y(430), X(820), 76);
      },
      // a river of people with lamps and phone lights, walking toward the gate; the lights spread on the map
      '3-16'(ctx, t, s) {
        const pull = ramp(s.lt, 0, s.dur);
        SD.cam(ctx, { zoom: lerp(1.3, 1.0, pull), fx: X(960), fy: Y(700) }, () => {
          const g = garrison(ctx, t);
          for (let i = 0; i < 260; i++) { // the crowd: points of light flowing up the road toward the gate
            const lane = G.rnd(i, 1), u = ((G.rnd(i, 2) + (t - S.byId['3-16'].t0) * 0.03 * (0.6 + G.rnd(i, 3))) % 1);
            const depth = 1 - u, y = lerp(g.ground + Y(24), H + Y(30), depth * depth), spread = lerp(X(210), X(1900), depth);
            const x = X(960) + (lane - 0.5) * spread + Math.sin(t * 1.3 + i) * 3, r = lerp(3, 13, depth);
            ctx.save(); ctx.fillStyle = '#17141E'; ctx.beginPath(); ctx.ellipse(x, y + r * 2.6, r * 1.3, r * 2.4, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
            SD.glow(ctx, x, y, r * 4.5, i % 3 ? 'rgba(255,214,140,0.95)' : 'rgba(200,225,255,0.95)', 0.8);
          }
        });
        // inset map: lights spreading from Lahore to Karachi
        const a = ramp(t, ev.lights0 - 0.5, ev.lights0 + 0.5);
        ctx.save(); ctx.globalAlpha = a; flat(ctx, night.box.x - 10, night.box.y - 10, night.box.w + 20, night.box.h + 20, 'rgba(10,14,28,0.86)');
        SD.drawMap(ctx, night, { highlight: { Pakistan: '#2C4A52', India: '#3B5B66' }, land: '#182A3A', stroke: 'rgba(150,220,230,0.6)', lw: 1.5, clip: true });
        const A = night.city('Lahore'), B = night.city('Karachi'), k = clamp((t - ev.lights0) / (ev.lights1 - ev.lights0));
        for (let i = 0; i < 40; i++) { const u = i / 39; if (u > k) break; const px = lerp(A[0], B[0], u) + (G.rnd(i, 7) - 0.5) * 70, py = lerp(A[1], B[1], u) + (G.rnd(i, 8) - 0.5) * 50; SD.glow(ctx, px, py, 22, 'rgba(255,214,140,0.95)', 0.9); }
        SD.hindi(ctx, 'लाहौर', A[0] + 16, A[1] - 16, { size: 28, color: '#FFF4D8', align: 'left' }); SD.hindi(ctx, 'कराची', B[0] + 16, B[1] + 8, { size: 28, color: '#FFF4D8', align: 'left' });
        ctx.restore();
      },
      // dawn: the gates open, rifles stacked, soldiers and townspeople face each other; a white cloth on the gate
      '3-17'(ctx, t, s) {
        const dawn = ramp(s.lt, 0, s.dur * 0.8), open = ramp(t, ev.gates, ev.gates + 2.2);
        SD.cam(ctx, { zoom: lerp(1.12, 1.0, s.u), fx: X(960), fy: Y(620) }, () => {
          const g = garrison(ctx, t, { open, dawn: 0.3 + 0.7 * dawn });
          // soldiers, hands empty, to the left; townspeople to the right; a clear space between
          for (let i = 0; i < 7; i++) SD.silFigure(ctx, X(300 + i * 78), g.ground + Y(120 + (i % 2) * 30), 0.9, '#3A4634');
          for (let i = 0; i < 10; i++) SD.silFigure(ctx, X(1180 + i * 72), g.ground + Y(120 + (i % 3) * 26), 0.9, ['#4A3A3A', '#3A3A4A', '#4A4234'][i % 3], { child: i % 4 === 3 });
          // rifles stacked on the ground, like sheaves
          for (let k = 0; k < 3; k++) { const sx = X(880 + k * 80), sy = g.ground + Y(170); ctx.save(); ctx.strokeStyle = '#2A2320'; ctx.lineWidth = 7; ctx.lineCap = 'round'; for (const a of [-0.3, -0.1, 0.1, 0.3]) { ctx.beginPath(); ctx.moveTo(sx + Math.sin(a) * 70, sy); ctx.lineTo(sx - Math.sin(a) * 8, sy - Y(150)); ctx.stroke(); } ctx.restore(); }
          // the white cloth rises on the gate tower
          const up = ramp(t, ev.cloth, ev.cloth + 1.6);
          if (up > 0) { const fx = X(745), fy = lerp(Y(380), Y(250), up); ctx.save(); ctx.fillStyle = '#5E4A3A'; ctx.fillRect(fx - 4, fy, 8, Y(380) - fy + Y(10)); ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.moveTo(fx + 4, fy); for (let i = 0; i <= 5; i++) ctx.lineTo(fx + 4 + i * X(26), fy + Math.sin(t * 2.4 + i) * 6); for (let i = 5; i >= 0; i--) ctx.lineTo(fx + 4 + i * X(26), fy + Y(70) + Math.sin(t * 2.4 + i) * 6); ctx.fill(); ctx.restore(); }
        });
      },
    },
  });
})();
