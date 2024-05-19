import { Request, RequestHandler, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";
import CarImage from "../../../knex/models/CarImage";

export const addCarImageRecord = async (req: Request, res: Response) => {
    const { carId } = matchedData(req);
    const savedImage = await CarImage.query()
        .insertAndFetch({
            carId,
            filename: res.locals.imageFilename
        });
    
    res.status(StatusCodes.CREATED).json(savedImage);
};

export const deleteCarImageRecord = async (req: Request, res: Response) => {
    const { imageId } = matchedData(req);

    await CarImage.query()
        .deleteById(imageId);

    res.sendStatus(StatusCodes.NO_CONTENT);
};

export const getCarImagesOfCar: RequestHandler = async (req, res) => {
    const { carId } = matchedData(req);

    const carImages = await CarImage.query()
        .where({ carId, });
    
    res.status(StatusCodes.OK).json(carImages);
};