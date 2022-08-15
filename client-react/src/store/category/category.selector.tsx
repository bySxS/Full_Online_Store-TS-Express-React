import { RootState } from '../index'

const allCategory = (state: RootState) => state.category.category

const selectCategory = {
  allCategory
}

export default selectCategory
