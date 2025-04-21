import { IProduct } from "../interfaces/app";
import { privateRequest } from "../utils/request";

export const appService = {
    getProducts: (): Promise<IProduct[]> =>
      privateRequest.request({
        method: 'GET',
        url: 'https://fakestoreapi.com/products', // URL API
      }),
      getProduct: ({ id }: { id: string }):Promise<IProduct> =>
        privateRequest.request({
          method: 'GET',
          url: `https://fakestoreapi.com/products/${id}`, // URL API
        }),
  };