import { Router } from 'express';
var router = Router();
import userRoutes from '../modules/user/user-route.js';
import carRoutes from '../modules/car/car-routes.js';

router.use('/user', userRoutes);
router.use('/car', carRoutes);

export default router;
