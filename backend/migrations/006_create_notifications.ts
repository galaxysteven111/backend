import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notifications', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('type', 50).notNullable(); // 'application_received', 'application_approved', 'application_rejected', 'food_box_reserved'
    table.string('title', 200).notNullable();
    table.text('body').notNullable();
    table.uuid('related_food_box_id').references('id').inTable('food_boxes').onDelete('SET NULL');
    table.uuid('related_application_id').references('id').inTable('applications').onDelete('SET NULL');
    table.boolean('is_read').defaultTo(false);
    table.timestamps(true, true);

    table.index(['user_id', 'is_read']);
    table.index(['user_id', 'created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('notifications');
}
