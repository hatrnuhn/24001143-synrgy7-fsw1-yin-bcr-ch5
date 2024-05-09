import { Request, Response } from 'express';
import cars from '../data/cars';
import { StatusCodes } from 'http-status-codes';
import { Car, CarReqBody } from '../dtos/cars';
import { v4 as uuidv4 } from 'uuid';
import { matchedData } from 'express-validator';

export const addCar = (req: Request<{}, {}, CarReqBody, {}>, res: Response) => {
    const addCarBodyMatches = matchedData(req);

    const newUuid = uuidv4();

    const newCar = {
        id: newUuid,
        ...addCarBodyMatches
    }

    cars.push(newCar as Car);
    res.status(StatusCodes.CREATED).json(newCar);
}

export const getCars = (req: Request, res: Response) => {
    // filter by manufacture, year, availability, transmission
    // sort by year
    res.status(StatusCodes.OK).json(cars);
}

export const getCarById = (req: Request, res: Response) => {
    const parsedInt = parseInt(req.params.id);
    if (isNaN(parsedInt)) {
        res.status(StatusCodes.BAD_REQUEST).json( { msg: 'Invalid ID'} );
        return;
    } 

    const carFound = cars.find(c => +c.id === parsedInt);

    if (!carFound) {
        res.status(StatusCodes.NOT_FOUND).json( { msg: 'Car is not found'} );
        return;
    }

    res.status(StatusCodes.OK).json(carFound);
}

export const updateCar = (req: Request, res: Response) => {
    res.status(StatusCodes.ACCEPTED).json();
}

export const deleteCar = (req: Request, res: Response) => {
    res.sendStatus(StatusCodes.NO_CONTENT);
}