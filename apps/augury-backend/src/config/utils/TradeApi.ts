import Alpaca from '@alpacahq/alpaca-trade-api';

class TradeApi {
  static instance: Alpaca;

  constructor() {
    if (TradeApi.instance) {
      return TradeApi.instance;
    }
    TradeApi.instance = new Alpaca({
      keyId: process.env.ALPACA_KEY_ID,
      secretKey: process.env.ALPACA_SECRET,
      paper: true,
    });
  }
}

export default TradeApi;
