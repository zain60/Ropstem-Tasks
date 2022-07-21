import mongoose from "mongoose";
const Schema = mongoose.Schema
//@ts-ignore
const nftSchema = new Schema({
  userAddress : String,
  onSale:Boolean,
  saleprice:Number,
  views:Number,
  metaDataUrl : String
});

const Nfts = mongoose.model("Nfts", nftSchema);
export { Nfts };