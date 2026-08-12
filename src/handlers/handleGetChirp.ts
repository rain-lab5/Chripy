import type { Request, Response } from "express";
import { getChirpById } from "../db/queries/chirps.js";

export async function handleGetChirp(req: Request, res: Response) {
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

  res.status(200).json({
    id: chirp.id,
    createdAt: chirp.createdAt,
    updatedAt: chirp.updatedAt,
    body: chirp.body,
    userId: chirp.user_id,
  });
}
