import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('car_images', table => {
        table.bigIncrements('id').primary();
        table.uuid('car_id').references('id').inTable('cars').unsigned().notNullable().onDelete('CASCADE');
        table.string('filename').notNullable();
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('car_images');
};
