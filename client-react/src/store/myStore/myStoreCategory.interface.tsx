export interface ICategory {
  id?: number
  name: string
  nameEng: string
  iconClass?: string
  parentId?: number
}

export interface ICategoryOut {
  categoryId: number
  categoryName: string
  categoryNameEng: string
  categoryIconClass: string
  categoryCountProducts: number
  subcategory?: ICategoryOut[]
}

export interface ICategorySection {
  sectionId: number
  sectionName: string
  sectionNameEng: string
  sectionIconClass: string
  sectionCountProducts: number
  category: ICategoryOut[]
}

export interface ICategorySearch {
  id: number
  categoryName: string
  categoryNameEng: string
  categoryCountProducts: number
  sectionName: string
  sectionNameEng: string
  parentId: number
}
