import { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import User from "../../knex/models/User";
import { validationResults } from "./utils";

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
    validationResults,
    userIdExistence
}