// Update existing types
export interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}