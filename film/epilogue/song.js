// THE SONG — Epilogue. Fireworks and cheering, the night train, the river and Bhaskar's flute,
// and the Accord theme resolving under the closing line and the credits.
const sc = require('./score');
const { theme, sfx, finish } = require('./shared/audio')(sc, __dirname);
const { byId: by, ev, DURATION, fireworks } = sc;
const t0 = (id) => by[id].t0, t1 = (id) => by[id].t1;

fireworks.forEach((f) => sfx.firework(f.t, f.seed, f.u < 0 ? 0.45 : 0.8, f.u < 0 ? 0.3 : f.u * 1.6 - 0.8));
sfx.crowd(t0('E-1'), t1('E-1'), { size: 0.9, rise: 0.3, gain: 0.8 });
theme.drone(t0('E-1'), DURATION, { gain: 0.8 });
theme.accord(t0('E-1') + 1, t1('E-1'), { gain: 0.7 });
sfx.train(t0('E-2'), t1('E-2') + 0.6, 0.7);
sfx.horn(t0('E-2') + 0.5, 0.5);
sfx.river(t0('E-3') - 0.8, t1('E-4') + 1, 1);
sfx.birds(t0('E-3'), t1('E-4'), 0.9);
theme.bhaskar(t0('E-3') + 1, t1('E-3') - 0.5, { gain: 0.9 });
theme.accord(t0('E-4') + 0.3, DURATION, { gain: 1 });
['D4', 'F#4', 'A4', 'D5'].forEach((note, i) => theme.chime(ev.closing + i * 0.8, note, 0.9));

finish({ lufs: -14, fadeOut: 3.5, gains: { amb: 1.5 } });
