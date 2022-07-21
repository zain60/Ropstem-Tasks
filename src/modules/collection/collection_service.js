
import { collection } from "../collection/collection_model.js";
import {uploadNfts} from '../middlewares/pinata-api.js'


const createCollection = async(req,res)=> {

    const {Address , name , id , description,ProfileimagePath,backgroundimagePath} = req.body 
    const profileUrl = await uploadNfts(ProfileimagePath);
    const backgroundUrl = await uploadNfts(backgroundimagePath);
    var collectionObj = new collection({
    collectionId:id,
    collectionName: name,
    userAddress : Address, 
    description : description,
    collectionBackgroundImageHash : backgroundUrl,
    collectionProfileHash         : profileUrl,
    items:0,
    totalVolume : 0.0,
    
   })

     await collection.create(collectionObj).then(()=>{
     res.status(200).send("Collection created")
   })

};

const userCollection = async(req)=>{
  var {useraddress} = req.body
  var collectionData = await collection.find({userAddress : useraddress})
  console.log("user Collection data ",collectionData);
}

const randomCollection = async()=>{
  var collectionData = await collection.aggregate([ { $sample: { size: 5 } }])
  console.log("Random Collection data ",collectionData);
}
const trendingCollection = async()=>{
  var collectionData = await collection.find().sort({"totalVolume":-1}).limit(1)
  console.log("Random Collection data ",collectionData);
}

export {createCollection,userCollection,randomCollection,trendingCollection}
