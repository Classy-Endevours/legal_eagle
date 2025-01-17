import mongoose, { Schema } from "mongoose";

const clauseDetailsSchema = new Schema({
  preferences: { type: String },
  description: { type: String },
});

const clauseSchema = new Schema(
  {
    title: { type: String },
    category: { type: String },
    goodAspect: clauseDetailsSchema,
    badAspect: clauseDetailsSchema,
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from creating a model multiple times
const Clause = mongoose.models.Clause || mongoose.model("Clause", clauseSchema);
export default Clause;

// lib/mongoose.ts
