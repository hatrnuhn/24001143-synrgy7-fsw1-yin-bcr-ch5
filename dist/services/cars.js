"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.getCarById = exports.getCars = exports.addCar = void 0;
const cars_1 = __importDefault(require("../data/cars"));
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const addCar = (req, res) => {
    const addCarBodyMatches = (0, express_validator_1.matchedData)(req);
    const newUuid = (0, uuid_1.v4)();
    const newCar = Object.assign({ id: newUuid }, addCarBodyMatches);
    cars_1.default.push(newCar);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(newCar);
};
exports.addCar = addCar;
const getCars = (req, res) => {
    // filter by manufacture, year, availability, transmission
    // sort by year
    res.status(http_status_codes_1.StatusCodes.OK).json(cars_1.default);
};
exports.getCars = getCars;
const getCarById = (req, res) => {
    const parsedInt = parseInt(req.params.id);
    if (isNaN(parsedInt)) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Invalid ID' });
        return;
    }
    const carFound = cars_1.default.find(c => +c.id === parsedInt);
    if (!carFound) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'Car is not found' });
        return;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(carFound);
};
exports.getCarById = getCarById;
const updateCar = (req, res) => {
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json();
};
exports.updateCar = updateCar;
const deleteCar = (req, res) => {
    res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
};
exports.deleteCar = deleteCar;
//# sourceMappingURL=cars.js.map