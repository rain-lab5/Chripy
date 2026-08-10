import express, {type Request, type Express, type Response} from 'express';
import {middlewareLogResponses} from "./middleware/logResponse.js";
import { middlewareMetricsInc } from './middleware/metrics.js';
import { handleMetrics } from './handlers/handlerMetrics.js';
import { handleResetHits } from './handlers/handleResetHits.js';
import { handleValidateChirp } from './handlers/handlerValidateChripy.js';

const app : Express = express();
const PORT = 8080;

app.use("/app",middlewareMetricsInc);
app.use("/app", express.static("./src/app"));
app.use(middlewareLogResponses);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

//---We will replace this with an imported handler---//
app.get("/api/healthz", (req : Request, res : Response) => {
  res.set("Content-type","text/plain");
  res.status(200).send("OK");
});

app.get("/admin/metrics",handleMetrics);

app.post("/admin/reset",handleResetHits);

app.post("/api/validate_chirp",handleValidateChirp)


