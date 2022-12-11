import express from 'express';
const router = express.Router();
import {suggestionsUser,unfollow,follow,updateUser,getUser,searchUser} from '../user/user-services.js'


router.route('/getUser').post(
    getUser
);
router.route('/searchUser').get(
    searchUser
);

router.route('/updateUser').post(
    updateUser
);
router.route('/follow').get(
    follow
);
router.route('/unfollow').post(
    unfollow
);
router.route('/suggestionsUser').get(
    suggestionsUser
);

export default router;