import { RequestHandler } from 'express';
import { matchedData } from 'express-validator';
import multer from 'multer';
import path from 'path';
import fsAsync from 'fs/promises';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import CarImage from '../knex/models/CarImage';

export const uploadCarImage: RequestHandler = (req, res, next) => {
    const { carId } = matchedData(req);
    const PUBLIC_DIR = path.join(__dirname, '../public');
    const UPLOAD_DIR = path.join(PUBLIC_DIR, `uploads/images/cars`, `${carId}`);
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true });
            cb(null, UPLOAD_DIR);
        },
        filename: (req, file, cb) => {
            const filename = Date.now() + path.extname(file.originalname);
            res.locals.imageFilename = filename;
            cb(null, filename);
        }
    });

    const upload = multer({ storage }).single('image');
    
    upload(req, res, err => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
            return;
        }
        res.locals.UPLOAD_DIR = UPLOAD_DIR;
        next();
    });
};

export const deleteCarImage: RequestHandler = async (req, res, next) => {
    const { carId, imageId } = matchedData(req);

    try {
        const queriedImage = await CarImage.query()
        .where({ id: imageId })
        .first();
    
        if (!queriedImage) return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Image is not found' });

        // implement file deletion
        const filePath = path.join(__dirname, '..', 'public/uploads/images/cars', `${carId}`, path.basename(queriedImage.filename));

        await fsAsync.access(filePath);
        await fsAsync.unlink(filePath);

        next();
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            try {
                await CarImage.query().deleteById(imageId);
                res.status(StatusCodes.NOT_FOUND).json({ msg: 'File not found' });
            } catch (err) {
                throw err;
            }
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }
}