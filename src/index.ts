import { Hono } from "hono";
import { db } from "./lib/db";

const app = new Hono();

type Country = {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
};

let countries: Country[] = [
  { id: 1, name: "Indonesia" },
  { id: 2, name: "Malaysia" },
  { id: 3, name: "Singapore" },
  { id: 4, name: "Thailand" },
  { id: 5, name: "Vietnam" },
  { id: 6, name: "Philippines" },
  { id: 7, name: "Brunei" },
];

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

export default app;
