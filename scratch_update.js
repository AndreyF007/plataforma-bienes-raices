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

const files = walkSync('C:/Users/andre/Documents/antigravity/cool-pythagoras/src/app/(public)/[domain]');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<Navbar tenantName={tenantData.name} />')) {
    content = content.replace(/<Navbar tenantName=\{tenantData\.name\} \/>/g, '<Navbar tenantName={tenantData.name} contactPhone={settings?.contactPhone} contactEmail={settings?.contactEmail} />');
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  } else if (content.includes('<Navbar tenantName={tenant.name} />')) {
    content = content.replace(/<Navbar tenantName=\{tenant\.name\} \/>/g, '<Navbar tenantName={tenant.name} contactPhone={settings?.contactPhone} contactEmail={settings?.contactEmail} />');
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});
