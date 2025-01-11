import express from 'express';
import getStats from '../controller/Stats.controller.js';
import getDeviation from '../controller/Deviation.contoller.js';

const router = express.Router();

router.get('/stats/:coin',getStats)
router.get('/deviation/:coin', getDeviation);
export default router