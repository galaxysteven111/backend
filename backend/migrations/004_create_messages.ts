import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('sender_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('receiver_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('food_box_id').references('id').inTable('food_boxes').onDelete('CASCADE').nullable();
    table.text('content').notNullable();
    table.boolean('is_read').defaultTo(false);
    table.timestamps(true, true);
    
    table.index(['sender_id']);
    table.index(['receiver_id']);
    table.index(['food_box_id']);
    table.index(['is_read']);
    table.index(['created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages');
}
