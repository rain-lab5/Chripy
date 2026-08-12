import type { Request, Response } from "express";
import type { handler } from "../config.js";
import {NewUser} from "../db/schema.js";
import { createUser } from "../db/queries/users.js";

export async function handleCreateUser(req : Request, res : Response)
{

    const body = req.body;
   
  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    typeof body.email !== "string"
  ) {
    res.status(400).json({
      error: "Invalid request body",
    });
    return;
  }

  const user : NewUser = {
    email : body.email,
  }
  const createdUser = await createUser(user);

  if (!createdUser) {
    res.status(400).json({
      error: "User already exists",
    });
    return;
  }
  
  res.status(201).json({
    id: createdUser.id,
    email: createdUser.email,
    createdAt: createdUser.createdAt,
    updatedAt: createdUser.updatedAt,
  });

    
}