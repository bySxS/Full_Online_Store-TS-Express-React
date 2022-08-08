export interface ICategory {
  id?: number
  name: string
  nameEng: string
  parentId?: number
}

export interface ICategoryOut {
  categoryName: string
  categoryNameEng: string
  categoryId: number
}

export interface ISection {
  sectionName: string
  sectionNameEng: string
  sectionId: number
  category: ICategoryOut[]
}

export interface ICategorySearch {
  id: number
  categoryName: string
  categoryNameEng: string
  sectionName: string
  sectionNameEng: string
  parentId: number
}
