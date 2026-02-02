import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('food_boxes', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('donor_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description').nullable();
    table.integer('quantity').notNullable().defaultTo(1);
    table.enum('status', ['available', 'reserved', 'completed', 'cancelled']).defaultTo('available');
    table.decimal('latitude', 10, 8).notNullable();
    table.decimal('longitude', 11, 8).notNullable();
    table.string('district').notNullable(); // 香港地區
    table.text('pickup_address').notNullable();
    table.timestamp('pickup_time_start').notNullable();
    table.timestamp('pickup_time_end').notNullable();
    table.string('contact_method').defaultTo('message'); // message, phone, email
    table.json('images').nullable(); // 圖片URL數組
    table.timestamps(true, true);
    
    table.index(['donor_id']);
    table.index(['status']);
    table.index(['district']);
    table.index(['pickup_time_start', 'pickup_time_end']);
    table.index(['latitude', 'longitude']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('food_boxes');
}
