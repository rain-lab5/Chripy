import type {Request, Response, NextFunction } from "express";
export type MiddleWare = (req : Request, res : Response, next : NextFunction) => void; 
import { config } from "../config.js";

export function middlewareMetricsInc(
    req : Request,
    res : Response,
    next : NextFunction
){
config.api.fileserverHits++;
next();
}