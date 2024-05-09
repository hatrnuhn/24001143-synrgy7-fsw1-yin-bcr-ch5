"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.getCarById = exports.getCars = exports.addCar = void 0;
const cars_1 = require("../data/cars");
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const addCar = (req, res) => {
    const addCarBodyMatches = (0, express_validator_1.matchedData)(req);
    const newUuid = (0, uuid_1.v4)();
    const newCar = Object.assign({ id: newUuid }, addCarBodyMatches);
    cars_1.cars.push(newCar);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(newCar);
};
exports.addCar = addCar;
const getCars = (req, res) => {
    const { availability, manufacture, transmission, sortByYear, year } = (0, express_validator_1.matchedData)(req);
    let carsFiltered = [...cars_1.cars];
    carsFiltered = carsFiltered.filter(c => !c.deleted);
    switch (availability) {
        case 'yes':
            carsFiltered = carsFiltered.filter(c => c.available);
            break;
        case 'no':
            carsFiltered = carsFiltered.filter(c => (!c.available));
            break;
        case 'all':
            break;
        default:
            break;
    }
    if (manufacture)
        carsFiltered = carsFiltered.filter(c => c.manufacture.toLowerCase().includes(manufacture));
    if (year)
        carsFiltered = carsFiltered.filter(c => +c.year === +year);
    if (transmission)
        carsFiltered = carsFiltered.filter(c => c.transmission.toLowerCase().includes(transmission));
    switch (sortByYear) {
        case 'asc':
            carsFiltered.sort((a, b) => a.year - b.year);
            break;
        case 'desc':
            carsFiltered.sort((a, b) => b.year - a.year);
            break;
        default:
            break;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(carsFiltered);
};
exports.getCars = getCars;
const getCarById = (req, res) => {
    const index = res.locals.carFoundIndex;
    res.status(http_status_codes_1.StatusCodes.OK).json(cars_1.cars[index]);
};
exports.getCarById = getCarById;
const updateCar = (req, res) => {
    const index = res.locals.carFoundIndex;
    const updateCarBodyMatches = (0, express_validator_1.matchedData)(req);
    console.log(updateCarBodyMatches);
    const newCar = Object.assign({ id: cars_1.cars[index].id }, updateCarBodyMatches);
    cars_1.cars[index] = newCar;
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(cars_1.cars[index]);
};
exports.updateCar = updateCar;
const deleteCar = (req, res) => {
    const index = res.locals.carFoundIndex;
    cars_1.cars[index].deleted = true;
    res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
};
exports.deleteCar = deleteCar;
//# sourceMappingURL=cars.js.map