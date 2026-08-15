import type { Request, Response } from "express";
import { config } from "../config.js";
import { getBearerToken, validateJWT } from "../authentication/auth.js";
import { deleteChirp, getChirpById } from "../db/queries/chirps.js";
import { ForbiddenError } from "../errors/ForbiddenError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export async function handleDeleteChirp(req: Request, res: Response) {
  const userId = validateJWT(getBearerToken(req), config.secret);
  const chirpId = req.params.chirpId;

  if (typeof chirpId !== "string") {
    res.status(404).send();
    return;
  }

  const chirp = await getChirpById(chirpId);

  if (!chirp) {
    res.status(404).send();
    return;
  }

  if (chirp.user_id !== userId) {
    throw new ForbiddenError("You can only delete your own chirps");
  }

  const deleted = await deleteChirp(chirpId);

  if (!deleted) {
    throw new NotFoundError("Chirp not found");
  }

  res.status(204).send();
}
