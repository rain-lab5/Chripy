import { db } from "../index.js";
import { NewUser, users,User} from "../schema.js";
import {eq} from "drizzle-orm";

//---CREATE UESR QUERY---//
export async function createUser(user: NewUser) {
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning({
      //--- We can specify what columns to return, by doing this, we can execlude the hashed_password column ---//
      id: users.id,
      email: users.email,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });
  return result;
}

export async function deleteAllUsers()
{
  await db.delete(users);
}

export async function getUserByEmail(email : string) : Promise<User | undefined>
{
  const [result] = await db.select().from(users).where(eq(users.email,email));
  return result;
}

export async function updateUser(
  userId: string,
  updates: Partial<Pick<User, "email" | "hashed_password">>,
): Promise<Omit<User, "hashed_password"> | undefined> {
  const [result] = await db
    .update(users)
    .set(updates)
    .where(eq(users.id, userId))
    .returning({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  return result;
}
