import { DB_NAME } from "@/config/constants";
import Dexie, { Table } from "dexie";

export interface IShoppingConfig {
  id?: number;
  tax: number;
  shipping: number;
}

export interface IProduct {
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface ICart {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  closed?: 1 | 0;
}

export interface ICheckout {
  id?: number;
  user_id: number;
  total: number;
  date: Date;
}

export interface ISoldProducts {
  id?: number;
  product_id: number;
  quantity: number;
  checkout_id: number;
}

export class AppDatabase extends Dexie {
  shopping_config!: Table<IShoppingConfig, number>;
  products!: Table<IProduct, number>;
  cart!: Table<ICart, number>;
  checkout!: Table<ICheckout, number>;
  sold_products!: Table<ISoldProducts, number>;

  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      shopping_config: "++id, tax, shipping",
      products: "++id, name, price, description, image",
      cart: "++id, product_id, quantity, user_id, closed",
      checkout: "++id, user_id, total, date",
      sold_products: "++id, product_id, quantity, checkout_id",
    });
  }
}

export const db = new AppDatabase();
