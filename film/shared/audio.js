// THE SOUND OF THE FILM (Node only) — the three music themes, the sound effects and the final mix.
// A part's song.js calls these with times taken from its score, so sound and picture share one timeline.
//   Bhaskar's theme: a Konkan bamboo flute over plucked strings (pentatonic, raga Bhoopali's notes)
//   Fatima's theme:  a harmonium over soft tabla (raga Yaman's notes)
//   The Accord:      both melodies together over strings
// All three sit on one drone in D so they can be combined.
const fs = require('fs');
const path = require('path');
const { SR, Bus, Sine, Pink, SVF, OnePole, rng, reverb } = require('../engine/audio/dsp');
const I = require('../engine/audio/instruments');
const MIX = require('../engine/audio/mix');
const Voice = require('../engine/audio/voice');
const { m, mtof } = require('../engine/music');

const TAU = Math.PI * 2;
const n = (name) => m(name);

// [note, beats]; '-' is a rest
const BHASKAR = [['A4', 2], ['B4', 1], ['D5', 3], ['B4', 1], ['A4', 1], ['F#4', 2], ['E4', 1], ['F#4', 1], ['D4', 4], ['-', 2],
  ['F#4', 1], ['A4', 1], ['B4', 2], ['A4', 1], ['F#4', 1], ['E4', 2], ['D4', 1], ['E4', 1], ['D4', 4], ['-', 4]];
const FATIMA = [['F#4', 1], ['G#4', 1], ['A4', 2], ['C#5', 1], ['B4', 1], ['A4', 2], ['G#4', 1], ['F#4', 1], ['E4', 2], ['F#4', 4], ['-', 2],
  ['A4', 1], ['B4', 1], ['C#5', 2], ['D5', 2], ['C#5', 1], ['B4', 1], ['A4', 2], ['G#4', 1], ['A4', 1], ['F#4', 4], ['-', 2]];
const ACCORD_HI = [['D5', 2], ['B4', 1], ['A4', 1], ['F#4', 2], ['A4', 2], ['B4', 2], ['D5', 2], ['E5', 1], ['D5', 1], ['B4', 2], ['A4', 4], ['-', 2]];
const ACCORD_LO = [['F#4', 2], ['G4', 2], ['A4', 2], ['F#4', 2], ['G4', 2], ['B4', 2], ['A4', 2], ['G4', 2], ['F#4', 4], ['-', 2]];
const ACCORD_CHORDS = [['D3', 'A3', 'D4', 'F#4'], ['B2', 'F#3', 'B3', 'D4'], ['G2', 'D3', 'G3', 'B3'], ['A2', 'E3', 'A3', 'C#4']];

// a breathy bamboo flute: a sine with a touch of octave, slow vibrato that grows, air noise
function flute(midi, dur, seed = 1) {
  const len = dur + 0.35, out = new Float32Array(Math.ceil(len * SR));
  const f = mtof(midi), o1 = new Sine(), o2 = new Sine(), air = new Pink(seed), bp = new SVF();
  for (let i = 0; i < out.length; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.09) * (t > dur ? Math.max(0, 1 - (t - dur) / 0.32) : 1);
    const vib = 1 + 0.006 * Math.min(1, t / 0.6) * Math.sin(TAU * 5 * t);
    const scoop = 1 - 0.02 * Math.exp(-t / 0.05); // each note is reached from just below
    const tone = o1.next(f * vib * scoop) * 0.8 + o2.next(f * 2 * vib * scoop) * 0.16;
    out[i] = (tone + bp.bp(air.next(), f * 2, 1.4) * 0.5) * env * 0.5;
  }
  return out;
}

