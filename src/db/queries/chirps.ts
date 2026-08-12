import { db } from "../index.js";
import { eq } from "drizzle-orm";
import { NewChirp, chirps } from "../schema.js";

export type Chirp = typeof chirps.$inferSelect;

export async function createChirp(chirp: NewChirp) {
  const [result] = await db
    .insert(chirps)
    .values(chirp)
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function getAllChirps(): Promise<Chirp[]> {
  return await db
    .select()
    .from(chirps)
    .orderBy(chirps.createdAt);
}

export async function getChirpById(id: string): Promise<Chirp | undefined> {
  const [chirp] = await db
    .select()
    .from(chirps)
    .where(eq(chirps.id, id));

  return chirp;
}
