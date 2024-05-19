import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("cars", table => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.string('plate').notNullable();
        table.string('manufacture').notNullable();
        table.string('model').notNullable();
        table.string('rate').unsigned().notNullable();
        table.string('description').notNullable().defaultTo('This car does not have any description yet.');
        table.string('transmission').notNullable();
        table.string('type').notNullable();
        table.smallint('year').unsigned().notNullable();
        table.specificType('options', 'varchar(255)[]').nullable();
        table.specificType('specs', 'varchar(255)[]').nullable();
        table.date('available_date').notNullable().defaultTo(new Date().toISOString());
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable().defaultTo(null);
    });
};


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('cars');
};