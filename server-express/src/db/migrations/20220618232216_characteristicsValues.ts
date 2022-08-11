/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('characteristicsValues', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.string('value', 100)
        .notNullable()
        .unique()
        .index('idx_value')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('characteristicsValues')
}
