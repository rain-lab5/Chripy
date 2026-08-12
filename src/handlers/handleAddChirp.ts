import type { Request, Response } from "express";
import type { handler } from "../config.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import {NewChirp} from "../db/schema.js";
import { createChirp } from "../db/queries/chirps.js";
type TargetWord = "kerfuffle" | "sharbert" | "fornax";

const targetWords: TargetWord[] = [
  "kerfuffle",
  "sharbert",
  "fornax",
];

export async function handleAddChirp(req : Request, res : Response)
{
    const body = req.body;
       
      if (
        typeof body !== "object" ||
        body === null ||
        !("body" in body) ||
        typeof body.body !== "string" 
        || ("userId" in body) ||
        typeof body.userId !== "string"
      ) {
        res.status(400).json({
          error: "Invalid request body",
        });
        return;
      }
    
      if (body.body.length > 140) {
       throw new BadRequestError("Chirp is too long. Max length is 140");
      }
    
      //---at this point our json is ready---//
      const words = body.body.split(" ");
    
      const cleanedWords = words.map((word : string) => {
        if (targetWords.includes(word.toLocaleLowerCase() as TargetWord)) {
          return "****";
        }
    
        return word;
      });
      //--- This is the final chirpy message, filtered, validated ---//
      const cleanedBody = cleanedWords.join(" ");
     
      const chirp : NewChirp = {
        body : cleanedBody,
        //--- This is not secure for a while, since any user with the other user's id can post a chirp (IDOR)
        user_id : body.userId,
      }
      const createdChirp = await createChirp(chirp);
      if(!createdChirp)
      {
        res.status(400).json({
      error: "[!] Chirp Already exists",
    });
    return;
      }

      res.status(201).json({
        id : createdChirp.id,
        createdAt : createdChirp.createdAt,
        updatedAt : createdChirp.updatedAt,
        body : createdChirp.body,
        userId : createdChirp.user_id,
      })


}