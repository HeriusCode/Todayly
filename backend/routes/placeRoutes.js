import express from 'express';
import {
  getNearbyPlaces,
  getPlaces,
  getPlaceById,
  getGooglePlacePhoto,
  getMyLocation,
} from '../controllers/placeController.js';

const router = express.Router();

router.get('/my-location', getMyLocation);
router.get('/nearby', getNearbyPlaces);
router.get('/google-photo', getGooglePlacePhoto);
router.get('/', getPlaces);
router.get('/:id', getPlaceById);

export default router;

