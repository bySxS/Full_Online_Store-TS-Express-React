/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('basket', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('user_id')
        .references('id')
        .inTable('users')
        .unsigned()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      tbl.string('status', 40)
        .notNullable()
        .defaultTo('Selects the product')
      tbl.string('comment', 1000)
      tbl.string('delivery_address', 500)
      tbl.string('phone_number', 25)
      tbl.dateTime('date_processing')
        .defaultTo(null)
      tbl.dateTime('delivery_date')
        .defaultTo(null)
      tbl.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('basket')
}
