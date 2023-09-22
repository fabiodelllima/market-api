import { Request, Response, NextFunction } from 'express';
import { market } from '../database';

export const checkProductIdExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!market.some((product) => product.id === +req.params.id)) {
    return res
      .status(404)
      .json({ error: 'Not found any product with this id' });
  }

  next();
};
