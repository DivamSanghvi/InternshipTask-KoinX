import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3/simple/price';

/**
 * Fetch cryptocurrency price data from CoinGecko API.
 * 
 * @param {string} cryptoId - ID of the cryptocurrency (e.g., 'bitcoin').
 * @param {string} vsCurrency - Currency to compare against (e.g., 'usd').
 * @param {boolean} [includeMarketCap=false] - Include market cap data.
 * @param {boolean} [include24HrChange=false] - Include 24-hour price change.
 * @returns {Promise<Object>} - The cryptocurrency price data.
 */
export const getCryptoPrice = async (
  cryptoId,
  vsCurrency,
  includeMarketCap = false,
  include24HrChange = false
) => {
  try {
    const queryParams = new URLSearchParams({
      ids: cryptoId,
      vs_currencies: vsCurrency,
      include_market_cap: includeMarketCap,
      include_24hr_change: include24HrChange,
    });

    const apiUrl = `${BASE_URL}?${queryParams.toString()}`;

    const { data } = await axios.get(apiUrl);

    const resData = data[cryptoId];

    console.log(resData); // Optional logging
    return resData;
  } catch (error) {
    console.error('Error fetching crypto price:', error.message);
    throw new Error('Failed to fetch cryptocurrency price data.');
  }
};
