import express, {type Request, type Express, type Response} from 'express';
import {middlewareLogResponses} from "./middleware/logResponse.js";
import { middlewareMetricsInc } from './middleware/metrics.js';
import { handleMetrics } from './handlers/handlerMetrics.js';
import { handleResetHits } from './handlers/handleResetHits.js';
import { handleValidateChirp } from './handlers/handlerValidateChripy.js';
import { errorHandler } from './middleware/errorHandler.js';

const app : Express = express();
const PORT = 8080;

//---We can use this instead of manually constructing the body based on events like stream,on("data", functionality)---//
app.use(express.json());

app.use("/app",middlewareMetricsInc);
app.use("/app", express.static("./src/app"));
app.use(middlewareLogResponses);



//---We will replace this with an imported handler---//
app.get("/api/healthz", (req : Request, res : Response) => {
  res.set("Content-type","text/plain");
  res.status(200).send("OK");
});

app.get("/admin/metrics",handleMetrics);

app.post("/admin/reset",handleResetHits);

app.post("/api/validate_chirp",handleValidateChirp)



app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});