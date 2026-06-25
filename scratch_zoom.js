const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (dirFile.endsWith('.tsx')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
}

const files = walkSync('C:/Users/andre/Documents/antigravity/cool-pythagoras/src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace hover zoom with automatic slow zoom
  content = content.replace(/group-hover:scale-105 transition-transform duration-\[3000ms\] ease-out/g, 'animate-slow-zoom');
  content = content.replace(/scale-100 group-hover:scale-105 transition-transform duration-\[3000ms\] ease-out/g, 'animate-slow-zoom');
  content = content.replace(/scale-105 transition-transform duration-\[10s\]/g, 'animate-slow-zoom');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed zoom in', file);
  }
});
