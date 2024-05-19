import { Knex } from 'knex';
import Rental from '../models/Rental';
import { Model } from 'objection';

const randomInt = (n: number) => {
    return Math.floor(Math.random() * n);
};

export const seed = async (knex: Knex): Promise<void> => {
    await knex('payments').del();

    Model.knex(knex);

    const rentals = await Rental.query();

    const payments = [];

    for (let i = 0; i < 41; i++) {
        const payment: {
            paid_at?: string,
            rental_id?: number
        } = { rental_id: rentals[randomInt(rentals.length)].id }

        if (![2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31].includes(i)) payment.paid_at = new Date().toISOString();

        payments.push(payment);
    };

    await knex('payments').insert(payments);
};