import type { Request, Response } from "express";
import { getBearerToken } from "../authentication/auth.js";
import { getRefreshTokenByToken, revokeRefreshToken } from "../db/queries/refreshTokens.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

export async function handleRevoke(req: Request, res: Response): Promise<void> {
  try {
    const refreshToken = getBearerToken(req);
    const token = await getRefreshTokenByToken(refreshToken);

    if (!token || token.revokedAt || token.expiresAt < new Date()) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    await revokeRefreshToken(refreshToken);
    res.status(204).send();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(401).json({ error: error.message });
      return;
    }

    res.status(401).json({ error: "Invalid refresh token" });
  }
}
