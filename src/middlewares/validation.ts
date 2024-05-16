import { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const addUpdateCarBody: RequestHandler = (req, res, next) => {
    const addCarBodyResult = validationResult(req);

    if (!addCarBodyResult.isEmpty()) {
        const errMessages: { error: string }[] = [];
        addCarBodyResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        res.status(StatusCodes.BAD_REQUEST).json('errMessages');
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

export const carImageParams: RequestHandler = (req, res, next) => {
    const carImageParams = validationResult(req);

    if (!carImageParams.isEmpty()) {
        const errMessages: { error: string }[] = [];
        carImageParams.array().forEach((v, i) => {
            errMessages.push({ error: v.msg});
        })
        res.status(StatusCodes.BAD_REQUEST).json(errMessages);
        return;    
    }

    next();
}

export default {
    addUpdateCarBody,
    getCarsQuery,
    carsParamsId,
    addUpdateCarDeletionTimestampBodyValue,
    carImageParams
}