import { PrismaClient } from "./src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Create a new country
  const newCountry = await prisma.country.create({
    data: {
      name: "Palestine",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log({ newCountry });
  const countries = await prisma.country.findMany();
  console.log({ countries });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
