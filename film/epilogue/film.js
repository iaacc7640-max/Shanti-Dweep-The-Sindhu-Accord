// THE FILM — Epilogue: fireworks from Gilgit to Garo, the night train home, dawn on the Vashishti
// with his children, the closing line, and the credits.
(function () {
  const G = globalThis.G, U = globalThis.U, S = globalThis.SCORE, SD = globalThis.SD, Data = globalThis.Data;
  const W = G.W, H = G.H, X = SD.X, Y = SD.Y, { ramp, lerp, clamp } = SD;
  const ev = S.ev, INK = SD.PAL.ink;
  const flat = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
  const NAMASTE = { handL: [-12, -236], handR: [12, -236] };
  const HUES = [['#F2B84B', '#FFF1D2'], ['#E8718D', '#FFD6E0'], ['#7FE3D0', '#E0FFF8'], ['#FF9A4A', '#FFE0B8']];

  const night = Data.map({ region: [58, 5, 100, 39], x: X(160), y: Y(20), w: X(1600), h: Y(1040) });
  const A = [74.3, 35.9], B = [90.3, 25.5]; // Gilgit, the Garo hills
  const burst = (ctx, f, t, x, y, k = 1) => G.firework(ctx, { t: f.t, launch: 0.6, seed: f.seed, size: f.size, color: HUES[f.hue][0], color2: HUES[f.hue][1] }, t, x, y, k);

  SD.stage({
    cuts: [],
    noSubs: ['E-4', 'E-5'],
    post: (id) => (id === 'E-1' ? { paper: 0.25, vignette: 0.4 } : {}),
    shots: {
      // the subcontinent at night; the bursts travel from north-west to east
      'E-1'(ctx, t, s) {
        SD.sky(ctx, [[0, '#0A0E22'], [1, '#161C3A']]);
        SD.drawMap(ctx, night, { highlight: { India: '#2E4A5C', Pakistan: '#2A4A44', Bangladesh: '#3A3A5C' }, land: '#141C30', stroke: 'rgba(170,200,230,0.55)', lw: 1.5 });
        for (const f of S.fireworks) {
          if (f.u < 0) continue;
          const [x, y] = night.proj(lerp(A[0], B[0], f.u) + f.dx * 7, lerp(A[1], B[1], f.u) + f.dy * 9 - 3 * Math.sin(f.u * Math.PI));
          burst(ctx, f, t, x, y, 1.0);
          const age = t - f.t; if (age > 0 && age < 1.2) SD.glow(ctx, x, y, 120, 'rgba(255,230,180,0.9)', 0.35 * (1 - age / 1.2));
        }
        const g = night.proj(...A), r = night.proj(...B), a = ramp(s.lt, 1, 2);
        SD.hindi(ctx, 'गिलगित', g[0] - 20, g[1] - 26, { size: 34, color: '#FFF4D8', align: 'right', alpha: a });
        SD.hindi(ctx, 'गारो', r[0] + 24, r[1] + 46, { size: 34, color: '#FFF4D8', align: 'left', alpha: ramp(s.lt, 5.5, 6.5) });
      },
      // the night train: Bhaskar by the window, the last bursts reflected in the glass
      'E-2'(ctx, t, s) {
        const sway = Math.sin(t * 5.2) * 3;
        ctx.save(); ctx.translate(0, sway);
        flat(ctx, 0, -10, W, H + 20, '#3A2E2A');
        // the window and the night going by
        const wx = X(820), wy = Y(150), ww = X(900), wh = Y(520);
        ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip();
        SD.sky(ctx, [[0, '#0A0E22'], [1, '#1E2444']], wx, wy, ww, wh);
        SD.hills(ctx, { y: wy + wh * 0.8, amp: Y(150), color: '#141830', seed: 51, freq: 0.002, shift: t * 260, yFloor: wy + wh + 10, x0: wx - 40, x1: wx + ww + 40 });
        for (let i = 0; i < 14; i++) { const x = wx + ww - (((t * 520 + i * 211) % (ww + 200))); flat(ctx, x, wy + wh * (0.74 + 0.1 * G.rnd(i, 4)), 10, 5, '#FFD68C'); } // village lights sliding past
        for (const f of S.fireworks) { if (f.u >= 0) continue; burst(ctx, f, t, wx + ww * (0.15 + 0.7 * f.dx), wy + wh * (0.2 + 0.25 * f.dy), 0.9); }
        ctx.restore();
        ctx.save(); ctx.strokeStyle = '#6B5648'; ctx.lineWidth = 22; ctx.strokeRect(wx, wy, ww, wh); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(wx, wy + wh * 0.5); ctx.lineTo(wx + ww, wy + wh * 0.5); ctx.stroke(); ctx.restore();
        flat(ctx, X(140), Y(560), X(760), Y(520), '#4E6A66'); flat(ctx, X(140), Y(540), X(760), Y(30), '#3A504C'); // the berth
        SD.person(ctx, 'bhaskarOld', { x: X(560), y: Y(860), s: 1.5, pose: 'sit', look: 0.9, lookY: -0.2, mouth: s.lt > s.dur * 0.6 ? 'smile' : 'flat', headRot: 0.04 });
        flat(ctx, 0, Y(1000), W, Y(100), '#2A211E');
        SD.glow(ctx, X(500), Y(300), X(700), 'rgba(255,205,130,0.9)', 0.3);
        ctx.restore();
      },
      // dawn at the Vashishti, the same framing as the opening — now three of them
      'E-3'(ctx, t, s) {
        const sun = lerp(0.45, 0.8, s.u);
        SD.cam(ctx, { zoom: lerp(1, 1.12, ramp(s.lt, 0, s.dur)), fx: X(860), fy: Y(560) }, () => {
          const r = SD.river(ctx, t, { sun });
          const pray = { ...NAMASTE, eyes: 'closed', shadow: false };
          SD.person(ctx, 'daughter', { ...pray, x: X(380), y: Y(1010), s: 1.32, mouth: 'smile' });
          SD.person(ctx, 'son', { ...pray, x: X(900), y: Y(1010), s: 1.42, mouth: 'flat' });
          SD.person(ctx, 'bhaskarRiver', { ...pray, x: X(640), y: Y(1010), s: 1.5, mouth: s.mouth('B'), headRot: 0.02 * Math.sin(t * 0.5) });
          SD.riverFront(ctx, t, Y(900));
          SD.glow(ctx, r.sunX, r.sunY, X(900), 'rgba(255,190,110,0.8)', 0.3);
        });
      },
      // the sun on the river; the closing line
      'E-4'(ctx, t, s) {
        SD.cam(ctx, { zoom: lerp(1.1, 1.0, s.u) }, () => { const r = SD.river(ctx, t, { sun: 0.95 }); SD.glow(ctx, r.sunX, r.sunY, X(1100), 'rgba(255,205,130,0.9)', 0.4); });
        flat(ctx, 0, 0, W, H, `rgba(20,16,30,${0.28 * ramp(s.lt, 0.2, 1.2)})`);
        const u = ramp(t, ev.closing, ev.closingEnd, (x) => x);
        SD.brushOn(ctx, clamp(u * 2), W / 2, Y(460), X(1500), Y(150), () => SD.hindi(ctx, 'गिलगित से गारो तक...', W / 2, Y(460), { size: 110, color: '#FFF4D8', stroke: 'rgba(30,20,30,0.55)', strokeW: 10 }));
        SD.brushOn(ctx, clamp(u * 2 - 1), W / 2, Y(630), X(1500), Y(150), () => SD.hindi(ctx, 'आज़ादी पर्व मनाएंगे.', W / 2, Y(630), { size: 110, color: '#F2B84B', stroke: 'rgba(30,20,30,0.55)', strokeW: 10 }));
      },
      // credits, with the fiction notice again
      'E-5'(ctx, t) {
        G.bg(ctx, SD.PAL.paper);
        SD.glow(ctx, W / 2, Y(420), X(900), 'rgba(226,169,59,0.5)', 0.25, 'multiply');
        const a = (d) => clamp((t - ev.credits - d) / 0.6);
        SD.hindi(ctx, 'शांति द्वीप: सिंधु समझौता', W / 2, Y(190), { size: 84, color: INK, alpha: a(0) });
        SD.latin(ctx, 'Shanti Dweep: The Sindhu Accord', W / 2, Y(264), { size: 40, color: '#5A4636', alpha: a(0) });
        ctx.save(); ctx.globalAlpha = a(0.4); flat(ctx, W / 2 - X(200), Y(304), X(400), 4, SD.PAL.teal); ctx.restore();
        SD.hindi(ctx, 'यह एक काल्पनिक कथा है।', W / 2, Y(400), { size: 52, color: '#7C2F2B', alpha: a(0.8) });
        SD.hindi(ctx, 'किसी जीवित या मृत व्यक्ति से समानता संयोग मात्र है।', W / 2, Y(466), { size: 38, weight: 400, color: INK, alpha: a(0.8) });
        SD.latin(ctx, 'A work of fiction. Any resemblance to persons living or dead is coincidental.', W / 2, Y(524), { size: 30, weight: 400, color: '#5A4636', alpha: a(0.8) });
        SD.latin(ctx, 'In honour of', W / 2, Y(630), { size: 26, weight: 700, color: '#7A6858', alpha: a(1.6) });
        SD.latin(ctx, 'Justice M.C. Chagla  ·  Dr. A.P.J. Abdul Kalam  ·  CQMH Abdul Hamid, PVC  ·  Ustad Zakir Hussain', W / 2, Y(676), { size: 30, weight: 400, color: INK, alpha: a(1.6) });
        const rows = [['Voices', 'synthetic speech (Piper), Hindi and Urdu'], ['Picture and music', 'drawn and synthesized in code'], ['Maps', 'stylised, not to scale']];
        rows.forEach(([k, v], i) => {
          SD.latin(ctx, k, W / 2 - X(30), Y(770 + i * 54), { size: 26, weight: 700, color: '#7A6858', align: 'right', alpha: a(2.2 + i * 0.3) });
          SD.latin(ctx, v, W / 2, Y(770 + i * 54), { size: 26, weight: 400, color: INK, align: 'left', alpha: a(2.2 + i * 0.3) });
        });
        SD.hindi(ctx, 'एकता', W / 2, Y(990), { size: 44, color: SD.PAL.teal, alpha: a(3.4) });
      },
    },
  });
  void U;
})();
