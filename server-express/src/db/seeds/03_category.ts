/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('category_news').del()
  await knex('category').insert([
    { id: 1, name: 'Автотовары', name_eng: 'Auto-goods', parent_id: null },
    { id: 2, name: 'Электроника', name_eng: 'Electronica', parent_id: null },
    { id: 3, name: 'Одежда', name_eng: 'Clothing', parent_id: null },

    { id: 4, name: 'Автоаксессуары', name_eng: 'Auto Aviation-ses', parent_id: 1 },
    { id: 5, name: 'Автозапчасти', name_eng: 'Auto parts', parent_id: 1 },
    { id: 6, name: 'Автохимия и масла', name_eng: 'Auto-chemistry and oil', parent_id: 1 },
    { id: 7, name: 'Автоэлектроника', name_eng: 'Auto electronics', parent_id: 1 },

    { id: 8, name: 'Смартфоны', name_eng: 'Smartphones', parent_id: 2 },
    { id: 9, name: 'Ноутбуки и компьютеры', name_eng: 'Laptops and computers', parent_id: 2 },
    { id: 10, name: 'Комплектующие к ПК', name_eng: 'Components PC', parent_id: 2 },
    { id: 11, name: 'Наушники', name_eng: 'Headphones', parent_id: 2 },

    { id: 12, name: 'Одежда для мужчин', name_eng: 'Clothing for men', parent_id: 3 },
    { id: 13, name: 'Одежда для женщин', name_eng: 'Clothes for women', parent_id: 3 },
    { id: 14, name: 'Мужская обувь', name_eng: 'Men\'s shoes', parent_id: 3 },
    { id: 15, name: 'Женская обувь', name_eng: 'Women\'s shoes', parent_id: 3 },
    { id: 16, name: 'Аксессуары для мужчин', name_eng: 'Accessories for men', parent_id: 3 },
    { id: 17, name: 'Аксессуары для женщин', name_eng: 'Accessories for women', parent_id: 3 },

    { id: 18, name: 'Кроссовки', name_eng: 'Sneakers', parent_id: 14 },
    { id: 19, name: 'Кеды', name_eng: 'gumshoes', parent_id: 14 },
    { id: 20, name: 'Туфли', name_eng: 'shoe', parent_id: 14 },
    { id: 21, name: 'Шлепанцы и вьетнамки', name_eng: 'Slipans and vietnamese', parent_id: 14 },
    { id: 22, name: 'Комнатная обувь', name_eng: 'Indoor shoes', parent_id: 14 }

  ])
}
