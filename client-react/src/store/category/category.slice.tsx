import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage } from 'store/myStore/myStore.interface'
import { ICategorySection } from '../myStore/myStoreCategory.interface'
import { myStoreCategoryEndpoint } from '../myStore/myStoreCategory.api'

const LS_CATEGORY_KEY = 'rCatK'

interface ICategoryState {
  category: ICategorySection[]
}

const initialState: ICategoryState = {
  category: JSON.parse(localStorage.getItem(LS_CATEGORY_KEY) ?? '[]')
}

const setCategory = (state: ICategoryState, action: PayloadAction<IMessage<ICategorySection[]>>) => {
  const { payload } = action
  state.category = payload.result
  localStorage.setItem(LS_CATEGORY_KEY, JSON.stringify(state.category))
}

export const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
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
