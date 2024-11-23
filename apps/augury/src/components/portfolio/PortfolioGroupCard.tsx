import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
  StatGroup,
  StatNumber,
  Stat,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import colors from '../../theme/foundations/colours';
import { PortfolioGroupInterface } from './PortfolioGroupModal';
import { PortfolioInterface } from './PortfolioCard';

interface PortfolioGroupCardProps {
  portfolioGroup: PortfolioGroupInterface;
  onClick: () => void;
}
function PortfolioGroupCard({
  portfolioGroup,
  onClick,
}: PortfolioGroupCardProps) {
  let totalValue = 0;
  let totalPrevValue = 0;
  let hasValue = false;
  portfolioGroup.portfolios?.forEach((portfolio) => {
    if (typeof portfolio !== 'string' && portfolio.value) {
      hasValue = true;
      totalValue += portfolio.value;
      if (portfolio.valuePrev) {
        totalPrevValue += portfolio.valuePrev;
      } else {
        totalPrevValue += portfolio.value;
      }
    }
  });
  const changePercentage = totalValue / totalPrevValue - 1 || 0;

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
        {true && (
          <StatGroup>
            <Stat>
              <StatNumber>
                {totalValue.toLocaleString(undefined, {
                  style: 'currency',
                  currencyDisplay: 'narrowSymbol',
                  currency: portfolioGroup.portfolioCurrency || 'USD',
                })}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={changePercentage < 0 ? 'decrease' : 'increase'}
                ></StatArrow>
                {changePercentage.toLocaleString(undefined, {
                  style: 'percent',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </StatHelpText>
            </Stat>
          </StatGroup>
        )}
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default PortfolioGroupCard;
