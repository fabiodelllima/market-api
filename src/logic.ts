import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { market } from './database';
import { IProduct } from './interfaces';

export const createProduct = (req: Request, res: Response) => {
  const newProduct: IProduct = { id: uuidv4(), ...req.body };

  market.push(newProduct);

  return res.status(201).json({
    message: 'Product succesfully created',
    product: newProduct,
  });
};

export const readProduct = (req: Request, res: Response) => {
  return res.status(200).json(market);
};

export const readOneProduct = (req: Request, res: Response) => {
  const product = market.find((product) => {
    return product.id === +req.params.id;
  });

  return res.status(200).json(product);
};

export const updateProduct = (req: Request, res: Response) => {
  const index = market.findIndex((product) => {
    return product.id === +req.params.id;
  });

  const newProduct = {
    id: Number(req.params.id),
    name: String(req.body.name),
    price: Number(req.body.price),
    weight: Number(req.body.weight),
    section: String(req.body.section),
    calories: Number(req.body.calories),
    // expirationDate: Date(),
  };

  market.splice(index, 1, newProduct);

  return res
    .status(200)
    .json({ message: 'Product succesfully updated' });
};

export const updatePartialProduct = (
  req: Request,
  res: Response
) => {
  const product = market.find(
    (product) => product.id === +req.params.id
  );

  const productBody: Partial<IProduct> = {
    id: Number(req.params.id),
    name: String(req.body.name),
    price: Number(req.body.price),
    weight: Number(req.body.weight),
    section: String(req.body.section),
    calories: Number(req.body.calories),
    // expirationDate: Date(),
  };

  const newProduct = { ...product, ...productBody };

  const index = market.findIndex(
    (product) => product.id === +req.params.id
  );

  market.splice(index, 1, newProduct as IProduct);

  return res.status(200).json({
    message: 'Product updated succesfully',
    product: newProduct,
  });
};

export const deleteProduct = (req: Request, res: Response) => {
  const index = market.findIndex((product) => {
    return product.id === +req.params.id;
  });

  market.splice(index, 1);

  res
    .status(200)
    .json({ message: 'Product succesfully deleted' });
};
