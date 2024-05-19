
import { Knex } from 'knex';
import Car from '../models/Car';
import User from '../models/User';
import { Model } from 'objection';

const randomInt = (n: number) => {
    return Math.floor(Math.random() * n);
};

export const seed = async (knex: Knex): Promise<void> => {
    await knex('rentals').del();

    Model.knex(knex);

    const cars = await Car.query().where({ deleted_at: null });
    const users = await User.query().where({ deleted_at: null }); 

    let rentals = []

    for (let i = 0; i < 37; i++) {
        const carIdIndex = randomInt(cars.length);
        const rental = {
            car_id: cars[carIdIndex].id,
            user_id: users[randomInt(users.length)].id,
            amount: cars[carIdIndex].rate,
            end_date: new Date()
        };

        rentals.push(rental);
    };

    await knex('rentals').insert(rentals);
};