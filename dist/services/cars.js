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
exports.deleteCar = exports.patchCar = exports.getCarById = exports.getCars = exports.addCar = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_validator_1 = require("express-validator");
const Car_1 = __importDefault(require("../knex/models/Car"));
const addCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addCarBodyMatches = (0, express_validator_1.matchedData)(req);
    try {
        const newCar = Object.assign({}, addCarBodyMatches);
        const savedCar = yield Car_1.default.query().insertAndFetch(newCar);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(savedCar);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});
exports.addCar = addCar;
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { availability, manufacture, transmission, sortByYear, year } = (0, express_validator_1.matchedData)(req);
    try {
        let cars = yield Car_1.default.query().where({ deletedAt: null });
        switch (availability) {
            case 'yes':
                cars = cars.filter(c => c.availableAt < new Date());
                break;
            case 'no':
                cars = cars.filter(c => c.availableAt > new Date());
                break;
            default:
                break;
        }
        if (manufacture)
            cars = cars.filter(c => c.manufacture.toLowerCase() === manufacture);
        if (transmission)
            cars = cars.filter(c => c.transmission.toLowerCase() === transmission);
        if (year)
            cars = cars.filter(c => c.year === c.year);
        switch (sortByYear) {
            case 'asc':
                cars = cars.sort((a, b) => a.year - b.year);
                break;
            case 'desc':
                cars = cars.sort((a, b) => b.year - a.year);
            default:
                break;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(cars);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});
exports.getCars = getCars;
const getCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, express_validator_1.matchedData)(req);
    try {
        const queriedCar = yield Car_1.default.query()
            .where({
            id,
            deletedAt: null // somehow snakeCaseMapping does not work
        })
            .first();
        if (queriedCar)
            res.status(http_status_codes_1.StatusCodes.OK).json(queriedCar);
        else
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'Car is not found' });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});
exports.getCarById = getCarById;
const patchCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = (0, express_validator_1.matchedData)(req), { id } = _a, patchCarBodyMatches = __rest(_a, ["id"]);
    try {
        const patchedCar = yield Car_1.default.query()
            .patchAndFetchById(id, patchCarBodyMatches);
        if (patchedCar)
            res.status(http_status_codes_1.StatusCodes.OK).json(patchedCar);
        else
            (res.status(http_status_codes_1.StatusCodes.NOT_FOUND)).json({ msg: 'Car is not found' });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});
exports.patchCar = patchCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, express_validator_1.matchedData)(req);
    try {
        const deletedCar = yield Car_1.default.query()
            .patchAndFetchById(id, { deletedAt: new Date().toISOString() });
        if (deletedCar)
            res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
        else
            (res.status(http_status_codes_1.StatusCodes.NOT_FOUND)).json({ msg: 'Car is not found' });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});
exports.deleteCar = deleteCar;
//# sourceMappingURL=cars.js.map