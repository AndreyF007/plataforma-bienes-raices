const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Regex to find text-black/ followed by numbers (10 to 90)
      // e.g. text-black/60, text-black/80
      // We only want to replace it with text-black
      const original = content;
      content = content.replace(/text-black\/[0-9]{1,3}\b/g, 'text-black');
      
      if (original !== content) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDir('./src/app/(public)');
processDir('./src/components');
console.log('Done!');
