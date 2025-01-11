import express from 'express';
import getStats from '../controller/Stats.controller.js';
import { testBitcoinPriceUpdate } from '../controller/test.controller.js';

const router = express.Router();

router.get('/stats/:coin',getStats)
router.get('/butcoin',testBitcoinPriceUpdate)
export default router