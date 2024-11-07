import Identifiable from './Identifiable';
import DocumentId from './DocumentId';

export default interface Session extends Identifiable {
  userId: DocumentId;
  token: string;
}
