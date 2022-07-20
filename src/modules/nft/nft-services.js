
import { Nfts } from "./nft-model.js";
import { uploadJason, uploadNfts } from "../middlewares/UploadImages";
import { json } from "body-parser";



const createNft = async(req,res) => {

const {name,description,collectionName,url,imagePath} = req.body

const imageUrl =  await uploadNfts(imagePath)

const metdata = JSON[{
  "name": name,
  "description": description,
  "image": `https://ipfs.io/ipfs/${imageUrl}`,
  "attributes": [
    {
      "trait_type": "Lamp Type",
      "value": "Classic"
    }
  ]
}]

const nftmetaData = uploadJason(nftmetaData)


}

export {createNft}