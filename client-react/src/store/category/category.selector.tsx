import { RootState } from '../index'

const allCategory = (state: RootState) => state.category.category
const showCategory = (state: RootState): number[] => state.category.showCategory
const categoryNameById = (id: number) => (state: RootState): string => {
  return state.category.categoryList
    .filter(cat => cat.id === id)
    .map(cat => cat.name)[0]
}

const selectCategory = {
  allCategory,
  showCategory,
  categoryNameById
}

export default selectCategory
