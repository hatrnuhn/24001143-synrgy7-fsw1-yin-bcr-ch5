import { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import User from "../../knex/models/User";
import Rental from "../../knex/models/Rental";
import { validationResults } from "./utils";
import Car from "../../knex/models/Car";

const userRentalIdsExistence: RequestHandler = async (req, res, next) => {
    const { userId, rentalId } = matchedData(req);

    if (userId) {
        const user = await User.query()
            .findById(userId);

        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User is not found' });
    }

    if (rentalId) {
        const rental = await Rental.query()
            .findById(rentalId);
        
        if (!rental) return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Rental is not found'} );
    }

    next()
};

const carIdExistence: RequestHandler = async (req, res, next) => {
    const { carId } = matchedData(req);

    const car = await Car.query()
        .findById(carId);

    if (!car) return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Car ID is not found' });

    next();
}

export default {
    carIdExistence,
    validationResults,
    userRentalIdsExistence
}