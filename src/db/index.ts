//---In this file we create an object that we can use to access the database---//
//---Thats why i like Drizzle---//

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "./schema.js";
import { config } from "../config.js";

const conn = postgres(config.db.url);
export const db = drizzle(conn, { schema });

await conn.unsafe(`
  CREATE TABLE IF NOT EXISTS "refresh_tokens" (
    "token" varchar(255) PRIMARY KEY NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "user_id" uuid NOT NULL,
    "expires_at" timestamp NOT NULL,
    "revoked_at" timestamp
  );
`);

await conn.unsafe(`
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conname = 'refresh_tokens_user_id_users_id_fk'
    ) THEN
      ALTER TABLE "refresh_tokens"
      ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk"
      FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;
`);

const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);