import express from 'express';
const router = express.Router();
import {signup,login} from '../user/user-services.js'
import { checkDuplicateUsernameOrEmail } from './middleware.js';


router.route('/signup').post(
       [
       checkDuplicateUsernameOrEmail,
      ],
    signup
);
router.route('/login').post(
    login
);



export default router;