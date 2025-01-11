import { updateBitcoinPrice } from "../helper/Bitcoin.price.update.js";  // Path to your service file

// Temporary route to test the Bitcoin price update
export const testBitcoinPriceUpdate = async (req, res) => {
  try {
    // Trigger the update manually and get the price data
    const priceData = await updateBitcoinPrice();

    // Send a response with the price data along with the success message
    res.status(200).send({
      message: "Bitcoin price updated successfully!",
      data: priceData,  // Include the data in the response
    });
  } catch (err) {
    res.status(500).send({ 
      message: "Failed to update Bitcoin price", 
      error: err.message 
    });
  }
};

