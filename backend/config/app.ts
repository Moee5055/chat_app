import express, { Express } from 'express';
import cors from 'cors';

//express app
const app: Express = express();

//middlewares
app.use(cors());
app.use(express.json());

export default app;
