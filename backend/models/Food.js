import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    source: { type: String, required: true, default: 'openstreetmap', index: true },
    externalId: { type: String, required: true },
    osmType: {
      type: String,
      enum: ['node', 'way', 'relation'],
      required() { return this.source === 'openstreetmap'; },
    },
    name: { type: String, required: true, trim: true },
    category: { type: String, default: 'Quán ăn' },
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack', 'drink'],
      default: 'lunch',
    },
    mealTypes: [{
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack', 'drink'],
    }],
    cuisines: [{ type: String, trim: true }],
    description: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    website: { type: String, default: '' },
    image: { type: String, default: '' },
    googlePhotoRef: { type: String, default: '' },
    photoAttributions: { type: [mongoose.Schema.Types.Mixed], default: [] },
    openingHours: { type: String, default: '' },
    priceRange: { type: String, default: '' },
    rating: { type: Number, min: 0, max: 5, default: null },
    reviewsCount: { type: Number, min: 0, default: null },
    isOpen: { type: Boolean, default: null },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point', required: true },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (value) => Array.isArray(value) && value.length === 2,
          message: 'Tọa độ quán ăn không hợp lệ.',
        },
      },
    },
    sourceUrl: { type: String, default: '' },
    attribution: { type: String, default: '© OpenStreetMap contributors' },
    rawTags: { type: mongoose.Schema.Types.Mixed, default: {} },
    active: { type: Boolean, default: true, index: true },
    lastSyncedAt: { type: Date, required: true, index: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true },
);

foodSchema.index({ source: 1, externalId: 1 }, { unique: true });
foodSchema.index({ location: '2dsphere' });
foodSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
foodSchema.index({ active: 1, mealType: 1, lastSyncedAt: -1 });

export default mongoose.model('Food', foodSchema);
