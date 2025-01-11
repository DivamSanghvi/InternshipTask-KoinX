import mongoose from 'mongoose'

const coinPriceSchema = new mongoose.Schema({
    coin: {
        type: String,
        required: true
    },
    priceUSD: {
        type: Number,
        required: true
    },
    USDMarketCap: {
        type: Number,
        required: true
    },
    USD24HourChange: {
        type: Number,
        required: true
    },
})

export const coinPrice = mongoose.model('coinPrice',coinPriceSchema);
