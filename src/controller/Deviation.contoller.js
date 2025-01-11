import { calculateDeviation } from "../helper/DeviationCalculator.helper.js";

const getDeviation = async (req, res) => {
    try {
        const coin = req.params.coin;

        if (!coin) {
            res.status(500).send({ message: "coin parameter is missing" });
            return;
        }

        const deviation = await calculateDeviation(coin);
        res.status(200).json({ deviation });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve deviation" });
    }
};

export default getDeviation;
