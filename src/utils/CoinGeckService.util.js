import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3/simple/price';
const API_KEY = process.env.COINGECKO_API_KEY; // Ensure the API key is correctly set

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

    // Send the API key in the Authorization header
    const { data, headers } = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`, // Pass API key in Authorization header
      },
    });

    // Check rate limit status from response headers
    const remainingRequests = headers['x-ratelimit-remaining'];
    const resetTime = headers['x-ratelimit-reset']; // Time when rate limit will reset

    if (remainingRequests === 0) {
      const waitTime = (resetTime - Math.floor(Date.now() / 1000)) + 1; // in seconds
      console.log(`Rate limit reached. Please wait for ${waitTime} seconds.`);
      await new Promise(resolve => setTimeout(resolve, waitTime * 1000)); // Wait for reset
      return getCryptoPrice(cryptoId, vsCurrency, includeMarketCap, include24HrChange); // Retry the request after waiting
    }

    const resData = data[cryptoId];
    console.log(resData); // Optional logging
    return resData;
  } catch (error) {
    console.error('Error fetching crypto price:', error.message);
    throw new Error('Failed to fetch cryptocurrency price data.');
  }
};
