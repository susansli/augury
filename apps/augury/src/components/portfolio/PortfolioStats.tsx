import { Stat, StatArrow, StatGroup, StatHelpText, StatNumber } from "@chakra-ui/react";
import { PortfolioInterface } from "./PortfolioCard";

interface Props {
  portfolios: PortfolioInterface[];
  currency?: string;
  flexGrow?: number;
}

export default function PortfolioStats(props: Props): JSX.Element {

  let totalValue = 0;
  let totalPrevValue = 0;
  let hasValue = false;
  props.portfolios.forEach((portfolio) => {
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
  const percentageChange = ((totalValue - totalPrevValue) / totalPrevValue) * 100 || 0;

  return (
    <StatGroup flexGrow={props.flexGrow}>
      <Stat>
        <StatNumber>
          {totalValue.toLocaleString(undefined, {
            style: 'currency',
            currency: props.currency || 'USD',
          })}
        </StatNumber>
        <StatHelpText verticalAlign="baseline">
          <StatArrow
            type={
              percentageChange < 0
                ? 'decrease'
                : 'increase'
            }
          />
          {percentageChange.toLocaleString(undefined, {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
}
