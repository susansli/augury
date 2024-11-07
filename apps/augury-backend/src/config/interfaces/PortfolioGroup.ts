import PortfolioColor from '../enums/PortfolioColor';
import DocumentId from './DocumentId';
import Identifiable from './Identifiable';

export default interface PortfolioGroup extends Identifiable {
  name: string;
  color: PortfolioColor;
  userId: DocumentId;
}

export type PortfolioGroupRequestBody = PortfolioGroup & {
  portfolios?: DocumentId[];
};

export type PortfolioGroupResponse = {
  group: PortfolioGroup;
};

export type PortfolioGroupsResponse = {
  groups: PortfolioGroup[];
};
