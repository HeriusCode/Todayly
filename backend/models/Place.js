import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema(
  {
    source: { type: String, required: true, default: 'openstreetmap', index: true },
    externalId: { type: String, required: true },
    osmType: {
      type: String,
      enum: ['node', 'way', 'relation'],
      required() { return this.source === 'openstreetmap'; },
    },
    name: { type: String, required: true, trim: true },
    category: { type: String, default: 'Điểm đến & Giải trí' },
    categoryKey: {
      type: String,
      enum: ['park', 'entertainment', 'shopping', 'checkin', 'cafe', 'food', 'beach', 'other'],
      default: 'checkin',
      index: true,
    },
    rankLabel: { type: String, default: 'Đề xuất hôm nay' },
    description: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    website: { type: String, default: '' },
    image: { type: String, default: '' },
    googlePhotoRef: { type: String, default: '' },
    photoAttributions: { type: [mongoose.Schema.Types.Mixed], default: [] },
    openHours: { type: String, default: '08:00 – 22:00' },
    openingHours: { type: String, default: '' },
    priceRange: { type: String, default: 'Miễn phí hoặc theo dịch vụ' },
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
          message: 'Tọa độ địa điểm không hợp lệ.',
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

placeSchema.index({ location: '2dsphere' });
placeSchema.index({ externalId: 1, source: 1 }, { unique: true });
placeSchema.index({ active: 1, rating: -1 });

const Place = mongoose.model('Place', placeSchema);

export default Place;

