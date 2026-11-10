// Copies the one committed engine (film/engine) and the shared film code (film/shared) into every
// part's folder. The renderer only serves files inside a part's own folder, so each part needs its
// own copy; the copies are git-ignored and this script recreates them.
//   node film/sync.js            every part
//   node film/sync.js act-1      one part
const fs = require('fs');
const path = require('path');

const root = __dirname;
const wanted = process.argv.slice(2);
const parts = fs.readdirSync(root).filter((name) => fs.existsSync(path.join(root, name, 'score.js')));
const targets = wanted.length ? wanted : parts;

for (const part of targets) {
  if (!parts.includes(part)) throw new Error(`no film part "${part}" (have: ${parts.join(', ')})`);
  for (const dir of ['engine', 'shared']) {
    const dest = path.join(root, part, dir);
    fs.rmSync(dest, { recursive: true, force: true });
    fs.cpSync(path.join(root, dir), dest, { recursive: true });
  }
  console.log(`synced engine + shared -> film/${part}`);
}
