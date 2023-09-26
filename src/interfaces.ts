export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: 'cleaning' | 'food';
  calories: number | null | undefined;
  expirationDate: Date;
}
