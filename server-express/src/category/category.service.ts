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
    return {
      success: true,
      result,
      message: `Категория с id${id} успешно удалена`
    }
  }

  async getAll (Dto: { sectionId?: number }): Promise<IMessage> {
    const { sectionId } = Dto
    const query = () => {
      return CategoryModel.query()
        .joinRelated('parent')
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

    const section: ISectionOut[] = []
    categoryNotSort.forEach((all) => {
      const ids = new Set(section.map(section => section.sectionId)) // добавленные
      if (!ids.has(all.parentId)) {
        const filterCharacteristics =
          categoryNotSort.filter(category => category.parentId === all.parentId)
        let sectionCountProducts = 0
        const cat: ICategoryOut[] = []
        filterCharacteristics.forEach(category => {
          cat.push({
            categoryId: category.id,
            categoryName: category.categoryName,
            categoryNameEng: category.categoryNameEng,
            categoryIconClass: category.categoryIconClass,
            categoryCountProducts: category.categoryCountProducts
          })
          sectionCountProducts += category.categoryCountProducts
        })
        section.push({
          sectionId: all.parentId,
          sectionName: all.sectionName,
          sectionNameEng: all.sectionNameEng,
          sectionIconClass: all.sectionIconClass,
          sectionCountProducts,
          category: cat
        })
      }
    })
    section.forEach((sect) => {
      section
        .filter((sect2) => sect2.sectionId !== sect.sectionId)
        .map((sect2) => sect2.category)
        .forEach((category) => {
          category.forEach((cat) => {
            if (sect.sectionId === cat.categoryId) {
              cat.subcategory = sect.category
              sect.sectionName = 'delete'
            }
          })
        })
    })
    const result = section
      .filter((sect) => sect.sectionName !== 'delete')
    return {
      success: true,
      result,
      message: 'Все категории загружены'
    }
  }

  async search (name: string, limit: number = 10, page: number = 1): Promise<IMessage> {
    const result = await CategoryModel.query()
      .page(page - 1, limit)
      .where('category.name', 'like', `%${name}%`)
      .orWhere('category.nameEng', 'like', `%${name}%`)
      .joinRelated('parent')
      .leftOuterJoinRelated('products')
      .select('category.id',
        'category.parentId',
        'category.name as categoryName',
        'category.nameEng as categoryNameEng',
        raw('count(DISTINCT products.id) as categoryCountProducts'),
        'parent.name as sectionName',
        'parent.nameEng as sectionNameEng')
      .groupBy('category.id')
    if (!result) {
      return {
        success: false,
        message: `Поиск ничего не нашёл по запросу ${name}`
      }
    }

    return {
      success: true,
      result: { ...result, page, limit },
      message: 'Поиск прошёл успешно'
    }
  }
}

export default CategoryService.getInstance()
