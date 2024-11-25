import { useEffect, useState } from 'react';
import Stocks, { StockSymbolInterface } from '../api/stock/Stocks';
import toast from 'react-hot-toast';
import AddButton from '../components/generic/AddButton';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import BuyStockModal from '../components/stocks/BuyStockModal';

export default function Stock(): JSX.Element {
  const [stocks, setStocks] = useState<StockSymbolInterface[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
   void fetchAllStocks();
  }, []);

  async function fetchAllStocks(): Promise<void> {
    const response = await Stocks.getStockSymbols();

    if (!response) {
      toast.error('Could not fetch stock symbols, please refresh the page.');
    } else {
      console.log('response: ', response);
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
    </Flex>
  );
}
