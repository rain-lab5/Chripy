import type { Express, Request, Response } from "express";

export function registerHealthRoutes(app: Express) {
  app.get("/api/healthz", (req: Request, res: Response) => {
    res.set("Content-type", "text/plain");
    res.status(200).send("OK");
  });
}
