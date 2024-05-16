import { Router } from "express";
import {
    addCar,
    getCars,
    getCarById,
    updateCar,
    deleteCar
} from '../services/cars';
import { checkSchema } from "express-validator";
import { addUpdateCarBodySchema, carsParamIdSchema, getCarsQuerySchema, addUpdateCarDeletionTimestampBodyValueSchema } from '../validationSchemas/cars';
import validate from '../middlewares/validation';

const router = Router();

router.post('/', checkSchema(addUpdateCarDeletionTimestampBodyValueSchema, ['body']), validate.addUpdateCarDeletionTimestampBodyValue, checkSchema(addUpdateCarBodySchema, ['body']), validate.addUpdateCarBody, addCar);

router.get('/', checkSchema(getCarsQuerySchema, ['query']), validate.getCarsQuery, getCars);
router.get('/:id', checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, getCarById);

router.put('/:id', checkSchema(addUpdateCarDeletionTimestampBodyValueSchema, ['body']), validate.addUpdateCarDeletionTimestampBodyValue, checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, checkSchema(addUpdateCarBodySchema, ['body']), validate.addUpdateCarBody, updateCar);

router.delete('/:id', checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, deleteCar);

export default router;