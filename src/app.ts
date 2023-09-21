import express, { Application } from 'express';
import { productRouter } from './routes/products.routes';

const app: Application = express();
const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;

app.use(express.json());
app.use('/products', productRouter);

app.listen(PORT, () => {
  console.log(runningMsg);
});
