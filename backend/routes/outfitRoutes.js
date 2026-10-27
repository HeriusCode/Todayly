import express from 'express';
import {
  getOutfits,
  getOutfitTimeline,
  getOutfitById,
} from '../controllers/outfitController.js';

const router = express.Router();

router.get('/', getOutfits);
router.get('/timeline', getOutfitTimeline);
router.get('/:id', getOutfitById);

export default router;

