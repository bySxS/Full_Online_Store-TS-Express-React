/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('basket_products', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('basket_id')
        .references('id')
        .inTable('basket')
        .notNullable()
        .unsigned()
      tbl.integer('product_id')
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
        .unsigned()
      tbl.integer('product_price_id')
        .references('id')
        .inTable('products_price')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .unsigned()
      tbl.double('current_price')
        .notNullable()
      tbl.integer('product_count')
        .defaultTo(1)
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
    .dropTable('basket_products')
}
