import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('category_movies').del()
  await knex('characteristics_values').insert([
    { id: 1, category_id: 2, name: 'Общие характеристики', field_type: '' },

    { id: 2, category_id: 8, name: 'Стандарт связи/интернет', field_type: '' },
    { id: 3, category_id: 8, name: 'Дисплей', field_type: '' },
    { id: 4, category_id: 8, name: 'СИМ-карты', field_type: '' },
    { id: 5, category_id: 8, name: 'Функции памяти', field_type: '' },
    { id: 6, category_id: 8, name: 'Операционная система', field_type: '' },
    { id: 7, category_id: 8, name: 'Фронтальная камера', field_type: '' },
    { id: 8, category_id: 8, name: 'Процессор', field_type: '' },
    { id: 9, category_id: 8, name: 'Основная камера', field_type: '' },
    { id: 10, category_id: 8, name: 'Питание', field_type: '' },
    { id: 11, category_id: 8, name: 'Разъемы', field_type: '' },
    { id: 12, category_id: 8, name: 'Навигация', field_type: '' },
    { id: 13, category_id: 8, name: 'Размеры', field_type: '' },

    { id: 14, category_id: 2, name: 'Цвет', field_type: 'select', parent_id: 1 },
    { id: 15, category_id: 2, name: 'Гарантия', field_type: 'select', parent_id: 1 },
    { id: 16, category_id: 2, name: 'Беспроводные технологии', field_type: 'checkbox', parent_id: 1 },
    { id: 17, category_id: 2, name: 'Комплект поставки', field_type: 'checkbox', parent_id: 1 },

    { id: 18, category_id: 2, name: 'Стандарт связи', field_type: 'checkbox', parent_id: 2 },

    { id: 19, category_id: 2, name: 'Диагональ экрана', field_type: 'select', parent_id: 3 },
    { id: 20, category_id: 2, name: 'Разрешение дисплея', field_type: 'select', parent_id: 3 },
    { id: 21, category_id: 2, name: 'Тип матрицы', field_type: 'select', parent_id: 3 },
    { id: 22, category_id: 2, name: 'Количество точек касания', field_type: 'select', parent_id: 3 },
    { id: 23, category_id: 2, name: 'Материал экрана', field_type: 'select', parent_id: 3 },

    { id: 24, category_id: 2, name: 'Количество SIM-карт', field_type: 'select', parent_id: 4 },
    { id: 25, category_id: 2, name: 'Размеры СИМ-карты', field_type: 'select', parent_id: 4 },

    { id: 26, category_id: 2, name: 'Оперативная память', field_type: 'select', parent_id: 5 },
    { id: 27, category_id: 2, name: 'Встроенная память', field_type: 'select', parent_id: 5 },

    { id: 28, category_id: 2, name: 'Операционная система', field_type: 'select', parent_id: 6 },

    { id: 29, category_id: 2, name: 'Количество мегапикселей фронтальной камеры', field_type: 'select', parent_id: 7 },

    { id: 30, category_id: 2, name: 'Процессор', field_type: 'select', parent_id: 8 },
    { id: 31, category_id: 2, name: 'Тип ядра', field_type: 'select', parent_id: 8 },
    { id: 32, category_id: 2, name: 'Видеоядро', field_type: 'select', parent_id: 8 },
    { id: 33, category_id: 2, name: 'Количество ядер', field_type: 'select', parent_id: 8 },
    { id: 34, category_id: 2, name: 'Частота', field_type: 'select', parent_id: 8 },

    { id: 35, category_id: 2, name: 'Количество мегапикселей основной камеры', field_type: 'select', parent_id: 9 },
    { id: 36, category_id: 2, name: 'Особенности основной камеры', field_type: 'select', parent_id: 9 },
    { id: 37, category_id: 2, name: 'Запись видео основной камеры', field_type: 'select', parent_id: 9 },

    { id: 38, category_id: 2, name: 'Емкость аккумулятора', field_type: 'select', parent_id: 10 },

    { id: 39, category_id: 2, name: 'Разъем зарядного устройства', field_type: 'select', parent_id: 11 },
    { id: 40, category_id: 2, name: 'Разъем для подключения к ПК', field_type: 'select', parent_id: 11 },
    { id: 41, category_id: 2, name: 'Разъем для наушников', field_type: 'select', parent_id: 11 },

    { id: 42, category_id: 2, name: 'Навигация', field_type: 'select', parent_id: 12 },
    { id: 43, category_id: 2, name: 'A-GPS', field_type: 'select', parent_id: 12 },

    { id: 44, category_id: 2, name: 'Вес, г', field_type: 'text', parent_id: 13 },
    { id: 45, category_id: 2, name: 'Ширина', field_type: 'text', parent_id: 13 },
    { id: 46, category_id: 2, name: 'Высота', field_type: 'text', parent_id: 13 },
    { id: 47, category_id: 2, name: 'Глубина', field_type: 'text', parent_id: 13 }

  ])
}
