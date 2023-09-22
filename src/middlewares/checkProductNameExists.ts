import { Request, Response, NextFunction } from 'express';
import { market } from '../database';

export const checkProductNameExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productExists = market.some((product) => {
    return product.name === req.body.name;
  });

  if (productExists) {
    return res.status(401).json({
      error: 'You cannot register an product with the same name',
    });
  }

  next();
};
