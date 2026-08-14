import { and, eq, gt, isNull } from "drizzle-orm";
import { db } from "../index.js";
import { refreshTokens, type NewRefreshToken, type RefreshToken } from "../schema.js";

export async function createRefreshToken(token: NewRefreshToken): Promise<RefreshToken | undefined> {
  const [result] = await db
    .insert(refreshTokens)
    .values(token)
    .returning();

  return result;
}

export async function getRefreshTokenByToken(token: string): Promise<RefreshToken | undefined> {
  const [result] = await db
    .select()
    .from(refreshTokens)
    .where(eq(refreshTokens.token, token));

  return result;
}

export async function getUserFromRefreshToken(token: string): Promise<string | undefined> {
  const [result] = await db
    .select({ user_id: refreshTokens.user_id })
    .from(refreshTokens)
    .where(
      and(
        eq(refreshTokens.token, token),
        isNull(refreshTokens.revokedAt),
        gt(refreshTokens.expiresAt, new Date()),
      ),
    );

  return result?.user_id;
}

export async function revokeRefreshToken(token: string): Promise<void> {
  await db
    .update(refreshTokens)
    .set({
      revokedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(refreshTokens.token, token));
}
