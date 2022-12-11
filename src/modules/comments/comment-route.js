import express from 'express';
const router = express.Router();
import {createComment,updateComment,likeComment,unLikeComment,deleteComment} from "../comments/comment-services.js"


router.route('/createComment').post(
    createComment
);
router.route('/deleteComment').get(
    deleteComment
);
router.route('/updateComment').post(
    updateComment
);
router.route('/likeComment').get(
    likeComment
);
router.route('/unLikeComment').get(
    unLikeComment
);


export default router;