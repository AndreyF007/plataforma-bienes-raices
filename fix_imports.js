const fs = require('fs');
const files = [
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\api\\admin\\properties\\route.ts',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\api\\admin\\settings\\route.ts',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\api\\admin\\testimonials\\route.ts',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\api\\admin\\zones\\route.ts'
];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('import { authOptions }')) {
    content = 'import { authOptions } from "@/app/api/auth/[...nextauth]/route";\n' + content;
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
});
