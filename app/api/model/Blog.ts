import mongoose, { Schema, Document } from "mongoose";
import { BlogPost } from "../../types/blog";

export interface BlogDocument extends BlogPost, Document {}

const blogSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.index({ userId: 1, title: 1 });

export default mongoose.models.Blog ||
  mongoose.model<BlogDocument>("Blog", blogSchema);
