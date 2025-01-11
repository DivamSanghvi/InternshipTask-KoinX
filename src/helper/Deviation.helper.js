import { coinPrice } from "../model/CoinPrice.model.js";

export const getPrices = async (coin) => {
    const records = await coinPrice.find({ coin }).limit(100).exec();

    return records.map((record) => record.priceUSD);

}