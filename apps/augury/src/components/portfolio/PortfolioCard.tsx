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
  Spacer,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Portfolio from '../../api/portfolio/Portfolio';
import colors from '../../theme/foundations/colours';

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
    <Flex
      onClick={onClick}
      as="button"
      direction="column"
      borderRadius="10"
      padding="1rem 1rem 1.5rem 1rem"
      maxW="22.5rem"
      margin="1.25rem"
      mx="auto"
      width="100%"
      backgroundColor={colors.background.selBg}
      marginTop="5"
      gap="0.1875rem"
    >
      <Flex alignItems="center">
        <Text fontSize="M" fontWeight="bold">
          {portfolioData.name}
        </Text>
        <Spacer />
        <Flex alignItems="center" gap="0.25rem">
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
          </Flex>
        </Flex>
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
        <Text>
          <strong>Sectors:</strong>{' '}
          {portfolioData.sectorTags?.join(', ') || 'None'}
        </Text>
      </Flex>
    </Flex>
  );
}
export default PortfolioCard;
