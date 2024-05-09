import { Request, Response } from 'express';
import { Car, cars } from '../data/cars';
import { StatusCodes } from 'http-status-codes';
import { AddCarReqBody, GetCarsQuery } from '../dtos/cars';
import { v4 as uuidv4 } from 'uuid';
import { matchedData } from 'express-validator';

export const addCar = (req: Request<{}, {}, AddCarReqBody, {}>, res: Response) => {
    const addCarBodyMatches = matchedData(req);

    const newUuid = uuidv4();

    const newCar = {
        id: newUuid,
        ...addCarBodyMatches
    }

    cars.push(newCar as Car);
    res.status(StatusCodes.CREATED).json(newCar);
}

export const getCars = (req: Request<{}, {}, {}, GetCarsQuery>, res: Response) => {
    const { availability, manufacture, transmission, sortByYear, year } = matchedData(req) as GetCarsQuery;
    
    let carsFiltered = [...cars];

    carsFiltered = carsFiltered.filter(c => !c.deleted);
    
    switch (availability) {
        case 'yes':
            carsFiltered = carsFiltered.filter(c => c.available);
            break;
        case 'no':
            carsFiltered = carsFiltered.filter(c => (!c.available));
            break;
        case 'all':
            break;
        default:
            break;
    }

    if (manufacture) carsFiltered = carsFiltered.filter(c => c.manufacture.toLowerCase().includes(manufacture as string));
    if (year) carsFiltered = carsFiltered.filter(c => +c.year === +year);
    if (transmission) carsFiltered = carsFiltered.filter(c => c.transmission.toLowerCase().includes(transmission as string));

    switch (sortByYear) {
        case 'asc':
            carsFiltered.sort((a, b) => a.year - b.year);
            break;
        case 'desc':
            carsFiltered.sort((a, b) => b.year - a.year);
            break;
        default:
            break;
    } 

    res.status(StatusCodes.OK).json(carsFiltered);
}

export const getCarById = (req: Request, res: Response) => {
    const index = res.locals.carFoundIndex;
    res.status(StatusCodes.OK).json(cars[index]);
}

export const updateCar = (req: Request, res: Response) => {
    const index = res.locals.carFoundIndex;
    const updateCarBodyMatches = {} as Car;
    const newCar = {
        ...updateCarBodyMatches,
        id: uuidv4(),
    };

    cars[index] = newCar;

    res.status(StatusCodes.ACCEPTED).json();
}

export const deleteCar = (req: Request, res: Response) => {
    const index = res.locals.carFoundIndex;

    cars[index].deleted = true;

    res.sendStatus(StatusCodes.NO_CONTENT);
}