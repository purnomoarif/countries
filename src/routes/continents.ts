import { Hono } from "hono";
import { db } from "../lib/db";

const continentsRoute = new Hono();

// GET /continents
continentsRoute.get("/", async (c) => {
  const continents = await db.continent.findMany();

  return c.json(continents);
});

// GET /continents/:id
continentsRoute.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const continent = await db.continent.findUnique({
    where: { id },
  });
  if (!continent) return c.notFound();

  return c.json(continent);
});

// POST /continents
continentsRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const newContinent = await db.continent.create({
      data: {
        name: body.name,
      },
    });

    return c.json(newContinent, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to create continent" }, 400);
  }
});

// DELETE /continents
continentsRoute.delete("/", async (c) => {
  const deleted = await db.continent.deleteMany();
  return c.json({ message: "All continents deleted", count: deleted.count });
});

// DELETE /continents/:id
continentsRoute.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const continent = await db.continent.delete({
    where: { id },
  });

  return c.json(continent);
});

// PATCH continent/:id
continentsRoute.patch("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const bodyJson = await c.req.json();

  const continent = await db.continent.update({
    where: { id },
    data: {
      name: bodyJson.name,
    },
  });
  return c.json(continent);
});

export default continentsRoute;
