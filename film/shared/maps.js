// MAPS — every map of India in the film goes through here (spec: India's outline follows the
// Survey of India map: all of Jammu and Kashmir and Ladakh, with Gilgit-Baltistan and Aksai Chin).
// The engine's outlines are Natural Earth's de facto lines, so India's northern edge is replaced
// by the outer boundary of the whole of Jammu and Kashmir and Ladakh, and India is drawn last,
// on top of its neighbours.
(function () {
  const G = globalThis.G, Data = globalThis.Data, GEO = globalThis.GEO;
  const SD = (globalThis.SD = globalThis.SD || {});

  // Outer boundary, clockwise from the Punjab plain near Sialkot, round Gilgit-Baltistan and the
  // Karakoram, round Aksai Chin, back down to Demchok. [lon, lat], hand-plotted, stylised.
  const NORTH = [
    [74.50, 32.75], [74.20, 32.85], [73.80, 33.02], [73.62, 33.25], [73.58, 33.60], [73.60, 33.95], [73.45, 34.25], [73.40, 34.45],
    [73.60, 34.75], [73.95, 35.00], [74.05, 35.15], [73.75, 35.45], [73.25, 35.70], [72.75, 35.90], [72.50, 36.20], [72.60, 36.50],
    [73.10, 36.72], [73.70, 36.90], [74.10, 36.85], [74.55, 37.03], [74.90, 37.00], [75.15, 37.02], [75.42, 36.80], [75.90, 36.65],
    [76.60, 36.55], [77.20, 36.15], [77.82, 35.55], [78.20, 35.90], [78.90, 36.00], [79.60, 35.95], [80.20, 35.55], [80.35, 35.00],
    [80.15, 34.65], [79.57, 34.40], [79.35, 34.00], [79.10, 33.72], [79.38, 33.20], [79.50, 32.75], [79.30, 32.52],
  ];
  const FROM = [74.64, 32.61], TO = [78.92, 32.36]; // where the replaced stretch leaves and rejoins the engine's outline

  const nearest = (ring, [lon, lat]) => {
    let best = 0, bd = Infinity;
    for (let i = 0; i < ring.length; i += 2) { const d = (ring[i] - lon) ** 2 + (ring[i + 1] - lat) ** 2; if (d < bd) { bd = d; best = i; } }
    return best;
  };
  // Replace the stretch of the ring that runs through Kashmir (between FROM and TO) with NORTH.
  const splice = (ring) => {
    const a = nearest(ring, FROM), b = nearest(ring, TO), n = ring.length;
    const walk = (from, to) => { const out = []; for (let i = from; i !== to; i = (i + 2) % n) out.push(ring[i], ring[i + 1]); out.push(ring[to], ring[to + 1]); return out; };
    const north = (seg) => { let k = 0; for (let i = 0; i < seg.length; i += 2) if (seg[i + 1] > 32.9 && seg[i] < 79.6) k++; return k; };
    const ab = walk(a, b), ba = walk(b, a);
    const flat = NORTH.flat();
    // keep the half that does NOT run through Kashmir, and close it with the Survey of India edge
    if (north(ab) >= north(ba)) return [...ba, ...flat]; // ba runs b -> a (the rest of India), then a -> b via NORTH
    return [...ab, ...[...NORTH].reverse().flat()];
  };
  const main = (rings) => rings.reduce((x, y) => (y.length > x.length ? y : x));
  const patch = (set) => {
    if (!set || !set.India || set.India.__sd) return;
    const rings = set.India, big = main(rings);
    rings[rings.indexOf(big)] = splice(big);
    rings.__sd = true;
    delete set['Siachen Glacier'];
  };
  if (GEO) { patch(GEO.world); patch(GEO.detail); }

  // Draw a map with India on top. `o` is any Data.drawMap option; `skip` hides countries.
  const solidIndia = (ctx, map, color) => {
    const rings = (map.detail && GEO.detail.India) || GEO.world.India;
    ctx.save(); ctx.fillStyle = color; ctx.beginPath();
    for (const r of rings) { for (let i = 0; i < r.length; i += 2) { const [x, y] = map.proj(r[i], r[i + 1]); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.closePath(); }
    ctx.fill(); ctx.restore();
  };
  SD.drawMap = (ctx, map, o = {}) => {
    const names = Object.keys(GEO.world).filter((n) => n !== 'India' && !(o.skip || []).includes(n));
    const clip = o.clip;
    if (clip) { ctx.save(); ctx.beginPath(); ctx.rect(map.box.x, map.box.y, map.box.w, map.box.h); ctx.clip(); }
    Data.drawMap(ctx, map, { ...o, clip: false, only: names });
    // India last and solid, so no neighbour's line shows inside it
    solidIndia(ctx, map, (o.highlight && o.highlight.India) || o.land || '#E7DCC6');
    Data.drawMap(ctx, map, { ...o, clip: false, sea: null, only: ['India'] });
    if (clip) ctx.restore();
  };
  // India alone (for shots where only India matters)
  SD.drawIndia = (ctx, map, o = {}) => Data.drawMap(ctx, map, { ...o, only: ['India'] });
  // the projected outline of India's main ring, for custom drawing (cracks, glows)
  SD.indiaOutline = (map) => {
    const r = main((map.detail && GEO.detail.India) || GEO.world.India), pts = [];
    for (let i = 0; i < r.length; i += 2) pts.push(map.proj(r[i], r[i + 1]));
    return pts;
  };
  SD.NORTH = NORTH;
  // places the film names that the engine's city list lacks
  Object.assign(GEO.cities, {
    Mumbai: [72.88, 19.08], Delhi: [77.21, 28.61], Meerut: [77.71, 28.98], Kolkata: [88.36, 22.57], Chiplun: [73.52, 17.53],
    Garo: [90.3, 25.5], Dhaka: [90.41, 23.81], Chennai: [80.27, 13.08], Srinagar: [74.8, 34.08], Leh: [77.58, 34.16],
  });
})();
