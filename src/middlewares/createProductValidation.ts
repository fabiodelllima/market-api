import { Request, Response, NextFunction } from 'express';

export const createProductValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];

  if (!req.body.name) {
    errors.push('Missing body parameter: name');
  }

  if (!req.body.price) {
    errors.push('Missing body parameter: price');
  }

  if (errors.length > 0) {
    res.status(422).json({ errors: errors });
  }

  return next();
};
