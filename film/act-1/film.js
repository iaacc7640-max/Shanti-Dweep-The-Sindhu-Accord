// THE FILM — Act I: the 1916 courtroom, the map that cracks, Chiplun, the chamber in Fort,
// the lecture hall, and the chai stall where the two lawyers found their movement.
(function () {
  const G = globalThis.G, U = globalThis.U, S = globalThis.SCORE, SD = globalThis.SD, Data = globalThis.Data;
  const W = G.W, H = G.H, X = SD.X, Y = SD.Y, { ramp, lerp, clamp, rect } = SD;
  const ev = S.ev;
  const INK = SD.PAL.ink;
  const pop = (t, t0, d = 0.3) => U.ease.outBack(clamp((t - t0) / d), 2.2);

  // ---------- sets used only in this act ----------
  function courtOutside(ctx, t) {
    SD.sky(ctx, [[0, '#C9B48C'], [1, '#E8D9B4']]);
    const base = Y(860);
    rect(ctx, X(260), Y(430), X(1400), base - Y(430), '#8C7355'); // the long wings
    rect(ctx, X(820), Y(250), X(280), base - Y(250), '#7C6548'); // the central tower
    G.poly(ctx, [[X(800), Y(250)], [X(960), Y(70)], [X(1120), Y(250)]], { fill: '#5E4A34', stroke: null, seed: 5 });
    for (const tx of [330, 1590]) { rect(ctx, X(tx - 50), Y(340), X(100), base - Y(340), '#7C6548'); G.poly(ctx, [[X(tx - 62), Y(340)], [X(tx), Y(230)], [X(tx + 62), Y(340)]], { fill: '#5E4A34', stroke: null, seed: tx }); }
    for (let r = 0; r < 2; r++) for (let i = 0; i < 13; i++) { // rows of pointed windows
      const ax = X(300 + i * 104), ay = Y(520 + r * 170);
      if (ax > X(800) && ax < X(1100)) continue;
      ctx.save(); ctx.fillStyle = '#3F3020'; ctx.beginPath(); ctx.moveTo(ax, ay + Y(110)); ctx.lineTo(ax, ay + Y(30)); ctx.quadraticCurveTo(ax + X(24), ay - Y(14), ax + X(48), ay + Y(30)); ctx.lineTo(ax + X(48), ay + Y(110)); ctx.fill(); ctx.restore();
    }
    ctx.save(); ctx.fillStyle = '#3F3020'; ctx.beginPath(); ctx.moveTo(X(900), base); ctx.lineTo(X(900), Y(690)); ctx.quadraticCurveTo(X(960), Y(600), X(1020), Y(690)); ctx.lineTo(X(1020), base); ctx.fill(); ctx.restore();
    rect(ctx, 0, base, W, H - base, '#A58B66');
    // a horse cart crossing, far away
    const cx = lerp(X(-200), X(2100), ((t * 0.035) % 1));
    ctx.save(); ctx.translate(cx, base + Y(40)); ctx.fillStyle = '#2B1D12';
    ctx.fillRect(-70, -70, 100, 46); ctx.beginPath(); ctx.arc(-20, -8, 26, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(86, -52, 46, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(112, -92, 12, 40); ctx.beginPath(); ctx.ellipse(126, -96, 18, 11, -0.5, 0, Math.PI * 2); ctx.fill();
    for (const lx of [58, 76, 100, 116]) ctx.fillRect(lx, -36, 6, 36 + 4 * Math.sin(t * 8 + lx));
    ctx.restore();
  }

  function palm(ctx, x, y, h, lean, t, seed) {
    ctx.save(); ctx.strokeStyle = '#5B4630'; ctx.lineWidth = X(16); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + lean * 0.3, y - h * 0.6, x + lean, y - h); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 7; i++) {
      const a = -Math.PI / 2 + (i - 3) * 0.52 + 0.05 * Math.sin(t * 0.8 + i + seed), L = X(150);
      const ex = x + lean + Math.cos(a) * L, ey = y - h + Math.sin(a) * L * 0.7 + Y(40);
      ctx.save(); ctx.strokeStyle = '#3E6B4A'; ctx.lineWidth = X(14); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x + lean, y - h); ctx.quadraticCurveTo(x + lean + Math.cos(a) * L * 0.6, y - h + Math.sin(a) * L * 0.9, ex, ey); ctx.stroke(); ctx.restore();
    }
  }
  // the Khare house in Chiplun: laterite walls, a tiled roof, a verandah, a tulsi planter
  function house(ctx, t, { burnt = false } = {}) {
    const ground = Y(820);
    if (burnt) SD.sky(ctx, [[0, '#2A2740'], [0.6, '#6A4A52'], [1, '#B8735A']], 0, 0, W, ground);
    else SD.sky(ctx, [[0, '#8EC1D8'], [0.7, '#DCEBDD'], [1, '#F3E7C6']], 0, 0, W, ground);
    SD.hills(ctx, { y: ground - Y(60), amp: Y(190), color: burnt ? '#3B3A4C' : '#7FA58A', seed: 13, freq: 0.0018, yFloor: ground + 4 });
    palm(ctx, X(300), ground, Y(520), X(50), t, 1); palm(ctx, X(1650), ground, Y(470), -X(40), t, 2); palm(ctx, X(1500), ground, Y(380), X(30), t, 3);
    rect(ctx, 0, ground, W, H - ground, burnt ? '#3A3230' : '#B98E5E');
    const hx = X(620), hw = X(700), wallTop = Y(520);
    if (!burnt) {
      rect(ctx, hx, wallTop, hw, ground - wallTop, '#C9774F', { stroke: INK, lw: 2 });
      G.poly(ctx, [[hx - X(70), wallTop + Y(10)], [hx + hw / 2, Y(330)], [hx + hw + X(70), wallTop + Y(10)]], { fill: '#8E3B2B', stroke: INK, lw: 2, seed: 31 });
      for (let i = 0; i < 9; i++) { ctx.save(); ctx.strokeStyle = 'rgba(60,20,10,0.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx - X(40) + i * X(98), wallTop + Y(8)); ctx.lineTo(hx + hw / 2, Y(338)); ctx.stroke(); ctx.restore(); }
      rect(ctx, hx - X(40), Y(640), hw + X(80), Y(18), '#6B4A30'); // verandah beam
      for (let i = 0; i < 5; i++) rect(ctx, hx - X(30) + i * X(186), Y(650), X(18), ground - Y(650), '#6B4A30');
      rect(ctx, hx + hw / 2 - X(50), Y(680), X(100), ground - Y(680), '#4A3222'); // door
      for (const wx of [0.2, 0.78]) rect(ctx, hx + hw * wx - X(40), Y(690), X(80), Y(70), '#3B2A1E');
      rect(ctx, X(480), ground - Y(86), X(64), Y(86), '#D8C9A6', { stroke: INK, lw: 2 }); // tulsi planter
      for (let i = 0; i < 5; i++) { ctx.save(); ctx.strokeStyle = '#3E7B4A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(512), ground - Y(86)); ctx.lineTo(X(512) + (i - 2) * X(14), ground - Y(150) - (i % 2) * Y(14)); ctx.stroke(); ctx.restore(); }
    } else {
      // the shell: broken walls, no roof, charred beams; embers only
      G.poly(ctx, [[hx, ground], [hx, wallTop + Y(60)], [hx + X(110), wallTop + Y(10)], [hx + X(190), wallTop + Y(120)], [hx + X(330), wallTop + Y(90)], [hx + X(420), wallTop + Y(180)], [hx + X(540), wallTop + Y(70)], [hx + hw, wallTop + Y(140)], [hx + hw, ground]], { fill: '#2A2222', stroke: null, seed: 41 });
      ctx.save(); ctx.strokeStyle = '#1A1414'; ctx.lineWidth = X(16); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(hx + X(60), wallTop + Y(40)); ctx.lineTo(hx + X(360), Y(390)); ctx.moveTo(hx + X(640), wallTop + Y(130)); ctx.lineTo(hx + X(420), Y(430)); ctx.stroke(); ctx.restore();
      rect(ctx, hx + hw / 2 - X(50), Y(680), X(100), ground - Y(680), '#120E0E');
      for (let i = 0; i < 30; i++) { // embers
        const ex = hx + G.rnd(i, 3) * hw, ey = ground - G.rnd(i, 7) * Y(240), a = 0.5 + 0.5 * Math.sin(t * (1.5 + G.rnd(i, 9) * 3) + i);
        SD.glow(ctx, ex, ey, X(22), 'rgba(255,140,60,0.9)', 0.55 * a);
      }
      for (let i = 0; i < 5; i++) { // thin smoke
        const u = (t * 0.06 + i / 5) % 1, sx = hx + X(120 + i * 120) + Math.sin(u * 5 + i) * X(40);
        ctx.save(); ctx.globalAlpha = 0.22 * (1 - u); ctx.fillStyle = '#C9C0C4'; ctx.beginPath(); ctx.arc(sx, wallTop - u * Y(380), X(40 + 90 * u), 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
    }
    return { ground };
  }
  // a framed portrait of an ancestor: a plain bust, no likeness; `kind` varies the headwear
  function portrait(ctx, x, y, kind, label, a) {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y); ctx.scale(0.86 + 0.14 * clamp(a), 0.86 + 0.14 * clamp(a));
    ctx.fillStyle = '#5E3B24'; ctx.fillRect(-X(92), -Y(118), X(184), Y(236)); ctx.fillStyle = '#E9DFC2'; ctx.fillRect(-X(78), -Y(104), X(156), Y(208));
    ctx.fillStyle = '#6E5A48'; ctx.beginPath(); ctx.ellipse(0, Y(84), X(66), Y(60), 0, Math.PI, 0); ctx.fill(); // shoulders
    ctx.fillStyle = '#B98A62'; ctx.beginPath(); ctx.ellipse(0, -Y(8), X(34), Y(40), 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = kind === 3 ? '#1B1614' : '#3A2A22';
    if (kind === 0) { ctx.beginPath(); ctx.ellipse(0, -Y(46), X(46), Y(24), 0, 0, Math.PI * 2); ctx.fill(); } // turban
    else if (kind === 1) { ctx.fillRect(-X(34), -Y(62), X(68), Y(22)); } // a flat cap
    else if (kind === 2) { ctx.beginPath(); ctx.ellipse(0, -Y(40), X(36), Y(16), 0, Math.PI, 0); ctx.fill(); } // short hair
    else { ctx.beginPath(); ctx.ellipse(0, -Y(38), X(37), Y(20), 0, Math.PI, 0); ctx.fill(); }
    ctx.restore();
    SD.hindi(ctx, label, x, y + Y(160), { size: 30, weight: 400, color: '#3A2A1E', alpha: clamp(a) });
  }

  function college(ctx, t) {
    SD.sky(ctx, [[0, '#9CC6DA'], [1, '#E9EBD8']]);
    rect(ctx, X(120), Y(180), X(1680), Y(560), '#B7A083');
    rect(ctx, X(120), Y(160), X(1680), Y(40), '#8C7355');
    for (let i = 0; i < 7; i++) { // an arcade of tall arches
      const ax = X(200 + i * 230);
      ctx.save(); ctx.fillStyle = '#5E4A38'; ctx.beginPath(); ctx.moveTo(ax, Y(740)); ctx.lineTo(ax, Y(380)); ctx.quadraticCurveTo(ax + X(75), Y(250), ax + X(150), Y(380)); ctx.lineTo(ax + X(150), Y(740)); ctx.fill(); ctx.restore();
    }
    for (let i = 0; i < 6; i++) rect(ctx, X(60) - i * X(8), Y(740) + i * Y(46), W - X(120) + i * X(16), Y(46), i % 2 ? '#CDBA9C' : '#BBA688'); // steps
    void t;
  }

  function chamber(ctx, t) {
    SD.sky(ctx, [[0, '#6B5140'], [1, '#8A6A50']]);
    for (let r = 0; r < 5; r++) { // shelves of law books to the ceiling
      rect(ctx, X(60), Y(60 + r * 130), X(1180), Y(120), '#3F2C20');
      for (let i = 0; i < 44; i++) {
        const bw = X(18 + G.rnd(r, i) * 12), bh = Y(84 + G.rnd(i, r, 2) * 28), bx = X(70 + i * 26.4);
        ctx.fillStyle = ['#7C2F2B', '#2F4A3F', '#5A4A2A', '#27305C', '#6B3A22'][Math.floor(G.rnd(i, r, 5) * 5)];
        ctx.fillRect(bx, Y(60 + r * 130) + Y(116) - bh, bw, bh);
        ctx.fillStyle = 'rgba(226,169,59,0.7)'; ctx.fillRect(bx, Y(60 + r * 130) + Y(116) - bh * 0.72, bw, 3);
      }
    }
    rect(ctx, 0, Y(760), W, Y(320), '#4A3528'); // floor
    // the small picture of Surya on the wall
    const sx = X(1480), sy = Y(250);
    rect(ctx, sx - X(80), sy - Y(100), X(160), Y(200), '#5E3B24'); rect(ctx, sx - X(66), sy - Y(86), X(132), Y(172), '#F3E2B8');
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2 + t * 0.05; ctx.save(); ctx.strokeStyle = '#E2832B'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(sx + Math.cos(a) * X(34), sy + Math.sin(a) * X(34)); ctx.lineTo(sx + Math.cos(a) * X(54), sy + Math.sin(a) * X(54)); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.fillStyle = '#E8A03B'; ctx.beginPath(); ctx.arc(sx, sy, X(28), 0, Math.PI * 2); ctx.fill(); ctx.restore();
    // ceiling fan
    ctx.save(); ctx.translate(X(1250), Y(70)); ctx.fillStyle = '#2A2320'; ctx.fillRect(-6, -70, 12, 70); ctx.scale(1, 0.24); ctx.rotate(t * 6);
    for (let i = 0; i < 3; i++) { ctx.rotate((Math.PI * 2) / 3); ctx.fillStyle = 'rgba(50,40,34,0.75)'; ctx.fillRect(0, -16, X(210), 32); }
    ctx.restore();
    SD.glow(ctx, X(1050), Y(600), X(700), 'rgba(255,205,130,0.9)', 0.4); // the desk lamp's pool of light
  }
  function desk(ctx, t) {
    rect(ctx, X(540), Y(770), X(1100), Y(40), '#6B4A30', { stroke: INK, lw: 2 });
    rect(ctx, X(580), Y(810), X(1020), Y(270), '#55392A');
    // typewriter
    rect(ctx, X(1240), Y(690), X(210), Y(82), '#2F3438', { stroke: INK, lw: 2 }); rect(ctx, X(1260), Y(650), X(170), Y(44), '#F4EDE0');
    // papers and a lamp
    for (let i = 0; i < 3; i++) rect(ctx, X(700 + i * 16), Y(752 - i * 6), X(190), Y(18), '#F4EDE0', { stroke: 'rgba(0,0,0,0.3)', lw: 1, seed: 90 + i });
    ctx.save(); ctx.strokeStyle = '#2A2320'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(X(1560), Y(770)); ctx.lineTo(X(1560), Y(640)); ctx.lineTo(X(1500), Y(600)); ctx.stroke();
    ctx.fillStyle = '#2F6F73'; ctx.beginPath(); ctx.moveTo(X(1440), Y(640)); ctx.lineTo(X(1520), Y(570)); ctx.lineTo(X(1560), Y(620)); ctx.closePath(); ctx.fill(); ctx.restore();
    void t;
  }

  function lectureHall(ctx) {
    SD.sky(ctx, [[0, '#D9CDB4'], [1, '#C4B397']]);
    rect(ctx, X(160), Y(170), X(820), Y(330), '#2F4A3F', { stroke: '#5E3B24', lw: 8 }); // blackboard
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.strokeStyle = 'rgba(240,240,230,0.5)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(220), Y(240 + i * 60)); ctx.lineTo(X(520 + G.rnd(i, 4) * 380), Y(240 + i * 60)); ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 3; i++) { const wx = X(1160 + i * 260); rect(ctx, wx, Y(150), X(170), Y(380), '#EAF1EA', { stroke: '#8C7355', lw: 6 }); }
    rect(ctx, 0, Y(640), W, Y(440), '#9C8466');
    rect(ctx, X(330), Y(520), X(170), Y(200), '#6B4A30', { stroke: INK, lw: 2 }); // lectern
    rect(ctx, X(310), Y(506), X(210), Y(24), '#55392A');
  }
  function lectureFront(ctx) {
    for (let r = 0; r < 2; r++) { // two rows of students, backs to us, behind long desks
      const y = Y(900 + r * 130);
      for (let i = 0; i < 9; i++) { const x = X(760 + i * 132 + r * 60); if (r === 0 && i === 6) continue; SD.silHead(ctx, x, y, 1.0 + r * 0.25, r ? '#2B211B' : '#3A2E26'); }
      rect(ctx, X(680), y + Y(30), X(1300), Y(30), r ? '#3F2C20' : '#55392A');
    }
  }

  function corridor(ctx) {
    SD.sky(ctx, [[0, '#CDBE9F'], [1, '#B9A683']]);
    for (let i = 0; i < 6; i++) { // arches receding toward the light
      const k = 1 - i * 0.14, cx = W / 2, w = X(1500) * k, h = Y(820) * k, top = Y(540) - h * 0.52;
      ctx.save(); ctx.fillStyle = i === 5 ? '#F6ECCB' : `rgba(${140 + i * 16},${118 + i * 16},${90 + i * 16},1)`;
      ctx.beginPath(); ctx.moveTo(cx - w / 2, Y(900)); ctx.lineTo(cx - w / 2, top + h * 0.3); ctx.quadraticCurveTo(cx, top - h * 0.16, cx + w / 2, top + h * 0.3); ctx.lineTo(cx + w / 2, Y(900)); ctx.fill(); ctx.restore();
    }
    rect(ctx, 0, Y(860), W, Y(220), '#8C7355');
    SD.glow(ctx, W / 2, Y(520), X(700), 'rgba(255,240,200,0.9)', 0.4);
  }

  // ---------- small props ----------
  const glass = (ctx, x, y, s = 1) => { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(x - 13 * s, y - 56 * s, 26 * s, 56 * s); ctx.fillStyle = '#B5703A'; ctx.fillRect(x - 11 * s, y - 40 * s, 22 * s, 40 * s); ctx.restore(); };
  // an icon card for one of the four honoured names: an emblem, not a face
  function emblem(ctx, kind, x, y, t, t0, label, sub) {
    const k = pop(t, t0, 0.32); if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate([-0.03, 0.02, -0.02, 0.03][kind]);
    G.tornPaper(ctx, -X(190), -Y(230), X(380), Y(400), { fill: '#FBF5E6', seed: 300 + kind, shadow: true });
    ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (kind === 0) { // a judge's gavel
      ctx.save(); ctx.rotate(-0.6); ctx.fillStyle = '#6B4A30'; ctx.fillRect(-X(70), -Y(96), X(140), Y(64)); ctx.fillRect(-X(9), -Y(40), X(18), Y(150)); ctx.restore();
      ctx.fillStyle = '#4A3222'; ctx.fillRect(-X(90), Y(70), X(180), Y(24));
    } else if (kind === 1) { // a rocket
      ctx.fillStyle = '#E9EEF2'; ctx.beginPath(); ctx.moveTo(0, -Y(190)); ctx.quadraticCurveTo(X(46), -Y(110), X(34), Y(40)); ctx.lineTo(-X(34), Y(40)); ctx.quadraticCurveTo(-X(46), -Y(110), 0, -Y(190)); ctx.fill(); ctx.lineWidth = 4; ctx.stroke();
      ctx.fillStyle = '#E8823A'; ctx.beginPath(); ctx.moveTo(-X(34), Y(40)); ctx.lineTo(-X(70), Y(90)); ctx.lineTo(-X(34), Y(70)); ctx.fill(); ctx.beginPath(); ctx.moveTo(X(34), Y(40)); ctx.lineTo(X(70), Y(90)); ctx.lineTo(X(34), Y(70)); ctx.fill();
      ctx.fillStyle = '#F2B84B'; ctx.beginPath(); ctx.moveTo(-X(20), Y(46)); ctx.lineTo(0, Y(110) + Y(14) * Math.sin(t * 20)); ctx.lineTo(X(20), Y(46)); ctx.fill();
      ctx.fillStyle = '#2F6F73'; ctx.beginPath(); ctx.arc(0, -Y(70), X(15), 0, Math.PI * 2); ctx.fill();
    } else if (kind === 2) { // a jeep carrying a recoilless gun
      ctx.fillStyle = '#5B6B4A'; ctx.fillRect(-X(110), -Y(40), X(220), Y(70)); ctx.fillRect(-X(110), -Y(86), X(90), Y(50));
      ctx.fillStyle = '#2A2320'; ctx.beginPath(); ctx.arc(-X(66), Y(40), X(30), 0, Math.PI * 2); ctx.arc(X(66), Y(40), X(30), 0, Math.PI * 2); ctx.fill();
      ctx.save(); ctx.translate(X(10), -Y(74)); ctx.rotate(-0.16); ctx.fillStyle = '#3A4630'; ctx.fillRect(-X(40), -Y(12), X(190), Y(24)); ctx.restore();
    } else { // a pair of tabla
      ctx.fillStyle = '#8A5A3A'; ctx.beginPath(); ctx.ellipse(-X(72), Y(20), X(62), Y(84), 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#C9CED2'; ctx.beginPath(); ctx.ellipse(X(76), Y(30), X(74), Y(74), 0, 0, Math.PI * 2); ctx.fill();
      for (const [cx, rx] of [[-72, 56], [76, 68]]) { ctx.fillStyle = '#F1E7D0'; ctx.beginPath(); ctx.ellipse(X(cx), -Y(50), X(rx), Y(20), 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#1B1614'; ctx.beginPath(); ctx.ellipse(X(cx), -Y(50), X(rx * 0.42), Y(9), 0, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();
    const a = clamp((t - t0 - 0.15) / 0.3);
    SD.hindi(ctx, label, x, y + Y(240), { size: 40, color: INK, alpha: a });
    SD.latin(ctx, sub, x, y + Y(286), { size: 26, weight: 400, color: '#6B5A4A', alpha: a });
  }
  // a Persian manuscript page and a Javanese shadow puppet, drawn in the kettle's steam
  function steamPictures(ctx, t) {
    const a1 = clamp((t - ev.firdowsi) / 0.8) * (1 - clamp((t - ev.java - 2.6) / 1)), a2 = clamp((t - ev.java) / 0.8) * (1 - clamp((t - ev.java - 5.2) / 1));
    if (a1 > 0) {
      ctx.save(); ctx.globalAlpha = 0.92 * a1; ctx.translate(X(640), Y(226) - 10 * a1); ctx.scale(0.7, 0.7); ctx.rotate(-0.04);
      ctx.fillStyle = '#F6ECCB'; ctx.fillRect(-X(150), -Y(190), X(300), Y(380)); ctx.strokeStyle = '#2F6F73'; ctx.lineWidth = 8; ctx.strokeRect(-X(134), -Y(174), X(268), Y(348));
      ctx.strokeStyle = '#E2A93B'; ctx.lineWidth = 3; ctx.strokeRect(-X(122), -Y(162), X(244), Y(324));
      for (let i = 0; i < 9; i++) { ctx.strokeStyle = '#3A2A1E'; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k < 2; k++) { const x0 = -X(104) + k * X(112); ctx.moveTo(x0, -Y(130) + i * Y(32)); ctx.bezierCurveTo(x0 + X(20), -Y(142) + i * Y(32), x0 + X(60), -Y(118) + i * Y(32), x0 + X(92), -Y(132) + i * Y(32)); } ctx.stroke(); }
      ctx.restore();
      SD.hindi(ctx, 'फ़ारस · फ़िरदौसी', X(640), Y(412), { size: 38, color: '#FFF4D8', stroke: 'rgba(40,20,30,0.7)', strokeW: 8, alpha: a1 });
    }
    if (a2 > 0) {
      ctx.save(); ctx.globalAlpha = 0.92 * a2; ctx.translate(X(1000), Y(206) - 10 * a2); ctx.scale(0.66, 0.66); ctx.fillStyle = '#2B1D12'; ctx.strokeStyle = '#2B1D12'; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.ellipse(0, -Y(120), X(34), Y(44), 0.2, 0, Math.PI * 2); ctx.fill(); // head with a long nose
      ctx.beginPath(); ctx.moveTo(X(26), -Y(126)); ctx.lineTo(X(84), -Y(110)); ctx.lineTo(X(26), -Y(100)); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-X(30), -Y(150)); ctx.quadraticCurveTo(-X(70), -Y(240), -X(6), -Y(210)); ctx.quadraticCurveTo(X(30), -Y(250), X(20), -Y(160)); ctx.fill(); // crown
      ctx.beginPath(); ctx.moveTo(-X(40), -Y(80)); ctx.lineTo(X(40), -Y(80)); ctx.lineTo(X(26), Y(60)); ctx.lineTo(X(70), Y(190)); ctx.lineTo(-X(70), Y(190)); ctx.lineTo(-X(26), Y(60)); ctx.closePath(); ctx.fill(); // body and skirt
      ctx.lineWidth = 9; const sw = 0.12 * Math.sin(t * 1.4);
      ctx.beginPath(); ctx.moveTo(X(36), -Y(70)); ctx.lineTo(X(120), -Y(10) + sw * 80); ctx.lineTo(X(180), -Y(90) + sw * 160); ctx.moveTo(-X(36), -Y(70)); ctx.lineTo(-X(120), Y(10)); ctx.lineTo(-X(150), Y(110)); ctx.stroke();
      ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, Y(190)); ctx.lineTo(0, Y(290)); ctx.stroke();
      ctx.restore();
      SD.hindi(ctx, 'जावा · रामायण', X(1000), Y(452), { size: 38, color: '#FFF4D8', stroke: 'rgba(40,20,30,0.7)', strokeW: 8, alpha: a2 });
    }
  }

  // ---------- the people ----------
  const B = (ctx, s, o) => SD.person(ctx, 'bhaskarYoung', { mouth: s.mouth('B'), ...o });
  const F = (ctx, s, o) => SD.person(ctx, 'fatimaYoung', { mouth: s.talking('F') ? s.mouth('F') : 'smile', ...o });
  const map = Data.map({ region: [58, 5, 100, 39], x: X(260), y: Y(40), w: X(1400), h: Y(1000) });

  SD.stage({
    cuts: ['1-2', '1-3', '1-5', '1-13', '1-14'],
    shots: {
      '1-1'(ctx, t, s) {
        SD.cam(ctx, { zoom: 1.12, dy: lerp(Y(50), -Y(50), s.u) }, () => courtOutside(ctx, t));
        SD.sepia(ctx);
        SD.slug(ctx, 'Bombay, 1916', { alpha: ramp(s.lt, 0.6, 1.4) });
      },
      '1-2'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1, 1.1, s.u), fx: X(500), fy: Y(600) }, () => {
          const c = SD.court(ctx, t);
          SD.silJudge(ctx, c.benchX, c.benchY, 1.0); SD.silTilak(ctx, c.dockX, c.dockY + Y(60), 1.05); SD.courtFront(ctx);
        });
        SD.sepia(ctx);
        SD.slug(ctx, 'Bombay High Court, 1916');
      },
      '1-3'(ctx, t, s) {
        const up = ramp(t, ev.rise, ev.rise + 1.1);
        SD.cam(ctx, { zoom: lerp(1.04, 1.12, s.u), fx: X(1300), fy: Y(560) }, () => {
          const c = SD.court(ctx, t);
          SD.silJudge(ctx, c.benchX, c.benchY, 1.0); SD.silTilak(ctx, c.dockX, c.dockY + Y(60), 1.05); SD.courtFront(ctx);
          SD.silJinnah(ctx, c.barX, c.barY + lerp(Y(330), 0, up), 1.5);
        });
        SD.sepia(ctx);
      },
      // undivided India in ink; a crack runs along the line of 1947
      '1-4'(ctx, t, s) {
        G.bg(ctx, '#EADBB8');
        const land = '#C9A873';
        for (const c of ['Pakistan', 'Bangladesh', 'India']) SD.fillCountry(ctx, map, c, { fill: land, stroke: '#4A3520', lw: 6 });
        for (const c of ['Pakistan', 'Bangladesh', 'India']) SD.fillCountry(ctx, map, c, { fill: land }); // cover the inner borders
        const k = clamp((t - ev.crack) / 1.6);
        if (k > 0) for (const name of ['Pakistan', 'Bangladesh']) { // the crack grows along the new borders
          const pts = SD.outline(map, name), n = Math.floor(pts.length * k);
          ctx.save(); ctx.strokeStyle = '#2B1D12'; ctx.lineWidth = 5 + 3 * k; ctx.lineJoin = 'round'; ctx.beginPath();
          for (let i = 0; i < n; i++) { const [x, y] = pts[i]; const j = (G.rnd(i, 3) - 0.5) * 6; if (i) ctx.lineTo(x + j, y - j); else ctx.moveTo(x, y); }
          ctx.stroke(); ctx.restore();
        }
        // India is laid back on top, so no line is ever drawn inside its Survey of India outline
        if (k > 0) SD.fillCountry(ctx, map, 'India', { fill: land });
        SD.sepia(ctx, 0.85);
        const shake = k > 0 && k < 0.3 ? Math.sin(t * 90) * 6 * (1 - k / 0.3) : 0; void shake;
        SD.slug(ctx, k > 0.5 ? '1947' : 'India, 1916', { color: '#FFF4DC' });
      },
      // the two nations drift apart
      '1-5'(ctx, t, s) {
        G.bg(ctx, '#EADBB8');
        const d = ramp(s.lt, 0, s.dur, U.ease.outCubic);
        SD.fillCountry(ctx, map, 'Pakistan', { fill: '#B7A27C', stroke: '#4A3520', lw: 4, dx: -X(46) * d, dy: -Y(8) * d });
        SD.fillCountry(ctx, map, 'Bangladesh', { fill: '#B7A27C', stroke: '#4A3520', lw: 4, dx: X(30) * d, dy: Y(26) * d });
        SD.fillCountry(ctx, map, 'India', { fill: '#C9A873', stroke: '#4A3520', lw: 4 });
        SD.sepia(ctx, 0.85);
        SD.slug(ctx, '1947', { color: '#FFF4DC' });
      },
      '1-6'(ctx, t, s) {
        SD.cam(ctx, { zoom: 1.08, dx: lerp(X(60), -X(60), s.u) }, () => house(ctx, t));
        const names = ['पहली पीढ़ी', 'दूसरी पीढ़ी', 'तीसरी पीढ़ी', 'चौथी पीढ़ी'];
        const l = s.line('1.5'), base = l.t + l.dur * 0.45;
        ctx.save(); ctx.globalAlpha = 0.5 * clamp((t - base + 0.4) / 0.6); ctx.fillStyle = '#F4EDE0'; ctx.fillRect(0, Y(600), W, Y(400)); ctx.restore();
        names.forEach((nm, i) => portrait(ctx, X(390 + i * 380), Y(760), i, nm, (t - base - i * 0.45) / 0.4));
        SD.slug(ctx, 'Chiplun, Konkan', { alpha: ramp(s.lt, 0.4, 1.2) });
      },
      '1-7'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1.1, 1.02, s.u), fx: X(960), fy: Y(600) }, () => {
          house(ctx, t, { burnt: true });
          SD.silFigure(ctx, X(1240), Y(1040), 1.25, '#17120F'); SD.silFigure(ctx, X(1370), Y(1040), 1.25, '#17120F', { child: true });
          ctx.save(); ctx.strokeStyle = '#17120F'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(1296), Y(860)); ctx.lineTo(X(1336), Y(905)); ctx.stroke(); ctx.restore(); // hands held
        });
        SD.shade(ctx, X(960), Y(560), X(500), X(1400), '#6A5A6A');
        SD.slug(ctx, '1948', { alpha: ramp(s.lt, 0.3, 1) });
      },
      '1-8'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1, 1.1, s.u), fx: X(960), fy: Y(620) }, () => {
          college(ctx, t);
          B(ctx, s, { x: X(960), y: Y(930), s: 1.15, mouth: 'flat', handL: [-70, -190], look: 0.2 });
          rect(ctx, X(876), Y(672), X(52), Y(72), '#7C2F2B', { stroke: INK, lw: 2 }); rect(ctx, X(884), Y(664), X(52), Y(72), '#27305C', { stroke: INK, lw: 2 }); // books under his arm
        });
        SD.slug(ctx, 'Government Law College, Mumbai', { alpha: ramp(s.lt, 0.4, 1.2) });
      },
      '1-9'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1, 1.12, s.u), fx: X(1000), fy: Y(560) }, () => {
          chamber(ctx, t);
          B(ctx, s, { x: X(1010), y: Y(800), s: 1.5, pose: 'sit', gesture: s.talking('B') ? 'point' : 'typing', look: s.talking('B') ? 0 : 0.5 });
          desk(ctx, t);
        });
        SD.slug(ctx, 'Fort, Mumbai', { alpha: ramp(s.lt, 0.4, 1.2) });
      },
      '1-10'(ctx, t, s) {
        const pan = ramp(t, s.line('1.10').t - 0.5, s.line('1.10').t + 3);
        SD.cam(ctx, { zoom: 1.25, fx: lerp(X(0), W, pan), fy: Y(620) }, () => {
          lectureHall(ctx);
          F(ctx, s, { x: X(640), y: Y(900), s: 1.3, gesture: 'point', look: 0.5, mouth: { open: 0.25 + 0.25 * Math.sin(t * 9), wide: 0.5, talking: true } });
          lectureFront(ctx);
          B(ctx, s, { x: X(1590), y: Y(1010), s: 1.25, look: -0.8, mouth: 'flat', gesture: 'think' });
          rect(ctx, X(1300), Y(960), X(620), Y(40), '#3F2C20');
        });
      },
      '1-11'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1.05, 1.14, s.u), fx: X(960), fy: Y(600) }, () => {
          corridor(ctx);
          F(ctx, s, { x: X(740), y: Y(1010), s: 1.45, look: 0.7, gesture: s.talking('F') ? 'shrug' : undefined });
          B(ctx, s, { x: X(1180), y: Y(1010), s: 1.45, look: -0.7, mouth: s.talking('B') ? s.mouth('B') : (s.after('1.11') > 0 ? 'smile' : 'flat') });
        });
      },
      '1-12'(ctx, t, s) {
        SD.cam(ctx, { zoom: 1.1, dx: lerp(X(70), -X(70), s.u) }, () => {
          const c = SD.chai(ctx, t, { train: clamp((s.lt - 0.8) / (s.dur + 0.7)) });
          F(ctx, s, { x: X(560), y: c.ground + Y(150), s: 1.25, look: 0.6, mouth: 'smile' });
          B(ctx, s, { x: X(980), y: c.ground + Y(150), s: 1.25, look: -0.6, mouth: 'flat' });
          SD.chaiTable(ctx, X(770), c.ground + Y(150));
          SD.shade(ctx, X(1300), Y(450), X(500), X(1500), '#8E84A8');
        });
        SD.slug(ctx, 'Near Churchgate', { alpha: ramp(s.lt, 0.4, 1.2) });
      },
      '1-13'(ctx, t, s) {
        const c = SD.chai(ctx, t, { train: 1 });
        F(ctx, s, { x: X(820), y: c.ground + Y(190), s: 1.12, look: -0.4, gesture: s.talking('F') ? 'pointUp' : undefined });
        B(ctx, s, { x: X(330), y: c.ground + Y(190), s: 1.12, look: 0.5, mouth: 'flat', gesture: 'think' });
        SD.chaiTable(ctx, X(580), c.ground + Y(190));
        SD.shade(ctx, X(1300), Y(450), X(500), X(1500), '#8E84A8');
        steamPictures(ctx, t);
      },
      '1-14'(ctx, t) {
        G.bg(ctx, '#EFE4CC');
        SD.glow(ctx, W / 2, Y(460), X(900), 'rgba(226,169,59,0.5)', 0.3, 'multiply');
        const items = [['जस्टिस छागला', 'Justice M.C. Chagla'], ['डॉ. कलाम', 'Dr. A.P.J. Abdul Kalam'], ['अब्दुल हमीद, PVC', 'CQMH Abdul Hamid'], ['उस्ताद ज़ाकिर हुसैन', 'Ustad Zakir Hussain']];
        items.forEach(([hi, en], i) => emblem(ctx, i, X(300 + i * 440), Y(430), t, ev.icons[i], hi, en));
      },
      '1-15'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1, 1.1, s.u), fx: X(960), fy: Y(700) }, () => {
          const c = SD.chai(ctx, t, { train: 1 });
          const writing = t > ev.write;
          F(ctx, s, { x: X(560), y: c.ground + Y(560), s: 2.1, look: 0.6 });
          B(ctx, s, { x: X(1330), y: c.ground + Y(560), s: 2.1, look: writing ? -0.2 : -0.6, lookY: writing ? 0.8 : 0, handL: writing ? [-150 + 8 * Math.sin(t * 14), -170] : undefined });
          rect(ctx, X(620), Y(930), X(680), Y(30), '#5E3B24'); rect(ctx, X(640), Y(960), X(640), Y(120), '#4A3222');
          glass(ctx, X(800), Y(930), 1.6); glass(ctx, X(1120), Y(930), 1.6);
          rect(ctx, X(900), Y(908), X(150), Y(24), '#FBF5E6', { stroke: 'rgba(0,0,0,0.3)', lw: 1 }); // the napkin
          SD.shade(ctx, X(1300), Y(450), X(600), X(1600), '#8E84A8');
        });
      },
      // the napkin: her words, his letters; the glasses meet
      '1-16'(ctx, t, s) {
        rect(ctx, -20, -20, W + 40, H + 40, '#5E3B24');
        for (let i = 0; i < 9; i++) { ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = '#2B1D12'; ctx.fillRect(0, Y(60 + i * 124), W, 5); ctx.restore(); }
        SD.cam(ctx, { zoom: lerp(1.0, 1.08, s.u) }, () => {
          ctx.save(); ctx.translate(W / 2, Y(520)); ctx.rotate(-0.035); G.tornPaper(ctx, -X(520), -Y(300), X(1040), Y(600), { fill: '#FBF5E6', seed: 77, shadow: true }); ctx.restore();
          SD.brushOn(ctx, clamp((t - ev.name1) / 1.6), W / 2, Y(470), X(900), Y(150), () => SD.hindi(ctx, 'इस्लाम-ए-भारती', W / 2, Y(470), { size: 118, color: SD.PAL.teal }));
          SD.brushOn(ctx, clamp((t - ev.name2) / 0.9), W / 2, Y(650), X(500), Y(130), () => SD.latin(ctx, 'M N P', W / 2, Y(650), { size: 96, weight: 800, color: INK }));
          const k = clamp((t - ev.clink + 0.5) / 0.5), gy = Y(1000);
          glass(ctx, lerp(X(250), X(900), U.ease.outCubic(k)), gy, 3.2); glass(ctx, lerp(X(1670), X(1020), U.ease.outCubic(k)), gy, 3.2);
          if (t > ev.clink && t < ev.clink + 0.5) G.rays(ctx, W / 2, gy - 150, { n: 10, r0: 30, r1: 90 + 200 * (t - ev.clink), color: '#F2B84B', lw: 5, alpha: 1 - (t - ev.clink) * 2 });
        });
        SD.glow(ctx, W / 2, Y(480), X(1000), 'rgba(255,205,130,0.9)', 0.3);
      },
    },
  });
})();
