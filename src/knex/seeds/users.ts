import { Knex } from 'knex';

const randomDigit = (length: number) => {
    let digitsString = '';
    for (let i = 0; i < length; i++) {
        digitsString += Math.floor(Math.random() * 10);
    };

    return digitsString;
};

export const seed = async (knex: Knex): Promise<void> => {
    await knex('users').del();

    const users = [];

    for (let i = 1; i <= 17; i++) {
        const first_name = 'FIRSTNAME' + i;
        const last_name = 'LASTNAME' + i;
        const address = (Math.floor(Math.random() * (500 - 1 + 1)) + 1) + ' ' + 'SEEDER BOULEVARD' + ', ' + 'SOUTH POLE' + ', ' + 'ANTARTICA';
        const phone_number = '999' + randomDigit(7);
        const password = 'password' + i;

        users.push({
            first_name,
            last_name,
            address,
            phone_number,
            password
        });
    };

    await knex('users').insert(users);
};