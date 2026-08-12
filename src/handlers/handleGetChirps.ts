import type { Request, Response } from "express";
import { getAllChirps } from "../db/queries/chirps.js";

export async function handleGetChirps(req: Request, res: Response) {
  const chirps = await getAllChirps();

  res.status(200).json(
    chirps.map((chirp) => ({
      id: chirp.id,
      createdAt: chirp.createdAt,
      updatedAt: chirp.updatedAt,
      body: chirp.body,
      userId: chirp.user_id,
    }))
  );
}
