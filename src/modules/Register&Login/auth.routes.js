import express from 'express';
const router = express.Router();
import { register,login,logout,generateAccessToken} from './auth.services.js';

router.route('/register').post(
    register
);
router.route('/login').get(
     login
);
router.route('/logout').post(
    logout
);
router.route('/refresh_token').post(
    generateAccessToken
);
export default router;
