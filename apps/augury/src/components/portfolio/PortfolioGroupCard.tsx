import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
} from '@chakra-ui/react';
import colors from '../../theme/foundations/colours';
import { PortfolioGroupInterface } from './PortfolioGroupModal';
import PortfolioStats from './PortfolioStats';

interface PortfolioGroupCardProps {
  portfolioGroup: PortfolioGroupInterface;
  onClick: () => void;
}
function PortfolioGroupCard({
  portfolioGroup,
  onClick,
}: PortfolioGroupCardProps) {
  return (
    <Card
      onClick={onClick}
      as="button"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      backgroundColor={colors.background.selBg}
    >
      <CardHeader>
        <Heading size="md">{portfolioGroup.name} </Heading>

        <Text>
          {portfolioGroup.portfolios?.length || 0} portfolio
          {portfolioGroup.portfolios?.length !== 1 && 's'}
        </Text>
        <Text>
          <strong>Color:</strong> {portfolioGroup.color}
        </Text>
      </CardHeader>
      <CardBody>
        <PortfolioStats
          portfolios={portfolioGroup.portfolios || []}
          currency={portfolioGroup.portfolioCurrency}
        />
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default PortfolioGroupCard;
