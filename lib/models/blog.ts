import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema(
  {
    heading: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String },
  },
  { _id: false },
);

const blogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    sourceUrl: { type: String },
    sections: { type: [sectionSchema], default: [] },
    takeaways: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const BlogPostModel =
  mongoose.models.BlogPost ?? mongoose.model("BlogPost", blogPostSchema);
