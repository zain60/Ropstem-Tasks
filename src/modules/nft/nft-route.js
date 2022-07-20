import express from 'express';
const router = express.Router();
import {createNft,userNfts} from '../nft/nft-services.js'

router.route('/createNft').post(
    createNft
);
router.route('/userNft').get(
    userNfts
);
export default router;