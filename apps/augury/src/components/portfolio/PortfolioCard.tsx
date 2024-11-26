import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
  Flex,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Portfolio from '../../api/portfolio/Portfolio';

export interface PortfolioCardProps {
  portfolioData: PortfolioInterface;
  onClick: () => void;
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

function PortfolioCard({ portfolioData, onClick }: PortfolioCardProps) {
  const [valuation, setValuation] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function loadValuation() {
      if (portfolioData.id) {
        setLoading(true);
        try {
          const valuationData = await Portfolio.getValuationofPortfolio(
            portfolioData.id
          );
          setValuation(valuationData);
        } catch (error) {
          console.error(
            `Error fetching valuation for portfolio ${portfolioData.id}:`,
            error
          );
        } finally {
          setLoading(false);
        }
      }
    }

    loadValuation();
  }, [portfolioData.id]);

  return (
    <Card
      onClick={onClick}
      as="button"
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
          <Box>
            <Text>
              <strong>Valuation:</strong>{' '}
              {loading ? (
                <Spinner size="sm" />
              ) : valuation !== null ? (
                `$${valuation.toFixed(2)}`
              ) : (
                'N/A'
              )}
            </Text>
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
