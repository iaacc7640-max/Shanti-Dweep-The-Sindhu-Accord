// THE SONG — Act IV. Low strings and drums while the troops gather; Bhaskar's plucked theme for
// the three cards; gulls and a ship's horn at Gwadar; the full Accord theme on the Indus; the seal.
const sc = require('./score');
const { theme, sfx, finish } = require('./shared/audio')(sc, __dirname);
const { byId: by, ev, DURATION } = sc;
const t0 = (id) => by[id].t0, t1 = (id) => by[id].t1;

theme.tension(t0('4-1'), t1('4-3') - 1, { gain: 0.9 });
ev.troops.forEach((t) => sfx.drum(t, 0.8));
sfx.wind(t0('4-2'), t1('4-2'), 0.7);
for (let t = t0('4-3') + 0.5; t < t1('4-3'); t += 1) sfx.tick(t, 0.5, 0.7); // a clock in a quiet room
// the three cards: Bhaskar's theme, plucked
theme.drone(t0('4-4'), t1('4-8'), { gain: 0.7 });
theme.bhaskar(t0('4-4') + 0.5, t1('4-8') - 0.5, { gain: 0.8 });
[ev.flip1, ev.flip2, ev.flip3].forEach((t) => { sfx.paper(t, 1.3); sfx.tick(t + 0.18, 1, 0.9); });
for (let i = 0; i < 6; i++) sfx.marimba(ev.bars + i * 0.22, ['D4', 'E4', 'F#4', 'A4', 'B4', 'D5'][i], 0.7);
sfx.lock(ev.shutter + 0.5, 1);
sfx.paper(ev.scroll, 1); for (let i = 0; i < 8; i++) sfx.clink(ev.coins + i * 0.3, 0.6);
ev.ticks.forEach((t) => sfx.tick(t, 1.1, 1.5));
sfx.whoosh(ev.slide, 0.6);
// Gwadar
sfx.river(t0('4-9'), t1('4-9'), 1.1);
sfx.birds(t0('4-9'), t1('4-9'), 0.9);
sfx.horn(ev.leave, 1);
// the Indus and the Accord
sfx.river(t0('4-10') - 0.5, t1('4-10') + 1, 1);
theme.drone(t0('4-10'), DURATION, { gain: 0.8 });
theme.accord(t0('4-10') + 1.5, DURATION, { gain: 1 });
sfx.pen(sc.lineById['4.14'].t, sc.lineById['4.14'].t + 3, 0.6);
sfx.pen(ev.sign, ev.sign + 1.4, 0.8);
sfx.stamp(ev.seal, 1.4); sfx.drum(ev.seal, 1);
['D4', 'A4', 'D5', 'F#5'].forEach((note, i) => theme.chime(ev.seal + 0.1 + i * 0.12, note, 1));

finish({ lufs: -14, fadeOut: 2.2, gains: { amb: 1.5 } });
