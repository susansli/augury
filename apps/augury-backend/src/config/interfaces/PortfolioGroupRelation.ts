import DocumentId from './DocumentId';
import Identifiable from './Identifiable';

export default interface PortfolioGroupRelation extends Identifiable {
  portfolioId: DocumentId;
  portfolioGroupId: DocumentId;
}
