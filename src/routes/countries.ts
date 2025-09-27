import { Hono } from "hono";
import { db } from "../lib/db";

const countriesRoute = new Hono();

// GET /countries
countriesRoute.get("/", async (c) => {
  try {
    const countries = await db.country.findMany();
    return c.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// GET /countries/:id
countriesRoute.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));

    const country = await db.country.findUnique({
      where: { id },
      include: { continent: true },
    });
    if (!country) return c.notFound();

    return c.json(country);
  } catch (error) {
    console.error("Error fetching country:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// POST /countries
countriesRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();

    if (!body.name || !body.continentId) {
      return c.json(
        {
          error: "Missing required fields: name, continentId",
        },
        400
      );
    }

    if (body.continentId) {
      const continentExists = await db.continent.findUnique({
        where: { id: Number(body.continentId) },
      });
      if (!continentExists) {
        return c.json({ error: "Continent not found" }, 400);
      }
    }

    const newCountry = await db.country.create({
      data: {
        name: body.name,
        continentId: Number(body.continentId),
      },
    });

    return c.json(newCountry, 201);
  } catch (error) {
    console.error("Error creating country:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// DELETE /countries
countriesRoute.delete("/", async (c) => {
  const deleted = await db.country.deleteMany();
  return c.json({ message: "All countries deleted", count: deleted.count });
});

// DELETE /countries/:id
countriesRoute.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const country = await db.country.delete({
    where: { id },
  });

  return c.json(country);
});

// PATCH countries/:id
countriesRoute.patch("/:id", async (c) => {
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

export default countriesRoute;
