export interface APIResponse<T = any> {
  data: T;
  status: number;
}
export interface SelectOption {
  // value: string | null;
  text: string;
}

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
