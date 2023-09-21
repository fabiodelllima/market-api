import express, { Application } from 'express';
const app: Application = express();
const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;

app.use(express.json());
