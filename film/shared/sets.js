// SETS — the places of the film, each a pure function of time. Parts place characters in front.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data;
  const SD = (globalThis.SD = globalThis.SD || {});
  const { clamp, lerp } = U;
  const X = (x) => (x * G.W) / 1920, Y = (y) => (y * G.H) / 1080;
  const rect = (ctx, x, y, w, h, fill, o = {}) => G.poly(ctx, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { fill, stroke: null, lw: 0, seed: (x * 7 + y * 13) | 0, amp: 0.5, ...o });

  // ---------- Vashishti river at dawn ----------
  // sun: 0 = just under the ridge, 1 = risen. Returns { waterY, sunX, sunY } for staging.
  SD.river = (ctx, t, { sun = 0.6, pan = 0 } = {}) => {
    const W = G.W, H = G.H, horizon = Y(560), sunX = X(1180) - pan * 0.1, sunY = lerp(horizon + Y(30), horizon - Y(170), sun);
    SD.sky(ctx, [[0, '#2B3A6B'], [0.32, '#8E7FA8'], [0.5, '#F0A878'], [0.62, '#FBD9A0']], 0, 0, W, horizon + 10);
    SD.glow(ctx, sunX, sunY, X(620), 'rgba(255,214,140,0.95)', 0.9);
    ctx.save(); ctx.fillStyle = '#FFF3D0'; ctx.beginPath(); ctx.arc(sunX, sunY, X(58), 0, Math.PI * 2); ctx.fill(); ctx.restore();
    SD.hills(ctx, { y: horizon - Y(40), amp: Y(210), color: '#8E97BE', seed: 3, freq: 0.0016, shift: pan * 0.15, yFloor: horizon + 10 });
    SD.mist(ctx, horizon - Y(70), Y(120), 0.5, t);
    SD.hills(ctx, { y: horizon - Y(10), amp: Y(150), color: '#5F7397', seed: 5, freq: 0.0024, shift: pan * 0.3, yFloor: horizon + 10 });
    // a small temple spire on the near ridge
    const tx = X(430) - pan * 0.45, ty = horizon - Y(96);
    G.poly(ctx, [[tx - 26, ty + 60], [tx - 20, ty], [tx - 9, ty - 44], [tx, ty - 78], [tx + 9, ty - 44], [tx + 20, ty], [tx + 26, ty + 60]], { fill: '#3F5273', stroke: null, seed: 21 });
    ctx.save(); ctx.strokeStyle = '#E2A93B'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx, ty - 78); ctx.lineTo(tx, ty - 104); ctx.stroke();
    ctx.fillStyle = '#E8823A'; ctx.beginPath(); ctx.moveTo(tx, ty - 104); ctx.lineTo(tx + 22 + 3 * Math.sin(t * 3), ty - 97); ctx.lineTo(tx, ty - 90); ctx.fill(); ctx.restore();
    SD.mist(ctx, horizon - Y(8), Y(70), 0.55, t + 3);
    SD.hills(ctx, { y: horizon + Y(6), amp: Y(70), color: '#3E5560', seed: 8, freq: 0.004, shift: pan * 0.5, yFloor: horizon + 12 });
    // the river
    SD.sky(ctx, [[0, '#F3C592'], [0.25, '#B9A9B8'], [1, '#3D5578']], 0, horizon, W, H - horizon);
    // the sun's path on the water: shimmering strokes
    for (let i = 0; i < 46; i++) {
      const u = i / 46, yy = horizon + 8 + u * u * (H - horizon), w = X(40 + 250 * u) * (0.6 + 0.4 * Math.sin(t * 1.3 + i * 1.7));
      const xx = sunX + Math.sin(t * 0.7 + i * 2.3) * X(10 + 46 * u);
      ctx.save(); ctx.globalAlpha = (0.75 - 0.5 * u) * clamp(sun * 1.6); ctx.fillStyle = '#FFE9B8';
      ctx.beginPath(); ctx.ellipse(xx, yy, w / 2, Y(2.5 + 5 * u), 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    // slow ripples
    for (let i = 0; i < 26; i++) {
      const u = (i + 0.5) / 26, yy = horizon + 16 + u * (H - horizon), xx = ((i * 397) % 1900) + Math.sin(t * 0.5 + i) * 30 - pan * (0.3 + u);
      ctx.save(); ctx.globalAlpha = 0.16; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2 + 2 * u;
      ctx.beginPath(); ctx.moveTo(X(xx), yy); ctx.quadraticCurveTo(X(xx + 60), yy - 5, X(xx + 130 + 80 * u), yy); ctx.stroke(); ctx.restore();
    }
    return { waterY: horizon, sunX, sunY };
  };
  // a band of river drawn over a wader's legs
  SD.riverFront = (ctx, t, y) => {
    SD.sky(ctx, [[0, 'rgba(96,120,150,0)'], [0.22, 'rgba(84,108,142,0.9)'], [1, '#33486A']], 0, y, G.W, G.H - y);
    for (let i = 0; i < 9; i++) {
      const xx = X(((i * 263) % 1900) + Math.sin(t * 0.6 + i) * 24);
      ctx.save(); ctx.globalAlpha = 0.22; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xx, y + 30 + i * 22); ctx.quadraticCurveTo(xx + 90, y + 22 + i * 22, xx + 210, y + 30 + i * 22); ctx.stroke(); ctx.restore();
    }
  };

  // ---------- Bombay High Court, 1916 (call SD.sepia after the figures) ----------
  SD.court = (ctx, t) => {
    const W = G.W, H = G.H;
    SD.sky(ctx, [[0, '#B79A78'], [1, '#8C6E50']]);
    // three tall Gothic windows
    for (let i = 0; i < 3; i++) {
      const cx = X(520 + i * 440), w = X(190), top = Y(90), bot = Y(560);
      ctx.save(); ctx.fillStyle = '#F6E7C4'; ctx.beginPath(); ctx.moveTo(cx - w / 2, bot); ctx.lineTo(cx - w / 2, top + w * 0.6);
      ctx.quadraticCurveTo(cx - w / 2, top, cx, top - Y(30)); ctx.quadraticCurveTo(cx + w / 2, top, cx + w / 2, top + w * 0.6); ctx.lineTo(cx + w / 2, bot); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#6B5038'; ctx.lineWidth = 7; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, top - Y(30)); ctx.lineTo(cx, bot); ctx.moveTo(cx - w / 2, Y(330)); ctx.lineTo(cx + w / 2, Y(330)); ctx.stroke(); ctx.restore();
      // a shaft of light, slowly breathing
      ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.2 + 0.05 * Math.sin(t * 0.6 + i);
      const g = ctx.createLinearGradient(cx, top, cx - X(260), H); g.addColorStop(0, '#FFF2CC'); g.addColorStop(1, 'rgba(255,242,204,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - w / 2, top + 40); ctx.lineTo(cx + w / 2, top + 40); ctx.lineTo(cx + w / 2 - X(240), H); ctx.lineTo(cx - w / 2 - X(420), H); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    // panelled wall and the judge's high bench
    rect(ctx, 0, Y(560), W, Y(120), '#6F5239');
    rect(ctx, X(640), Y(430), X(640), Y(250), '#4E3826');
    rect(ctx, X(610), Y(410), X(700), Y(34), '#3B2A1C');
    rect(ctx, 0, Y(680), W, Y(400), '#5A412D'); // floor
    return { benchX: X(960), benchY: Y(410), dockX: X(330), dockY: Y(820), barX: X(1420), barY: Y(960) };
  };
  // the dock rail in front of the accused, and the gallery's heads at the bottom of the frame
  SD.courtFront = (ctx) => {
    const W = G.W;
    rect(ctx, X(170), Y(700), X(330), Y(26), '#2F2015');
    for (let i = 0; i < 7; i++) rect(ctx, X(182 + i * 50), Y(726), X(14), Y(150), '#2F2015');
    rect(ctx, X(170), Y(872), X(330), Y(22), '#2F2015');
    for (let i = 0; i < 15; i++) { // gallery: plain dark heads and shoulders, backs to us
      const cx = X(60 + i * 130 + ((i * 37) % 40)), cy = Y(1010 + ((i * 53) % 34));
      ctx.save(); ctx.fillStyle = '#231710'; ctx.beginPath(); ctx.ellipse(cx, cy, X(40), Y(46), 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx, cy + Y(96), X(86), Y(66), 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    void W;
  };

  // ---------- chai stall near Churchgate, dusk ----------
  SD.chai = (ctx, t, { train = 0.5 } = {}) => {
    const W = G.W, H = G.H, ground = Y(820);
    SD.sky(ctx, [[0, '#3A3566'], [0.45, '#C56B6A'], [0.8, '#F5B56B'], [1, '#F9D79C']], 0, 0, W, ground);
    // station building: long arcade with two domes, as a soft silhouette
    const b = '#5B4A68';
    rect(ctx, X(80), Y(470), X(1500), Y(200), b);
    for (const dx of [520, 1120]) {
      ctx.save(); ctx.fillStyle = b; ctx.beginPath(); ctx.ellipse(X(dx), Y(470), X(120), Y(120), 0, Math.PI, 0); ctx.fill();
      ctx.fillRect(X(dx) - 5, Y(300), 10, Y(60)); ctx.restore();
    }
    for (let i = 0; i < 16; i++) { // lit arches
      ctx.save(); ctx.fillStyle = 'rgba(255,214,140,0.85)'; const ax = X(130 + i * 90);
      ctx.beginPath(); ctx.moveTo(ax, Y(650)); ctx.lineTo(ax, Y(560)); ctx.quadraticCurveTo(ax + X(26), Y(520), ax + X(52), Y(560)); ctx.lineTo(ax + X(52), Y(650)); ctx.fill(); ctx.restore();
    }
    // the local train: cream and maroon, sliding by
    const tx = lerp(W + 100, -X(2300), train);
    ctx.save(); ctx.translate(tx, 0);
    for (let c = 0; c < 5; c++) {
      const cx = c * X(450);
      rect(ctx, cx, Y(640), X(438), Y(120), '#E9DFC2', { seed: 60 + c });
      rect(ctx, cx, Y(712), X(438), Y(50), '#7C2F2B', { seed: 70 + c });
      for (let w = 0; w < 6; w++) { ctx.fillStyle = '#F7D78A'; ctx.globalAlpha = 0.9; ctx.fillRect(cx + X(26 + w * 68), Y(660), X(46), Y(40)); }
      ctx.globalAlpha = 1;
    }
    ctx.restore();
    rect(ctx, 0, Y(760), W, Y(70), '#4A4350'); // platform wall
    rect(ctx, 0, ground, W, H - ground, '#6E5B52'); // pavement
    // the stall: a cart with a striped awning, a kettle, glasses and a hanging lamp
    const sx = X(1380), sy = ground;
    rect(ctx, sx - X(200), sy - Y(210), X(400), Y(200), '#8A5A3A', { stroke: '#2A2320', lw: 3 });
    rect(ctx, sx - X(215), sy - Y(232), X(430), Y(26), '#5E3B24');
    for (const px of [-190, 190]) rect(ctx, sx + X(px) - 6, sy - Y(520), 12, Y(300), '#5E3B24');
    for (let i = 0; i < 8; i++) G.poly(ctx, [[sx - X(240) + i * X(60), sy - Y(520)], [sx - X(180) + i * X(60), sy - Y(520)], [sx - X(190) + i * X(60), sy - Y(440)], [sx - X(250) + i * X(60), sy - Y(440)]], { fill: i % 2 ? '#E9DFC2' : '#B5533C', stroke: null, seed: 80 + i });
    // kettle
    G.ellipse(ctx, sx - X(90), sy - Y(276), X(52), Y(44), { fill: '#C9CED2', stroke: '#2A2320', lw: 3, seed: 90 });
    ctx.save(); ctx.strokeStyle = '#2A2320'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(sx - X(44), sy - Y(286)); ctx.quadraticCurveTo(sx - X(10), sy - Y(300), sx - X(4), sy - Y(330)); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 6; i++) { // steam
      const u = (t * 0.25 + i / 6) % 1, px = sx - X(4) + Math.sin(u * 6 + i) * X(26) * u, py = sy - Y(336) - u * Y(220);
      ctx.save(); ctx.globalAlpha = 0.34 * (1 - u); ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(px, py, X(16 + 46 * u), 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    for (let i = 0; i < 5; i++) { // tea glasses in a row
      const gx = sx + X(30 + i * 34), gy = sy - Y(238);
      ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(gx, gy - Y(44), X(22), Y(44)); ctx.fillStyle = '#B5703A'; ctx.fillRect(gx + 2, gy - Y(30), X(22) - 4, Y(30)); ctx.restore();
    }
    // lamp
    ctx.save(); ctx.strokeStyle = '#2A2320'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx + X(120), sy - Y(440)); ctx.lineTo(sx + X(120), sy - Y(390)); ctx.stroke();
    ctx.fillStyle = '#FFE9A8'; ctx.beginPath(); ctx.arc(sx + X(120), sy - Y(372), X(20), 0, Math.PI * 2); ctx.fill(); ctx.restore();
    SD.glow(ctx, sx + X(120), sy - Y(372), X(520), 'rgba(255,205,120,0.9)', 0.55 + 0.04 * Math.sin(t * 9));
    return { ground, stallX: sx, benchX: X(760) };
  };
  // a small table with two glasses, between two people
  SD.chaiTable = (ctx, x, y) => {
    rect(ctx, x - X(90), y - Y(150), X(180), Y(16), '#5E3B24');
    rect(ctx, x - 7, y - Y(134), 14, Y(134), '#5E3B24');
    for (const dx of [-40, 26]) {
      ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(x + X(dx), y - Y(202), X(24), Y(52)); ctx.fillStyle = '#B5703A'; ctx.fillRect(x + X(dx) + 2, y - Y(186), X(24) - 4, Y(36)); ctx.restore();
    }
  };

  // ---------- parliament seats: a half-circle of dots. `filled` seats are coloured, `gold` ones glow ----------
  SD.seats = (ctx, cx, cy, r, { total = 543, left = 0, right = 0, gold = 0, colors = ['#8FA7B5', '#9A8F7E'], empty = '#E6DFD0' } = {}) => {
    const rows = 9, weights = [];
    let sum = 0;
    for (let i = 0; i < rows; i++) { weights[i] = 0.52 + i * 0.12; sum += weights[i]; }
    const seats = [];
    for (let i = 0; i < rows; i++) {
      const cnt = Math.round((weights[i] / sum) * total), rr = r * (0.42 + (0.58 * i) / (rows - 1));
      for (let j = 0; j < cnt; j++) { const u = (j + 0.5) / cnt, a = Math.PI * (1 - u); seats.push({ u, x: cx + rr * Math.cos(a), y: cy - rr * Math.sin(a) }); }
    }
    seats.sort((p, q) => p.u - q.u); // left end of the arc first
    const n = seats.length, mid = Math.floor(n / 2), g0 = mid - Math.floor(gold / 2);
    seats.forEach((s, i) => {
      const isGold = i >= g0 && i < g0 + gold;
      const fill = isGold ? '#E2A93B' : i < left ? colors[0] : i >= n - right ? colors[1] : empty;
      ctx.save(); ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(s.x, s.y, r * (isGold ? 0.026 : 0.0125), 0, Math.PI * 2); ctx.fill();
      if (isGold) { ctx.strokeStyle = '#2A2320'; ctx.lineWidth = 2.5; ctx.stroke(); }
      ctx.restore();
    });
  };

  // ---------- war room: a dark table map with a grid ----------
  SD.warTable = (ctx, t) => {
    const W = G.W, H = G.H;
    SD.sky(ctx, [[0, '#0E1A2B'], [1, '#16283C']]);
    ctx.save(); ctx.strokeStyle = 'rgba(120,190,200,0.10)'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += X(60)) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += Y(60)) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.restore();
    void t;
  };
  // a countdown clock, hh:mm:ss
  SD.clock = (ctx, secs, x, y, size = 86) => {
    const s = Math.max(0, Math.round(secs)), p = (n) => String(n).padStart(2, '0');
    const str = `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
    G.text(ctx, str, x, y, { fam: 'Inter, sans-serif', weight: 800, size, color: '#F2B84B', align: 'center', boil: 0 });
  };
  SD.X = X; SD.Y = Y; SD.rect = rect;
})();
