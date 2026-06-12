import { serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

import { varchar,timestamp,text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";




export let userTable=pgTable("users",{
id:serial("id").primaryKey(),
name:varchar("name",{length:255}).notNull(),
email:varchar("email",{length:255}).notNull().unique(),
password:varchar("password",{length:255}).notNull(),
role:varchar("role",{length:255}).notNull().default("user"),
address:text("address").notNull(),
phone:varchar("phone",{length:255}).notNull(),
createdAt:timestamp("created_at").notNull().defaultNow(),





}) 

export let createUserScheama=createInsertSchema(userTable).omit({id:true,createdAt:true,role:true});