import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { matchedData } from "express-validator";
import { PrismaClient } from "@prisma/client";

export const printRequest: RequestHandler = (req, res, next) => {
    const { method, path } = req;
    console.log(`${method} ${path}`);
    next();
};

export const checkCarIdInDatabase: RequestHandler = (req, res, next) => {
    const { carId } = matchedData(req);

    const prisma = new PrismaClient();

    const queriedCar = prisma.car.findFirstOrThrow({
        where: {
            id: carId
        }
    });

    queriedCar
        .then(() => next())
        .catch(e => {
            console.log(e);
            switch (e.code) {
                case 'P2025':
                    res.sendStatus(StatusCodes.NOT_FOUND);
                    break;
                default:
                    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                    break;
            }
        })
        .finally(async () => await prisma.$disconnect());
};

export const checkCarImagesCountInDatabase: RequestHandler = (req, res, next) => {
    const { carId } = matchedData(req);

    const prisma = new PrismaClient();

    const queriedImagesCount = prisma.carImage.count({
        where: {
            carId,
        }
    });

    queriedImagesCount
        .then(count => {
            if(count >= 10) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ error: `Maximum images count (10 images) for carId: ${carId} is reached` })
            else next();
        })
        .catch(e => {
            console.log(e);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        })
        .finally(async () => await prisma.$disconnect());
}

export const checkImageInDatabase: RequestHandler = (req, res, next) => {
    const { carId, imageId } = matchedData(req);

    const prisma = new PrismaClient();

    const queriedImage = prisma.carImage.findFirstOrThrow({
        where: {
            id: parseInt(imageId),
            carId
        }
    });

    queriedImage
        .then(i => next())
        .catch(e => {
            console.log(e);
            if (e.code === 'P2025') return res.sendStatus(StatusCodes.NOT_FOUND);

            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        })
        .finally(async () => await prisma.$disconnect());
}