import mongoose from 'mongoose';

const drinkSchema = new mongoose.Schema(
  {
    source: { type: String, required: true, default: 'openstreetmap', index: true },
    externalId: { type: String, required: true },
    osmType: {
      type: String,
      enum: ['node', 'way', 'relation'],
      required() { return this.source === 'openstreetmap'; },
    },
    name: { type: String, required: true, trim: true },
    storeName: { type: String, trim: true },
    category: { type: String, default: 'Cà phê & Bạc xỉu' },
    drinkType: {
      type: String,
      enum: ['coffee', 'milk-tea', 'fruit-tea', 'juice', 'matcha', 'other'],
      default: 'coffee',
      index: true,
    },
    sugar: { type: String, default: 'Tùy chọn đường đá' },
    calories: { type: String, default: '' },
    workFriendly: { type: Boolean, default: true },
    description: { type: String, default: '' },
    reason: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    website: { type: String, default: '' },
    image: { type: String, default: '' },
    googlePhotoRef: { type: String, default: '' },
    photoAttributions: { type: [mongoose.Schema.Types.Mixed], default: [] },
    openingHours: { type: String, default: '' },
    priceRange: { type: String, default: '25.000 – 45.000đ' },
    minPrice: { type: Number, default: 25000 },
    maxPrice: { type: Number, default: 45000 },
    rating: { type: Number, min: 0, max: 5, default: null },
    reviewsCount: { type: Number, min: 0, default: null },
    isOpen: { type: Boolean, default: null },
    badge: { type: String, default: '' },
    tags: [{ type: String, trim: true }],
    location: {
      type: { type: String, enum: ['Point'], default: 'Point', required: true },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (value) => Array.isArray(value) && value.length === 2,
          message: 'Tọa độ quán nước không hợp lệ.',
        },
      },
    },
    sourceUrl: { type: String, default: '' },
    attribution: { type: String, default: 'Google Maps' },
    rawTags: { type: mongoose.Schema.Types.Mixed, default: {} },
    active: { type: Boolean, default: true, index: true },
    lastSyncedAt: { type: Date, required: true, index: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true },
);

drinkSchema.index({ source: 1, externalId: 1 }, { unique: true });
drinkSchema.index({ location: '2dsphere' });
drinkSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Drink', drinkSchema);

