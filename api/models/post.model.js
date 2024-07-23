import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2014/04/02/10/48/symbol-304598_1280.png",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
