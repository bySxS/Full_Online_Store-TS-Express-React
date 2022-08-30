import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'

const allCategory = (state: RootState) => state.category.category
const showCategory = (state: RootState): number[] => state.category.showCategory
const categoryList = (state: RootState) => state.category.categoryList
const categoryNameById = (id: number) => createSelector(categoryList, item => {
  return item?.filter(cat => cat.id === id).map(cat => cat.name)[0]
})

const selectCategory = {
  allCategory,
  showCategory,
  categoryNameById,
  categoryList
}

export default selectCategory
