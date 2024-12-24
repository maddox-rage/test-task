import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { name: 'UI' },
      { name: 'Bugs' },
      { name: 'Performance' },
      { name: 'Functionality' },
    ],
  });

  const statuses = await prisma.status.createMany({
    data: [
      { name: 'Idea' },
      { name: 'Planned' },
      { name: 'In progress' },
      { name: 'Done' },
    ],
  });

  console.log(`Created`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
