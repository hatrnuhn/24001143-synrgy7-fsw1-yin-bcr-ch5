import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const validationResults: RequestHandler = (req, res, next) => {
    const result = validationResult(req);

    if(!result.isEmpty()) {
        const errMessages: { error: string }[] = [];
        result.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        return res.status(StatusCodes.BAD_REQUEST).json(errMessages);
    }

    next();
};
