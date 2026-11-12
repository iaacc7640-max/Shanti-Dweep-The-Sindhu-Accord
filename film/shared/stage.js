// THE STAGE — plays a part's shots from its score: picks the shot for time t, gives it local time
// and its spoken lines, fades between shots, moves mouths with the voice, and draws the subtitles.
(function () {
  const G = globalThis.G, U = globalThis.U, Studio = globalThis.Studio, Subs = globalThis.Subs;
  const SD = (globalThis.SD = globalThis.SD || {});
  const { clamp, lerp, ease } = U;

  // camera: zoom about a fixed point (fx, fy) in frame pixels, so with zoom >= 1 the frame is always
  // covered; dx/dy slide the picture and must stay within the margin the zoom gives
  SD.cam = (ctx, { zoom = 1, fx = G.W / 2, fy = G.H / 2, dx = 0, dy = 0 } = {}, draw) => {
    ctx.save(); ctx.translate(fx + dx, fy + dy); ctx.scale(zoom, zoom); ctx.translate(-fx, -fy); draw(); ctx.restore();
  };
  // 0 -> 1 over [a, b], eased
  SD.ramp = (t, a, b, e = ease.inOutCubic) => e(clamp((t - a) / (b - a)));
  // text that is brushed on from left to right between t0 and t1
  SD.brushOn = (ctx, u, x, y, w, h, draw) => {
    if (u <= 0) return;
    ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2 - 20, y - h, (w + 40) * clamp(u), h * 1.6); ctx.clip(); draw(); ctx.restore();
  };

  // shots: { shotId: draw(ctx, t, s) } where s = { t0, t1, lt (seconds into the shot), u (0..1),
  //   dur, line(id), said(id) (0 before, 0..1 while spoken, 1 after), mouth(who), VO }
  SD.stage = ({ shots, post, fade = 0.4, fadeColor = '#17120F', cuts = [], noSubs = [] }) => {
    const S = globalThis.SCORE;
    let VO = null;
    const find = (t) => S.shots.find((sh) => t >= sh.t0 && t < sh.t1) || S.shots[S.shots.length - 1];
    Studio.film({
      fadeOut: 0,
      post: typeof post === 'function' ? (t) => post(find(t).id, t) : post,
      async init() { VO = await Studio.loadJSON('out/voice.json'); },
      draw(ctx, t) {
        const sh = find(t);
        const s = {
          id: sh.id, t0: sh.t0, t1: sh.t1, dur: sh.t1 - sh.t0, lt: t - sh.t0, u: clamp((t - sh.t0) / (sh.t1 - sh.t0)), VO,
          line: (id) => S.lineById[id],
          said: (id) => { const l = S.lineById[id]; return l ? clamp((t - l.t) / (l.end - l.t)) : 0; },
          after: (id, d = 0) => { const l = S.lineById[id]; return l ? t - l.end - d : -1; },
          since: (id) => { const l = S.lineById[id]; return l ? t - l.t : -1; },
          mouth: (who) => { const mo = Subs.mouth(VO, t, who); return mo.talking ? mo : 'flat'; },
          talking: (who) => Subs.mouth(VO, t, who).talking,
        };
        const draw = shots[sh.id];
        if (!draw) throw new Error(`no drawing for shot "${sh.id}"`);
        draw(ctx, t, s);
        // fade in and out of each shot, unless the join is listed as a hard cut
        const first = sh === S.shots[0], last = sh === S.shots[S.shots.length - 1];
        const cutIn = cuts.includes(sh.id), next = S.shots[S.shots.indexOf(sh) + 1], cutOut = next && cuts.includes(next.id);
        let a = 0;
        if (!cutIn) a = Math.max(a, 1 - (t - sh.t0) / (first ? fade * 2 : fade));
        if (!cutOut) a = Math.max(a, 1 - (sh.t1 - t) / (last ? fade * 3 : fade));
        if (a > 0) { ctx.save(); ctx.globalAlpha = clamp(a); ctx.fillStyle = fadeColor; ctx.fillRect(0, 0, G.W, G.H); ctx.restore(); }
        // English subtitles
        if (!noSubs.includes(sh.id)) { const sub = S.subtitles.find((x) => t >= x.t && t <= x.end); if (sub) SD.subtitle(ctx, sub.text); }
      },
    });
  };
  SD.lerp = lerp; SD.clamp = clamp; SD.ease = ease;
})();
