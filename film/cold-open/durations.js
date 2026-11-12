// Measured length of each spoken line, in seconds. Written by film/tools/speak.js — do not edit by hand.
(function () {
  const D = {
    "C2": 3.82,
    "C3": 4.92,
    "C4": 1.247,
    "C5": 4.32,
    "C6": 2.01
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = D; else globalThis.VOICE_DUR = D;
})();
