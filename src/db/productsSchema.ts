import {
  pgTable,
  varchar,
  text,
  serial,
  integer,
  doublePrecision
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),

  description: text("description").notNull(),

  price: doublePrecision("price").notNull(),

  imgUrl: varchar("img_url", { length: 255 }).notNull()
});
