import express from 'express';
import getStats from '../controller/Stats.controller.js';

const router = express.Router();

router.get('/stats/:coin',getStats)

export default router