"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const addCarBody = (req, res, next) => {
    const addCarBodyResult = (0, express_validator_1.validationResult)(req);
    if (!addCarBodyResult.isEmpty()) {
        const errMessages = [];
        addCarBodyResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(errMessages);
        return;
    }
    next();
};
exports.default = {
    addCarBody
};
//# sourceMappingURL=validation.js.map