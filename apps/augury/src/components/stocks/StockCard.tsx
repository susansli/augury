import {
  Text,
  Flex,
  Spacer,
  StatArrow,
  Stat,
  StatNumber,
} from '@chakra-ui/react';
import { StockCardData } from '../../pages/Stock';
import colors from '../../theme/foundations/colours';
import { formatToUSD } from '../../helpers/format';

interface Props {
  cardData: StockCardData;
}

export default function StockCard(props: Props): JSX.Element {
  return (
    <Flex
      direction="column"
      borderRadius="10"
      padding="1rem 1rem 1.5rem 1rem"
      width="100%"
      backgroundColor={colors.background.selBg}
      marginTop="5"
      gap="3"
    >
      <Flex alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          {props.cardData.symbol}
        </Text>
        <Spacer />
        <Flex alignItems="center" gap="0.25rem">
          <Stat>
            <StatArrow
              type={
                props.cardData.percentageChange < 0 ? 'decrease' : 'increase'
              }
            />
          </Stat>
          <Text>{`${props.cardData.percentageChange >= 0 ? "+" : "-"}${Math.abs(props.cardData.percentageChange)}%`}</Text>
        </Flex>
      </Flex>

      <Flex alignItems="center">
        <Flex>
          <Text fontWeight="semibold" mr="0.5rem">
            Value:{' '}
          </Text>
          {`${formatToUSD(props.cardData.currentStockValue)}`}
        </Flex>
        <Spacer />
        <Flex>
          <Text fontWeight="semibold" mr="0.5rem">
            Total Shares:{' '}
          </Text>
          {`${props.cardData.totalShares}`}
        </Flex>
      </Flex>
    </Flex>
  );
}
