// THE SCORE for the design sheet: six still frames, two seconds each. No music.
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const FPS = 30;
  const FORMAT = U.pickFormat('16:9');
  const STYLE = 'watercolor';
  const FRAMES = ['cast', 'river', 'court', 'chai', 'election', 'warroom'];
  const HOLD = 2;
  const DURATION = FRAMES.length * HOLD;
  const S = Object.fromEntries(FRAMES.map((name, i) => [name, [i * HOLD, (i + 1) * HOLD]]));
  const markers = Object.fromEntries(FRAMES.map((name, i) => [name, i * HOLD + 1]));
  const SCORE = { FPS, FORMAT, STYLE, DURATION, S, FRAMES, HOLD, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
