import express from 'express';
const router = express.Router();
import {createCollection,userCollection} from '../collection/collection_service.js';

router.route('/createCollection').post(
    createCollection
);
router.route('/getCollection').get(
    userCollection
);
export default router;