import express from 'express';
import {
  getDrinks,
  getNearbyDrinks,
  getGoogleDrinkPhoto,
  getDrinkById,
} from '../controllers/drinkController.js';

const router = express.Router();

router.get('/', getDrinks);
router.get('/nearby', getNearbyDrinks);
router.get('/google-photo', getGoogleDrinkPhoto);
router.get('/:id', getDrinkById);

export default router;

