import { Request, Response } from 'express';
import { Car } from '../data/cars';
import { StatusCodes } from 'http-status-codes';
import { AddUpdateCarReqBody, GetCarsQuery } from '../dtos/cars';
import { v4 as uuidv4 } from 'uuid';
import { matchedData } from 'express-validator';
import CarsModel from '../mongoose/schemas/cars';
import { saveToDB, getDataFromDB, cleanCarsFromDB, cleanCarFromDB } from '../mongoose/utils';

export const addCar = (req: Request<{}, {}, AddUpdateCarReqBody>, res: Response) => {
    const addCarBodyMatches = matchedData(req);

    const newUuid = uuidv4();

    const newCar = {
        id: newUuid,
        ...addCarBodyMatches
    };

    const savedCar = saveToDB('Car', newCar, CarsModel);
    savedCar
        .then(v => {
            console.log(`Saved to database, id: ${v.id}`);
            res.status(StatusCodes.CREATED).json(newCar);
        })
        .catch(err => res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR));
}

export const getCars = async (req: Request<{}, {}, {}, GetCarsQuery>, res: Response) => {
    try {
        const { availability, manufacture, transmission, sortByYear, year } = matchedData(req) as GetCarsQuery;
    
        const carsFromDB = await getDataFromDB(CarsModel);
        
        let carsFiltered = cleanCarsFromDB(carsFromDB);
            
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
    } catch (err) {
        console.log(err);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

export const getCarById = (req: Request, res: Response) => {
    const index = res.locals.carFoundIndex;
    const carsFromDB = getDataFromDB(CarsModel);
    carsFromDB
        .then(carsDB => {
            const cars = cleanCarsFromDB(carsDB);
            console.log(cars[index]);
            res.status(StatusCodes.OK).json(cars[index])})
        .catch(err => {
            console.log(err);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        });
}

export const updateCar = (req: Request<{}, {}, AddUpdateCarReqBody>, res: Response) => {
    const { id, ...updateCarBodyMatches } = matchedData(req);

    const docs = CarsModel.findOne({ id: id }).orFail();
    docs
        .then(c => {
                c.plate = updateCarBodyMatches.plate;
                c.transmission = updateCarBodyMatches.transmission;
                c.manufacture = updateCarBodyMatches.manufacture;
                c.model = updateCarBodyMatches.model;
                c.available = updateCarBodyMatches.available;
                c.type = updateCarBodyMatches.type;
                c.year = updateCarBodyMatches.year;
                c.options = updateCarBodyMatches.options;
                c.deleted = updateCarBodyMatches.deleted;

                c.save();
    
                res.status(StatusCodes.ACCEPTED).json(cleanCarFromDB(c));
            }
        )
        .catch( err => {
            console.log(err);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        });
}

export const deleteCar = (req: Request, res: Response) => {
    const { id } = matchedData(req);

    const docs = CarsModel.findOne({ id: id }).orFail();
    docs
        .then(c => {
                c.deleted = true;

                c.save();
    
                res.sendStatus(StatusCodes.NO_CONTENT);
            }
        )
        .catch( err => {
            console.log(err);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        });
}