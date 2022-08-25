import { RootState } from '../index'
// import { createSelector } from '@reduxjs/toolkit'

// const selectSubtotal = createSelector(selectShopItems, items =>
//   items.reduce((subtotal, item) => subtotal + item.value, 0)
// )
//
// const selectTax = createSelector(
//   selectSubtotal,
//   selectTaxPercent,
//   (subtotal, taxPercent) => subtotal * (taxPercent / 100)
// )
//
// const selectTotal = createSelector(
//   selectSubtotal,
//   selectTax,
//   (subtotal, tax) => ({ total: subtotal + tax })
// )

const allCategory = (state: RootState) => state.category.category
const showCategory = (state: RootState): number[] => state.category.showCategory
const categoryNameById = (id: number) => (state: RootState): string => {
  return state.category.categoryList?.filter(cat => cat.id === id)
    .map(cat => cat.name)[0]
}
const categoryList = (state: RootState) => state.category.categoryList

const selectCategory = {
  allCategory,
  showCategory,
  categoryNameById,
  categoryList
}

export default selectCategory
