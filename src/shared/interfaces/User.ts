import { IProducts } from "@shared/interfaces/Product";

export interface IUsers {
  userId: number;
  phone: string;
  cep: string;
  name: string;
  administrator: number;
}

export interface IUser {
  userId: number;
  phone: string;
  cep: string;
  name: string;
  administrator: number;
  products: IProducts[];
}

export interface ICreateUser {
  phone: string;
  cep: string;
  name: string;
}
