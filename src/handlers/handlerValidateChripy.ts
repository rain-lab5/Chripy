import type { Request, Response } from "express";

export function handleValidateChirp(req: Request, res: Response) {
  
    //---I replaced the manual constructing of body---//
    const body = req.body;

  if (
    typeof body !== "object" ||
    body === null ||
    !("body" in body) ||
    typeof body.body !== "string"
  ) {
    res.status(400).json({
      error: "Invalid request body",
    });
    return;
  }

  if (body.body.length > 140) {
    res.status(400).json({
      error: "Chirp is too long",
    });
    return;
  }

  res.status(200).json({
    valid: true,
  });
}