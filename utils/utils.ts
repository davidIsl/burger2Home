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

export interface Product {
  name: string;
  image: string;
  description: string;
  price: number;
  allergens: Allergens[];
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
export interface Basket {
  products: Product;
  image: string;
  name: string;
  quantity: number;
  totalPrice: number;
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
