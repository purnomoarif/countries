import { PrismaClient } from "../src/generated/prisma";

const db = new PrismaClient();

async function main() {
  await db.continent.createMany({
    data: [
      { name: "Asia" },
      { name: "Europe" },
      { name: "Africa" },
      { name: "North America" },
      { name: "South America" },
      { name: "Australia" },
      { name: "Antarctica" },
    ],
    skipDuplicates: true,
  });

  // Tambahkan contoh negara ke tiap benua
  const asia = await db.continent.findUnique({ where: { name: "Asia" } });
  if (asia) {
    await db.country.createMany({
      data: [
        { name: "Indonesia", continentId: asia.id },
        { name: "Japan", continentId: asia.id },
        { name: "Thailand", continentId: asia.id },
      ],
    });
  }

  const europe = await db.continent.findUnique({ where: { name: "Europe" } });
  if (europe) {
    await db.country.createMany({
      data: [
        { name: "France", continentId: europe.id },
        { name: "Germany", continentId: europe.id },
        { name: "Italy", continentId: europe.id },
      ],
    });
  }

  const africa = await db.continent.findUnique({ where: { name: "Africa" } });
  if (africa) {
    await db.country.createMany({
      data: [
        { name: "Nigeria", continentId: africa.id },
        { name: "Egypt", continentId: africa.id },
        { name: "South Africa", continentId: africa.id },
      ],
    });
  }

  const na = await db.continent.findUnique({
    where: { name: "North America" },
  });
  if (na) {
    await db.country.createMany({
      data: [
        { name: "United States", continentId: na.id },
        { name: "Canada", continentId: na.id },
        { name: "Mexico", continentId: na.id },
      ],
    });
  }

  const sa = await db.continent.findUnique({
    where: { name: "South America" },
  });
  if (sa) {
    await db.country.createMany({
      data: [
        { name: "Brazil", continentId: sa.id },
        { name: "Argentina", continentId: sa.id },
        { name: "Chile", continentId: sa.id },
      ],
    });
  }

  const aus = await db.continent.findUnique({ where: { name: "Australia" } });
  if (aus) {
    await db.country.createMany({
      data: [
        { name: "Australia", continentId: aus.id },
        { name: "New Zealand", continentId: aus.id },
      ],
    });
  }

  const ant = await db.continent.findUnique({ where: { name: "Antarctica" } });
  if (ant) {
    await db.country.create({
      data: { name: "Research Stations", continentId: ant.id },
    });
  }
}

main()
  .then(() => {
    console.log("✅ Database seeded!");
  })
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
