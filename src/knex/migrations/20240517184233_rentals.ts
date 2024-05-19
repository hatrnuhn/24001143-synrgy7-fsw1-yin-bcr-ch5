import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('rentals', table => {
        table.bigIncrements('id').primary();
        table.uuid('car_id').references('id').inTable('cars').notNullable().onDelete('CASCADE');
        table.integer('user_id').references('id').inTable('users').unsigned().notNullable().onDelete('CASCADE');
        table.string('amount').unsigned().notNullable();
        table.date('start_date').notNullable().defaultTo(knex.fn.now());
        table.date('end_date').notNullable();
        table.timestamps(true, true);
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('rentals');
};