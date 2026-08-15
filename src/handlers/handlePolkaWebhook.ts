import type { Request, Response } from "express";
import { upgradeUserToChirpyRed } from "../db/queries/users.js";

export async function handlePolkaWebhook(req: Request, res: Response) {
  const body = req.body;

  if (
    typeof body !== "object" ||
    body === null ||
    !("event" in body) ||
    typeof body.event !== "string" ||
    body.event !== "user.upgraded"
  ) {
    res.status(204).send();
    return;
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("data" in body) ||
    typeof body.data !== "object" ||
    body.data === null ||
    !("userId" in body.data) ||
    typeof body.data.userId !== "string"
  ) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const updatedUser = await upgradeUserToChirpyRed(body.data.userId);

  if (!updatedUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.status(204).send();
}
