import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILoginResult, IUser } from 'store/myStore/myStore.interface'

const LS_TOKEN_KEY = 'rtk'
const LS_USER_KEY = 'ruk'
const LS_IS_AUTH_KEY = 'risAk'

interface IUserState {
  token: string
  isAuth: boolean
  user: IUser | undefined
}

const initialState: IUserState = {
  token: JSON.parse(localStorage.getItem(LS_TOKEN_KEY) ?? '[]'),
  isAuth: JSON.parse(localStorage.getItem(LS_IS_AUTH_KEY) ?? '[]'),
  user: JSON.parse(localStorage.getItem(LS_USER_KEY) ?? '[]')
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken (state, action: PayloadAction<ILoginResult>) {
      state.token = action.payload.token.accessToken
      state.isAuth = true
      state.user = action.payload.user
      localStorage.setItem(LS_TOKEN_KEY, JSON.stringify(state.token))
      localStorage.setItem(LS_IS_AUTH_KEY, JSON.stringify(state.isAuth))
      localStorage.setItem(LS_USER_KEY, JSON.stringify(state.user))
    },
    delToken (state) {
      state.token = ''
      state.isAuth = false
      state.user = undefined
      localStorage.removeItem(LS_TOKEN_KEY)
      localStorage.removeItem(LS_IS_AUTH_KEY)
      localStorage.removeItem(LS_USER_KEY)
    }
  }
})

export const userAction = UserSlice.actions
export const userReducer = UserSlice.reducer
