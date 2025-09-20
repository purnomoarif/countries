import { Hono } from "hono";

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

app.get("/countries", (c) => {
  return c.json(countries);
});

app.get("/countries/:id", (c) => {
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

  const foundCountry = countries.find(
    (country) => country.name.toLowerCase() === body.name.toLowerCase()
  );

  if (foundCountry) {
    return c.json({ message: "Country already exists" }, 409);
  }

  const newCountry = {
    id: countries.length ? countries[countries.length - 1].id + 1 : 1,
    ...body,
  };

  countries.push(newCountry);

  return c.json({ message: "country added", newCountry }, 200);
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
