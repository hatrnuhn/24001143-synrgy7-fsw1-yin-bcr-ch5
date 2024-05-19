"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cars_1 = require("../services/cars");
const express_validator_1 = require("express-validator");
const cars_2 = require("../validationSchemas/cars");
const cars_3 = __importDefault(require("../middlewares/validation/cars"));
const router = (0, express_1.Router)();
router.post('/', (0, express_validator_1.checkSchema)(cars_2.addPatchCarDeletionTimestampBodyValueSchema, ['body']), cars_3.default.addUpdateCarDeletionTimestampBodyValue, (0, express_validator_1.checkSchema)(cars_2.addCarBodySchema, ['body']), cars_3.default.addPatchCarBody, cars_1.addCar);
router.get('/', (0, express_validator_1.checkSchema)(cars_2.getCarsQuerySchema, ['query']), cars_3.default.getCarsQuery, cars_1.getCars);
router.get('/:id', (0, express_validator_1.checkSchema)(cars_2.carsParamIdSchema, ['params']), cars_3.default.carsParamsId, cars_1.getCarById);
router.patch('/:id', (0, express_validator_1.checkSchema)(cars_2.addPatchCarDeletionTimestampBodyValueSchema, ['body']), cars_3.default.addUpdateCarDeletionTimestampBodyValue, (0, express_validator_1.checkSchema)(cars_2.carsParamIdSchema, ['params']), cars_3.default.carsParamsId, cars_3.default.carIdExistence, (0, express_validator_1.checkSchema)(cars_2.patchCarBodySchema, ['body']), cars_3.default.addPatchCarBody, cars_1.patchCar);
router.delete('/:id', (0, express_validator_1.checkSchema)(cars_2.carsParamIdSchema, ['params']), cars_3.default.carsParamsId, cars_3.default.carIdExistence, cars_1.deleteCar);
exports.default = router;
//# sourceMappingURL=cars.js.map