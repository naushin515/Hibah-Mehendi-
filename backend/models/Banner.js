import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  textBanner: {
    enabled: { type: Boolean, default: false },
    message: { type: String, default: '' },
    color: { type: String, default: 'green', enum: ['green', 'orange', 'red', 'purple', 'blue'] },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
  },
  posterBanner: {
    enabled: { type: Boolean, default: false },
    imageUrl: { type: String, default: '' },
    publicId: { type: String, default: '' },
    linkTo: { type: String, default: '/shop' },
  },
}, { timestamps: true });

export default mongoose.model('Banner', bannerSchema);
