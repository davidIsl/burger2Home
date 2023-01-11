/**
 * DATE FORMATER FUNCTION
 * @param sDate
 * @returns FORMATED DATE STRING
 */

export const formatDate = (sDate: string) => {
  const date = new Date(sDate);

  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
};

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

export interface FamilyType {
  id: number;
  name: string;
  typeId: number;
  language: Language;
}

export interface Families {
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
  id: number;
  ingredientId: number;
  name: string;
  language: Language;
  allergens: Allergens[];
}
export interface Product {
  actualPrice: number;
  allergens: Allergens[];
  onMenu: boolean;
  currentDiscount: number;
  currentPrice: number;
  description: string;
  id: number;
  imageName: string;
  ingredients: Ingredients[];
  name: string;
  productId: number;
  language: Language;
}

export interface Promo {
  id: number;
  promotionId: number;
  // descriptionEn: string;
  description: string;
  amount: number;
  creationDate: string;
  startDate: string;
  endDate: string;
  products: Product[];
  language: Language;
}

export interface Stock {
  amount: number;
  name: string;
  creationDate: string;
  ingredientId: number;
  id: number;
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

export interface Role {
  id: number;
  name?: string;
}
export interface UserCurrent {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  imageURL: string;
  password: string;
  status: string;
  username: string;
  role: Role;
}

export interface Address {
  id: number;
  city: string;
  zipcode: number;
  street: string;
  number: number;
  userId: number;
  active: boolean;
  label: string;
}

export interface BasketLine {
  id: number | null;
  basketId: number;
  productId: number;
  amount: number;
  product: Product;
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

export enum submitOrderType {
  NONE,
  SUCCESS,
  ERROR,
}

export enum stepOrderType {
  NONE,
  STEP1,
  STEP2,
  STEP3,
}
