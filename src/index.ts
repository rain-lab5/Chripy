import express, { type Express } from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import { middlewareLogResponses } from './middleware/logResponse.js';
import { middlewareMetricsInc } from './middleware/metrics.js';
import { registerAdminRoutes } from './api/admin.js';
import { registerAuthRoutes } from './api/auth.js';
import { registerChirpRoutes } from './api/chirps.js';
import { registerHealthRoutes } from './api/health.js';
import { registerPolkaRoutes } from './api/polka.js';
import { registerUserRoutes } from './api/users.js';

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use('/app', middlewareMetricsInc);
app.use('/app', express.static('./src/app'));
app.use(middlewareLogResponses);

registerHealthRoutes(app);
registerAdminRoutes(app);
registerUserRoutes(app);
registerChirpRoutes(app);
registerAuthRoutes(app);
registerPolkaRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});