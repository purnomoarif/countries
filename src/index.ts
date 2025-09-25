import { Hono } from "hono";
import { db } from "./lib/db";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    title: "Countries API",
    author: "Purnomo Arif",
  });
});

// GET /countries
app.get("/countries", async (c) => {
  const countries = await db.country.findMany();
  return c.json(countries);
});

// GET /countries/:id
app.get("/countries/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const country = await db.country.findUnique({
    where: { id },
  });
  if (!country) return c.notFound();

  return c.json(country);
});

// POST /countries
app.post("/countries", async (c) => {
  const body = await c.req.json();

  const newCountry = await db.country.create({
    data: {
      name: body.name,
    },
  });

  return c.json(newCountry, 201);
});

// DELETE /countries
app.delete("/countries", async (c) => {
  const deleted = await db.country.deleteMany();
  return c.json({ message: "All countries deleted", count: deleted.count });
});

// DELETE /countries/:id
app.delete("/countries/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const country = await db.country.delete({
    where: { id },
  });

  return c.json(country);
});

// PATCH countries/:id
app.patch("/countries/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const bodyJson = await c.req.json();

  const country = await db.country.update({
    where: { id },
    data: {
      name: bodyJson.name,
      continentId: bodyJson.continentId,
    },
  });
  return c.json(country);
});

// GET /continent
app.get("/continents", async (c) => {
  const continents = await db.continent.findMany();

  return c.json(continents);
});

// GET /continents/:id
app.get("/continents/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const continent = await db.continent.findUnique({
    where: { id },
  });
  if (!continent) return c.notFound();

  return c.json(continent);
});

// POST /continents
app.post("/continents", async (c) => {
  const body = await c.req.json();

  const newContinent = await db.continent.create({
    data: {
      name: body.name,
    },
  });

  return c.json(newContinent, 201);
});

// DELETE /continents
app.delete("/continents", async (c) => {
  const deleted = await db.continent.deleteMany();
  return c.json({ message: "All continents deleted", count: deleted.count });
});

// DELETE /continents/:id
app.delete("/continents/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const continent = await db.continent.delete({
    where: { id },
  });

  return c.json(continent);
});

// PATCH continent/:id
app.patch("/continents/:id", async (c) => {
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

export default app;
