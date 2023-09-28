import { Request, Response, NextFunction } from 'express';
import { market } from '../database';

export const isProductIdValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  if (!market.some((product) => product.id === id)) {
    return res
      .status(404)
      .json({ message: 'Product not found.' });
  }

  next();
};
