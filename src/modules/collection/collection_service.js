
import { async } from "recursive-fs/lib/copy.js";
import { collection } from "../collection/collection_model.js";
import {uploadNfts} from '../middlewares/UploadImages.js'


const createCollection = async(req,res)=> {

    const {Address , name , description,imagePath} = req.body 
    const url = await uploadNfts(imagePath);

    var collectionObj = new collection({
    userAddress : Address, 
    collectionName: name,
    description : description,
    ipfsHash : url
    
   })
     await collection.create(collectionObj).then(()=>{
     res.status(200).send("Collection created")
   })

};

const userCollection = async(req)=>{
  var {useraddress} = req.body
  var collectionData = await collection.find({userAddress : useraddress})
  console.log("Collection DATA ",collectionData);
}

export {createCollection,userCollection}
