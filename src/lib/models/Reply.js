import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "parentType",
    },
    parentType: {
      type: String,
      enum: ["Comment", "Reply"],
      required: true,
    },
    author: { type: String, default: "Anonymous" },
  },
  { timestamps: true }
);

export default mongoose.models.Reply ||
  mongoose.model("Reply", replySchema);
