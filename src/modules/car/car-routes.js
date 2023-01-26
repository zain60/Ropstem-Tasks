
import express from 'express';
const router = express.Router();
import { createCar ,getCar,deleteCar,updateCar,getAllCars} from './car-services.js';
import { authUser } from './car_middlewware.js';


router.route('/createCar').post(
    [
        authUser,
    ],  
    createCar
);
router.route('/getCars').get(
    getAllCars
);
router.route('/getSpecificCar').get(
    getCar
);
router.route('/UpdateCar').post(
    authUser,
    updateCar
);
router.route('/deleteCar').post(
    authUser,
    deleteCar
);



export default router;