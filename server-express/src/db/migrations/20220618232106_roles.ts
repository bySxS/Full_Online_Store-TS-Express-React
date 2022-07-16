/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('roles', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.string('name', 40)
        .notNullable()
        .unique()
      tbl.string('name_eng', 40)
        .notNullable()
        .unique()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('roles')
}
