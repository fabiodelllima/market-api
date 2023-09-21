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
    return product.id === Number(req.params.userId);
  });

  return res.status(200).json(product);
};

export const updateProduct = (req: Request, res: Response) => {
  const index = market.findIndex((product) => {
    return product.id === Number(req.params.productId);
  });

  const newProduct = {
    id: Number(req.params.productId),
    name: String(req.body.name),
    price: Number(req.params.price),
    weight: Number(req.params.weight),
    section: String(req.params.section),
    calories: Number(req.params.calories),
    // expirationDate: Date(),
  };

  market.splice(index, 1, newProduct);

  return res.status(200).json();
};

