import { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import Car from "../../knex/models/Car";
import { validationResults } from "./utils";

const addUpdateCarDeletionTimestampBodyValue: RequestHandler = (req, res, next) => {
    const { deletionTimestamp } = matchedData(req);
    
    if (deletionTimestamp === null || typeof deletionTimestamp === 'string' || deletionTimestamp === undefined) next();
    else res.status(StatusCodes.BAD_REQUEST).json({error: 'DeletionTimestamp must be a null OR a string, otherwise omit it'});
}

export const carIdExistence: RequestHandler = async (req, res, next) => {
    const { id } = matchedData(req);
    
    const queriedCar = await Car.query()
        .where({
            id,
            deletedAt: null
        })
        .first();

    if (!queriedCar) return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Car is not found' });

    next()
}

export default {
    validationResults,
    addUpdateCarDeletionTimestampBodyValue,
    carIdExistence
}