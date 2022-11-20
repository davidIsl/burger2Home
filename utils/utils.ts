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
