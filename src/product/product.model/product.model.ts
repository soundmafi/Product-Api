export class ProductModel {
  _id: string;
  image: string;
  title: string;
  price: number;
  oldPrrice: number;
  credit: number;
  calculateRating: number;
  description: string;
  advantages: string;
  disAdvantages: string;
  categories: string[];
  tags: string;
  characteristics: {
    [key: string]: string;
  };
}
