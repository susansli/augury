export interface Portfolio {
  id: string;
  label: string;
  value: number;
  prev: number;
}

export interface PortfolioGroupData {
  id: string;
  label: string;
  value: string;
  percentageText: string;
  percentageNumerical: number;
  length: string;
  portfolios: Portfolio[];
}