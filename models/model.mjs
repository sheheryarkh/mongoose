import mongoose from "mongoose";

const mongooseSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  id: Number,
});
const Data = mongoose.model("data", mongooseSchema);

export default Data;
