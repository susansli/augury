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
import { useParams } from 'react-router-dom';
import Portfolio from '../api/portfolio/Portfolio';

export interface StockCardData {
  symbol: string;
  currentStockValue: number;
  totalShares: number;
  percentageChange: number;
}

export default function Stock(): JSX.Element {
  const [stocks, setStocks] = useState<StockSymbolInterface[]>([]);
  const [stockCardData, setStockCardData] = useState<StockCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const params = useParams();

  useEffect(() => {
    void fetchAllStocks();
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
    if (params.portfolioId) {
      const response = await Stocks.getAllStocksOfPortfolio(params.portfolioId);
      if (!response) {
        toast.error('Could not fetch stocks, please refresh the page.');
      } else {
        setStockCardData(response);
      }
    }
  }

  function renderStockCards(): JSX.Element[] {
    return stockCardData.map((cardData, index) => {
      return <StockCard cardData={cardData} key={index} />;
    });
  }

  function toggleModal(refresh: boolean) {
    onClose();
    if (refresh) {
      void fetchPortfolioStocks();
    }
  }

  async function getAiRecommendation(): Promise<void> {
    setIsLoading(true);
    if (params.portfolioId) {
      const response = await Portfolio.getAiRecommentation(params.portfolioId);
      if (!response) {
        toast.error('Could not fetch stocks, please refresh the page.');
      } else {
        toast(
          (t) => (
            <Flex alignItems="center" flexDirection="column" gap="1rem">
              {`✨ ${response} ✨`}
              <Button
                width="100%"
                bgColor="black"
                onClick={() => toast.dismiss(t.id)}
              >
                Dismiss
              </Button>
            </Flex>
          ),
          {
            duration: Infinity,
          }
        );
      }
    }
    setIsLoading(false);
  }

  return (
    <Flex direction="column" gap="2" margin="10">
      <BuyStockModal isOpen={isOpen} onClose={toggleModal} stocks={stocks} />
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
          onClick={async () => await getAiRecommendation()}
          isLoading={isLoading}
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
