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
  Button,
} from '@chakra-ui/react';
import Stocks, { StockSymbolInterface } from '../../api/stock/Stocks';
import { useState } from 'react';
import { truncateToTwoDecimals } from '../../helpers/format';
import { useParams } from 'react-router-dom';
import AuthStoreManager from '../../helpers/AuthStoreManager';
import toast from 'react-hot-toast';

interface Props {
  stock: StockSymbolInterface;
  onClose: () => void;
}

export default function StockAccordion(props: Props): JSX.Element {
  const [totalShares, setTotalShares] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params = useParams();

  async function buyStock(): Promise<void> {
    setIsLoading(true);

    if (params.portfolioId) {
      const response = await Stocks.buyStock({
        portfolioId: params.portfolioId,
        userId: AuthStoreManager.getUserId(),
        symbol: props.stock.symbol,
        shares: totalShares,
      });

      setIsLoading(false);

      if (response) {
        toast.success(
          `You've successfully purchased ${totalShares} of ${props.stock.symbol}`
        );
        setTotalShares(0);
        props.onClose();
        return;
      }
    } else {
      console.log("missing portfolioid: ", params.portfolioId);
    }

    setIsLoading(false);

    toast.error('There was an error purchasing the stock. Try again.');
  }

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
          <Text>{`Total Price: $${
            props.stock.price
          } x ${totalShares} = $${truncateToTwoDecimals(
            props.stock.price * totalShares
          )}`}</Text>
          <NumberInput
            defaultValue={0}
            min={0}
            value={totalShares}
            onChange={(val) => setTotalShares(Number(val))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            colorScheme="blue"
            isDisabled={totalShares === 0}
            onClick={async () => await buyStock()}
            isLoading={isLoading}
          >
            Purchase
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
