import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
  HStack,
  VStack,
  Flex,
  Box,
} from '@chakra-ui/react';
import PortfolioStats from './PortfolioStats';

export interface PortfolioCardProps {
  portfolioData: PortfolioInterface;
}

export type PortfolioInterface = {
  id?: string;
  name: string;
  riskPercentage1: number;
  riskPercentage2: number;
  sectorTags: string[];
  value?: number;
  valuePrev?: number;
};

function PortfolioCard({ portfolioData }: PortfolioCardProps) {
  return (
    <Card
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      backgroundColor="background.selBg"
    >
      <CardHeader>
        <Heading size="md">{portfolioData.name} </Heading>
      </CardHeader>
      <CardBody>
        <Flex direction="row">
          <PortfolioStats flexGrow={1} portfolios={[portfolioData]} />
          <Box>
            <>
              <Text>
                <strong>Stocks:</strong> {portfolioData.riskPercentage1}%
              </Text>
              <Text>
                <strong>Bonds:</strong> {portfolioData.riskPercentage2}%
              </Text>
            </>
          </Box>
        </Flex>
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
