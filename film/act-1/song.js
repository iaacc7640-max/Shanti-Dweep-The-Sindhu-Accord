// THE SONG — Act I. Sepia court and the cracking map; Bhaskar's flute from Chiplun to his chamber;
// Fatima's harmonium from the lecture hall; both together over the chai glasses.
const sc = require('./score');
const { theme, sfx, finish } = require('./shared/audio')(sc, __dirname);
const { byId: by, ev, DURATION } = sc;
const t0 = (id) => by[id].t0, t1 = (id) => by[id].t1;

// 1916: the court
sfx.bell(t0('1-1') + 0.6, 0.8, 440); sfx.bell(t0('1-1') + 2.6, 0.6, 440);
sfx.murmur(t0('1-1') + 1, t1('1-2'), { size: 0.5, gain: 0.9 });
sfx.gavel(ev.gavel, 0.9);
sfx.murmur(t0('1-3'), ev.rise, { size: 0.3, gain: 0.6 });
theme.tension(t0('1-3') + 1, t1('1-4') - 1, { gain: 0.8 });
// 1947: the map cracks
sfx.tear(ev.crack, 1);
sfx.drum(ev.crack + 0.9, 0.9);
sfx.wind(t0('1-5') - 0.5, t1('1-5') + 1, 0.9);
// Chiplun, the burnt house, the college, the chamber: Bhaskar's theme
theme.drone(t0('1-6'), t1('1-16'), { gain: 0.7 });
theme.bhaskar(t0('1-6') + 0.6, t0('1-7') - 0.4, { gain: 0.9 });
sfx.birds(t0('1-6'), t1('1-6'), 0.6);
sfx.wind(t0('1-7'), t1('1-7'), 1);
theme.bhaskar(t0('1-8'), t1('1-9') - 0.5, { gain: 0.85 });
sfx.bell(t0('1-8') + 0.8, 0.5, 880); // a tram bell
sfx.typewriter(t0('1-9') + 0.3, t0('1-9') + 1.8, 0.8);
// the lecture hall and the corridor: Fatima's theme enters
theme.fatima(t0('1-10') + 0.5, t1('1-11') - 0.5, { gain: 0.9, tabla: false });
sfx.murmur(t0('1-10'), t0('1-10') + 4, { size: 0.3, gain: 0.5 });
sfx.footsteps(t0('1-11') + 0.1, t0('1-11') + 1.4, 0.7);
// the chai stall
sfx.kettle(t0('1-12'), t1('1-15'), 0.8);
sfx.horn(t0('1-12') + 0.4, 0.7);
sfx.train(t0('1-12') + 0.8, t1('1-12') + 1.5, 0.8);
sfx.murmur(t0('1-12'), t1('1-15'), { size: 0.25, gain: 0.45 });
theme.fatima(t0('1-12') + 1, t1('1-14') - 0.3, { gain: 0.9 });
sfx.marimba(ev.java, 'A4', 0.8); sfx.marimba(ev.java + 0.25, 'D5', 0.6); // a soft gong for Java
ev.icons.forEach((t, i) => { sfx.tick(t, 1.1, 0.8 + i * 0.1); sfx.stamp(t, 0.5); });
// the two themes together for the first time
theme.bhaskar(t0('1-15') + 0.3, t1('1-15'), { gain: 0.7, pluck: false });
theme.fatima(t0('1-15') + 0.3, t1('1-15'), { gain: 0.6, tabla: false });
sfx.pen(ev.write + 0.2, ev.write + 1.6, 0.8);
theme.accord(t0('1-16') + 0.5, DURATION, { gain: 0.85 });
sfx.clink(ev.clink, 1.2);
['D4', 'F#4', 'A4', 'D5'].forEach((note, i) => theme.chime(ev.clink + 0.25 + i * 0.5, note, 0.9));

finish({ lufs: -14, fadeOut: 1.6, gains: { amb: 1.5 } });
