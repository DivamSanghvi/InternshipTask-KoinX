import { getPrices } from "./Deviation.helper.js";

export const calculateDeviation = async (coin) => {
    const prices = (await getPrices(coin)).filter((price) => price !== null && price !== undefined);
  
    if (prices.length === 0) {
      throw new Error(`No price records found for the coin: ${coin}`);
    }
  
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);
  
    return parseFloat(standardDeviation.toFixed(2));
  };

