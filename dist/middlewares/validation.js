"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carImageParams = exports.addUpdateCarDeletionTimestampBodyValue = exports.carsParamsId = exports.getCarsQuery = exports.addUpdateCarBody = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const addUpdateCarBody = (req, res, next) => {
    const addCarBodyResult = (0, express_validator_1.validationResult)(req);
    if (!addCarBodyResult.isEmpty()) {
        const errMessages = [];
        addCarBodyResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('errMessages');
        return;
    }
    next();
};
exports.addUpdateCarBody = addUpdateCarBody;
const getCarsQuery = (req, res, next) => {
    const getCarsQueryResult = (0, express_validator_1.validationResult)(req);
    if (!getCarsQueryResult.isEmpty()) {
        const errMessages = [];
        getCarsQueryResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(errMessages);
        return;
    }
    next();
};
exports.getCarsQuery = getCarsQuery;
const carsParamsId = (req, res, next) => {
    const carsParamIdResult = (0, express_validator_1.validationResult)(req);
    if (!carsParamIdResult.isEmpty()) {
        const errMessages = [];
        carsParamIdResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(errMessages);
        return;
    }
    next();
};
exports.carsParamsId = carsParamsId;
const addUpdateCarDeletionTimestampBodyValue = (req, res, next) => {
    const { deletionTimestamp } = (0, express_validator_1.matchedData)(req);
    if (deletionTimestamp === null || typeof deletionTimestamp === 'string' || deletionTimestamp === undefined)
        next();
    else
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'DeletionTimestamp must be a null OR a string, otherwise omit it' });
};
exports.addUpdateCarDeletionTimestampBodyValue = addUpdateCarDeletionTimestampBodyValue;
const carImageParams = (req, res, next) => {
    const carImageParams = (0, express_validator_1.validationResult)(req);
    if (!carImageParams.isEmpty()) {
        const errMessages = [];
        carImageParams.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(errMessages);
        return;
    }
    next();
};
exports.carImageParams = carImageParams;
exports.default = {
    addUpdateCarBody: exports.addUpdateCarBody,
    getCarsQuery: exports.getCarsQuery,
    carsParamsId: exports.carsParamsId,
    addUpdateCarDeletionTimestampBodyValue: exports.addUpdateCarDeletionTimestampBodyValue,
    carImageParams: exports.carImageParams
};
//# sourceMappingURL=validation.js.map