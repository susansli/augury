import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
} from '@chakra-ui/react';
import colors from '../../theme/foundations/colours';

export interface PortfolioCardProps {
  portfolioData: PortfolioInterface;
}

export type PortfolioInterface = {
  name: string;
  riskPercentage1: number;
  riskPercentage2: number;
  sectorTags: string[];
};

function PortfolioCard({ portfolioData }: PortfolioCardProps) {
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
        <Heading size="md">{portfolioData.name} </Heading>
      </CardHeader>
      <CardBody>
        <>
          <Text>
            <strong>Stocks:</strong> {portfolioData.riskPercentage1}%
          </Text>
          <Text>
            <strong>Bonds:</strong> {portfolioData.riskPercentage2}%
          </Text>
        </>

        <Text>
          <strong>Sectors:</strong>{' '}
          {portfolioData.sectorTags?.join(', ') || 'None'}
        </Text>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default PortfolioCard;
