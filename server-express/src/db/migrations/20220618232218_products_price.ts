/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('products_price', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('price_type_id')
        .references('id')
        .inTable('prices_types')
        .unsigned()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl.integer('product_id')
        .references('id')
        .inTable('products')
        .unsigned()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl.double('price')
        .notNullable()
      tbl.string('currency', 40)
        .defaultTo('₴')
        .notNullable()
      tbl.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('products_price')
}
