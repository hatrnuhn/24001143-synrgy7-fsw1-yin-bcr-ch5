import { RequestHandler } from "express-serve-static-core";
import { matchedData } from "express-validator";
import Rental from "../knex/models/Rental";
import { StatusCodes } from "http-status-codes";
import Car from "../knex/models/Car";

export const getRentalsByUser: RequestHandler = async (req, res) => {
    const { userId } = matchedData(req);

    // assumes correct-and-existing userId
    const rentals = await Rental.query()
        .where({ userId });
    
    res.status(StatusCodes.OK).json(rentals);
};

export const getRentalById: RequestHandler = async (req, res) => {
    const { rentalId } = matchedData(req);

    // assumes correct-and-existing user and rental Ids
    const rental = await Rental.query()
        .findById(rentalId);

    res.status(StatusCodes.OK).json(rental);
};

export const createRental: RequestHandler = async (req, res) => {
    const { userId, carId, ...newCarBody } = matchedData(req);
    
    // assumes correct-and-existing userId ad carId
    const car = await Car.query()
        .findById(carId);

    const amount = car?.rate;

    const savedRental = await Rental.query()
        .insertAndFetch({
            userId,
            carId,
            amount,
            ...newCarBody
        });

    res.status(StatusCodes.CREATED).json(savedRental);
};

export const patchRental: RequestHandler = async (req, res) => {
    const { rentalId, ...rentalPatches } = matchedData(req);

    // assumes correct-and-existing rentalId, userId
    const patchedRental = await Rental.query()
        .patchAndFetchById(rentalId, rentalPatches);

    res.status(StatusCodes.OK).json(patchedRental);
};