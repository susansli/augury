import DocumentId from './DocumentId';
import Portfolio from './Portfolio';

export default interface PortfolioDefault extends Portfolio {
  userId: DocumentId;
}
