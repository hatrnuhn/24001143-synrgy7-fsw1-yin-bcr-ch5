import { Router } from "express";
import {
    addCar,
    getCars,
    getCarById,
    updateCar,
    deleteCar
} from '../services/cars';
import { checkSchema } from "express-validator";
import { addUpdateCarBodySchema, carsParamIdSchema, getCarsQuerySchema } from '../validationSchemas/cars';
import validate from '../middlewares/validation';
import { checkIdExistence } from '../middlewares/utils';

const router = Router();

router.post('/', checkSchema(addUpdateCarBodySchema, ['body']), validate.addUpdateCarBody, addCar);

router.get('/', checkSchema(getCarsQuerySchema, ['query']), validate.getCarsQuery, getCars);
router.get('/:id', checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, checkIdExistence, getCarById);

router.put('/:id', checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, checkIdExistence, checkSchema(addUpdateCarBodySchema, ['body']), validate.addUpdateCarBody, updateCar);

router.delete('/:id', checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, checkIdExistence, deleteCar);

export default router;