import type { Express } from "express";
import { handleLogin } from "../handlers/handleLogin.js";
import { handleRefresh } from "../handlers/handleRefresh.js";
import { handleRevoke } from "../handlers/handleRevoke.js";

export function registerAuthRoutes(app: Express) {
  app.post("/api/login", handleLogin);
  app.post("/api/refresh", handleRefresh);
  app.post("/api/revoke", handleRevoke);
}
