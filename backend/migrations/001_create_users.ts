import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email').unique().notNullable();
    table.string('password_hash').notNullable();
    table.string('name').notNullable();
    table.string('phone').nullable();
    table.enum('role', ['donor', 'recipient', 'both']).defaultTo('both');
    table.decimal('latitude', 10, 8).nullable();
    table.decimal('longitude', 11, 8).nullable();
    table.string('district').nullable(); // 香港地區
    table.text('address').nullable();
    table.string('avatar_url').nullable();
    table.boolean('is_verified').defaultTo(false);
    table.timestamps(true, true);
    
    table.index(['email']);
    table.index(['district']);
    table.index(['latitude', 'longitude']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
