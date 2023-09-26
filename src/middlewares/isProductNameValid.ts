import { Request, Response, NextFunction } from 'express';
import { market } from '../database';

export const isProductNameValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productExists = market.some((product) => {
    return product.name === req.body.name;
  });

  if (productExists) {
    return res.status(409).json({
      message: 'Product already registered.',
    });
  }

  next();
};
