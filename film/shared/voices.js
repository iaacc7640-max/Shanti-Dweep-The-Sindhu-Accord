// WHO SPEAKS WITH WHICH VOICE (Node only). Three distinct voices for the three leads; the news
// reader and the minister reuse a voice at a shifted pitch, as the spec allows.
// The models are Piper voice files in film/voices/ (downloaded, not in git; see AGENTS.md).
const path = require('path');

const dir = path.join(__dirname, '..', 'voices');
const model = (name) => path.join(dir, `${name}.onnx`);

module.exports = {
  dir,
  N: { model: model('hi_IN-pratham-medium'), pitch: 1, slow: 1.08 }, // narrator: calm, a little slower
  B: { model: model('hi_IN-rohan-medium'), pitch: 0.97, slow: 1.1 }, // Bhaskar: measured
  F: { model: model('hi_IN-priyamvada-medium'), pitch: 1, slow: 1.04 }, // Fatima: firm
  FU: { model: model('ur_PK-aegis_female-medium'), pitch: 1, slow: 1.08 }, // Fatima's Urdu address
  NEWS: { model: model('hi_IN-pratham-medium'), pitch: 1.12, slow: 0.94 }, // news reader: brighter, faster
  MIN: { model: model('hi_IN-rohan-medium'), pitch: 0.88, slow: 1 }, // a minister: deeper
};
