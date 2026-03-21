const fs = require('fs');
const readline = require('readline');

const filename = 'C:/Users/arnau/.claude/projects/C--Users-arnau-boutiques-lycee/10fd9f9b-774f-4cbf-b6ca-3f1aea76ac5e.jsonl';
const rl = readline.createInterface({ input: fs.createReadStream(filename), crlfDelay: Infinity });
let lineNum = 0;
let editOldStr = null, editNewStr = null;
let originalFile = null;

rl.on('line', (line) => {
  lineNum++;
  if (lineNum === 252) {
    try {
      const obj = JSON.parse(line);
      const content = (obj.message || {}).content || [];
      for (const item of content) {
        if (item.name === 'Edit') {
          editOldStr = item.input.old_string;
          editNewStr = item.input.new_string;
        }
      }
      console.log('Edit found, old_string len:', (editOldStr||'').length);
    } catch(e) { console.log('Error line 252:', e.message); }
  }
  if (lineNum === 254) {
    try {
      const obj = JSON.parse(line);
      originalFile = obj.toolUseResult.originalFile;
      console.log('originalFile found, length:', originalFile.length);
    } catch(e) { console.log('Error line 254:', e.message); }
  }
});

rl.on('close', () => {
  if (!originalFile) { console.log('No originalFile found'); return; }
  if (!editOldStr) { console.log('No edit found'); return; }

  let result = originalFile;
  const idx = result.indexOf(editOldStr);
  if (idx === -1) {
    console.log('old_string not found! Saving originalFile as-is');
    result = originalFile;
  } else {
    result = result.substring(0, idx) + editNewStr + result.substring(idx + editOldStr.length);
    console.log('Edit applied successfully at index ' + idx);
  }

  const outPath = 'C:/Users/arnau/boutiques-lycee/src/App.jsx';
  fs.writeFileSync(outPath, result, 'utf8');
  console.log('Saved to:', outPath);
  console.log('Total length:', result.length);
  console.log('First 200 chars:', result.substring(0, 200));
  console.log('Last 200 chars:', result.substring(result.length - 200));
});
