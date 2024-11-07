import Identifiable from './Identifiable';
import DocumentId from './DocumentId';

export default interface BuyRecord extends Identifiable {
  stockId: DocumentId;
  shares: number;
  boughtAtPrice: number;
}
