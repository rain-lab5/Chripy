import type { Request, Response } from "express";
import { getAllChirps } from "../db/queries/chirps.js";

export async function handleGetChirps(req: Request, res: Response) {
  const authorId = req.query.authorId;
  const sort = req.query.sort;
  const chirps = await getAllChirps(
    typeof authorId === "string" ? authorId : undefined,
  );

  const normalizedSort = sort === "desc" ? "desc" : "asc";
  const sortedChirps = [...chirps].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();

    return normalizedSort === "desc" ? bTime - aTime : aTime - bTime;
  });

  res.status(200).json(
    sortedChirps.map((chirp) => ({
      id: chirp.id,
      createdAt: chirp.createdAt,
      updatedAt: chirp.updatedAt,
      body: chirp.body,
      userId: chirp.user_id,
    }))
  );
}
