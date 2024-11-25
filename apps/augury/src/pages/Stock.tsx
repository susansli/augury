import { useEffect, useState } from "react";
import Stocks, { StockSymbolInterface } from "../api/stock/Stocks";
import toast from "react-hot-toast";

export default function Stock(): JSX.Element {

  const [symbols, setSymbols] = useState<StockSymbolInterface[]>([]);

  useEffect(() => {

    void fetchAllStockSymbols();

  }, []);

  async function fetchAllStockSymbols(): Promise<void> {

    const response = await Stocks.getStockSymbols();

    if (!response) {
      toast.error("Could not fetch stock symbols, please refresh the page.");

    } else {
      console.log("response: ", response);
      setSymbols(response);
    }

  }

  return <></>;
}
