// THE SONG — Act III. Unease across the border, the news sting, the tense cabinet, the war room's
// pulses, Fatima's harmonium alone under the Urdu address, the crowd, and the Accord theme at dawn.
const sc = require('./score');
const { theme, sfx, finish } = require('./shared/audio')(sc, __dirname);
const { byId: by, ev, DURATION } = sc;
const t0 = (id) => by[id].t0, t1 = (id) => by[id].t1;

// Pakistan: collapse and aftermath
theme.tension(t0('3-1'), t1('3-3'), { gain: 0.8 });
sfx.whoosh(ev.fall - 0.3, 0.8); sfx.drum(ev.fall + 0.9, 0.8);
sfx.wind(t0('3-2'), t1('3-3'), 1);
sfx.murmur(t0('3-2'), t1('3-2'), { size: 0.3, gain: 0.5 });
// the strike, on screens only
sfx.sting(ev.breaking, 1);
sfx.siren(ev.breaking + 0.5, t1('3-5'), 0.9);
sfx.murmur(t0('3-5'), t1('3-5'), { size: 0.7, gain: 0.5 });
theme.tension(t0('3-4') + 1, t1('3-8'), { gain: 0.9 });
// the cabinet
theme.drone(t0('3-6'), t1('3-8'), { gain: 0.8 });
sfx.stamp(ev.hand, 1); sfx.drum(ev.hand, 0.6);
// the war room
sfx.pulses(t0('3-9'), t1('3-11'), 1);
theme.tension(t0('3-9'), t1('3-11'), { gain: 0.7 });
ev.arcs.forEach((t) => sfx.whoosh(t, 0.7));
ev.nodes.forEach((t) => sfx.glitch(t, 0.9));
ev.rings.forEach((t) => sfx.lock(t, 1));
// the address: harmonium only
sfx.footsteps(t0('3-12') + 0.3, t0('3-12') + 3.5, 0.7, 0.62);
theme.drone(t0('3-12'), t1('3-15'), { gain: 0.8 });
theme.fatima(t0('3-13') - 0.5, t1('3-15') - 1.8, { gain: 0.75, tabla: false, beat: 1.0 });
// the crowds, then dawn
sfx.crowd(t0('3-16'), t1('3-16') + 1, { size: 0.9, rise: 0.8, gain: 1 });
for (let t = t0('3-16') + 1; t < t1('3-16'); t += 0.9) sfx.drum(t, 0.35 + 0.4 * (t - t0('3-16')) / by['3-16'].dur); // a heartbeat that grows
sfx.wind(t0('3-17'), t1('3-17'), 0.7);
sfx.birds(t0('3-17') + 1, t1('3-17'), 0.7);
sfx.lock(ev.gates, 0.9);
theme.drone(t0('3-17'), DURATION, { gain: 0.8 });
theme.accord(ev.gates + 0.6, DURATION, { gain: 0.9 });

finish({ lufs: -14, fadeOut: 2, gains: { amb: 1.5 } });
