import express from 'express';
import { getFoodById, getFoods, getGoogleFoodPhoto, getNearbyFoods } from '../controllers/foodController.js';

const router = express.Router();

router.get('/', getFoods);
router.get('/nearby', getNearbyFoods);
router.get('/google-photo', getGoogleFoodPhoto);
router.get('/:id', getFoodById);

export default router;
