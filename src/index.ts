import express, {type Request, type Express, type Response} from 'express';
import {middlewareLogResponses} from "./middleware/logResponse.js";
import { middlewareMetricsInc } from './middleware/metrics.js';
import { handleMetrics } from './handlers/handlerMetrics.js';
import { handleResetHits } from './handlers/handleResetHits.js';
import { handleValidateChirp } from './handlers/handlerValidateChripy.js';
import { errorHandler } from './middleware/errorHandler.js';
import { handleCreateUser } from './handlers/handleCreateUser.js';
import { handleDeleteUsers } from './handlers/handleDeleteUsers.js';
import { handleAddChirp } from './handlers/handleAddChirp.js';
import { handleGetChirps } from './handlers/handleGetChirps.js';
import { handleGetChirp } from './handlers/handleGetChirp.js';
import { handleLogin } from './handlers/handleLogin.js';
import { handleRefresh } from './handlers/handleRefresh.js';
import { handleRevoke } from './handlers/handleRevoke.js';
import { handleUpdateInfo } from './handlers/handleUpdateInfo.js';
import { handleDeleteChirp } from './handlers/handleDeleteChirp.js';

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

app.post("/admin/reset",handleDeleteUsers);

//--- TO DELETE ---//
//app.post("/api/validate_chirp",handleValidateChirp)
//--- TO DELETE ---//

app.post("/api/users",handleCreateUser);
app.put("/api/users", handleUpdateInfo);

app.post("/api/chirps",handleAddChirp);
app.get("/api/chirps",handleGetChirps);
app.get("/api/chirps/:chirpId",handleGetChirp);
app.delete("/api/chirps/:chirpId", handleDeleteChirp);
app.post("/api/login",handleLogin);
app.post("/api/refresh", handleRefresh);
app.post("/api/revoke", handleRevoke);


//--- This must be after all methods, before the listen ---//
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});