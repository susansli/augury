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

interface PortfolioGroupCardProps {
  portfolioGroup: PortfolioGroupInterface;
}
function PortfolioGroupCard({ portfolioGroup }: PortfolioGroupCardProps) {
  return (
    <Card
      as="button"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      backgroundColor={colors.background.selBg}
    >
      <CardHeader>
        <Heading size="md">{portfolioGroup.name} </Heading>
      </CardHeader>
      <CardBody>
        <>
          <Text>
            <strong>Color:</strong> {portfolioGroup.color}
          </Text>
          <Text>
            <strong>Portfolios:</strong> {portfolioGroup.portfolios}
          </Text>
        </>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default PortfolioGroupCard;
