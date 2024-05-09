import { Router } from "express";
import {
    addCar,
    getCars,
    getCarById,
    updateCar,
    deleteCar
} from '../services/cars';
import { checkSchema, body } from "express-validator";
import { addCarBodySchema } from '../validationSchemas/cars';
import validate from '../middlewares/validation';

const router = Router();

router.post('/', checkSchema(addCarBodySchema), validate.addCarBody, addCar);

router.get('/', getCars);
router.get('/:id', getCarById);

router.put('/:id', updateCar);

router.delete('/:id', deleteCar);

export default router;