import argon2 from "argon2";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { randomBytes } from "node:crypto";
import type { Request } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

type Payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export async function hashPassword(password : string) : Promise<string>
{
    const hashedPassowrd = await argon2.hash(password);
    return hashedPassowrd;

}

export async function checkPassowrdHash(password : string, hash : string) : Promise<boolean>
{
    //--- replacing the password parameter with the hash, since the .verify from argon2 accepts the first parameter as the hash.....
    return await argon2.verify(hash,password); 
}

export function makeJWT(userID : string, expiresIn : number, secret : string) : string
{
    const issAt = Math.floor(Date.now() / 1000);
    const payload : Payload = {
        iss : "chirpy",
        sub : userID,
        iat : issAt,
        exp : issAt + expiresIn,
    };
    return jwt.sign(payload,secret);
}

export function makeRefreshToken(): string {
  return randomBytes(32).toString("hex");
}

export function validateJWT(tokenString:string,secret : string) : string
{
    try{
        const decoded = jwt.verify(tokenString,secret); //---This will return a jwt object---//
        if(typeof decoded === "string")
        {
            throw new Error("[!] Invalid JWT payload");
        }//--- since the decoded jwt must be an object ---//
        if(!decoded.sub)
        {
            throw new Error("Invalid JWT payload");
        }
        return decoded.sub;

    }
    catch
    {
        throw new UnauthorizedError("Invalid JWT");
    }
}


export function getBearerToken(req: Request): string {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new UnauthorizedError("Authorization header is missing");
  }

  const parts = authHeader.trim().split(/\s+/);

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new UnauthorizedError("Invalid Authorization header");
  }

  return parts[1];
}

