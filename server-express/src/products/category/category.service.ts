import { IMessage } from '@/interface'
import CategoryModel from './category.model'
import ApiError from '@/apiError'
import { ICategory, ICategoryService } from './category.interface'

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
      .where('name', '=', name)
      .orWhere('name_eng', '=', nameEng)
    if (alreadyHave) {
      throw ApiError.badRequest(
        'Категория с таким названием уже существует',
        'CategoryService add')
    }
    const result = await CategoryModel.query()
      .insert({
        name,
        name_eng: nameEng,
        parent_id: parentId
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
      .select('name', 'name_eng')
    if (!findCategory) {
      throw ApiError.badRequest(
        `Категории с id${id} не существует`,
        'CategoryService upd')
    }
    const result = await CategoryModel.query()
      .where({ id })
      .update({
        name,
        name_eng: nameEng,
        parent_id: parentId
      })
    if (!result) {
      throw ApiError.badRequest(
        `Категория ${findCategory.name} не изменена, возможно`,
        'CategoryService upd')
    }
    return {
      success: true,
      result,
      message: `Категория ${findCategory.name} (${findCategory.name_eng}) изменена на ${name} (${nameEng})`
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

  async getAll (): Promise<IMessage> {
    const result = await CategoryModel.query()
      .innerJoin('category as parent', 'parent.id', '=', 'category.parent_id')
      .select('category.id', 'category.parent_id',
        'category.name as categoryName',
        'category.name_eng as categoryNameEng',
        'parent.name as sectionName',
        'parent.name_eng as sectionNameEng')
    if (!result) {
      throw ApiError.badRequest(
        'Категорий не найдено',
        'CategoryService getAll')
    }
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
      .orWhere('category.name_eng', 'like', `%${name}%`)
      .innerJoin('category as parent', 'parent.id', '=', 'category.parent_id')
      .select('category.id', 'category.parent_id',
        'category.name as categoryName',
        'category.name_eng as categoryNameEng',
        'parent.name as sectionName',
        'parent.name_eng as sectionNameEng')
    if (!result) {
      return {
        success: false,
        message: `Поиск ничего не нашёл по запросу ${name}`
      }
    }

    return {
      success: true,
      result,
      message: 'Поиск прошёл успешно'
    }
  }
}

export default CategoryService.getInstance()
