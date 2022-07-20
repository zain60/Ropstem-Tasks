import mongoose from "mongoose";
const Schema = mongoose.Schema
//@ts-ignore
const nftSchema = new Schema({
  nftName :Number,
  userAddress : String,
  description  : String,
  collectionName : String,
  url :String,
  metaDataUrl : String
});

const Nfts = mongoose.model("Nfts", nftSchema);
export { Nfts };