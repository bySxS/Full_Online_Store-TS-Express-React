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
      tbl.integer('userId')
        .references('id')
        .inTable('users')
        .unsigned()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      tbl.string('status', 40)
        .notNullable()
        .checkIn([
          'SelectsTheProduct',
          'InProcessing',
          'InDelivery',
          'Completed',
          'Cancelled'])
        .defaultTo('SelectsTheProduct')
      tbl.string('fullName', 100)
      tbl.string('comment', 1000)
      tbl.string('deliveryAddress', 500)
      tbl.string('phoneNumber', 25)
      tbl.dateTime('dateProcessing')
        .defaultTo(null)
      tbl.dateTime('deliveryDate')
        .defaultTo(null)
      tbl.timestamps(true, true, true)
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
