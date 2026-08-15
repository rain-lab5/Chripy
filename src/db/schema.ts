import { pgTable, timestamp, varchar, uuid, text, boolean } from "drizzle-orm/pg-core";
//import { text } from "node:stream/consumers";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  email: varchar("email", { length: 256 }).unique().notNull(),
  hashed_password : varchar("hashed_password", { length: 255 }).notNull().default("unset"),
  is_chirpy_red: boolean("is_chirpy_red").notNull().default(false),
});


//--- TYPE INFER -INSERT- FROM TABLE ---//
export type NewUser = typeof users.$inferInsert;
//--- TYPE INFER -INSERT- FROM TABLE ---//

export type User = typeof users.$inferSelect;

export const chirps = pgTable("chirps",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),

    body: text("body").notNull(),
    user_id : uuid("user_id")
              .notNull()
              .references(()=>users.id,{onDelete:"cascade",}),
  }
);

export const refreshTokens = pgTable("refresh_tokens", {
  token: varchar("token", { length: 255 }).primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),
});

export type NewChirp = typeof chirps.$inferInsert;
export type NewRefreshToken = typeof refreshTokens.$inferInsert;
export type RefreshToken = typeof refreshTokens.$inferSelect;