// THE LOOK — watercolor helpers shared by every part: skies, light, sepia, hills, text and subtitles.
(function () {
  const G = globalThis.G, U = globalThis.U;
  const SD = (globalThis.SD = globalThis.SD || {});
  const W = () => G.W, H = () => G.H;

  SD.PAL = {
    paper: '#F4EDE0', ink: '#2A2320', teal: '#2F6F73', gold: '#E2A93B', saffronDawn: '#F3B36B', indigo: '#27305C',
    india: '#E9C98A', neighbour: '#CFC6B4', sea: '#BFD4D6', pakistan: '#A9C4A4', bangladesh: '#B9A8C9', china: '#D8B8A8',
  };

  // vertical gradient over a box (default: the whole frame)
  SD.sky = (ctx, stops, x = 0, y = 0, w = W(), h = H()) => {
    const g = ctx.createLinearGradient(0, y, 0, y + h);
    stops.forEach(([p, c]) => g.addColorStop(p, c));
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
  };
  // soft glow (screen) or shade (multiply) from a point
  SD.glow = (ctx, cx, cy, r, color, alpha = 1, mode = 'screen') => {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.save(); ctx.globalCompositeOperation = mode; ctx.globalAlpha = alpha; ctx.fillStyle = g; ctx.fillRect(cx - r, cy - r, r * 2, r * 2); ctx.restore();
  };
  SD.shade = (ctx, cx, cy, r0, r1, edge) => {
    const g = ctx.createRadialGradient(cx, cy, r0, cx, cy, r1);
    g.addColorStop(0, '#FFFFFF'); g.addColorStop(1, edge);
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = g; ctx.fillRect(0, 0, W(), H()); ctx.restore();
  };
  // turn everything drawn so far into a sepia print (flashbacks)
  SD.sepia = (ctx, k = 1) => {
    ctx.save();
    ctx.globalAlpha = k; ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, W(), H());
    ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#E9C79A'; ctx.fillRect(0, 0, W(), H());
    ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.12 * k; ctx.fillStyle = '#6B4A2A'; ctx.fillRect(0, 0, W(), H());
    ctx.restore();
  };
  // a ridge line of hills from x0 to x1, filled down to yFloor
  SD.hills = (ctx, { y, amp = 60, color, seed = 1, freq = 0.004, x0 = -40, x1 = W() + 40, yFloor = H() + 40, step = 60, shift = 0 }) => {
    const pts = [];
    for (let x = x0; x <= x1; x += step) pts.push([x, y - amp * (0.5 + 0.5 * U.noise1((x + shift) * freq, seed)) - amp * 0.35 * U.noise1((x + shift) * freq * 3.1, seed + 9)]);
    pts.push([x1, yFloor], [x0, yFloor]);
    G.shape(ctx, pts, { fill: color, stroke: null, lw: 0, seed: seed * 17, amp: 0.6 });
  };
  // drifting mist band
  SD.mist = (ctx, y, h, alpha = 0.5, t = 0) => {
    const g = ctx.createLinearGradient(0, y - h / 2, 0, y + h / 2);
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, `rgba(255,250,240,${alpha})`); g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.save(); ctx.translate(Math.sin(t * 0.2) * 20, 0); ctx.fillStyle = g; ctx.fillRect(-40, y - h / 2, W() + 80, h); ctx.restore();
  };

  // ---- text ----
  const HINDI = '"Noto Sans Devanagari", Inter, sans-serif';
  SD.FONT = { hindi: HINDI, latin: 'Inter, sans-serif', urdu: '"Noto Nastaliq Urdu", serif', hand: 'Caveat' };
  SD.hindi = (ctx, str, x, y, o = {}) => G.text(ctx, str, x, y, { fam: HINDI, weight: 700, size: 64, align: 'center', boil: 0, ...o });
  SD.latin = (ctx, str, x, y, o = {}) => G.text(ctx, str, x, y, { fam: SD.FONT.latin, weight: 700, size: 40, align: 'center', boil: 0, ...o });
  SD.urdu = (ctx, str, x, y, o = {}) => G.text(ctx, str, x, y, { fam: SD.FONT.urdu, weight: 400, size: 56, align: 'center', boil: 0, lang: 'ur', ...o });

  // wrap a string to lines no wider than maxW
  SD.wrap = (ctx, str, maxW, size, fam, weight) => {
    const words = String(str).split(' '), lines = [];
    let line = '';
    for (const w of words) {
      const next = line ? line + ' ' + w : w;
      if (line && G.measure(ctx, next, size, fam, weight) > maxW) { lines.push(line); line = w; } else line = next;
    }
    if (line) lines.push(line);
    return lines;
  };
  // English subtitle: white on a soft dark band, bottom of the safe area
  SD.subtitle = (ctx, str, o = {}) => {
    if (!str) return;
    const size = o.size || Math.round(W() >= 1900 ? 44 : 46), fam = SD.FONT.latin;
    const maxW = (o.maxW || G.SAFE.w * 0.86);
    let lines = SD.wrap(ctx, str, maxW, size, fam, 700);
    if (lines.length > 1) { // balance the lines so no word is left alone
      const total = G.measure(ctx, str, size, fam, 700);
      for (let k = 1.08; k < 2; k += 0.08) { const tryLines = SD.wrap(ctx, str, (total / lines.length) * k, size, fam, 700); if (tryLines.length <= lines.length) { lines = tryLines; break; } }
    }
    const lh = size * 1.28, yBase = (o.y != null ? o.y : G.SAFE.y + G.SAFE.h - 18) - (lines.length - 1) * lh;
    const cx = G.SAFE.x + G.SAFE.w / 2;
    const wide = Math.max(...lines.map((l) => G.measure(ctx, l, size, fam, 700)));
    ctx.save(); ctx.globalAlpha = (o.alpha == null ? 1 : o.alpha) * 0.62; ctx.fillStyle = '#17120F';
    const bx = cx - wide / 2 - 28, by = yBase - size * 1.02, bw = wide + 56, bh = lines.length * lh + size * 0.28, r = 14;
    ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, r); ctx.fill(); ctx.restore();
    lines.forEach((l, i) => G.text(ctx, l, cx, yBase + i * lh, { fam, weight: 700, size, align: 'center', color: '#FFFFFF', boil: 0, alpha: o.alpha == null ? 1 : o.alpha }));
  };
  // a place-and-year caption, top-left, like a film slug
  SD.slug = (ctx, str, o = {}) => {
    const size = o.size || 40;
    G.text(ctx, str, G.SAFE.x + 10, G.SAFE.y + size + 6, { fam: SD.FONT.latin, weight: 800, size, color: o.color || '#FFFFFF', stroke: o.stroke || 'rgba(30,20,10,0.75)', strokeW: 8, boil: 0, alpha: o.alpha == null ? 1 : o.alpha });
  };
  // label for the design sheet
  SD.tag = (ctx, str, x, y, o = {}) => G.text(ctx, str, x, y, { fam: SD.FONT.latin, weight: 700, size: 30, align: 'center', color: '#3A302A', boil: 0, ...o });
})();
