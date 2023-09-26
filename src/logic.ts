import { Request, Response } from 'express';
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
  const id = Number(req.params.id);

  const product = market.find((product) => {
    return product.id === id;
  });

  return res.status(200).json(product);
};

export const updatePartialProduct = (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const product = market.find((product) => product.id === id);

  const productBody: Partial<IProduct> = {};

  Object.entries(req.body).forEach((entries) => {
    const [key, value] = entries;

    if (key === 'name') {
      productBody[key] = value as string;
    }

    if (key === 'section') {
      productBody[key] =
        (value as 'food') || (value as 'cleaning');
    }

    if (
      key === 'price' ||
      key === 'weight' ||
      key === 'calories'
    ) {
      productBody[key] = value as number;
    }
  });

  const newProduct = { ...product, ...productBody };

  const index = market.findIndex((product) => product.id === id);

  market.splice(index, 1, newProduct as IProduct);

  return res.status(200).json(newProduct);
};

export const deleteProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const index = market.findIndex((product) => {
    return product.id === id;
  });

  market.splice(index, 1);

  res.status(204).json();
};
