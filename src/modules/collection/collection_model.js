
import mongoose from "mongoose";
const Schema = mongoose.Schema
//@ts-ignore
const collectionSchema = new Schema({
  userAddress: String,
  collectionName: String,
  description : String,
  ipfsHash : String
});

const collection = mongoose.model("collection", collectionSchema);
export { collection };