import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AddPatchCarReqBody, GetCarsQuery } from '../dtos/cars';
import { matchedData } from 'express-validator';
import Car from '../knex/models/Car';

export const addCar = async (req: Request<{}, {}, AddPatchCarReqBody>, res: Response) => {
    const addCarBodyMatches = matchedData(req);

    try {    
        const newCar = {
            ...addCarBodyMatches
        };
        const savedCar = await Car.query().insertAndFetch(newCar as Car);
        res.status(StatusCodes.CREATED).json(savedCar);
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

export const getCars = async (req: Request<{}, {}, {}, GetCarsQuery>, res: Response) => {
    const { availability, manufacture, transmission, sortByYear, year } = matchedData(req) as GetCarsQuery;

    try {
        let cars = await Car.query().where({ deletedAt: null });
        switch (availability) {
            case 'yes':
                cars = cars.filter(c => c.availableAt < new Date());
                break;
            case 'no':
                cars = cars.filter(c => c.availableAt > new Date());
                break;
            default:
                break;
        }
        if (manufacture) cars = cars.filter(c => c.manufacture.toLowerCase() === manufacture);
        if (transmission) cars = cars.filter(c => c.transmission.toLowerCase() === transmission);
        if (year)  cars = cars.filter(c => c.year === c.year);
        
        switch (sortByYear) {
            case 'asc':
                cars = cars.sort((a, b) => a.year - b.year);
                break;
            case 'desc':
                cars = cars.sort((a, b) => b.year - a.year)
            default:
                break;
        }
        res.status(StatusCodes.OK).json(cars);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

export const getCarById = async (req: Request, res: Response) => {
    const { id } = matchedData(req);

    try {
        const queriedCar = await Car.query()
            .where({
                id,
                deletedAt: null // somehow snakeCaseMapping does not work
             })
             .first();

        if (queriedCar) res.status(StatusCodes.OK).json(queriedCar)
        else res.status(StatusCodes.NOT_FOUND).json({ msg: 'Car is not found' });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

export const patchCar =  async (req: Request<{}, {}, AddPatchCarReqBody>, res: Response) => {
    const { id, ...patchCarBodyMatches } = matchedData(req);

    try {
        const patchedCar = await Car.query()
            .patchAndFetchById(id, patchCarBodyMatches);

        if (patchedCar) res.status(StatusCodes.OK).json(patchedCar)
        else (res.status(StatusCodes.NOT_FOUND)).json({ msg: 'Car is not found' });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

export const deleteCar = async (req: Request, res: Response) => {
    const { id } = matchedData(req);

    try {
        const deletedCar = await Car.query()
            .patchAndFetchById(id, { deletedAt: new Date().toISOString() });

        if (deletedCar) res.sendStatus(StatusCodes.NO_CONTENT);
        else (res.status(StatusCodes.NOT_FOUND)).json({ msg: 'Car is not found' });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}