import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage } from 'store/myStore/myStore.interface'
import { CategoryTreeToList } from '../../utils'
import { myStoreCategoryEndpoint } from '../myStore/myStoreCategory.api'
import { ICategory, ICategorySection } from '../myStore/myStoreCategory.interface'

const LS_CATEGORY_KEY = 'rCatK'
const LS_CATEGORY_LIST_KEY = 'rCatLK'

interface ICategoryState {
  category: ICategorySection[]
  categoryList: ICategory[]
  showCategory: number[]
}

const initialState: ICategoryState = {
  showCategory: [],
  category: JSON.parse(localStorage.getItem(LS_CATEGORY_KEY) ?? '[]'),
  categoryList: JSON.parse(localStorage.getItem(LS_CATEGORY_LIST_KEY) ?? '[]')
}

const setShowCategory = (state: ICategoryState, action: PayloadAction<number[]>) => {
  const { payload } = action
  state.showCategory = payload
  // localStorage.setItem(LS_CATEGORY_KEY, JSON.stringify(state.category))
}

const setCategory = (state: ICategoryState, action: PayloadAction<IMessage<ICategorySection[]>>) => {
  const { payload } = action
  state.category = payload.result
  state.categoryList = CategoryTreeToList(state.category || [])
  localStorage.setItem(LS_CATEGORY_KEY, JSON.stringify(state.category || []))
  localStorage.setItem(LS_CATEGORY_LIST_KEY, JSON.stringify(state.categoryList || []))
}

export const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setShowCategory
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      myStoreCategoryEndpoint.getAllCategory.matchFulfilled,
      (state, action: PayloadAction<IMessage<ICategorySection[]>>) => {
        setCategory(state, action)
      }
    )
  }
})

export const categoryAction = CategorySlice.actions
export const categoryReducer = CategorySlice.reducer
