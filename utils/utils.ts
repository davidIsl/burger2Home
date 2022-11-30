/*
 *   INTERFACE
 */

export interface APIResponse<T = any> {
  data: T;
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
