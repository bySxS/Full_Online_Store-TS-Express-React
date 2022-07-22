/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('characteristics_name', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('category_id')
        // .defaultTo(null)
        .references('id')
        .inTable('category')
        .unsigned()
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      tbl.string('name', 150)
        .notNullable()
      tbl.string('field_type', 100)
      tbl.integer('parent_id')
        .defaultTo(null)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('characteristics_name')
}
