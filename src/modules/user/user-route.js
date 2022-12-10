import express from 'express';
const router = express.Router();
import {signUp,logIn} from '../user/user-services.js'
import{checkDuplicateUsernameOrEmail} from '../user/user-meddlware.js'

router.route('/signUp').post(
    checkDuplicateUsernameOrEmail,
    signUp
);
router.route('/login').get(
    logIn
);

export default router;