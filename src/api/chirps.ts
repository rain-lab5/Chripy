import type { Express } from "express";
import { handleAddChirp } from "../handlers/handleAddChirp.js";
import { handleGetChirp } from "../handlers/handleGetChirp.js";
import { handleGetChirps } from "../handlers/handleGetChirps.js";
import { handleDeleteChirp } from "../handlers/handleDeleteChirp.js";

export function registerChirpRoutes(app: Express) {
  app.post("/api/chirps", handleAddChirp);
  app.get("/api/chirps", handleGetChirps);
  app.get("/api/chirps/:chirpId", handleGetChirp);
  app.delete("/api/chirps/:chirpId", handleDeleteChirp);
}
