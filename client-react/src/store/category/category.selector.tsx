import { RootState } from '../index'

const allCategory = (state: RootState) => state.category.category
const showCategory = (state: RootState): number[] => state.category.showCategory

const selectCategory = {
  allCategory, showCategory
}

export default selectCategory
