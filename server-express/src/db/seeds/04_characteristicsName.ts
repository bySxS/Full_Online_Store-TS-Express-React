import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('characteristicsName').insert([
    { id: 1, categoryId: 2, name: 'Общие характеристики', fieldType: '' },

    { id: 2, categoryId: 8, name: 'Стандарт связи/интернет', fieldType: '' },
    { id: 3, categoryId: 8, name: 'Дисплей', fieldType: '' },
    { id: 4, categoryId: 8, name: 'СИМ-карты', fieldType: '' },
    { id: 5, categoryId: 8, name: 'Функции памяти', fieldType: '' },
    { id: 6, categoryId: 8, name: 'Операционная система', fieldType: '' },
    { id: 7, categoryId: 8, name: 'Фронтальная камера', fieldType: '' },
    { id: 8, categoryId: 8, name: 'Процессор', fieldType: '' },
    { id: 9, categoryId: 8, name: 'Основная камера', fieldType: '' },
    { id: 10, categoryId: 8, name: 'Питание', fieldType: '' },
    { id: 11, categoryId: 8, name: 'Разъемы', fieldType: '' },
    { id: 12, categoryId: 8, name: 'Навигация', fieldType: '' },
    { id: 13, categoryId: 8, name: 'Размеры', fieldType: '' },

    { id: 14, categoryId: 2, name: 'Цвет', fieldType: 'select', parentId: 1 },
    { id: 15, categoryId: 2, name: 'Гарантия', fieldType: 'select', parentId: 1 },
    { id: 16, categoryId: 2, name: 'Беспроводные технологии', fieldType: 'checkbox', parentId: 1 },
    { id: 17, categoryId: 2, name: 'Комплект поставки', fieldType: 'checkbox', parentId: 1 },

    { id: 18, categoryId: 2, name: 'Стандарт связи', fieldType: 'checkbox', parentId: 2 },

    { id: 19, categoryId: 2, name: 'Диагональ экрана', fieldType: 'select', parentId: 3 },
    { id: 20, categoryId: 2, name: 'Разрешение дисплея', fieldType: 'select', parentId: 3 },
    { id: 21, categoryId: 2, name: 'Тип матрицы', fieldType: 'select', parentId: 3 },
    { id: 22, categoryId: 2, name: 'Количество точек касания', fieldType: 'select', parentId: 3 },
    { id: 23, categoryId: 2, name: 'Материал экрана', fieldType: 'select', parentId: 3 },

    { id: 24, categoryId: 2, name: 'Количество SIM-карт', fieldType: 'select', parentId: 4 },
    { id: 25, categoryId: 2, name: 'Размеры СИМ-карты', fieldType: 'select', parentId: 4 },

    { id: 26, categoryId: 2, name: 'Оперативная память', fieldType: 'select', parentId: 5 },
    { id: 27, categoryId: 2, name: 'Встроенная память', fieldType: 'select', parentId: 5 },

    { id: 28, categoryId: 2, name: 'Операционная система', fieldType: 'select', parentId: 6 },

    { id: 29, categoryId: 2, name: 'Количество мегапикселей фронтальной камеры', fieldType: 'select', parentId: 7 },

    { id: 30, categoryId: 2, name: 'Процессор', fieldType: 'select', parentId: 8 },
    { id: 31, categoryId: 2, name: 'Тип ядра', fieldType: 'select', parentId: 8 },
    { id: 32, categoryId: 2, name: 'Видеоядро', fieldType: 'select', parentId: 8 },
    { id: 33, categoryId: 2, name: 'Количество ядер', fieldType: 'select', parentId: 8 },
    { id: 34, categoryId: 2, name: 'Частота', fieldType: 'select', parentId: 8 },

    { id: 35, categoryId: 2, name: 'Количество мегапикселей основной камеры', fieldType: 'select', parentId: 9 },
    { id: 36, categoryId: 2, name: 'Особенности основной камеры', fieldType: 'select', parentId: 9 },
    { id: 37, categoryId: 2, name: 'Запись видео основной камеры', fieldType: 'select', parentId: 9 },

    { id: 38, categoryId: 2, name: 'Емкость аккумулятора', fieldType: 'select', parentId: 10 },

    { id: 39, categoryId: 2, name: 'Разъем зарядного устройства', fieldType: 'select', parentId: 11 },
    { id: 40, categoryId: 2, name: 'Разъем для подключения к ПК', fieldType: 'select', parentId: 11 },
    { id: 41, categoryId: 2, name: 'Разъем для наушников', fieldType: 'select', parentId: 11 },

    { id: 42, categoryId: 2, name: 'Навигация', fieldType: 'select', parentId: 12 },
    { id: 43, categoryId: 2, name: 'A-GPS', fieldType: 'select', parentId: 12 },

    { id: 44, categoryId: 2, name: 'Вес, г', fieldType: 'text', parentId: 13 },
    { id: 45, categoryId: 2, name: 'Ширина', fieldType: 'text', parentId: 13 },
    { id: 46, categoryId: 2, name: 'Высота', fieldType: 'text', parentId: 13 },
    { id: 47, categoryId: 2, name: 'Глубина', fieldType: 'text', parentId: 13 }

  ])
}
