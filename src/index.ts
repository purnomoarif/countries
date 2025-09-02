import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Hello World!",
  });
});

app.get("/countries", (c) => {
  return c.json([
    {
      id: 1,
      name: "India",
      description: "India is a country in South Asia.",
      imageUrl: "https://example.com/india.png",
    },
    {
      id: 2,
      name: "USA",
      description:
        "The United States of America is a country primarily located in North America.",
      imageUrl: "https://example.com/usa.png",
    },
  ]);
});

export default app;
