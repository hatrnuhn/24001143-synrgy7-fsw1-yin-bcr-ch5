import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { cars } from "../data/cars";
import { matchedData } from "express-validator";

export const printRequest: RequestHandler = (req, res, next) => {
    const { method, path } = req;
    console.log(`${method} ${path}`);
    next();
}

export const checkIdExistence: RequestHandler = (req, res, next) => {
    const { id } = matchedData(req);
    
    const carFoundIndex = cars.findIndex(c => c.id === id && !c.deleted);

    if (carFoundIndex === -1) {
        res.status(StatusCodes.NOT_FOUND).json( { msg: 'Car is not found'} );
        return;
    }

    res.locals.carFoundIndex = carFoundIndex;

    next()
}