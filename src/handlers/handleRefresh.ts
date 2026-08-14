import type { Request, Response } from "express";
import { getBearerToken, makeJWT } from "../authentication/auth.js";
import { config } from "../config.js";
import { getUserFromRefreshToken } from "../db/queries/refreshTokens.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

export async function handleRefresh(req: Request, res: Response): Promise<void> {
  try {
    const refreshToken = getBearerToken(req);
    const userId = await getUserFromRefreshToken(refreshToken);

    if (!userId) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const token = makeJWT(userId, 60 * 60, config.secret);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(401).json({ error: error.message });
      return;
    }

    if (error instanceof Error) {
      res.status(401).json({ error: "Invalid refresh token" });
      return;
    }

    res.status(401).json({ error: "Invalid refresh token" });
  }
}
