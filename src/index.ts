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

app.get("/countries/:id", (c) => {
  const id = Number(c.req.param("id"));
  const country = countries.find((country) => country.id === id);
  return c.json(
    country || { message: "Country not found" },
    country ? 200 : 404
  );
});

app.get("/countries", (c) => {
  return c.json(countries);
});

// POST /countries
app.post("/countries", async (c) => {
  const json = await c.req.json();
  const newCountry: country = {
    id: countries.length + 1,
    name: json.name,
    description: json.description,
    imageUrl: json.imageUrl,
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
  const id = Number(c.req.param("id"));
  countries = countries.filter((country) => country.id !== id);
  return c.json({ message: "Country deleted" }, 201);
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
