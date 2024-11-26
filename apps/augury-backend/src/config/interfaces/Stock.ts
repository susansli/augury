import DocumentId from './DocumentId';
import Identifiable from './Identifiable';

export default interface Stock extends Identifiable {
  portfolioId: DocumentId;
  symbol: string;
}

export interface StockRequestBody {
  userId: string;
  symbol: string;
  shares: number;
}
