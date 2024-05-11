import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { matchedData } from "express-validator";
import { getDataFromDB } from "../mongoose/utils";
import CarsModel from "../mongoose/schemas/cars";

export const printRequest: RequestHandler = (req, res, next) => {
    const { method, path } = req;
    console.log(`${method} ${path}`);
    next();
}

export const checkIdExistence: RequestHandler = (req, res, next) => {
    const { id } = matchedData(req);
    const carsFromDB = getDataFromDB(CarsModel);
    carsFromDB
        .then(cars => {
            const carFound = cars.find(c => c.id === id && !c.deleted);
            if (!carFound) {
                res.status(StatusCodes.NOT_FOUND).json( { msg: 'Car is not found'} );
                return;
            }

            next();
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        })
}