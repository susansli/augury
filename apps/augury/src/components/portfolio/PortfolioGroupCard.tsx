import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
  Box,
  Flex,
  VStack,
} from '@chakra-ui/react';
import colors from '../../theme/foundations/colours';
import { PortfolioGroupInterface } from './PortfolioGroupModal';
import PortfolioStats from './PortfolioStats';

interface PortfolioGroupCardProps {
  portfolioGroup: PortfolioGroupInterface;
  onClick: () => void;
}
const renderColorDot = (color: string) => (
  <Box
    display="inline-block"
    width="0.75rem"
    height="0.75rem"
    borderRadius="50%"
    backgroundColor={color.toLowerCase()}
    marginRight="0.5rem"
  />
);
function PortfolioGroupCard({
  portfolioGroup,
  onClick,
}: PortfolioGroupCardProps) {
  return (
    <Flex
      onClick={onClick}
      as="button"
      direction="column"
      borderRadius="0.625rem"
      padding="1rem 1rem 1.5rem 1rem"
      maxW="22.5rem"
      width="100%"
      backgroundColor={colors.background.selBg}
      margin="1.25rem"
      mx="auto"
      gap="0.1875rem"
      boxShadow="md"
    >
      <VStack align="start" spacing="0.5rem">
        <Text fontSize="1.3rem" fontWeight="bold">
          {portfolioGroup.name}
        </Text>
        <Text>
          {portfolioGroup.portfolios?.length || 0} portfolio
          {portfolioGroup.portfolios?.length !== 1 && 's'}
        </Text>
        <Flex align="center">
          <Text fontWeight="bold" marginRight="0.5rem">
            Color:
          </Text>
          {renderColorDot(portfolioGroup.color)}
        </Flex>
      </VStack>
      <Box mt="0.75rem">
        <PortfolioStats
          portfolios={portfolioGroup.portfolios || []}
          currency={portfolioGroup.portfolioCurrency}
        />
      </Box>
    </Flex>
  );
}

export default PortfolioGroupCard;
