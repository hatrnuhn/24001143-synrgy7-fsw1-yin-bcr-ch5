import { Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

const addCarBody: RequestHandler = (req, res, next) => {
    const addCarBodyResult = validationResult(req);

    if (!addCarBodyResult.isEmpty()) {
        const errMessages: { error: string }[] = [];
        addCarBodyResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        res.status(StatusCodes.BAD_REQUEST).json(errMessages);
        return;
    }

    next();
}

export default {
    addCarBody
}