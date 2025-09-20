import { Hono } from "hono";
import { db } from "./lib/db";

const app = new Hono();

type country = {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
};

let countries: country[] = [
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

// GET /country by id
app.get("/country/:id", (c) => {
  const id = Number(c.req.param("id"));
  const country = countries.find((country) => country.id === id);
  return c.json(
    country || { message: "Country not found" },
    country ? 200 : 404
  );
});

// POST /countries
app.post("/countries", async (c) => {
  const body = await c.req.json();

  const newCountry: country = {
    id: countries.length > 0 ? countries[countries.length - 1].id + 1 : 1,
    name: body.name,
    description: body.description,
    imageUrl: body.imageUrl,
  };

  countries.push(newCountry);

  return c.json(newCountry, 201);
});

// DELETE / countries
app.delete("/countries", (c) => {
  countries = [];
  return c.json({ message: "All countries deleted" }, 201);
});

// DELETE /countries/:id

app.delete("/countries/:id", (c) => {
  const id = c.req.param("id");

  const foundCountry = countries.find((country) => country.id === Number(id));

  if (!foundCountry) {
    return c.json({ message: "Country not found" }, 404);
  }

  const newCountries = countries.filter((p) => p.id !== Number(id));

  countries.splice(0, countries.length, ...newCountries);

  return c.json({ message: "Country deleted", deletedCountry: foundCountry });
});

// PATCH /countries/:id
app.patch("/countries/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const json = await c.req.json();
  const country = countries.find((country) => country.id === id);
  if (country) {
    Object.assign(country, json);
    return c.json(country);
  }
  return c.json({ message: "Country not found" }, 404);
});

// PUT /countries/:id
app.put("/countries/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const json = await c.req.json();
  const country = countries.find((country) => country.id === id);
  if (country) {
    Object.assign(country, json);
    return c.json(country);
  }
  return c.json({ message: "Country not found" }, 404);
});

export default app;
