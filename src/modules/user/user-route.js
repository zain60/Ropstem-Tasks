import express from 'express';
const router = express.Router();
import { signup, login } from '../user/user-services.js';
import { validateUserRegistration, logInValidations } from './middleware.js';

router.route('/signup').post([validateUserRegistration], signup);
router.route('/login').post([logInValidations], login);

export default router;
