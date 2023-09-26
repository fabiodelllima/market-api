import { Request, Response, NextFunction } from 'express';

export const isProductBodyValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];

  if (!req.body.name || typeof req.body.name !== 'string') {
    errors.push('Missing body parameter: name');
  }

  if (!req.body.price || typeof req.body.price !== 'number') {
    errors.push('Missing body parameter: price');
  }

  if (!req.body.weight || typeof req.body.weight !== 'number') {
    errors.push('Missing body parameter: weight');
  }

  if (
    !req.body.section ||
    typeof req.body.section !== 'string'
  ) {
    errors.push('Missing body parameter: section');
  }

  if (
    req.body.calories &&
    typeof req.body.calories !== 'number'
  ) {
    errors.push('Invalid body parameter: calories');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors: errors });
  }

  return next();
};
