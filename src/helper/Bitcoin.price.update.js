import { coinPrice } from "../model/CoinPrice.model.js";
import { getCryptoPrice } from "../utils/CoinGeckService.util.js";

export const updateBitcoinPrice = async () => {
  try {
    const { usd, usd_market_cap, usd_24h_change } =
      await getCryptoPrice("bitcoin", "usd", true, true);

    const newPrice = new coinPrice({
      coin: "bitcoin",
      priceUSD: usd,
      USDMarketCap: usd_market_cap,
      USD24HourChange: usd_24h_change,
    });

    await newPrice.save();
    console.log("Bitcoin price updated successfully!");
  } catch (err) {
    console.error("Failed to update Bitcoin price:", err);
  }
};

const interval = 120 * 60 * 1000; // 2 hours
setInterval(updateBitcoinPrice, interval);

