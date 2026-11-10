// THE SONG — Cold Open: the river at dawn, Bhaskar's flute, four notes of the Accord under the title.
const sc = require('./score');
const { theme, sfx, finish } = require('./shared/audio')(sc, __dirname);
const { byId, ev, DURATION } = sc;

const river0 = byId['C-2'].t0 - 1.5, title0 = byId['C-6'].t0;
sfx.bell(ev.card, 0.5, 587); // one soft note under the fiction card
sfx.river(river0, title0 + 2.5, 1);
sfx.birds(byId['C-2'].t0, title0, 0.9);
theme.drone(byId['C-2'].t0 + 1, DURATION - 0.5, { gain: 0.8 });
theme.bhaskar(byId['C-2'].t0 + 2.5, title0 - 0.5, { gain: 0.9 });
// the title: four rising notes of the Accord theme and a soft drum
['D4', 'F#4', 'A4', 'D5'].forEach((note, i) => theme.chime(ev.title + i * 0.55, note, 0.9));
sfx.drum(ev.title, 0.7);
theme.accord(ev.titleEn - 0.4, DURATION, { gain: 0.8 });

finish({ lufs: -14, fadeOut: 1.5 });
