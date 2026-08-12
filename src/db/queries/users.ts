import { db } from "../index.js";
import { NewUser, users } from "../schema.js";

//---CREATE UESR QUERY---//
export async function createUser(user: NewUser) {
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning();
  return result;
}

