export interface Portfolio {
  id: string;
  label: string;

  value: number | undefined;
  prevValue: number | undefined;
}

export interface PortfolioGroupData {
  id: string;
  userId: string;
  label: string;
  portfolioId: string[];

  value: number | undefined;
  prevValue: number | undefined;
}
