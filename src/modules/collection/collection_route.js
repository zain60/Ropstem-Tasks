import express from 'express';
const router = express.Router();
import {createCollection,userCollection,randomCollection,trendingCollection} from '../collection/collection_service.js';

router.route('/createCollection').post(
    createCollection
);
router.route('/UserCollection').get(
    userCollection
);
router.route('/RandomCollection').get(
    randomCollection
);
router.route('/TrendingCollection').get(
    trendingCollection
);
export default router;