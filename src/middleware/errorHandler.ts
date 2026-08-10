import type { Request, Response, NextFunction } from "express";

import { BadRequestError } from "../errors/BadRequestError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { ForbiddenError } from "../errors/ForbiddenError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
if (err instanceof BadRequestError) {
    res.status(400).json({
      error: err.message,
    });
    return;
  }

  if (err instanceof UnauthorizedError) {
    res.status(401).json({
      error: err.message,
    });
    return;
  }

  if (err instanceof ForbiddenError) {
    res.status(403).json({
      error: err.message,
    });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).json({
      error: err.message,
    });
    return;
  }

  console.log(err);

  res.status(500).json({
    error: "Something went wrong on our end",
  });
}