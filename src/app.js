import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/Coin.routes.js"
import { updateBitcoinPrice } from "./helper/Bitcoin.price.update.js"
import { updateEthereumPrice } from "./helper/Etherium.price.update.js"
import { updateMaticPrice } from "./helper/Matic.price.update.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes declaration
app.use('/api',router)
updateBitcoinPrice()
updateEthereumPrice()
updateMaticPrice()


export { app }