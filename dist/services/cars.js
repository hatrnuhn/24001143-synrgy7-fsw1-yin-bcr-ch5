"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.getCarById = exports.getCars = exports.addCar = void 0;
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const cars_1 = __importDefault(require("../mongoose/schemas/cars"));
const utils_1 = require("../mongoose/utils");
const addCar = (req, res) => {
    const addCarBodyMatches = (0, express_validator_1.matchedData)(req);
    const newUuid = (0, uuid_1.v4)();
    const newCar = Object.assign({ id: newUuid }, addCarBodyMatches);
    const savedCar = (0, utils_1.saveToDB)('Car', newCar, cars_1.default);
    savedCar
        .then(v => {
        console.log(`Saved to database, id: ${v.id}`);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(newCar);
    })
        .catch(err => res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
};
exports.addCar = addCar;
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { availability, manufacture, transmission, sortByYear, year } = (0, express_validator_1.matchedData)(req);
        const carsFromDB = yield (0, utils_1.getDataFromDB)(cars_1.default);
        let carsFiltered = (0, utils_1.cleanCarsFromDB)(carsFromDB);
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
    }
    catch (err) {
        console.log(err);
        res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.getCars = getCars;
const getCarById = (req, res) => {
    const index = res.locals.carFoundIndex;
    const carsFromDB = (0, utils_1.getDataFromDB)(cars_1.default);
    carsFromDB
        .then(carsDB => {
        const cars = (0, utils_1.cleanCarsFromDB)(carsDB);
        console.log(cars[index]);
        res.status(http_status_codes_1.StatusCodes.OK).json(cars[index]);
    })
        .catch(err => {
        console.log(err);
        res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    });
};
exports.getCarById = getCarById;
const updateCar = (req, res) => {
    const _a = (0, express_validator_1.matchedData)(req), { id } = _a, updateCarBodyMatches = __rest(_a, ["id"]);
    const docs = cars_1.default.findOne({ id: id }).orFail();
    docs
        .then(c => {
        c.plate = updateCarBodyMatches.plate;
        c.transmission = updateCarBodyMatches.transmission;
        c.manufacture = updateCarBodyMatches.manufacture;
        c.model = updateCarBodyMatches.model;
        c.available = updateCarBodyMatches.available;
        c.type = updateCarBodyMatches.type;
        c.year = updateCarBodyMatches.year;
        c.options = updateCarBodyMatches.options;
        c.deleted = updateCarBodyMatches.deleted;
        c.save();
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json((0, utils_1.cleanCarFromDB)(c));
    })
        .catch(err => {
        console.log(err);
        res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    });
};
exports.updateCar = updateCar;
const deleteCar = (req, res) => {
    const { id } = (0, express_validator_1.matchedData)(req);
    const docs = cars_1.default.findOne({ id: id }).orFail();
    docs
        .then(c => {
        c.deleted = true;
        c.save();
        res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
    })
        .catch(err => {
        console.log(err);
        res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    });
};
exports.deleteCar = deleteCar;
//# sourceMappingURL=cars.js.map