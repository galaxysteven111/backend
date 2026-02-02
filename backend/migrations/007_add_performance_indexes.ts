import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('food_boxes', (table) => {
    // Composite index for the main listing query: WHERE status = ? ORDER BY created_at DESC
    table.index(['status', 'created_at'], 'idx_food_boxes_status_created');
    // Composite index for district filtering: WHERE status = ? AND district = ?
    table.index(['status', 'district'], 'idx_food_boxes_status_district');
  });

  await knex.schema.alterTable('applications', (table) => {
    // Composite index for recipient's application list
    table.index(['recipient_id', 'created_at'], 'idx_applications_recipient_created');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('food_boxes', (table) => {
    table.dropIndex([], 'idx_food_boxes_status_created');
    table.dropIndex([], 'idx_food_boxes_status_district');
  });

  await knex.schema.alterTable('applications', (table) => {
    table.dropIndex([], 'idx_applications_recipient_created');
  });
}
