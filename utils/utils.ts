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
  value: number;
  text?: string;
}

export interface Language {
  id: number;
  name: string;
  abbreviation?: string;
}
export interface Allergens {
  id: number;
  allergenId: number;
  name: string;
  language: Language;
}

export interface Families {
  // TODO if TRANSLATION ??? ou INTERFACE TRANSLATION ???
  id: number;
  productFamilyId: number;
  name: string;
  description?: string;
  language: Language;
}

export interface Price {
  amount: number;
}

export interface Ingredients {
  // TODO id TRANSLATION ???
  ingredientId: number;
  name: string;
  allergens: Allergens[];
}
export interface Product {
  actualPrice: number;
  allergens: Allergens[];
  available: boolean;
  currentDiscount: number;
  currentPrice: number;
  description: string;
  id: number;
  imageName: string;
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

export interface Filters {
  id: number;
  name: string[];
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

export enum submitProductAddType {
  NONE,
  SUCCESS,
  ERROR,
}

export enum stepProductAddType {
  STEP1,
  STEP2,
  STEP3,
  ERROR,
}
