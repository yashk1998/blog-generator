import mongoose, { Schema, Document } from 'mongoose';
import { BrandInfo } from '../../types/brand';

export interface BrandDocument extends BrandInfo, Document {}

const brandSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  brandName: {
    type: String,
    required: true,
    trim: true
  },
  brandDescription: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^https?:\/\/.+/.test(v),
      message: 'Logo URL must be a valid URL'
    }
  },
  websiteUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^https?:\/\/.+/.test(v),
      message: 'Website URL must be a valid URL'
    }
  },
  socialMediaLinks: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

export default mongoose.models.Brand || mongoose.model<BrandDocument>('Brand', brandSchema);