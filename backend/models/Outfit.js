import mongoose from 'mongoose';

const outfitSchema = new mongoose.Schema(
  {
    source: { type: String, required: true, default: 'fashion_crawler', index: true },
    externalId: { type: String, required: true, unique: true },
    styleName: { type: String, required: true, trim: true },
    activity: {
      type: String,
      enum: ['office', 'cafe', 'beach', 'street', 'date', 'sport', 'party', 'school'],
      required: true,
      index: true,
    },
    activityLabel: { type: String, default: '' },
    gender: {
      type: String,
      enum: ['unisex', 'female', 'male'],
      default: 'unisex',
      index: true,
    },
    suitableFor: { type: String, default: '' },
    weatherCondition: { type: String, default: 'Nắng nhẹ • Thoáng mát' },
    weatherTags: [{ type: String }], // 'sunny', 'warm', 'hot', 'cool', 'cold', 'rainy'
    tempRange: {
      min: { type: Number, default: 20 },
      max: { type: Number, default: 35 },
    },
    image: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    pieces: [
      {
        name: { type: String, required: true },
        category: { type: String, default: 'Áo / Top' },
        icon: { type: String, default: 'dry_cleaning' },
        note: { type: String, default: '' },
      },
    ],
    colorPalette: [{ type: String }],
    colorNames: [{ type: String }],
    tips: { type: String, default: '' },
    tags: [{ type: String, trim: true }],
    timelinePeriod: {
      type: String,
      enum: ['morning', 'afternoon', 'evening', 'all-day'],
      default: 'all-day',
      index: true,
    },
    timelineInfo: {
      timeRange: { type: String, default: '' },
      label: { type: String, default: '' },
      tempLabel: { type: String, default: '' },
      tone: { type: String, default: 'violet' },
      summary: { type: String, default: '' },
    },
    likesCount: { type: Number, default: 120 },
    isFeatured: { type: Boolean, default: false, index: true },
    active: { type: Boolean, default: true, index: true },
    lastSyncedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null }, // Permanent storage
  },
  { timestamps: true }
);

outfitSchema.index({ activity: 1, isFeatured: 1 });
outfitSchema.index({ weatherTags: 1 });
outfitSchema.index({ active: 1, isFeatured: -1, likesCount: -1 });

const Outfit = mongoose.model('Outfit', outfitSchema);

export default Outfit;

