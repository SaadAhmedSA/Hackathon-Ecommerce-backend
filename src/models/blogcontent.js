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
      enum: ['technology', 'health', 'lifestyle', 'business', 'medical', 'others'], // You can add more categories if needed
    },
    author: {
      type: String, // Reference to User schema
      required: true,
    },
    authorName: {
      type: String, // Storing the author's name directly
      required: true,
    },
    image: {
      type: String, // This can store URL or file path for the blog image
      required: false,
    },
    tags: {
      type: [String], // Changed to an array of strings for multiple tags
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogContentSchema);
