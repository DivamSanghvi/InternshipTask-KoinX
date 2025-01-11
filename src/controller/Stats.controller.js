import { getCryptoPrice } from "../utils/CoinGeckService.util.js";

const getStats = async (req, res) => {
  try {
    const coin = req.params.coin;

    console.log("coin", coin);
    if (!coin) {
      res.status(500).send({ message: "coin parameter is missing" });
      return;
    }

    const currentPrice = await getCryptoPrice(
      coin,
      "usd",
      true,
      true
    );

    if (!currentPrice) {
      res.status(500).send({ message: `Unable to fetch stats for ${coin}` });
      return;
    }

    res.status(200).send(currentPrice);
  } catch (err) {
    res.status(500).send({ message: "Failed to retrieve stats" });
  }
};

export default getStats;
