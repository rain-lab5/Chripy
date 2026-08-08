import express, {type Request, type Express, type Response} from 'express';

const app : Express = express();
const PORT = 8080;

app.use("/app", express.static("./src/app"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/healthz", (req : Request, res : Response) => {
  res.set("Content-type","text/plain");
  res.status(200).send("OK");
});