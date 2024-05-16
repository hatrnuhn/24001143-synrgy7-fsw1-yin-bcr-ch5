import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const addCarImageRecord = (req: Request, res: Response) => {
    const { carId } = matchedData(req);
    const { filePath } = res.locals;

    const prisma = new PrismaClient();
    const savedImage = prisma.carImage.create({
        data: {
            carId,
            filePath,
        }
    });

    savedImage
        .then(i => res.status(StatusCodes.CREATED).json(i))
        .catch(e => {
            console.log(e);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        })
        .finally(async () => await prisma.$disconnect());
}

export const deleteCarImageRecord = (req: Request, res: Response) => {
    const { imageId } = matchedData(req);

    const prisma = new PrismaClient();

    const deletedImage = prisma.carImage.delete({
        where: {
            id: parseInt(imageId)
        }
    });

    deletedImage
        .then(i => res.status(StatusCodes.OK).json({ msg: `Image with ID ${imageId} deleted successfully` }))
        .catch(e => {
            console.log(e);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        })
        .finally(async () => await prisma.$disconnect());
}