import { Schema, model } from "mongoose";
//@ts-ignore

const collectionSchema = new Schema({
  userAddress: String,
  collectionName: String,
  description : String,
  ipfsHash : URL
});

const collection = model("collection", collectionSchema);
export { collection };