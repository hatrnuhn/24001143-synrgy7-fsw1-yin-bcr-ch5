import { Router } from "express";
import {
    addCar,
    getCars,
    getCarById,
    updateCar,
    deleteCar
} from '../services/cars';
import { checkSchema } from "express-validator";
import { addCarBodySchema, carsParamIdSchema, getCarsQuerySchema } from '../validationSchemas/cars';
import validate from '../middlewares/validation';
import { checkIdExistence } from '../middlewares/utils';

const router = Router();

router.post('/', checkSchema(addCarBodySchema, ['body']), validate.addCarBody, addCar);

router.get('/', checkSchema(getCarsQuerySchema, ['query']), validate.getCarsQuery, getCars);
router.get('/:id', checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, checkIdExistence, getCarById);

router.put('/:id', checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, checkIdExistence, updateCar);

router.delete('/:id', checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, checkIdExistence, deleteCar);

export default router;