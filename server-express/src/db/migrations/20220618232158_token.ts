/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('token', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('userId')
        .references('id')
        .inTable('users')
        .unsigned()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .unique()
        .notNullable()
      tbl.string('ip', 40)
        .notNullable()
      tbl.string('fingerprint', 1000)
        .notNullable()
      tbl.string('refreshToken')
        .notNullable()
      tbl.timestamps(true, true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('token')
}
