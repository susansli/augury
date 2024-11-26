import DocumentId from './DocumentId';

export interface StockValuation {
  stockId: DocumentId;
  symbol: string;
  totalValue: number;
  totalShares: number;
}

export interface ValuationResult {
  _id: DocumentId;
  stocks: StockValuation[];
}
