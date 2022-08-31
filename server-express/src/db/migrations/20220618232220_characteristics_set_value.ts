/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('characteristicsSetValue', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('productId')
        .references('id')
        .inTable('products')
        .unsigned()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl.integer('characteristicsNameId')
        .references('id')
        .inTable('characteristicsName')
        .unsigned()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl.integer('characteristicsValueId')
        .references('id')
        .inTable('characteristicsValues')
        .unsigned()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('characteristicsSetValue')
}
