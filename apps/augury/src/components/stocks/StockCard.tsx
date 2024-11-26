import { Box, Flex } from '@chakra-ui/react';
import { StockCardData } from '../../pages/Stock';
import colors from '../../theme/foundations/colours';

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
      {props.cardData.currentStockValue}

    </Flex>
  );
}
