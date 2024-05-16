import { RequestHandler } from 'express';
import { matchedData } from 'express-validator';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

export const uploadCarImage: RequestHandler = (req, res, next) => {
    const { carId } = matchedData(req);
    const PUBLIC_DIR = path.join(__dirname, '../public');
    const UPLOAD_DIR = path.join(PUBLIC_DIR, `uploads/images/cars`, carId);
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true });
            cb(null, UPLOAD_DIR);
        },
        filename: (req, file, cb) => {
            const filename = Date.now() + path.extname(file.originalname);
            res.locals.filePath = path.join('uploads/images/cars', carId, filename);
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

export const deleteCarImage: RequestHandler = (req, res, next) => {
    const { carId, imageId } = matchedData(req);

    const prisma = new PrismaClient();

    const queriedImage = prisma.carImage.findFirst({
        where: {
            id: parseInt(imageId)
        }
    });

    queriedImage
        .then(i => {
            // implement file deletion
            const filePath = path.join(__dirname, '..', 'public/uploads/images/cars', carId, path.basename(i?.filePath as string));
            fs.access(filePath as string, fs.constants.F_OK, (err) => {
                if(err) return next();

                fs.unlink(filePath as string, (err) => {
                    if (err) {
                        // Error while deleting file
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error deleting file' });
                    }
                    // File deleted successfully
                    res.status(StatusCodes.OK).json({ msg: 'File deleted successfully' });
                });
            });
        })
        .catch(e => {
            console.log(e);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        })
        .finally(async () => await prisma.$disconnect());
}