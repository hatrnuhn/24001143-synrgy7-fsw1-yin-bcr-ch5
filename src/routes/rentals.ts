import { Router } from "express";
import { getRentalsByUser, getRentalById, createRental, patchRental } from '../services/rentals';
import { checkSchema } from "express-validator";
import validate from '../middlewares/validation/rentals';
import { patchRentalBodySchema, postRentalBodySchema, rentalParamsSchema } from "../validationSchemas/rentals";

const router = Router();

router.get('/:userId', checkSchema(rentalParamsSchema, ['params']), 
    validate.validationResults, 
    validate.userRentalIdsExistence, 
    getRentalsByUser);

router.get('/:userId/:rentalId', checkSchema(rentalParamsSchema, ['params']), 
    validate.validationResults, 
    validate.userRentalIdsExistence, 
    getRentalById);

router.post('/:userId', checkSchema(rentalParamsSchema, ['params']),
    validate.validationResults, 
    validate.userRentalIdsExistence,
    checkSchema(postRentalBodySchema, ['body']),
    validate.validationResults, 
    validate.carIdExistence, 
    createRental);

router.patch('/:userId/:rentalId', checkSchema(rentalParamsSchema, ['params']),
    validate.validationResults, 
    validate.userRentalIdsExistence,
    checkSchema(patchRentalBodySchema, ['body']), 
    validate.validationResults, 
    patchRental);

export default router;