import type { Request, Response } from "express";
import type { handler } from "../config.js";
import { deleteAllUsers } from "../db/queries/users.js";
import {config} from "../config.js";
import { ForbiddenError } from "../errors/ForbiddenError.js";


export async function handleDeleteUsers(req : Request, res : Response)
{
    //---This is a sensitve panel, only devs can access it!---//


    //--- Security Check ---//
    if(config.api.platform != "dev")
    {
        //--- errorHandler will catch this and assign it to its suitable code and send it ---//

        throw new ForbiddenError("Forbidden")
        return;
    }
    //--- Security Check ---//

    await deleteAllUsers();
    res.status(200).send("[+] Fields Deleted Successfully!");
}

