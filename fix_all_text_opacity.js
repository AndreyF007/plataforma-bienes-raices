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
      
      const original = content;
      // Replace text-black/XX with text-black
      content = content.replace(/text-black\/[0-9]{1,3}\b/g, 'text-black');
      // Replace text-white/XX with text-white
      content = content.replace(/text-white\/[0-9]{1,3}\b/g, 'text-white');
      
      if (original !== content) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDir('./src/app/(public)');
processDir('./src/components');
console.log('Done fixing all text opacities!');
