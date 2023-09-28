import { Router } from 'express';
import { isProductBodyValid } from '../middlewares/isProductBodyValid';
import { isProductIdValid } from '../middlewares/isProductIdValid';
import { isProductNameValid } from '../middlewares/isProductNameValid';
import {
  createProduct,
  deleteProduct,
  readOneProduct,
  readProduct,
  updatePartialProduct,
} from '../logic';

export const productRouter = Router();

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
