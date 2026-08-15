import type { Express } from "express";
import { handleCreateUser } from "../handlers/handleCreateUser.js";
import { handleUpdateInfo } from "../handlers/handleUpdateInfo.js";

export function registerUserRoutes(app: Express) {
  app.post("/api/users", handleCreateUser);
  app.put("/api/users", handleUpdateInfo);
}
