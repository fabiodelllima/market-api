import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { market } from './database';
import { IProduct } from './interfaces';

let id = 1;

export const createProduct = (req: Request, res: Response) => {
  const date = new Date();
  date.setDate(date.getDate() + 365);

  const newProduct: IProduct = {
    id,
    name: req.body.name,
    price: req.body.price,
    weight: req.body.weight,
    section: req.body.section,
    calories: req.body.calories,
    expirationDate: date,
  };

  market.push(newProduct);
  id++;

  return res.status(201).json(newProduct);
};

export const readProduct = (req: Request, res: Response) => {
  const total = market.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const products = market.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    weight: product.weight,
    calories: product.calories,
    section: product.section,
    expirationDate: product.expirationDate,
  }));

  return res.status(200).json({
    total,
    products,
  });
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
