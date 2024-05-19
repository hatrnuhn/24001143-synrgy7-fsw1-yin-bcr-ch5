import { Model, snakeCaseMappers } from 'objection';

class Payment extends Model {
    paidAt!: string;
    rentalId!: number;

    static get tableName() {
        // maps the Payment model to payments table
        return 'payments';
    };

    static get columnNameMappers() {
        // If your columns are UPPER_SNAKE_CASE you can
        // use snakeCaseMappers({ upperCase: true })
        return snakeCaseMappers();
    }

    static get relationMappings() {
        const Rental = require('./Rental');
        return {
            rental: {
                relation: Model.BelongsToOneRelation,
                modelClass: Rental,
                join: {
                    from: 'payments.rental_id',
                    to: 'rentals.id'
                }
            }
        };
    };
};

export default Payment;