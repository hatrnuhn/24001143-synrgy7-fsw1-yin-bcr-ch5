import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AddUpdateCarReqBody, GetCarsQuery } from '../dtos/cars';
import { v4 as uuidv4 } from 'uuid';
import { matchedData } from 'express-validator';
import { PrismaClient, Prisma } from '@prisma/client';

export const addCar = (req: Request<{}, {}, AddUpdateCarReqBody>, res: Response) => {
    const addCarBodyMatches = matchedData(req);

    const newUuid = uuidv4();

    const newCar = {
        id: newUuid,
        ...addCarBodyMatches as AddUpdateCarReqBody
    };

    const prisma = new PrismaClient();

    const savedCar = prisma.car.create({
        data: newCar
    })

    savedCar
        .then((car) => {
            res.status(StatusCodes.CREATED).json(car);
        })
        .catch((e) => {
            console.error(e)
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        })
        .finally(async () => {
            await prisma.$disconnect()
        })
}

export const getCars = async (req: Request<{}, {}, {}, GetCarsQuery>, res: Response) => {
    const prisma = new PrismaClient();

    try {
        const { availability, manufacture, transmission, sortByYear, year } = matchedData(req) as GetCarsQuery;

        let query: Prisma.CarFindManyArgs = {
            where: {
                deletionTimestamp: null
            },
            orderBy: undefined
        }

        switch (availability) {
            case 'yes':
                query = {
                    ...query,
                    where: {
                        ...query.where,
                        availableDate: {
                            lte: new Date()
                        }
                    }
                }
                break;
            case 'no':
                query = {
                    ...query,
                    where: {
                        ...query.where,
                        availableDate: {
                            gt: new Date()
                        }
                    }
                }
                break;
            case 'all':
                break;
            default:
                break;
        }
    
        if (manufacture){
            query = {
                ...query,
                where: {
                    ...query.where,
                    manufacture: {
                        equals: manufacture,
                        mode: 'insensitive'
                    }
                }
            }
        }
        if (year){
            query = {
                ...query,
                where: {
                    ...query.where,
                    year: Number(year)
                }
            }
        }
        if (transmission){
            query = {
                ...query,
                where: {
                    ...query.where,
                    transmission: {
                        equals: transmission,
                        mode: 'insensitive'
                    }
                }
            }
        }
    
        switch (sortByYear) {
            case 'asc':
                query = {
                    ...query,
                    orderBy: {
                        year: 'asc'
                    }
                }
                break;
            case 'desc':
                query = {
                    ...query,
                    orderBy: {
                        year: 'desc'
                    }
                }
                break;
            default:
                break;
        } 
    
        const cars = await prisma.car.findMany(query);

        res.status(StatusCodes.OK).json(cars);

    } catch (err) {
        console.log(err);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);   
    } finally {
        await prisma.$disconnect();
    }
}

export const getCarById = (req: Request, res: Response) => {
    const { id } = matchedData(req);
    const prisma = new PrismaClient();

    const car = prisma.car.findFirstOrThrow({
        where: {
            id: id
        }
    });

    car
        .then((c) => {
            if (c.deletionTimestamp) throw {code: 'P2025'} 
            else res.status(StatusCodes.OK).json(c);
        })
        .catch((e) => {
            console.log(e);
            switch (e.code) {
                case 'P2025':
                    res.status(StatusCodes.NOT_FOUND).json({msg: 'Car is not found'});
                    break;
                default:
                    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                    break;
            }
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export const updateCar = (req: Request<{}, {}, AddUpdateCarReqBody>, res: Response) => {
    const { id, ...updateCarBodyMatches } = matchedData(req);

    const prisma = new PrismaClient();
    const updatedCar = prisma.car.update({
        where: {
            id
        },
        data: {
            id,
            ...updateCarBodyMatches
        }
    });

    updatedCar
        .then(c => res.status(StatusCodes.OK).json(c))
        .catch(e => {
            console.log(e);
            switch (e.code) {
                case 'P2025':
                    res.status(StatusCodes.NOT_FOUND).json({msg: 'Car is not found'});
                    break;
                default:
                    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                    break;
            }
        })
        .finally(async () => await prisma.$disconnect());
}

export const deleteCar = (req: Request, res: Response) => {
    const { id, ...deleteCarBodyMatches } = matchedData(req);

    const prisma = new PrismaClient();
    const deletedCar = prisma.car.update({
        where: {
            id
        },
        data: {
            id,
            ...deleteCarBodyMatches,
            deletionTimestamp: new Date().toISOString()
        }
    });

    deletedCar
        .then((c) => res.status(StatusCodes.OK).json(c))
        .catch(e => {
            switch (e.code) {
                case 'P2025':
                    res.status(StatusCodes.NOT_FOUND).json({msg: 'Car is not found'});
                    break;
                default:
                    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                    break;
            }
        })
        .finally(async () => await prisma.$disconnect());
}