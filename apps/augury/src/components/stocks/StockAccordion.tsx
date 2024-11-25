import {
  Text,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from '@chakra-ui/react';
import { StockSymbolInterface } from '../../api/stock/Stocks';

interface Props {
  stock: StockSymbolInterface;
}

export default function StockAccordion(props: Props): JSX.Element {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {props.stock.symbol}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <Flex>
          <Text>{`Share Price: $${props.stock.price}`}</Text>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
