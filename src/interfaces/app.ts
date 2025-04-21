
export interface IProduct {
    id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rate:IRate;
  }
  export interface IRate {
    rate:  number;
    count: number;
}