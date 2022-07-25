/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('basketProducts', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('basketId')
        .references('id')
        .inTable('basket')
        .notNullable()
        .unsigned()
      tbl.integer('productId')
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
        .unsigned()
      tbl.integer('productPriceId')
        .references('id')
        .inTable('productsPrice')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .unsigned()
      tbl.double('currentPrice')
        .notNullable()
      tbl.integer('productCount')
        .defaultTo(1)
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
    .dropTable('basketProducts')
}
