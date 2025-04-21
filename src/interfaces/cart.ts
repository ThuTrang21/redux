import { IProduct } from "./app";

export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export interface ICart {
    products: ICartItem[];
totalPrice?:number;
}
