import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // ✅ fixed spelling
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String, // ✅ Cloudinary secure_url
      required: true,
    },
    imageId: {
      type: String, // ✅ Cloudinary public_id (for delete)
      required: true,
    },
    authorImg: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // ✅ optional but recommended
  }
);

const BlogModel =
  mongoose.models.blog || mongoose.model("blog", Schema);

export default BlogModel;
