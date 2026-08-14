import type { Request, Response } from "express";
import type { handler } from "../config.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import {NewChirp} from "../db/schema.js";
import { createChirp } from "../db/queries/chirps.js";
import { getBearerToken,validateJWT } from "../authentication/auth.js";
import {config} from '../config.js';

type TargetWord = "kerfuffle" | "sharbert" | "fornax";


const targetWords: TargetWord[] = [
  "kerfuffle",
  "sharbert",
  "fornax",
];

export async function handleAddChirp(req : Request, res : Response)
{
    const body = req.body;


    //--- For debugging the problem, delete these after fixing ---//
    console.log("REQUEST BODY:", body);
    console.log("BODY TYPE:", typeof body);
    //--- For debugging the problem, delete these after fixing ---//  


        if (
            typeof body !== "object" ||
            body === null ||
            !("body" in body) ||
            typeof body.body !== "string"
            ){
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
     

      const recievedToken = getBearerToken(req);
      const userID = validateJWT(recievedToken,config.secret);
      const chirp : NewChirp = {
        body : cleanedBody,
        user_id : userID,
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