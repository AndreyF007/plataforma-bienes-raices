const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const t = await prisma.tenant.findFirst();
  console.log("Tenant siteSettings type:", typeof t.siteSettings);
  console.log("Tenant siteSettings:", t.siteSettings);
  
  // Try to parse it
  try {
    const parsed = JSON.parse(t.siteSettings);
    console.log("Parsed type:", typeof parsed);
    if (typeof parsed === 'string') {
      console.log("Double parsed:", JSON.parse(parsed));
    }
  } catch(e) {
    console.log("Parse error:", e.message);
  }
}

check().finally(() => prisma.$disconnect());
