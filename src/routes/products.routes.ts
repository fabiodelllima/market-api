import { Router } from 'express';
import { createProductValidation } from '../middlewares/createProductValidation';
import {
  createProduct,
  deleteProduct,
  readOneProduct,
  readProduct,
  updateProduct,
} from '../logic';

export const productRouter = Router();

productRouter.post('/', createProductValidation, createProduct);
productRouter.get('/', readProduct);
productRouter.get('/:productId', readOneProduct);
productRouter.put('/:productId', updateProduct);
productRouter.delete('/:productId', deleteProduct);
