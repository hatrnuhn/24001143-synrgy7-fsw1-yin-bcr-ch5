import { Model, snakeCaseMappers } from 'objection';

class User extends Model {
    id!: number;
    firstName!: string;
    lastName!: string;
    address!: string;
    phoneNumber!: string;
    password!: string;
    deletedAt!: Date | null;

    static get columnNameMappers() {
        // If your columns are UPPER_SNAKE_CASE you can
        // use snakeCaseMappers({ upperCase: true })
        return snakeCaseMappers();
    };

    static get tableName() {
        // maps the Customer model to customers table
        return 'users';
    };

    static get relationMappings() {
        const Rental = require('./Rental');
        return {
            rental: {
                relation: Model.HasManyRelation,
                modelClass: Rental,
                join: {
                    from: 'customers.id',
                    to: 'rentals.customer_id'
                }
            }
        }
    }
};

export default User;