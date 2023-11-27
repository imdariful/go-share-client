export interface Auth {
  readonly token: string;
}

export interface Profile {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly type: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: number;
}

export interface Wallet {
  _id: string;
  name: string;
  balance: number;
  currency: string;
  userId: string;
}
