import { geometry, index, pgTable, text } from "drizzle-orm/pg-core";

export const stores = pgTable(
  "stores",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    address: text("address").notNull(),
    country: text("country").notNull(),
    city: text("city").notNull(),
    location: geometry("location", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
  },
  (t) => ({
    spatialIndex: index("spatial_index").using("gist", t.location),
  })
);
