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

app.post();

app.delete();

app.patch();

app.put();

export default app;
