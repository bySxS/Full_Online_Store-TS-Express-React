export interface ICategory {
  id?: number
  name: string
  nameEng: string
  parentId?: number
}

export interface ICategoryOut {
  categoryId: number
  categoryName: string
  categoryNameEng: string
  categoryCountProducts: number
}

export interface ICategorySection {
  sectionId: number
  sectionName: string
  sectionNameEng: string
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
