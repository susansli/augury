export interface Portfolio {
  id: string;
  label: string;
  value: number;
  prev: number;
}

export interface PortfolioGroup {
  id: string;
  label: string;
  value: string;
  percentageText: string;
  percentageNumerical: number;
  length: string;
  portfolios: Portfolio[];
}