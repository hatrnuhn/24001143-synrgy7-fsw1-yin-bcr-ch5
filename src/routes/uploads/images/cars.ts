import { Router } from 'express';
import { addCarImageRecord, deleteCarImageRecord, getCarImagesOfCar } from '../../../services/uploads/images/cars';
import { checkSchema } from 'express-validator';
import { carImageParamsSchema } from '../../../validationSchemas/carImage';
import validate from '../../../middlewares/validation/uploads/carImages';
import { uploadCarImage, deleteCarImage } from '../../../middlewares/uploads';

const router = Router();

router.get('/:carId', checkSchema(carImageParamsSchema, ['params']), validate.carImagesParams, validate.carImagesParamsExistence, getCarImagesOfCar);
router.post('/:carId', checkSchema(carImageParamsSchema, ['params']), validate.carImagesParams, validate.carImagesParamsExistence, validate.carImagesCount, uploadCarImage, addCarImageRecord);
router.delete('/:carId/:imageId', checkSchema(carImageParamsSchema, ['params']), validate.carImagesParams, validate.carImagesParamsExistence, deleteCarImage, deleteCarImageRecord);

export default router;