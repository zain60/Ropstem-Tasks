import express from 'express';
const router = express.Router();
import {createNft} from '../nft/nft-services.js'

router.route('/createNft').post(
    createNft
);
export default router;