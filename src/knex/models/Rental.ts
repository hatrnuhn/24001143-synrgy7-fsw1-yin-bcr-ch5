import { Model, snakeCaseMappers } from 'objection';

class Rental extends Model {
    id!: number;
    carId!: string;
    userId!: number;
    amount!: string;
    endDate!: string;

    static get tableName() {
        // maps the Rental model to rentals table
        return 'rentals';
    };

    static get columnNameMappers() {
        // If your columns are UPPER_SNAKE_CASE you can
        // use snakeCaseMappers({ upperCase: true })
        return snakeCaseMappers();
    }

    static get relationMappings() {
        const Payment = require('./Payment');
        const User = require('./User');
        const Car = require('./Car');

        return {
            car: {
                relation: Model.BelongsToOneRelation,
                modelClass: Car,
                join: {
                    from: 'rentals.car_id',
                    to: 'cars.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'rentals.user_id',
                    to: 'users.id'
                }
            },
            payment: {
                relation: Model.HasOneRelation,
                modelClass: Payment,
                join: {
                    from: 'rentals.id',
                    to: 'payments.rental_id'
                }
            },
        }
    }
};

export default Rental;