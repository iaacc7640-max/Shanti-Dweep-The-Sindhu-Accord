// The design sheet is stills only: this writes two seconds of silence per frame so the tools that expect a soundtrack still run.
const { Bus, SR } = require('./engine/audio/dsp');
const MIX = require('./engine/audio/mix');
const sc = require('./score');
MIX.writeWav(require('path').join(__dirname, 'out', 'music.wav'), new Bus(Math.ceil(sc.DURATION * SR)));
