
import mongoose from "mongoose";
const Schema = mongoose.Schema
//@ts-ignore
const collectionSchema = new Schema({
  collectionId  : Number,
  collectionName: String,
  userAddress : String,
  description : String,
  totalVolume : Number,
  items       : Number,
  collectionBackgroundImageHash : String,
  collectionProfileHash         :String
});

const collection = mongoose.model("collection", collectionSchema);
export { collection };