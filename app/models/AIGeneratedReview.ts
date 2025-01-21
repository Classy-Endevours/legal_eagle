import mongoose, { Schema } from "mongoose";

const AIReviewSchema = new Schema(
  {
    status: String,
    title: String,
    description: String,
    document: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
    isReported: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AIReview =
  mongoose.models?.AIReview || mongoose.model("AIReview", AIReviewSchema);
export default AIReview;
