import express from 'express';
const router = express.Router();
import {createPost,getPost,getPostsDicover,deletePost,getPosts,updatePost,likePost,unLikePost,getSavePosts,savePost,unSavePost,getUserPosts} from "../posts/posts-services.js"


router.route('/createPost').post(
    createPost
);
router.route('/deletePost').get(
    deletePost
);
router.route('/updatePost').post(
    updatePost
);
router.route('/likePost').get(
    likePost
);
router.route('/unLikePost').get(
    unLikePost
);
router.route('/getPost').get(
    getPost
);
router.route('/savePost').post(
    savePost
);
router.route('/unSavePost').get(
    unSavePost
);
router.route('/getSavePosts').post(
    getSavePosts
);
router.route('/getUserPosts').get(
    getUserPosts
);
router.route('/getPosts').get(
    getPosts
);
router.route('/getPostsDicover').get(
    getPostsDicover
);

export default router;