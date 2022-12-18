/*
 *   INTERFACE
 */

export interface APIResponse<T = any> {
  data: T;
  status: number;
}

export interface APIDataResponse<T = any> {
  data: T[];
  status: number;
}
export interface SelectOption {
  // value: string | null;
  text: string;
}
export interface Allergens {
  name: string;
}

export interface Ingredients {}
export interface Product {
  actualPrice: number;
  allergens: Allergens[];
  available: boolean;
  currentDiscount: number;
  currentPrice: number;
  description: string;
  id: number;
  imageUrl: string;
  ingredients: Ingredients[];
  name: string;
}

export interface Promo {
  name: string;
  description: string;
  discount: number;
  startDate: Date;
  endDate: Date;
}

export interface Stock {
  name: string;
  description: string;
  quantity: number;
}

export interface orderDetails {
  number: number | string;
  product: string;
  productPrice: number;
  quantity: number;
  status: string;
}
export interface Order {
  date: string;
  price: number;
  status: string;
  details: orderDetails[];
}

export interface User {
  id: string;
  lastName: string;
  firstName: string;
  role: string;
}

export interface BasketLine {
  id: number;
  basketId: number;
  productId: Product;
  amount: number;
}
export interface Basket {
  id: number;
  lastUpdate: Date;
  userId: number;
  basketLines: BasketLine[];
}

/*
 * ENUM
 */

export enum submitStateType {
  NONE,
  SUCCESS,
  PENDING,
  ERROR,
}

export enum rolesType {
  NONE,
  ADMIN,
  MARKETING,
  STOCK,
  CUSTOMER,
}
