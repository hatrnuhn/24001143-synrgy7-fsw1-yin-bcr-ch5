import { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import Car from "../../knex/models/Car";

export const addPatchCarBody: RequestHandler = (req, res, next) => {
    const addPatchCarBodyResult = validationResult(req);

    if (!addPatchCarBodyResult.isEmpty()) {
        const errMessages: { error: string }[] = [];
        addPatchCarBodyResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        res.status(StatusCodes.BAD_REQUEST).json(errMessages);
        return;
    }

    next();
}

export const getCarsQuery: RequestHandler = (req, res, next) => {
    const getCarsQueryResult = validationResult(req);

    if (!getCarsQueryResult.isEmpty()) {
        const errMessages: { error: string }[] = [];
        getCarsQueryResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg});
        })
        res.status(StatusCodes.BAD_REQUEST).json(errMessages);
        return;
    }

    next();
}

export const carsParamsId: RequestHandler = (req, res, next) => {
    const carsParamIdResult = validationResult(req);

    if (!carsParamIdResult.isEmpty()) {
        const errMessages: { error: string }[] = [];
        carsParamIdResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg});
        })
        res.status(StatusCodes.BAD_REQUEST).json(errMessages);
        return;    
    }

    next();
}

export const addUpdateCarDeletionTimestampBodyValue: RequestHandler = (req, res, next) => {
    const { deletionTimestamp } = matchedData(req);
    
    if (deletionTimestamp === null || typeof deletionTimestamp === 'string' || deletionTimestamp === undefined) next();
    else res.status(StatusCodes.BAD_REQUEST).json({error: 'DeletionTimestamp must be a null OR a string, otherwise omit it'});
}

const carIdExistence: RequestHandler = async (req, res, next) => {
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
    addPatchCarBody,
    getCarsQuery,
    carsParamsId,
    addUpdateCarDeletionTimestampBodyValue,
    carIdExistence
}