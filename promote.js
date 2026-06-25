const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users:", users);

  if (users.length > 0) {
    const firstUser = users[0];
    await prisma.user.update({
      where: { id: firstUser.id },
      data: { role: 'superadmin' }
    });
    console.log(`Updated user ${firstUser.email} to superadmin`);
  } else {
    console.log("No users found in the database");
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
