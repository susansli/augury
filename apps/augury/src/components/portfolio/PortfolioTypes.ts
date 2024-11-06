export interface Portfolio {
  id: string;
  label: string;
  value: number;
  prev: number;
}

export interface PortfolioGroupData {
  id: string;
  label: string;
  value: number;
  percentageChange: number;
  portfolios: Portfolio[];
}

export function CreatePortfolioGroup(portfolios: Portfolio[], groupId: string, groupLabel: string): PortfolioGroupData {
  let totalVal = 0;
  let totalPrev = 0;
  portfolios.forEach(portfolio => {
    totalVal += portfolio.value;
    totalPrev += portfolio.prev;
  }); 
  const percentage = (totalVal - totalPrev) / totalPrev;
  return {
    id: groupId,
    label: groupLabel,
    value: totalVal,
    percentageChange: percentage,
    portfolios: portfolios

  }

}