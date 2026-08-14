import type { Request, Response } from "express";
import type { handler } from "../config.js";
import { checkPassowrdHash } from "../authentication/auth.js";
import {getUserByEmail} from "../db/queries/users.js";
import { makeJWT } from "../authentication/auth.js";
import {config} from '../config.js';

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

  let expiresInSeconds = 3600;

  if ("expiresInSeconds" in body) {
    if (typeof body.expiresInSeconds !== "number") {
    res.status(400).json({
      error: "Invalid request body",
    });
    return;
  }

  expiresInSeconds = Math.min(body.expiresInSeconds, 3600);
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

  const token = makeJWT(user.id,expiresInSeconds,config.secret);
  res.status(200).json({
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    token : token,
  });
}