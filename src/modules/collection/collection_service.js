import { async } from "recursive-fs/lib/copy";
import { collection } from "./collection-model.js";
import {uploadNfts} from '../middlewares/UploadImages.js'


const collectionService = async(req,res)=> {

    const {Address , name , description,imagePath} = req.body 
    const url = uploadNfts(imagePath)

    collection = new collection({
    userAddress : Address, 
    collectionName: name,
    description : description,
    ipfsHash : url
    
  })

  await collection.create(collection).then(()=>{
     res.status(200).send("Collection created")
  })

  }
  export {collectionService}