export interface Truck {
  id: number;
  name: string;
  height: number;
  width: number;
  length: number;
  weight: number;
  costPerKm?: number;
  img?: string;
  title?: string;
  dis?: string;
  cost: number;
}

export interface CargoItem {
  title: string;
  des: string;
  weight: number;
  height: number;
  length: number;
  width: number;
  pis: number;
  extra: boolean;
}
