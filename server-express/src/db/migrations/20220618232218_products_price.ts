/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('productsPrice', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('priceTypeId')
        .references('id')
        .inTable('productsPriceType')
        .unsigned()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl.integer('productId')
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
      tbl.timestamps(true, true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('productsPrice')
}
