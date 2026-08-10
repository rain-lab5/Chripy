import type { Request, Response } from "express";

export async function handleValidateChirp(req: Request, res: Response) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    let parsed: unknown;

    //---Parse the JSON---//
    try {
      parsed = JSON.parse(body);
    } catch {
      res.status(400).json({
        error: "Invalid JSON",
      });
      return;
    }

    //---Validate the request shape---//
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("body" in parsed) ||
      typeof parsed.body !== "string"
    ) {
      res.status(400).json({
        error: "Invalid request body",
      });
      return;
    }

    //---Apply Chirpy's business rule---//
    if (parsed.body.length > 140) {
      res.status(400).json({
        error: "Chirp is too long",
      });
      return;
    }

    //---Valid chirp---//
    res.status(200).json({
      valid: true,
    });
  });

  
  req.on("error", () => {
    res.status(500).json({
      error: "Failed to read request body",
    });
  });
}