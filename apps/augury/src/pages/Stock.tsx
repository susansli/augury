import { useEffect, useState } from 'react';
import Stocks, { StockSymbolInterface } from '../api/stock/Stocks';
import toast from 'react-hot-toast';
import AddButton from '../components/generic/AddButton';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Icon,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import BuyStockModal from '../components/stocks/BuyStockModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import StockCard from '../components/stocks/StockCard';

export interface StockCardData {
  symbol: string;
  currentStockValue: number;
  totalShares: number;
  percentageChange: number;
}

const placeHolderStockData: StockCardData[] = [
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
  const [stockCardData, setStockCardData] = useState<StockCardData[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // void fetchAllStocks();
    void fetchPortfolioStocks();
  }, []);

  async function fetchAllStocks(): Promise<void> {
    const response = await Stocks.getStockSymbols();

    if (!response) {
      toast.error('Could not fetch stock symbols, please refresh the page.');
    } else {
      setStocks(response);
    }
  }

  async function fetchPortfolioStocks(): Promise<void> {
    // TODO
    setStockCardData(placeHolderStockData);
  }

  function renderStockCards(): JSX.Element[] {
    return stockCardData.map((cardData, index) => {
      return <StockCard cardData={cardData} key={index} />;
    });
  }

  return (
    <Flex direction="column" gap="2" margin="10">
      <BuyStockModal isOpen={isOpen} onClose={onClose} stocks={stocks} />
      <AddButton
        onClick={onOpen}
        aria-label="Open Stock Modal"
        aira-label={''}
      />
      <Flex alignItems="center">
        <FormLabel color="text.header" fontSize="28" fontWeight="bold">
          Stocks Held
        </FormLabel>
        <Spacer />
        <Button
          leftIcon={
            <Icon
              as={FontAwesomeIcon}
              icon={faWandSparkles}
              color="text.body"
            />
          }
        >
          Ask AI
        </Button>
      </Flex>
      <Divider />
      {renderStockCards()}
    </Flex>
  );
}
