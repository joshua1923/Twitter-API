import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Routes from './src/api/routes/routes';

dotenv.config();

const app: Application = express();
const port = process.env.port;
const routes: Routes = new Routes();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.loadRoutes(app);

app.get("/", (req: Request, res: Response) => {
    res.send("App is running");
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});