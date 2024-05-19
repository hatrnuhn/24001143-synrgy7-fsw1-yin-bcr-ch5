import { Router } from "express";
import {
    addCar,
    getCars,
    getCarById,
    patchCar,
    deleteCar
} from '../services/cars';
import { checkSchema } from "express-validator";
import { addCarBodySchema, carsParamIdSchema, getCarsQuerySchema, addPatchCarDeletionTimestampBodyValueSchema, patchCarBodySchema } from '../validationSchemas/cars';
import validate from '../middlewares/validation/cars';

const router = Router();

router.post('/', checkSchema(addPatchCarDeletionTimestampBodyValueSchema, ['body']), validate.addUpdateCarDeletionTimestampBodyValue, checkSchema(addCarBodySchema, ['body']), validate.addPatchCarBody, addCar);

router.get('/', checkSchema(getCarsQuerySchema, ['query']), validate.getCarsQuery, getCars);
router.get('/:id', checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, getCarById);

router.patch('/:id', checkSchema(addPatchCarDeletionTimestampBodyValueSchema, ['body']), validate.addUpdateCarDeletionTimestampBodyValue, checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, validate.carIdExistence, checkSchema(patchCarBodySchema, ['body']), validate.addPatchCarBody, patchCar);

router.delete('/:id', checkSchema(carsParamIdSchema, ['params']), validate.carsParamsId, validate.carIdExistence, deleteCar);

export default router;