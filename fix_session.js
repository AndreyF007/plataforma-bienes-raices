const fs = require('fs');
const files = [
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\api\\admin\\properties\\route.ts',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\api\\admin\\settings\\route.ts',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\api\\admin\\testimonials\\route.ts',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\api\\admin\\zones\\route.ts',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\dashboard\\layout.tsx',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\dashboard\\page.tsx',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\dashboard\\properties\\page.tsx',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\dashboard\\settings\\page.tsx',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\dashboard\\testimonials\\page.tsx',
  'C:\\Users\\andre\\Documents\\antigravity\\cool-pythagoras\\src\\app\\dashboard\\zones\\page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('import { authOptions }')) {
    content = content.replace('import { getServerSession } from "next-auth/next";', 'import { getServerSession } from "next-auth/next";\nimport { authOptions } from "@/app/api/auth/[...nextauth]/route";');
    content = content.replace('import { getServerSession } from "next-auth";', 'import { getServerSession } from "next-auth";\nimport { authOptions } from "@/app/api/auth/[...nextauth]/route";');
  }
  content = content.replace(/getServerSession\(\)/g, 'getServerSession(authOptions)');
  fs.writeFileSync(file, content);
});
console.log('Fixed all files');
