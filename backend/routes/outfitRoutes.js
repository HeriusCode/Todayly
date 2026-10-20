import express from 'express';
import {
  getOutfits,
  getOutfitTimeline,
  getOutfitById,
  crawlOutfits,
} from '../controllers/outfitController.js';

const router = express.Router();

router.get('/', getOutfits);
router.get('/timeline', getOutfitTimeline);
router.post('/crawl', crawlOutfits);
router.get('/:id', getOutfitById);

export default router;

