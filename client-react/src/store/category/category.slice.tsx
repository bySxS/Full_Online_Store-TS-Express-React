import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage } from 'store/myStore/myStore.interface'
import { ICategorySection } from '../myStore/myStoreCategory.interface'
import { myStoreCategoryEndpoint } from '../myStore/myStoreCategory.api'

const LS_CATEGORY_KEY = 'rCatK'

interface ICategoryState {
  category: ICategorySection[]
  showCategory: number[]
}

const initialState: ICategoryState = {
  showCategory: [],
  category: JSON.parse(localStorage.getItem(LS_CATEGORY_KEY) ?? '[]')
}

const setShowCategory = (state: ICategoryState, action: PayloadAction<number[]>) => {
  const { payload } = action
  state.showCategory = payload
  // localStorage.setItem(LS_CATEGORY_KEY, JSON.stringify(state.category))
}

const setCategory = (state: ICategoryState, action: PayloadAction<IMessage<ICategorySection[]>>) => {
  const { payload } = action
  state.category = payload.result
  localStorage.setItem(LS_CATEGORY_KEY, JSON.stringify(state.category))
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
