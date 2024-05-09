"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cars_1 = require("../services/cars");
const express_validator_1 = require("express-validator");
const cars_2 = require("../validationSchemas/cars");
const validation_1 = __importDefault(require("../middlewares/validation"));
const utils_1 = require("../middlewares/utils");
const router = (0, express_1.Router)();
router.post('/', (0, express_validator_1.checkSchema)(cars_2.addCarBodySchema, ['body']), validation_1.default.addCarBody, cars_1.addCar);
router.get('/', (0, express_validator_1.checkSchema)(cars_2.getCarsQuerySchema, ['query']), validation_1.default.getCarsQuery, cars_1.getCars);
router.get('/:id', (0, express_validator_1.checkSchema)(cars_2.carsParamIdSchema, ['params']), validation_1.default.carsParamsId, utils_1.checkIdExistence, cars_1.getCarById);
router.put('/:id', (0, express_validator_1.checkSchema)(cars_2.carsParamIdSchema, ['params']), validation_1.default.carsParamsId, utils_1.checkIdExistence, cars_1.updateCar);
router.delete('/:id', (0, express_validator_1.checkSchema)(cars_2.carsParamIdSchema, ['params']), validation_1.default.carsParamsId, utils_1.checkIdExistence, cars_1.deleteCar);
exports.default = router;
//# sourceMappingURL=cars.js.map