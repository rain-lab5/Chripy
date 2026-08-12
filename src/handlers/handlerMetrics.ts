
import {config} from "../config.js";
import type {Request, Response} from "express";


export async function handleMetrics(req : Request, res : Response)
{
//---The browser will render this---//
const html = 
`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.api.fileserverHits} times!</p>
  </body>
</html>
`;


res.set("Content-Type", "text/html; charset=utf-8")
   .status(200)
   .send(html);

}