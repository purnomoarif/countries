import { PrismaClient } from "../src/generated/prisma";

const db = new PrismaClient();

async function main() {
  // contoh: seed continent + country
  await db.continent.create({
    data: {
      name: "Asia",
      Country: {
        create: [
          { name: "Indonesia" },
          { name: "Japan" },
          { name: "Thailand" },
        ],
      },
    },
  });
}

main()
  .then(() => {
    console.log("✅ Database seeded!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
