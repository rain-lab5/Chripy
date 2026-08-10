import type { Request, Response } from "express";


type TargetWord = "kerfuffle" | "sharbert" | "fornax";

const targetWords: TargetWord[] = [
  "kerfuffle",
  "sharbert",
  "fornax",
];

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

  //---at this point our json is ready---//
 const words = body.body.toLowerCase().split(" ");

  const cleanedWords = words.map((word : string) => {
    if (targetWords.includes(word as TargetWord)) {
      return "****";
    }

    return word;
  });

  const cleanedBody = cleanedWords.join(" ");


  res.status(200).json({
    cleanedBody,
  });
}