module.exports = function sound(sc, dir) {
  const N = Math.ceil(sc.DURATION * SR);
  const bus = () => new Bus(N);
  const B = { drone: bus(), flute: bus(), harm: bus(), tabla: bus(), strings: bus(), pluck: bus(), fx: bus(), amb: bus(), verb: bus() };
  const fadeGain = (t, t0, t1, f = 1.2) => Math.max(0, Math.min(1, (t - t0) / f, (t1 - t) / f));

  // play a list of [note, beats] from t0, repeating until t1; `play(midi, dur, t, i)` makes the sound
  function phrase(notes, t0, t1, beat, play) {
    let t = t0, i = 0;
    while (t < t1 - beat) {
      const [name, beats] = notes[i % notes.length];
      const d = beats * beat;
      if (name !== '-' && t + d * 0.5 < t1) play(n(name), Math.min(d, t1 - t) * 0.94, t, i);
      t += d; i++;
    }
  }

  const theme = {
    // the drone: a tanpura-like cycle of plucked strings (Pa, Sa, Sa, low Sa)
    drone(t0, t1, { gain = 1 } = {}) {
      const cycle = ['A2', 'D3', 'D3', 'D2'];
      for (let t = t0, i = 0; t < t1 - 0.5; t += 0.92, i++) {
        const g = gain * fadeGain(t, t0, t1, 2.5);
        B.drone.addMono(I.guitar(n(cycle[i % 4]), 3.2, { bright: 0.35, sustain: 0.9985, seed: 5 + (i % 4) }), t, 0.22 * g, i % 2 ? 0.25 : -0.25);
      }
    },
    bhaskar(t0, t1, { gain = 1, beat = 0.92, pluck = true } = {}) {
      phrase(BHASKAR, t0, t1, beat, (midi, d, t, i) => { const f = flute(midi, d, i + 3); const g = gain * fadeGain(t, t0 - 0.5, t1 + 1, 1.5); B.flute.addMono(f, t, 0.5 * g, -0.15); B.verb.addMono(f, t, 0.3 * g); });
      if (pluck) for (let t = t0, i = 0; t < t1 - 1; t += beat * 2, i++) {
        const note = ['D3', 'A3', 'F#3', 'A3', 'B2', 'F#3', 'D3', 'A3'][i % 8];
        const g = gain * fadeGain(t, t0, t1, 2);
        B.pluck.addMono(I.guitar(n(note), 1.6, { bright: 0.45, seed: 20 + (i % 8) }), t, 0.3 * g, 0.2);
      }
    },
    fatima(t0, t1, { gain = 1, beat = 0.8, tabla = true } = {}) {
      phrase(FATIMA, t0, t1, beat, (midi, d, t, i) => { const h = I.harmonium(midi, d, { seed: i + 1, bright: 0.6 }); const g = gain * fadeGain(t, t0 - 0.5, t1 + 1, 1.5); B.harm.addStereo(h.L, h.R, t, 0.42 * g); B.verb.addStereo(h.L, h.R, t, 0.12 * g); });
      if (tabla) { // a soft six-beat dadra: dha dhin na | dha tin na
        const cyc = ['dha', 'tin', 'na', 'dha', 'tin', 'na'];
        for (let t = t0 + beat * 2, i = 0; t < t1 - 1; t += beat, i++) {
          const g = gain * fadeGain(t, t0, t1, 2) * (i % 6 === 0 ? 1 : 0.7);
          B.tabla.addMono(I.tabla(cyc[i % 6], { midi: 62, seed: i % 6 }), t, 0.32 * g, 0.1);
        }
      }
    },
    accord(t0, t1, { gain = 1, beat = 0.88 } = {}) {
      phrase(ACCORD_HI, t0, t1, beat, (midi, d, t, i) => { const f = flute(midi, d, i + 40); const g = gain * fadeGain(t, t0 - 0.5, t1 + 1, 1.5); B.flute.addMono(f, t, 0.5 * g, -0.25); B.verb.addMono(f, t, 0.32 * g); });
      phrase(ACCORD_LO, t0 + beat * 2, t1, beat, (midi, d, t, i) => { const h = I.harmonium(midi, d, { seed: i + 60, bright: 0.55 }); const g = gain * fadeGain(t, t0 - 0.5, t1 + 1, 1.5); B.harm.addStereo(h.L, h.R, t, 0.34 * g); });
      for (let t = t0, i = 0; t < t1 - 1; t += beat * 4, i++) {
        const g = gain * fadeGain(t, t0, t1, 3);
        for (const note of ACCORD_CHORDS[i % 4]) { const s = I.strings(n(note), beat * 4, { attack: 0.5, release: 1.2, bright: 0.7, seed: i }); B.strings.addStereo(s.L, s.R, t, 0.1 * g); B.verb.addStereo(s.L, s.R, t, 0.05 * g); }
        if (i % 2 === 0) B.tabla.addMono(I.tabla('dha', { midi: 62 }), t, 0.3 * g);
      }
    },
    // unease: a low held string and a slow heartbeat drum
    tension(t0, t1, { gain = 1 } = {}) {
      for (let t = t0; t < t1 - 1; t += 5.5) {
        const g = gain * fadeGain(t, t0, t1, 3);
        for (const note of ['D2', 'A2', 'Eb3']) { const s = I.strings(n(note), 5.5, { attack: 1.2, release: 1.5, bright: 0.45, seed: 7 }); B.strings.addStereo(s.L, s.R, t, 0.12 * g); }
      }
      for (let t = t0 + 1; t < t1 - 1; t += 1.6) B.tabla.addMono(I.thud(62, 0.16), t, 0.5 * gain * fadeGain(t, t0, t1, 3));
    },
    // one soft struck note of the Accord theme (a bell-like harmonium + pluck)
    chime(t, note = 'D5', gain = 1) { const g = I.guitar(n(note), 2.4, { bright: 0.6, sustain: 0.998 }); B.pluck.addMono(g, t, 0.4 * gain); B.verb.addMono(g, t, 0.3 * gain); },
  };

  // a bed of filtered noise between t0 and t1: `shape(t)` is its loudness, `freq(t)` its colour
  function bed(t0, t1, { gain = 0.2, freq = () => 800, q = 0.8, seed = 3, shape = () => 1, pan = 0, fade = 1.5, to = B.amb }) {
    const len = Math.ceil((t1 - t0) * SR), out = new Float32Array(len), p = new Pink(seed), f = new SVF();
    for (let i = 0; i < len; i++) { const t = i / SR; out[i] = f.bp(p.next(), freq(t), q) * shape(t) * Math.min(1, t / fade, (t1 - t0 - t) / fade); }
    to.addMono(out, t0, gain, pan);
  }
  const R = (seed) => { const r = rng(seed); return () => (r() + 1) / 2; };

  const sfx = {
    river(t0, t1, gain = 1) {
      bed(t0, t1, { gain: 0.5 * gain, seed: 11, q: 0.6, freq: (t) => 700 + 250 * Math.sin(t * 0.7), shape: (t) => 0.7 + 0.3 * Math.sin(t * 1.9) * Math.sin(t * 0.43), pan: -0.2 });
      bed(t0, t1, { gain: 0.25 * gain, seed: 12, q: 1.2, freq: (t) => 2400 + 600 * Math.sin(t * 1.3), shape: (t) => 0.5 + 0.5 * Math.sin(t * 3.1) ** 2, pan: 0.3 });
    },
    birds(t0, t1, gain = 1) {
      const r = R(31);
      for (let t = t0 + 0.5; t < t1 - 0.6; t += 0.9 + r() * 2.4) {
        const k = 2 + Math.floor(r() * 3), base = 2600 + r() * 1800, out = new Float32Array(Math.ceil(0.6 * SR)), o = new Sine();
        for (let i = 0; i < out.length; i++) { const x = i / SR, ph = (x * k * 2.2) % 1; out[i] = o.next(base * (1 + 0.25 * Math.sin(ph * Math.PI))) * Math.sin(ph * Math.PI) ** 2 * Math.max(0, 1 - x / 0.55) * 0.3; }
        B.amb.addMono(out, t, 0.22 * gain, r() * 1.6 - 0.8); B.verb.addMono(out, t, 0.06 * gain);
      }
    },
    wind(t0, t1, gain = 1) { bed(t0, t1, { gain: 0.5 * gain, seed: 17, q: 1.6, freq: (t) => 420 + 260 * Math.sin(t * 0.5) + 120 * Math.sin(t * 1.7), shape: (t) => 0.6 + 0.4 * Math.sin(t * 0.8) }); },
    // many low voices at once: a courtroom, a hall, a crowd far away. `size` 0..1
    murmur(t0, t1, { gain = 1, size = 0.4, rise = 0 } = {}) {
      const r = R(41 + Math.round(t0));
      const rate = 2 + size * 10;
      for (let t = t0; t < t1 - 0.4; t += (0.2 + r() * 0.8) / rate * 3) {
        const u = (t - t0) / (t1 - t0), g = gain * fadeGain(t, t0, t1, 1.2) * (1 - rise + rise * u);
        const v = I.voice(46 + Math.floor(r() * 14), 0.3 + r() * 0.6, { syl: ['a', 'o', 'u', 'e'][Math.floor(r() * 4)], type: r() > 0.6 ? 'alto' : 'tenor', seed: Math.floor(r() * 999), breath: 0.25, glide: r() * 2 - 1 });
        B.amb.addMono(v, t, 0.09 * g, r() * 1.8 - 0.9); B.verb.addMono(v, t, 0.05 * g);
      }
      bed(t0, t1, { gain: 0.16 * gain * (0.5 + size), seed: 43, q: 0.7, freq: () => 900, shape: (t) => 1 - rise + rise * (t / (t1 - t0)) });
    },
    gavel(t, gain = 1) { for (const dt of [0, 0.34]) { B.fx.addMono(I.woodTick(0.6), t + dt, 0.9 * gain); B.fx.addMono(I.thud(140, 0.05), t + dt, 0.5 * gain); B.verb.addMono(I.woodTick(0.6), t + dt, 0.5 * gain); } },
    bell(t, gain = 1, freq = 660) { const b = I.bell(freq, 1.6, 1.4, 2.76); B.fx.addMono(b, t, 0.35 * gain); B.verb.addMono(b, t, 0.3 * gain); },
    tear(t, gain = 1) { B.fx.addMono(I.noiseSweep(1.1, 5000, 900, { q: 0.7, pink: false, shape: (x) => Math.sin(Math.PI * x) * (0.6 + 0.4 * Math.sin(x * 90)) }), t, 0.5 * gain); B.fx.addMono(I.subBoom(1.8, 70, 30), t + 0.9, 0.5 * gain); },
    paper(t, gain = 1) { B.fx.addMono(I.paperFwip(0.9, Math.round(t * 10)), t, 0.4 * gain); },
    stamp(t, gain = 1) { B.fx.addMono(I.thud(90, 0.1), t, 0.8 * gain); B.fx.addMono(I.thwack(), t, 0.3 * gain); B.verb.addMono(I.thud(90, 0.1), t, 0.3 * gain); },
    drum(t, gain = 1) { const d = I.timpani(n('D2'), { decay: 1.4 }); B.fx.addMono(d, t, 0.6 * gain); B.verb.addMono(d, t, 0.3 * gain); },
    kettle(t0, t1, gain = 1) { bed(t0, t1, { gain: 0.14 * gain, seed: 51, q: 2.5, freq: () => 5200, shape: (t) => 0.7 + 0.3 * Math.sin(t * 7), pan: 0.5 }); },
    clink(t, gain = 1) { for (const [dt, f] of [[0, 2900], [0.05, 3400]]) { const b = I.bell(f, 0.25, 1.1, 2.4); B.fx.addMono(b, t + dt, 0.3 * gain, 0.2); B.verb.addMono(b, t + dt, 0.12 * gain); } },
    // a local train passing: wheel clatter that rises and falls, with a horn at the start
    train(t0, t1, gain = 1) {
      bed(t0, t1, { gain: 0.5 * gain, seed: 61, q: 0.6, freq: () => 300, shape: (t) => Math.sin(Math.PI * t / (t1 - t0)) ** 0.7, to: B.fx, fade: 0.3 });
      for (let t = t0, i = 0; t < t1 - 0.2; t += i % 2 ? 0.34 : 0.16, i++) { const u = (t - t0) / (t1 - t0); B.fx.addMono(I.thud(110, 0.04), t, 0.45 * gain * Math.sin(Math.PI * u), 2 * u - 1); }
    },
    typewriter(t0, t1, gain = 1) { const r = R(71); for (let t = t0; t < t1; t += 0.11 + r() * 0.22) B.fx.addMono(I.woodTick(1.5 + r() * 0.3), t, 0.22 * gain, 0.3); },
    pen(t0, t1, gain = 1) { B.fx.addMono(I.scribble(Math.max(0.2, t1 - t0), Math.round(t0 * 7)), t0, 0.3 * gain, 0.2); },
    // crowd: murmur plus a low roar. size 0..1, rise = swell over the range
    crowd(t0, t1, { gain = 1, size = 0.8, rise = 0.6 } = {}) {
      sfx.murmur(t0, t1, { gain: gain * 1.3, size, rise });
      bed(t0, t1, { gain: 0.35 * gain, seed: 81, q: 0.5, freq: () => 500, shape: (t) => 1 - rise + rise * (t / (t1 - t0)) });
    },
    // war room: soft radar pulses and radio hiss
    pulses(t0, t1, gain = 1) {
      for (let t = t0; t < t1 - 0.3; t += 1.25) { const b = I.bell(1320, 0.3, 0.6, 2); B.fx.addMono(b, t, 0.16 * gain, -0.4); B.verb.addMono(b, t, 0.1 * gain); }
      bed(t0, t1, { gain: 0.08 * gain, seed: 91, q: 3, freq: () => 3200, shape: (t) => (Math.sin(t * 2.3) > 0.3 ? 1 : 0.2), pan: 0.4 });
    },
    glitch(t, gain = 1) { const r = R(Math.round(t * 100)); for (let i = 0; i < 5; i++) B.fx.addMono(I.noiseSweep(0.06, 800 + r() * 5000, 400 + r() * 5000, { q: 4 }), t + i * 0.07, 0.3 * gain, r() * 2 - 1); },
    sting(t, gain = 1) { for (const [dt, note] of [[0, 'D4'], [0.14, 'F4'], [0.28, 'A4'], [0.42, 'D5']]) { const b = I.brassNote(n(note), 0.22, { bright: 0.7, stab: true }); B.fx.addStereo(b.L, b.R, t + dt, 0.22 * gain); } },
    siren(t0, t1, gain = 1) {
      const len = Math.ceil((t1 - t0) * SR), out = new Float32Array(len), o = new Sine(), lp = new OnePole();
      for (let i = 0; i < len; i++) { const t = i / SR; out[i] = lp.lp(o.next(620 + 180 * Math.sin(TAU * 0.45 * t)), 1200) * 0.3 * Math.min(1, t / 1, (t1 - t0 - t) / 1.5); }
      B.amb.addMono(out, t0, 0.14 * gain, -0.5); B.verb.addMono(out, t0, 0.14 * gain);
    },
    firework(t, seed = 1, gain = 1, pan = 0) { B.fx.addMono(I.launchWhistle(0.6), t - 0.6, 0.12 * gain, pan); B.fx.addMono(I.fireworkBurst(seed, 1), t, 0.6 * gain, pan); },
    footsteps(t0, t1, gain = 1, every = 0.55) { for (let t = t0, i = 0; t < t1; t += every, i++) B.fx.addMono(I.thud(180 + (i % 2) * 30, 0.03), t, 0.3 * gain, i % 2 ? 0.1 : -0.1); },
    horn(t, gain = 1) { for (const note of ['A2', 'E3']) { const b = I.brassNote(n(note), 1.6, { bright: 0.4 }); B.fx.addStereo(b.L, b.R, t, 0.18 * gain); B.verb.addStereo(b.L, b.R, t, 0.12 * gain); } },
    lock(t, gain = 1) { B.fx.addMono(I.thud(70, 0.12), t, 0.7 * gain); B.fx.addMono(I.woodTick(0.5), t, 0.5 * gain); },
    whoosh(t, gain = 1) { B.fx.addMono(I.noiseSweep(0.7, 300, 4000, { q: 1, pink: true }), t, 0.3 * gain); },
    snip(t, gain = 1) { B.fx.addMono(I.woodTick(2.2), t, 0.5 * gain); B.fx.addMono(I.woodTick(1.8), t + 0.07, 0.5 * gain); },
    tick(t, gain = 1, pitch = 1.2) { B.fx.addMono(I.woodTick(pitch), t, 0.3 * gain); },
    marimba(t, note = 'D5', gain = 1) { const x = I.marimba(n(note), {}); B.fx.addMono(x, t, 0.4 * gain); B.verb.addMono(x, t, 0.15 * gain); },
  };

  // lay the measured voice files on the timeline; who -> which character's mouth moves
  const MOUTH = { B: 'B', F: 'F', FU: 'F', N: 'N', NEWS: 'NEWS', MIN: 'MIN' };
  function voices() {
    const vb = bus(), hp = new OnePole();
    for (const l of sc.lines) {
      const file = path.join(dir, 'out', 'vo', `${l.id}.f32`);
      if (!fs.existsSync(file)) throw new Error(`voice for line ${l.id} is missing: run "node film/tools/speak.js ${path.basename(dir)}" first`);
      const b = fs.readFileSync(file), x = new Float32Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.length));
      const y = new Float32Array(x.length);
      for (let i = 0; i < x.length; i++) y[i] = hp.hp(x[i], 90);
      vb.addMono(y, l.t, 1, 0);
    }
    return vb;
  }

  // mix everything, duck the music under speech, master, write out/music.wav and out/voice.json
  function finish({ lufs = -14, gains = {}, fadeOut = 1.2, fadeIn = 0 } = {}) {
    const out = path.join(dir, 'out');
    fs.mkdirSync(out, { recursive: true });
    const voice = voices();
    const music = [B.drone, B.flute, B.harm, B.tabla, B.strings, B.pluck, B.verb];
    MIX.duck(music, voice, { depth: 0.62, release: 0.5 });
    MIX.duck([B.amb, B.fx], voice, { depth: 0.35, release: 0.4 });
    const G = { drone: 0.9, flute: 1, harm: 0.9, tabla: 0.8, strings: 1, pluck: 0.9, fx: 0.9, amb: 0.9, verb: 1, voice: 1.9, ...gains };
    const stems = { ...B, verb: reverb(B.verb, { room: 0.86, damp: 0.35 }), voice };
    const mix = MIX.mixdown(stems, G, { stemDir: process.env.STEMS ? out : null });
    MIX.highpass(mix, 24);
    if (fadeIn) mix.applyGain((t) => Math.min(1, t / fadeIn));
    MIX.fadeOut(mix, sc.DURATION - fadeOut, sc.DURATION);
    const M = MIX.master(mix, 0.8, undefined, { lufs });
    MIX.writeWav(path.join(out, 'music.wav'), mix);
    const vo = {
      engine: 'piper',
      lines: sc.lines.map((l) => ({ t: l.t, end: l.end, text: l.en, who: MOUTH[l.who] || l.who, words: [] })),
      mouth: Voice.mouthTrack(voice, sc.FPS || 30),
    };
    fs.writeFileSync(path.join(out, 'voice.json'), JSON.stringify(vo));
    console.log(`wrote out/music.wav (${sc.DURATION.toFixed(2)}s, ${M.lufs !== undefined ? M.lufs.toFixed(1) + ' LUFS' : 'unmeasured'}) and out/voice.json (${sc.lines.length} lines)`);
    return { mix, voice };
  }

  return { B, theme, sfx, finish, bed };
};
