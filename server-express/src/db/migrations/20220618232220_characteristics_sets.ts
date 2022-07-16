/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('characteristics_sets', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('product_id')
        .references('id')
        .inTable('products')
        .unsigned()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl.integer('characteristics_values_id')
        .references('id')
        .inTable('characteristics_values')
        .unsigned()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl.string('value', 100)
        .notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('characteristics_sets')
}
