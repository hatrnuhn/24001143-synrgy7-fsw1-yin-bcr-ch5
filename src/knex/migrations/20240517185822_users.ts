import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').nullable();
        table.string('address').notNullable();
        table.string('phone_number').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable().defaultTo(null);
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
};