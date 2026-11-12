// THE FILM — Cold Open: the fiction card, dawn on the Vashishti, old Bhaskar before the sun, the title.
(function () {
  const G = globalThis.G, S = globalThis.SCORE, SD = globalThis.SD;
  const W = G.W, H = G.H, X = SD.X, Y = SD.Y, { ramp, lerp, clamp } = SD;
  const ev = S.ev;
  const NAMASTE = { handL: [-12, -236], handR: [12, -236] };

  // Bhaskar wading: his legs are under the water line
  const bhaskar = (ctx, t, s, o) => SD.person(ctx, 'bhaskarRiver', { ...NAMASTE, eyes: 'closed', mouth: s.mouth('B'), shadow: false, headRot: 0.02 * Math.sin(t * 0.5), ...o });

  SD.stage({
    cuts: ['C-2'],
    noSubs: ['C-1', 'C-6'],
    shots: {
      // "A work of fiction."
      'C-1'(ctx, t, s) {
        ctx.fillStyle = '#17120F'; ctx.fillRect(0, 0, W, H);
        const a = ramp(s.lt, ev.card, ev.card + 1) * (1 - ramp(s.lt, s.dur - 1.2, s.dur - 0.2));
        SD.latin(ctx, 'A work of fiction.', W / 2, Y(500), { size: 78, weight: 700, color: '#F4EDE0', alpha: a });
        SD.hindi(ctx, 'यह एक काल्पनिक कथा है।', W / 2, Y(610), { size: 56, weight: 400, color: '#D9CDB8', alpha: a });
      },
      // the river wakes: the sun climbs behind the ridge, the frame slides right
      'C-2'(ctx, t, s) {
        const sun = lerp(0.02, 0.5, ramp(s.lt, 0, s.dur + 6, (x) => x));
        SD.cam(ctx, { zoom: 1.12, dx: lerp(X(90), -X(90), s.u) }, () => SD.river(ctx, t, { sun, pan: s.u * 260 }));
        const dark = 1 - ramp(s.lt, 0, 5);
        if (dark > 0) { ctx.save(); ctx.globalAlpha = 0.55 * dark; ctx.fillStyle = '#1B2444'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
      },
      // old Bhaskar, waist-deep, hands folded; a slow push in
      'C-3'(ctx, t, s) {
        const sun = lerp(0.5, 0.72, s.u), z = lerp(1, 1.14, ramp(s.lt, 0, s.dur));
        SD.cam(ctx, { zoom: z, fx: X(820), fy: Y(560) }, () => {
          const r = SD.river(ctx, t, { sun });
          bhaskar(ctx, t, s, { x: X(640), y: Y(1010), s: 1.5 });
          SD.riverFront(ctx, t, Y(900));
          SD.glow(ctx, r.sunX, r.sunY, X(900), 'rgba(255,190,110,0.8)', 0.3);
        });
      },
      // close: his face in gold light; he says the prayer; water falls from his hands
      'C-4'(ctx, t, s) {
        const z = lerp(1.0, 1.06, s.u);
        SD.cam(ctx, { zoom: z, fx: W / 2, fy: Y(480) }, () => {
          SD.river(ctx, t, { sun: 0.8, pan: 500 });
          bhaskar(ctx, t, s, { x: W / 2, y: Y(1560), s: 3.0, blush: 0.15 });
          for (let i = 0; i < 7; i++) { // drops falling from the folded hands
            const u = ((t * 0.9 + i * 0.37) % 1), dx = (i - 3) * X(13);
            ctx.save(); ctx.globalAlpha = 0.7 * (1 - u); ctx.fillStyle = '#EAF4FF';
            ctx.beginPath(); ctx.ellipse(W / 2 + dx, Y(900) + u * u * Y(190), 5, 11, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
          }
          SD.glow(ctx, X(1500), Y(300), X(1100), 'rgba(255,200,120,0.9)', 0.4);
        });
      },
      // wide: a small figure, the sun's long path on the water; a slow pull back
      'C-5'(ctx, t, s) {
        const z = lerp(1.22, 1.0, ramp(s.lt, 0, s.dur));
        SD.cam(ctx, { zoom: z, fx: X(960), fy: Y(600) }, () => {
          const r = SD.river(ctx, t, { sun: 0.9 });
          bhaskar(ctx, t, s, { x: X(780), y: Y(905), s: 0.62 });
          SD.riverFront(ctx, t, Y(862));
          SD.glow(ctx, r.sunX, r.sunY, X(1000), 'rgba(255,200,120,0.85)', 0.3);
        });
      },
      // the title, brushed onto paper
      'C-6'(ctx, t) {
        G.bg(ctx, SD.PAL.paper);
        SD.glow(ctx, W / 2, Y(470), X(900), 'rgba(242,184,75,0.5)', 0.35, 'multiply');
        const u = ramp(t, ev.title, ev.title + 2.4);
        const title = 'शांति द्वीप: सिंधु समझौता';
        SD.brushOn(ctx, u, W / 2, Y(500), X(1500), Y(190), () => SD.hindi(ctx, title, W / 2, Y(500), { size: 128, color: SD.PAL.ink }));
        if (u > 0 && u < 1) { // the brush tip
          const bx = W / 2 - X(770) + X(1540) * u;
          ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = SD.PAL.ink; ctx.beginPath(); ctx.ellipse(bx, Y(460), 10, 46, 0.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        }
        const a = ramp(t, ev.titleEn, ev.titleEn + 1.2);
        SD.latin(ctx, 'Shanti Dweep: The Sindhu Accord', W / 2, Y(640), { size: 58, weight: 700, color: '#5A4636', alpha: a });
        ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = SD.PAL.teal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(W / 2 - X(220) * a, Y(700)); ctx.lineTo(W / 2 + X(220) * a, Y(700)); ctx.stroke(); ctx.restore();
        SD.latin(ctx, 'a speculative fiction', W / 2, Y(770), { size: 34, weight: 400, color: '#7A6858', alpha: a });
      },
    },
  });
  void clamp;
})();
