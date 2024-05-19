import { RequestHandler } from "express";
import { matchedData } from "express-validator";

export const printRequest: RequestHandler = (req, res, next) => {
    const { method, path } = req;
    console.log(`${method} ${path}`);
    next();
};

export const checkCarImagesCountInDatabase: RequestHandler = (req, res, next) => {
    const { carId } = matchedData(req);

    next();
};

export const checkImageInDatabase: RequestHandler = (req, res, next) => {
    const { carId, imageId } = matchedData(req);

    next();
}