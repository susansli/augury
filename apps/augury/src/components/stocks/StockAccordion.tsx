import {
  Text,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { StockSymbolInterface } from '../../api/stock/Stocks';
import { useState } from 'react';
import { truncateToTwoDecimals } from '../../helpers/format';

interface Props {
  stock: StockSymbolInterface;
}

export default function StockAccordion(props: Props): JSX.Element {

  const [totalShares, setTotalShares] = useState<number>(0);

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
        <Flex direction="column" gap="1rem">
          <Text>{`Share Price: $${props.stock.price}`}</Text>
          <Text>{`Total Price: $${props.stock.price} x ${totalShares} = $${truncateToTwoDecimals(props.stock.price * totalShares)}`}</Text>
          <NumberInput defaultValue={0} min={0} value={totalShares} onChange={(val) => setTotalShares(Number(val))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
