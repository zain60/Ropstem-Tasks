import express from 'express';
const router = express.Router();
import { signup, login } from '../user/user-services.js';
import { checkValidations, logInValidations } from './middleware.js';

router.route('/signup').post([checkValidations], signup);
router.route('/login').post([logInValidations], login);

export default router;
