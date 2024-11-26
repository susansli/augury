import { useEffect, useState } from 'react';
import Stocks, { StockSymbolInterface } from '../api/stock/Stocks';
import toast from 'react-hot-toast';
import AddButton from '../components/generic/AddButton';
import { Divider, Flex, FormLabel, useDisclosure } from '@chakra-ui/react';
import BuyStockModal from '../components/stocks/BuyStockModal';

export interface StockCard {
  symbol: string;
  currentStockValue: number;
  totalShares: number;
  percentageChange: number;
}

const placeHolderStockData: StockCard[] = [
  {
    symbol: 'AA',
    currentStockValue: 1502.43,
    totalShares: 100,
    percentageChange: 5.67,
  },
  {
    symbol: 'AAPL',
    currentStockValue: 5982.67,
    totalShares: 99,
    percentageChange: -0.56,
  },
  {
    symbol: 'TSLA',
    currentStockValue: 12134.74,
    totalShares: 502,
    percentageChange: 20.45,
  },
];

export default function Stock(): JSX.Element {
  const [stocks, setStocks] = useState<StockSymbolInterface[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // void fetchAllStocks();
  }, []);

  async function fetchAllStocks(): Promise<void> {
    const response = await Stocks.getStockSymbols();

    if (!response) {
      toast.error('Could not fetch stock symbols, please refresh the page.');
    } else {
      setStocks(response);
    }
  }

  return (
    <Flex direction="column" gap="2" margin="10">
      <BuyStockModal isOpen={isOpen} onClose={onClose} stocks={stocks} />
      <AddButton
        onClick={onOpen}
        aria-label="Open Stock Modal"
        aira-label={''}
      />
      <FormLabel color="text.header" fontSize="28" fontWeight="bold">
        Stocks Held
      </FormLabel>
      <Divider />
    </Flex>
  );
}
