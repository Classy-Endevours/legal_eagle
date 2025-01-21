import mongoose, { Schema } from "mongoose";

const AIReportSchema = new Schema({
  status: String,
  title: String,
  description: String,
});

const ReportsSchema = new Schema({
  file: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
  AIGeneratedReport: {
    type: Schema.Types.ObjectId,
    ref: "AIReview",
  },
});

const Report =
  mongoose.models?.Report || mongoose.model("Report", ReportsSchema);
export default Report;
