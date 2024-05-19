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

router.post('/', checkSchema(addPatchCarDeletionTimestampBodyValueSchema, ['body']), 
    validate.addUpdateCarDeletionTimestampBodyValue, 
    checkSchema(addCarBodySchema, ['body']), 
    validate.validationResults, 
    addCar);

router.get('/', checkSchema(getCarsQuerySchema, ['query']), 
    validate.validationResults, 
    getCars);

router.get('/:id', checkSchema(carsParamIdSchema, ['params']), 
    validate.validationResults, 
    getCarById);

router.patch('/:id', checkSchema(addPatchCarDeletionTimestampBodyValueSchema, ['body']), 
    validate.addUpdateCarDeletionTimestampBodyValue, 
    checkSchema(carsParamIdSchema, ['params']), 
    validate.validationResults, 
    validate.carIdExistence, 
    checkSchema(patchCarBodySchema, ['body']), 
    validate.validationResults, 
    patchCar);

router.delete('/:id', checkSchema(carsParamIdSchema, ['params']), 
    validate.validationResults, 
    validate.carIdExistence, 
    deleteCar);

export default router;