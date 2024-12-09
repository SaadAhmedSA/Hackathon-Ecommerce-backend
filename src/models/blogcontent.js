import mongoose from "mongoose";

const blogContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['technology', 'health', 'lifestyle', 'business', 'medical', 'others']
    },
    author: {
      type: String, 
      required: true,
    },
    authorName: {
      type: String, 
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    tags: {
      type: [String], 
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogContentSchema);
