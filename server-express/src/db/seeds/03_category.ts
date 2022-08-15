/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('category').insert([
    { id: 1, name: 'Автотовары', nameEng: 'Auto-goods', iconClass: 'bi bi-car-front-fill', parentId: null },
    { id: 2, name: 'Электроника', nameEng: 'Electronica', iconClass: 'bi bi-pc-display-horizontal', parentId: null },
    { id: 3, name: 'Одежда', nameEng: 'Clothing', iconClass: 'bi bi-person', parentId: null },

    { id: 4, name: 'Автоаксессуары', nameEng: 'Auto Aviation-ses', parentId: 1 },
    { id: 5, name: 'Автозапчасти', nameEng: 'Auto parts', parentId: 1 },
    { id: 6, name: 'Автохимия и масла', nameEng: 'Auto-chemistry and oil', parentId: 1 },
    { id: 7, name: 'Автоэлектроника', nameEng: 'Auto electronics', parentId: 1 },

    { id: 8, name: 'Смартфоны', nameEng: 'Smartphones', parentId: 2 },
    { id: 9, name: 'Ноутбуки и компьютеры', nameEng: 'Laptops and computers', parentId: 2 },
    { id: 10, name: 'Комплектующие к ПК', nameEng: 'Components PC', parentId: 2 },
    { id: 11, name: 'Наушники', nameEng: 'Headphones', parentId: 2 },

    { id: 12, name: 'Одежда для мужчин', nameEng: 'Clothing for men', parentId: 3 },
    { id: 13, name: 'Одежда для женщин', nameEng: 'Clothes for women', parentId: 3 },
    { id: 14, name: 'Мужская обувь', nameEng: 'Men\'s shoes', parentId: 3 },
    { id: 15, name: 'Женская обувь', nameEng: 'Women\'s shoes', parentId: 3 },
    { id: 16, name: 'Аксессуары для мужчин', nameEng: 'Accessories for men', parentId: 3 },
    { id: 17, name: 'Аксессуары для женщин', nameEng: 'Accessories for women', parentId: 3 },

    { id: 18, name: 'Кроссовки', nameEng: 'Sneakers', parentId: 14 },
    { id: 19, name: 'Кеды', nameEng: 'gumshoes', parentId: 14 },
    { id: 20, name: 'Туфли', nameEng: 'shoe', parentId: 14 },
    { id: 21, name: 'Шлепанцы и вьетнамки', nameEng: 'Slipans and vietnamese', parentId: 14 },
    { id: 22, name: 'Комнатная обувь', nameEng: 'Indoor shoes', parentId: 14 }

  ])
}
