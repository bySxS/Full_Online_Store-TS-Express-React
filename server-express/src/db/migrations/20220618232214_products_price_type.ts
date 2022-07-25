/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('productsPriceType', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.string('name', 100)
        .notNullable()
        .unique()
      tbl.timestamps(true, true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('productsPriceType')
}
