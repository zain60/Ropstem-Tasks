import express from 'express';
const router = express.Router();
import {createPost,getPost} from "../posts/posts-services.js"


router.route('/createPost').post(
    createPost
);
router.route('/deletePost').get(
    // deletePost
);
router.route('/updatePost').post(
    // updatePost
);
router.route('/likePost').get(
    // likePost
);
router.route('/unLikePost').get(
    // unLikePost
);
router.route('/getPost').get(
    getPost
);

export default router;