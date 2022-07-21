
import { Nfts } from "./nft-model.js";
import { uploadJason, uploadNfts } from "../middlewares/pinata-api.js";



const createNft = async(req,res) => {

    const {createraddress,name,description,collectionId,imagePath} = req.body

    const imageUrl =  await uploadNfts(imagePath)

    const metdata = JSON.stringify({

        "pinataOptions": {
            "cidVersion": 1
        },
        "pinataMetadata": {
            "name": name,
            "description": description,
            "image": `https://ipfs.io/ipfs/${imageUrl}`,
            "attributes": [
            {
                "trait_type": "Lamp Type",
                "value": "Classic"
            }
            ]
        },
        "pinataContent": {
            "somekey": "somevalue"
        }
    
    });

    const nftmetaData = await  uploadJason(metdata);

    var nftObject = new Nfts({
        userAddress : createraddress,
        metaDataUrl : nftmetaData,
        collection  :  collectionId,    
        onSale:false,
        saleprice:0.0,
        views:0,
    })

    await Nfts.create(nftObject).then(()=>{
        console.log("Nft Creatd ");
    })

}

const userNfts = async(req)=>{
    var {useraddress} = req.body
    var nftData = await Nfts.find({userAddress : useraddress})
    console.log("user nft data ",nftData);
}

export {createNft,userNfts}