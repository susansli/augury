import axios from 'axios';
import { SERVER_URL } from '../Environments';
import { StockCardData } from '../../pages/Stock';

export interface StockSymbolInterface {
  symbol: string;
  price: number; 
}

export interface BuyStockRequestBody {
  portfolioId: string;
  userId: string;
  symbol: string;
  shares: number;
}

async function getStockSymbols(): Promise<StockSymbolInterface[] | null> {
  try {
    const response = await axios.get(
      `${SERVER_URL}/stock/symbols`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response) {
      return null;
    }
    return response.data.symbols;

  } catch {
    return null;
  }
}

async function buyStock(requestBody: BuyStockRequestBody): Promise<boolean> {
  try {
    const response = await axios.post(
      `${SERVER_URL}/portfolio/buy`,
      {
        ...requestBody
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response) {
      return false;
    }

    return true;

  } catch {
    return false;
  }

}

async function getAllStocksOfPortfolio(portfolioId: string): Promise<StockCardData[] | null> {
  try {
    const response = await axios.get(
      `${SERVER_URL}/portfolio/${portfolioId}/valuation`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response) {
      return null;
    }
    console.log(response.data);
    return response.data.symbolPriceDifferences;

  } catch {
    return null;
  }
}

const Stocks = {
  getStockSymbols,
  buyStock,
  getAllStocksOfPortfolio
};

export default Stocks;