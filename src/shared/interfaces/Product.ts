import { IUsers } from "@shared/interfaces/User";

export interface IPrices {
  price: number;
  minimum: number;
}

export interface IProducts {
  productId: number;
  category: string;
  date: Date;
  header: string;
  title: string;
  status: number;
  goal: {
    requiredAmount: number;
    currentAmount: number;
  };
  prices: IPrices[];
}

export interface IProduct {
  productId: number;
  date: Date;
  header: string;
  title: string;
  status: number;
  goal: {
    requiredAmount: number;
    currentAmount: number;
  };
  prices: IPrices[];
  participants: IUsers[];
}

export interface ICreateProductParticipant {
  userId: string;
  productId: string;
  statusOrder: number;
  amount: number;
  totalPrice: number;
}
