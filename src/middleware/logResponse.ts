import type {Request, Response, NextFunction } from "express";

export type MiddleWare = (req : Request, res : Response, next : NextFunction) => void; 

export function middlewareLogResponses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.on("finish", () => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      console.log(
        `- '[NON-OK]'\n- '${req.method}'\n- '${req.url}'\n- 'Status: ${res.statusCode}'`,
      );
    }
  });

  next();
}