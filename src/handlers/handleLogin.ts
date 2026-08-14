import type { Request, Response } from "express";
import { checkPassowrdHash, makeJWT, makeRefreshToken } from "../authentication/auth.js";
import { config } from "../config.js";
import { createRefreshToken } from "../db/queries/refreshTokens.js";
import { getUserByEmail } from "../db/queries/users.js";

export async function handleLogin(req: Request, res: Response) {
  const body = req.body;

  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    typeof body.email !== "string" ||
    !("password" in body) ||
    typeof body.password !== "string"
  ) {
    res.status(400).json({
      error: "Invalid request body...",
    });
    return;
  }

  const user = await getUserByEmail(body.email);

  if (!user) {
    res.status(401).json({
      error: "Invalid email or password",
    });
    return;
  }

  const passwordValid = await checkPassowrdHash(
    body.password,
    user.hashed_password,
  );

  if (!passwordValid) {
    res.status(401).json({
      error: "Invalid email or password",
    });
    return;
  }

  const token = makeJWT(user.id, 60 * 60, config.secret);
  const refreshToken = makeRefreshToken();
  const refreshTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 60);

  await createRefreshToken({
    token: refreshToken,
    user_id: user.id,
    expiresAt: refreshTokenExpiresAt,
    revokedAt: null,
  });

  res.status(200).json({
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    token,
    refreshToken,
  });
}