import axios from 'axios';
import { SERVER_URL } from '../Environments';

export interface StockSymbolInterface {
  symbol: string;
  price: number; 
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

const Stocks = {
  getStockSymbols,
};

export default Stocks;