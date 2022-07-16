/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('category', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.string('name', 50)
        .notNullable()
        .unique()
      tbl.string('name_eng', 50)
        .notNullable()
        .unique()
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
    .dropTable('category')
}
