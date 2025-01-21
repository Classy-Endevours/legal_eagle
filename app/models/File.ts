import mongoose, { Model, Schema } from "mongoose";

const filesSchema = new Schema({
  content: String,
});

const File = mongoose.models.File ||mongoose.model("File", filesSchema);
export default File;
