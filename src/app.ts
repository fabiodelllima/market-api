import express, { Application, Router } from 'express';
import {
  createProduct,
  deleteProduct,
  readOneProduct,
  readProduct,
  updatePartialProduct,
} from './logics';
import {
  isProductBodyValid,
  isProductIdValid,
  isProductNameValid,
} from './middlewares';

const app: Application = express();
const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
const productRouter = Router();

app.use(express.json());
app.use('/products', productRouter);

app.listen(PORT, () => {
  console.log(runningMsg);
});

productRouter.get('/', readProduct);

productRouter.get('/:id', isProductIdValid, readOneProduct);

productRouter.post(
  '/',
  isProductBodyValid,
  isProductNameValid,
  createProduct
);

productRouter.patch(
  '/:id',
  isProductNameValid,
  isProductIdValid,
  updatePartialProduct
);

productRouter.delete('/:id', isProductIdValid, deleteProduct);
