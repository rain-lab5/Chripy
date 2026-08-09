import type { handler } from "../config.js";
import {config} from "../config.js";
import type {Request, Response} from "express";

export function handleResetHits(req : Request, res : Response)
{
    //---Hitting any endpoint this handler is assigned to will reset the counter---//
   config.fileserverHits = 0; 
    res.status(200).send("[+] Counter is reset down to 0 successfully!");
}