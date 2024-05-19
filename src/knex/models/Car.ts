import { Model, snakeCaseMappers } from 'objection';
import CarImage from './CarImage';

class Car extends Model {
    // availability, manufacture, transmission, sortByYear, year
    id!: string;
    availableAt!: Date;
    manufacture!: string;
    transmission!: string;
    deletedAt!: string;
    year!: number;
    rate!: string;

    static get columnNameMappers() {
        // If your columns are UPPER_SNAKE_CASE you can
        // use snakeCaseMappers({ upperCase: true })
        return snakeCaseMappers();
    };

    static get tableName() {
        // maps the Car model to cars table
        return 'cars';
    };

    static get relationMappings() {
        const Rental = require('./Rental');
        return {
            rental: {
                relation: Model.HasManyRelation,
                modelClass: Rental,
                join: {
                    from: 'cars.id',
                    to: 'rentals.car_id'
                }
            },
            carImage: {
                relation: Model.HasManyRelation,
                modelClass: CarImage,
                join: {
                    from: 'cars.id',
                    to: 'car_images.car_id'
                }
            }
        }
    };
};

export default Car;