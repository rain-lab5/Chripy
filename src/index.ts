import express, {type Request, type Express, type Response} from 'express';
import {middlewareLogResponses} from "./middleware/logResponse.js";
import { middlewareMetricsInc } from './middleware/metrics.js';
import { handlerMetrics } from './handlers/handlerMetrics.js';
import { handleResetHits } from './handlers/handleResetHits.js';

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

app.get("/admin/metrics",handlerMetrics);

app.get("/admin/reset",handleResetHits);


