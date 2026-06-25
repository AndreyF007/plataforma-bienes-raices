const fs = require('fs');

const luxuryHouses = [
  '1600596542815-ffad4c1539a9',
  '1600607686527-6fb886090705',
  '1512917774080-9991f1c4c750',
  '1600585154340-be6161a56a0c',
  '1600607687920-4e2a09cf159d'
];

const files = [
  'C:/Users/andre/Documents/antigravity/cool-pythagoras/src/app/(public)/[domain]/vendedor/page.tsx',
  'C:/Users/andre/Documents/antigravity/cool-pythagoras/src/app/(public)/[domain]/comprador/page.tsx',
  'C:/Users/andre/Documents/antigravity/cool-pythagoras/src/app/(public)/[domain]/portal/page.tsx',
  'C:/Users/andre/Documents/antigravity/cool-pythagoras/src/app/(public)/[domain]/blog/page.tsx',
  'C:/Users/andre/Documents/antigravity/cool-pythagoras/src/components/public/ValuationForm.tsx',
  'C:/Users/andre/Documents/antigravity/cool-pythagoras/src/components/ui/TestimonialSlider.tsx'
];

let idx = 0;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Find all unsplash photo URLs that are used in backgroundImage or img fields in these files
  // and replace them
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/g, (match) => {
    // If it's the agent photo, leave it
    if (match.includes('1560250097-0b93528c311a')) return match;
    
    const replacement = 'https://images.unsplash.com/photo-' + luxuryHouses[idx % luxuryHouses.length];
    idx++;
    return replacement;
  });
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed images in', file);
  }
});
