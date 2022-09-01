import { cacheRedisDB } from '@/cache'
import { IMessage } from '@/interface'
import CategoryModel from './category.model'
import ApiError from '@/apiError'
import { ICategory, ICategoryOut, ICategoryService, ISectionOut } from './category.interface'
import { raw } from 'objection'

class CategoryService implements ICategoryService {
  private static instance = new CategoryService()

  static getInstance (): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService()
    }
    return CategoryService.instance
  }

  async add (Dto: ICategory): Promise<IMessage> {
    const { name, nameEng, parentId } = Dto
    if (parentId && parentId > 0) {
      const parent = await CategoryModel.query()
        .findOne({ id: parentId })
        .select('name')
      if (!parent) {
        throw ApiError.badRequest(
          `Родительской категории с id${parentId} не существует`,
          'CategoryService add')
      }
    }
    const alreadyHave = await CategoryModel.query()
      .where({ name })
      .orWhere({ nameEng })
    if (alreadyHave.length > 0) {
      throw ApiError.badRequest(
        'Категория с таким названием уже существует',
        'CategoryService add')
    }
    const result = await CategoryModel.query()
      .insert({
        name,
        nameEng,
        parentId
      })
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        `Категория ${name} не добавлена`,
        'CategoryService add')
    }
    await cacheRedisDB.del('categoryAll:sort') // удаляем кеш
    await cacheRedisDB.del('categoryAll:list') // удаляем кеш
    return {
      success: true,
      result,
      message: `Категория ${name} добавлена`
    }
  }

  async upd (id: number, Dto: ICategory): Promise<IMessage> {
    const { name, nameEng, parentId } = Dto
    if (parentId && parentId > 0) {
      const parent = await CategoryModel.query()
        .findOne({ id: parentId })
        .select('name')
      if (!parent) {
        throw ApiError.badRequest(
          `Родительской категории с id${parentId} не существует`,
          'CategoryService upd')
      }
    }
    const findCategory = await CategoryModel.query()
      .findById(id)
      .select('name', 'nameEng')
    if (!findCategory) {
      throw ApiError.badRequest(
        `Категории с id${id} не существует`,
        'CategoryService upd')
    }
    const result = await CategoryModel.query()
      .where({ id })
      .update({
        name,
        nameEng,
        parentId
      })
    if (!result) {
      throw ApiError.badRequest(
        `Категория ${findCategory.name} не изменена, возможно`,
        'CategoryService upd')
    }
    await cacheRedisDB.del('categoryAll:sort') // удаляем кеш
    await cacheRedisDB.del('categoryAll:list') // удаляем кеш
    return {
      success: true,
      result: { name, nameEng, parentId },
      message: `Категория ${findCategory.name} (${findCategory.nameEng}) изменена на ${name} (${nameEng})`
    }
  }

  async del (id: number): Promise<IMessage> {
    const result = await CategoryModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        `Категорию с id${id} не удалось удалить, возможно её не существует`,
        'CategoryService del')
    }
    await cacheRedisDB.del('categoryAll:sort') // удаляем кеш
    await cacheRedisDB.del('categoryAll:list') // удаляем кеш
    return {
      success: true,
      result,
      message: `Категория с id${id} успешно удалена`
    }
  }

  sortCategoryTree (category: CategoryModel[]): ISectionOut[] {
    const section: ISectionOut[] = []
    const categoryNotSort = category as unknown as {
      id: number
      parentId: number | null
      categoryName: string | null
      categoryNameEng: string | null
      categoryIconClass: string | null
      sectionName: string | null
      sectionNameEng: string | null
      sectionIconClass: string | null
      categoryCountProducts: number
    }[]
    for (const all of categoryNotSort) {
      const ids = new Set(section.map(section => section.sectionId)) // добавленные
      if (all.parentId === null) { // категории без отца делаем разделами
        all.sectionName = all.categoryName
        all.sectionNameEng = all.categoryNameEng
        all.sectionIconClass = all.categoryIconClass
        all.parentId = all.id
        all.categoryName = null
        all.categoryNameEng = null
        all.categoryIconClass = null
      } else if (ids.has(all.parentId)) { // если есть пропускаем
        continue
      }
      // ищем категорий с текущим отцом (разделом)
      const filterCharacteristics =
          categoryNotSort.filter(category => category.parentId === all.parentId)
      // считаем количество продуктов
      let sectionCountProducts = 0
      const cat: ICategoryOut[] = []
      for (const category1 of filterCharacteristics) {
        // если нет категории то пропускаем
        if (category1.categoryName === null ||
          category1.categoryNameEng === null ||
          category1.categoryIconClass === null) {
          continue
        }
        // иначе добавляем в массив категорий текущего раздела
        cat.push({
          categoryId: category1.id,
          categoryName: category1.categoryName,
          categoryNameEng: category1.categoryNameEng,
          categoryIconClass: category1.categoryIconClass,
          categoryCountProducts: category1.categoryCountProducts
        })
        sectionCountProducts += category1.categoryCountProducts
      }
      if (all.sectionName === null ||
        all.sectionNameEng === null ||
        all.sectionIconClass === null) {
        continue
      }
      // добавляем раздел с категориями и
      // количеством продуктов в новый отсортированный объект
      section.push({
        sectionId: all.parentId,
        sectionName: all.sectionName,
        sectionNameEng: all.sectionNameEng,
        sectionIconClass: all.sectionIconClass,
        sectionCountProducts,
        category: cat
      })
    }

    for (const sect of section) {
      for (const sect1 of section
        .filter((sect2) => sect2.sectionId !== sect.sectionId)) {
        const { category } = sect1
        // переносим внуков отца в subcategory и fix count
        for (const cat of category) {
          if (sect.sectionId === cat.categoryId) {
            cat.subcategory = sect.category
            sect.sectionName = 'delete'
            cat.categoryCountProducts = sect.sectionCountProducts
          }
        }
      }
      // считаем количество продуктов из за удаленный внуков
      for (const sect3 of section) {
        let sectionCountProducts = 0
        for (const cat of sect3.category) {
          sectionCountProducts += cat.categoryCountProducts
        }
        sect3.sectionCountProducts = sectionCountProducts
      }
    }
    // выводим и убираем внуки в корне
    return section
      .filter((sect) => sect.sectionName !== 'delete')
  }

  async getAll ({ sectionId, sort = true }: { sectionId?: number, sort?: boolean }): Promise<IMessage> {
    if (!sectionId) {
      const cache = await cacheRedisDB.get('categoryAll:' + (sort ? 'sort' : 'list'))
      if (cache) {
        // await cacheRedisDB.expire('categoryAll', 360000)
        return {
          success: true,
          result: JSON.parse(cache),
          message: 'Все категории загружены'
        }
      }
    }
    const query = () => {
      return CategoryModel.query()
        .leftOuterJoinRelated('parent')
        .leftOuterJoinRelated('products')
        .select('category.id',
          'category.parentId',
          'category.name as categoryName',
          'category.nameEng as categoryNameEng',
          'category.iconClass as categoryIconClass',
          raw('count(DISTINCT products.id) as categoryCountProducts'),
          'parent.name as sectionName',
          'parent.nameEng as sectionNameEng',
          'parent.iconClass as sectionIconClass')
        .groupBy('category.id')
    }

    let categoryNotSort: CategoryModel[]
    if (sectionId && sectionId > 0) {
      categoryNotSort = await query()
        .where('parent.id', '=', sectionId)
    } else {
      categoryNotSort = await query()
    }

    if (!categoryNotSort) {
      throw ApiError.badRequest(
        'Категорий не найдено',
        'CategoryService getAll')
    }
    const result = sort ? this.sortCategoryTree(categoryNotSort) : categoryNotSort
    if (!sectionId) {
      await cacheRedisDB.set('categoryAll:' + (sort ? 'sort' : 'list'), JSON.stringify(result))
      await cacheRedisDB.expire('categoryAll:' + (sort ? 'sort' : 'list'), 360000)
    }
    return {
      success: true,
      result,
      message: 'Все категории загружены'
    }
  }

  async getAllParentByCategory (categoryId?: number): Promise<number[]> {
    if (!categoryId ||
      (categoryId && categoryId === 0)) return []
    const section = await this.getAll({ sort: false })
    const categoryList: number[] = [categoryId]
    if (section.result.length > 0) {
      const categoryAll = section.result as CategoryModel[]
      for (const cat of categoryAll) {
        if (cat.id === categoryId) {
          if (cat.parentId === null) break
          categoryList.push(cat.parentId)
          for (const cat2 of categoryAll) {
            if (cat2.id === cat.parentId) {
              if (cat2.parentId === null) break
              categoryList.push(cat2.parentId)
              for (const cat3 of categoryAll) {
                if (cat3.id === cat2.parentId) {
                  if (cat3.parentId === null) break
                  categoryList.push(cat3.parentId)
                  break
                }
              }
              break
            }
          }
          break
        }
      }
    }
    return categoryList
  }

  async getAllCategoryBySectionWithCache (sectionId?: number): Promise<number[]> {
    if (!sectionId ||
        (sectionId && sectionId === 0)) return []
    const cache = await cacheRedisDB.get('section:' + sectionId)
    if (cache) {
      return JSON.parse(cache)
    }
    const section = await this.getAll({})
    const categoryList: number[] = []
    if (section.result.length > 0) {
      const categoryAll = section.result as ISectionOut[]
      for (const sect of categoryAll) {
        let findInSection = false
        if (sect.sectionId === sectionId) {
          categoryList.push(sect.sectionId)
          findInSection = true
        }
        for (const cat of sect.category) {
          let findInCategory = false
          if (cat.categoryId === sectionId || findInSection) {
            categoryList.push(cat.categoryId)
            findInCategory = true
          }
          if (cat.subcategory) {
            for (const sub of cat.subcategory) {
              if (sub.categoryId === sectionId || findInCategory) {
                categoryList.push(sub.categoryId)
              }
            }
          }
        }
      }
    } else {
      categoryList.push(sectionId)
    }
    await cacheRedisDB.set('section:' + sectionId, JSON.stringify(categoryList))
    await cacheRedisDB.expire('section:' + sectionId, 18000)
    // 5 часов после добавления новой категории нужно ждать
    return categoryList
  }

  async search (name: string, limit: number = 10, page: number = 1): Promise<IMessage> {
    const result = await CategoryModel.query()
      .page(page - 1, limit)
      .where('category.name', 'like', `%${name}%`)
      .orWhere('category.nameEng', 'like', `%${name}%`)
      .leftOuterJoinRelated('parent')
      .leftOuterJoinRelated('products')
      .select('category.id',
        'category.parentId',
        'category.name as categoryName',
        'category.nameEng as categoryNameEng',
        'category.iconClass as categoryIconClass',
        raw('count(DISTINCT products.id) as categoryCountProducts'),
        'parent.name as sectionName',
        'parent.nameEng as sectionNameEng',
        'parent.iconClass as sectionIconClass')
      .groupBy('category.id')
    if (!result) {
      return {
        success: false,
        message: `Поиск ничего не нашёл по запросу ${name}`
      }
    }
    const total = result.total
    const totalPage = Math.ceil((total || limit) / limit)
    return {
      success: true,
      result: { ...result, page, limit, totalPage },
      message: 'Поиск прошёл успешно'
    }
  }
}

export default CategoryService.getInstance()
