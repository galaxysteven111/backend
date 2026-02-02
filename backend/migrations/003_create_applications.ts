import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('applications', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('food_box_id').references('id').inTable('food_boxes').onDelete('CASCADE');
    table.uuid('recipient_id').references('id').inTable('users').onDelete('CASCADE');
    table.enum('status', ['pending', 'approved', 'rejected', 'completed', 'cancelled']).defaultTo('pending');
    table.text('message').nullable();
    table.integer('quantity_requested').notNullable().defaultTo(1);
    table.timestamp('approved_at').nullable();
    table.timestamps(true, true);
    
    table.index(['food_box_id']);
    table.index(['recipient_id']);
    table.index(['status']);
    table.unique(['food_box_id', 'recipient_id']); // 每個用戶對每個飯盒只能申請一次
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('applications');
}
