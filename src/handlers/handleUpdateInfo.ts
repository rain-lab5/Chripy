import type { Request, Response } from "express";
import { config } from "../config.js";
import { getBearerToken, hashPassword, validateJWT } from "../authentication/auth.js";
import { updateUser } from "../db/queries/users.js";

export async function handleUpdateInfo(req: Request, res: Response) {
  
  const userId = validateJWT(getBearerToken(req), config.secret);

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
      error: "Invalid request body",
    });
    return;
  }

  const updatedUser = await updateUser(userId, {
    email: body.email,
    hashed_password: await hashPassword(body.password),
  });

  if (!updatedUser) {
    res.status(404).json({
      error: "User not found",
    });
    return;
  }

  res.status(200).json({
    id: updatedUser.id,
    email: updatedUser.email,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  });
}


