import { Model, snakeCaseMappers } from "objection";

class CarImage extends Model {
    id!: number;
    carId!: string;
    filename!: string;

    static get columnNameMappers() {
        return snakeCaseMappers();
    };

    static get tableName() {
        return 'car_images';
    };

    static get relationMappings() {
        const Car = require('./Car');

        return {
            car: {
                relation: Model.BelongsToOneRelation,
                modelClass: Car,
                join: {
                    from: 'car_images.car_id',
                    to: 'cars.id'
                }
            }
        }
    }
};

export default CarImage;