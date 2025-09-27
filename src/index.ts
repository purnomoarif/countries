import { Hono } from "hono";
import { db } from "./lib/db";
import countriesRoute from "./routes/countries";
import continentsRoute from "./routes/continents";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Countries API");
});

app.route("/countries", countriesRoute);
app.route("/continents", continentsRoute);

export default app;
