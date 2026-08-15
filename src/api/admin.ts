import type { Express } from "express";
import { handleMetrics } from "../handlers/handlerMetrics.js";
import { handleDeleteUsers } from "../handlers/handleDeleteUsers.js";

export function registerAdminRoutes(app: Express) {
  app.get("/admin/metrics", handleMetrics);
  app.post("/admin/reset", handleDeleteUsers);
}
