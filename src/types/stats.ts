export interface StatsType {
  totalPrice: number;
  totalMensuality: number;
  averagePrice: number;
}
export interface StatsCategoryType {
  name: string;
  price: number;
  percentage: number;
  color: string;
}

export interface StatsResponse {
  message: string;
  stats: StatsType;
  statsCategory: StatsCategoryType[];
}
