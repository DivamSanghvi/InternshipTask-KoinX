import { coinPrice } from "../model/CoinPrice.model.js";  
import { getCryptoPrice } from "../utils/CoinGeckService.util.js";  

export const updateMaticPrice = async () => {
  try {
    const { usd, usd_market_cap, usd_24h_change } =
      await getCryptoPrice("matic-network", "usd", true, true);

    const newPrice = new coinPrice({
      coin: "matic-network",
      priceUSD: usd,
      USDMarketCap: usd_market_cap,
      USD24HourChange: usd_24h_change,
    });

    await newPrice.save();
    console.log("Matic price updated successfully!");
  } catch (err) {
    console.error("Failed to update Matic price:", err);
  }
};

const interval = 120 * 60 * 1000; // 2 hours
setInterval(updateMaticPrice, interval);
