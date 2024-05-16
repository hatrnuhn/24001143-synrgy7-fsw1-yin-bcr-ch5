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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.getCarById = exports.getCars = exports.addCar = void 0;
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const addCar = (req, res) => {
    const addCarBodyMatches = (0, express_validator_1.matchedData)(req);
    const newUuid = (0, uuid_1.v4)();
    const newCar = Object.assign({ id: newUuid }, addCarBodyMatches);
    const prisma = new client_1.PrismaClient();
    const savedCar = prisma.car.create({
        data: newCar
    });
    savedCar
        .then((car) => {
        res.status(http_status_codes_1.StatusCodes.CREATED).json(car);
    })
        .catch((e) => {
        console.error(e);
        res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    })
        .finally(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }));
};
exports.addCar = addCar;
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        const { availability, manufacture, transmission, sortByYear, year } = (0, express_validator_1.matchedData)(req);
        let query = {
            where: {
                deletionTimestamp: null
            },
            orderBy: undefined
        };
        switch (availability) {
            case 'yes':
                query = Object.assign(Object.assign({}, query), { where: Object.assign(Object.assign({}, query.where), { availableDate: {
                            lte: new Date()
                        } }) });
                break;
            case 'no':
                query = Object.assign(Object.assign({}, query), { where: Object.assign(Object.assign({}, query.where), { availableDate: {
                            gt: new Date()
                        } }) });
                break;
            case 'all':
                break;
            default:
                break;
        }
        if (manufacture) {
            query = Object.assign(Object.assign({}, query), { where: Object.assign(Object.assign({}, query.where), { manufacture: {
                        equals: manufacture,
                        mode: 'insensitive'
                    } }) });
        }
        if (year) {
            query = Object.assign(Object.assign({}, query), { where: Object.assign(Object.assign({}, query.where), { year: Number(year) }) });
        }
        if (transmission) {
            query = Object.assign(Object.assign({}, query), { where: Object.assign(Object.assign({}, query.where), { transmission: {
                        equals: transmission,
                        mode: 'insensitive'
                    } }) });
        }
        switch (sortByYear) {
            case 'asc':
                query = Object.assign(Object.assign({}, query), { orderBy: {
                        year: 'asc'
                    } });
                break;
            case 'desc':
                query = Object.assign(Object.assign({}, query), { orderBy: {
                        year: 'desc'
                    } });
                break;
            default:
                break;
        }
        const cars = yield prisma.car.findMany(query);
        res.status(http_status_codes_1.StatusCodes.OK).json(cars);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getCars = getCars;
const getCarById = (req, res) => {
    const { id } = (0, express_validator_1.matchedData)(req);
    const prisma = new client_1.PrismaClient();
    const car = prisma.car.findFirstOrThrow({
        where: {
            id: id
        }
    });
    car
        .then((c) => {
        if (c.deletionTimestamp)
            throw { code: 'P2025' };
        else
            res.status(http_status_codes_1.StatusCodes.OK).json(c);
    })
        .catch((e) => {
        console.log(e);
        switch (e.code) {
            case 'P2025':
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'Car is not found' });
                break;
            default:
                res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                break;
        }
    })
        .finally(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }));
};
exports.getCarById = getCarById;
const updateCar = (req, res) => {
    const _a = (0, express_validator_1.matchedData)(req), { id } = _a, updateCarBodyMatches = __rest(_a, ["id"]);
    const prisma = new client_1.PrismaClient();
    const updatedCar = prisma.car.update({
        where: {
            id
        },
        data: Object.assign({ id }, updateCarBodyMatches)
    });
    updatedCar
        .then(c => res.status(http_status_codes_1.StatusCodes.OK).json(c))
        .catch(e => {
        console.log(e);
        switch (e.code) {
            case 'P2025':
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'Car is not found' });
                break;
            default:
                res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                break;
        }
    })
        .finally(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); }));
};
exports.updateCar = updateCar;
const deleteCar = (req, res) => {
    const _a = (0, express_validator_1.matchedData)(req), { id } = _a, deleteCarBodyMatches = __rest(_a, ["id"]);
    const prisma = new client_1.PrismaClient();
    const deletedCar = prisma.car.update({
        where: {
            id
        },
        data: Object.assign(Object.assign({ id }, deleteCarBodyMatches), { deletionTimestamp: new Date().toISOString() })
    });
    deletedCar
        .then((c) => res.status(http_status_codes_1.StatusCodes.OK).json(c))
        .catch(e => {
        switch (e.code) {
            case 'P2025':
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'Car is not found' });
                break;
            default:
                res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                break;
        }
    })
        .finally(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); }));
};
exports.deleteCar = deleteCar;
//# sourceMappingURL=cars.js.map