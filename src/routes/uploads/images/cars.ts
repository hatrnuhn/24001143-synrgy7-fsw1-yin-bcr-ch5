import { Router } from 'express';
import { addCarImageRecord, deleteCarImageRecord } from '../../../services/uploads/images/cars';
import { checkSchema } from 'express-validator';
import { carImageParamsSchema } from '../../../validationSchemas/carImage';
import validate from '../../../middlewares/validation';
import { checkCarIdInDatabase, checkCarImagesCountInDatabase, checkImageInDatabase } from '../../../middlewares/utils';
import { uploadCarImage, deleteCarImage } from '../../../middlewares/uploads';

const router = Router();

router.post('/:carId', checkSchema(carImageParamsSchema, ['params']), validate.carImageParams, checkCarIdInDatabase, checkCarImagesCountInDatabase, uploadCarImage, addCarImageRecord);
router.delete('/:carId/:imageId', checkSchema(carImageParamsSchema, ['params']), validate.carImageParams, checkCarIdInDatabase, checkImageInDatabase, deleteCarImage, deleteCarImageRecord);

export default router;