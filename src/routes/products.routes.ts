import { Router } from 'express';
import { createProductValidation } from '../middlewares/createProductValidation';
import {
  createProduct,
  deleteProduct,
  readOneProduct,
  readProduct,
  updateProduct,
} from '../logic';
import { checkProductNameExists } from '../middlewares/checkProductNameExists';

export const productRouter = Router();

productRouter.post(
  '/',
  createProductValidation,
  checkProductNameExists,
  createProduct
);

productRouter.get('/', readProduct);
productRouter.get('/:id', readOneProduct);
productRouter.put('/:id', updateProduct);
productRouter.patch('/:id');
