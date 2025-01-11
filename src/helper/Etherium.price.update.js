import { coinPrice } from "../model/CoinPrice.model.js";
import { getCryptoPrice } from "../utils/CoinGeckService.util.js"; 

export const updateEthereumPrice = async () => {
  try {
    const { usd, usd_market_cap, usd_24h_change } =
      await getCryptoPrice("ethereum", "usd", true, true);

    const newPrice = new coinPrice({
      coin: "ethereum",
      priceUSD: usd,
      USDMarketCap: usd_market_cap,
      USD24HourChange: usd_24h_change,
    });

    await newPrice.save();
    console.log("Ethereum price updated successfully!");
  } catch (err) {
    console.error("Failed to update Ethereum price:", err);
  }
};

const interval = 120 * 60 * 1000; // 2 hours
setInterval(updateEthereumPrice, interval);
