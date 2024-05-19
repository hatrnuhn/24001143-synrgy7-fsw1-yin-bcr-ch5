import { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import User from "../../knex/models/User";

const addPatchUserBody: RequestHandler = (req, res, next) => {
    const addPatchUserBodyResult = validationResult(req);

    if (!addPatchUserBodyResult.isEmpty()) {
        const errMessages: { error: string }[] = [];
        addPatchUserBodyResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        res.status(StatusCodes.BAD_REQUEST).json(errMessages);
        return;
    }

    next();
};

const userIdParam: RequestHandler = (req, res, next) => {
    const userIdParamResult = validationResult(req);

    if (!userIdParamResult.isEmpty()) {
        const errMessages: { error: string }[] = [];
        userIdParamResult.array().forEach((v, i) => {
            errMessages.push({ error: v.msg });
        });
        res.status(StatusCodes.BAD_REQUEST).json(errMessages);
        return;
    }

    next();
};

const userIdExistence: RequestHandler = async (req, res, next) => {
    const { userId } = matchedData(req);

    const queriedUser = await User.query()
        .where({
            id: userId,
            deletedAt: null
        })
        .first();

    if (!queriedUser) return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User is not found' });

    next();
};

export default {
    addPatchUserBody,
    userIdParam,
    userIdExistence
}