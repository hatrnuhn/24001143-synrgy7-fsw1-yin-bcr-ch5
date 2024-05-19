import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('payments', table => {
        table.bigIncrements('id').primary();
        table.integer('rental_id').references('id').inTable('rentals').unsigned().notNullable().onDelete('CASCADE');
        table.timestamp('paid_at').nullable().defaultTo(null);
        table.timestamps(true, true);
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('payments');
};