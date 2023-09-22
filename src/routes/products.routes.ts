import { Router } from 'express';
import { createProductValidation } from '../middlewares/createProductValidation';
import { checkProductIdExists } from '../middlewares/checkProductIdExists';
import { checkProductNameExists } from '../middlewares/checkProductNameExists';
import {
  createProduct,
  deleteProduct,
  readOneProduct,
  readProduct,
  updateProduct,
} from '../logic';

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

productRouter.delete(
  '/:id',
  checkProductIdExists,
  deleteProduct
);
