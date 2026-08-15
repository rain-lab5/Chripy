import type { Express } from "express";
import { handlePolkaWebhook } from "../handlers/handlePolkaWebhook.js";

export function registerPolkaRoutes(app: Express) {
  app.post("/api/polka/webhooks", handlePolkaWebhook);
}
