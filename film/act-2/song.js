// THE SONG — Act II. Fatima's theme through the hard years, Bhaskar's flute at his desk, light
// ticking under the world maps, the election night, and the Accord theme rising under the oath.
const sc = require('./score');
const { theme, sfx, finish } = require('./shared/audio')(sc, __dirname);
const { byId: by, ev, DURATION } = sc;
const t0 = (id) => by[id].t0, t1 = (id) => by[id].t1;

theme.drone(t0('2-1'), t1('2-6'), { gain: 0.7 });
sfx.wind(t0('2-1'), t1('2-1'), 0.8);
for (let i = 0; i < 9; i++) sfx.paper(t0('2-1') + 0.5 + i * 0.55, 0.7); // calendar pages
theme.fatima(t0('2-2'), t1('2-4') - 0.4, { gain: 0.9 });
ev.papers.forEach((t) => { sfx.paper(t, 1.2); sfx.stamp(t + 0.04, 0.5); });
sfx.footsteps(t0('2-4') + 0.2, t1('2-4') - 0.6, 0.6, 0.6);
theme.bhaskar(t0('2-5'), t1('2-6') - 0.4, { gain: 0.9 });
sfx.pen(t0('2-5') + 0.5, t0('2-5') + 2.5, 0.7); sfx.pen(t0('2-6') + 0.2, t0('2-6') + 1.4, 0.7);
for (let t = t0('2-5') + 1; t < t1('2-5'); t += 1) sfx.tick(t, 0.5, 0.7); // a clock
// the world maps
sfx.whoosh(t0('2-7'), 0.6); sfx.lock(ev.door, 1);
theme.tension(t0('2-7') + 0.5, ev.door + 2, { gain: 0.5 });
for (let t = ev.route, i = 0; t < ev.routeEnd; t += 0.3, i++) sfx.marimba(t, ['D4', 'F#4', 'A4', 'B4', 'D5'][i % 5], 0.7);
theme.chime(ev.routeEnd, 'D5', 1);
ev.snips.forEach((t) => sfx.snip(t, 1.1));
// election night
sfx.sting(ev.sting, 1);
sfx.crowd(t0('2-10'), ev.fill1, { size: 0.6, rise: 0.7, gain: 0.7 });
for (let t = ev.fill0; t < ev.fill1; t += 0.16) sfx.tick(t, 0.6, 1.6); // the count
ev.pins.forEach((t) => sfx.drum(t, 1.1));
['D4', 'F#4', 'A4'].forEach((note, i) => theme.chime(ev.gold + i * 0.2, note, 1));
theme.drone(t0('2-13'), DURATION, { gain: 0.7 });
theme.accord(t0('2-14') + 0.5, DURATION, { gain: 0.9 });
sfx.crowd(by['2-14'].t0, ev.oath - 0.4, { size: 0.5, rise: 0, gain: 0.4 });
theme.bhaskar(t0('2-15') + 0.5, DURATION - 1, { gain: 0.6, pluck: false });

finish({ lufs: -14, fadeOut: 1.8, gains: { amb: 1.5 } });
