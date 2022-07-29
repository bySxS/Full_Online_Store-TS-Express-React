import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILoginResult, IMessage, IUser } from 'store/myStore/myStore.interface'
import { myStoreEndpoints } from 'store/myStore/myStore.api'

const LS_TOKEN_KEY = 'rtk'
const LS_USER_KEY = 'ruk'
const LS_IS_AUTH_KEY = 'risAk'

interface IUserState {
  token: string
  isAuth: boolean
  user: IUser | undefined
}

const tokenString = localStorage.getItem(LS_TOKEN_KEY) || ''
let token = ''
if (tokenString) {
  try {
    token = JSON.parse(tokenString)
  } catch (e) {
    token = ''
  }
}
const isAuthString = localStorage.getItem(LS_IS_AUTH_KEY) || ''
let isAuth = false
if (isAuthString) {
  try {
    isAuth = JSON.parse(isAuthString)
  } catch (e) {
    isAuth = false
  }
}

const initialState: IUserState = {
  token,
  isAuth,
  user: JSON.parse(localStorage.getItem(LS_USER_KEY) ?? '[]')
}

const setLogin = (state: IUserState, action: PayloadAction<IMessage<ILoginResult>>) => {
  const { payload } = action
  state.token = payload.result.token.accessToken
  state.user = payload.result.user
  state.isAuth = true
  localStorage.setItem(LS_TOKEN_KEY, JSON.stringify(state.token))
  localStorage.setItem(LS_IS_AUTH_KEY, JSON.stringify(state.isAuth))
  localStorage.setItem(LS_USER_KEY, JSON.stringify(state.user))
}

const setLogout = (state: IUserState) => {
  state.token = ''
  state.isAuth = false
  state.user = undefined
  localStorage.removeItem(LS_TOKEN_KEY)
  localStorage.removeItem(LS_IS_AUTH_KEY)
  localStorage.removeItem(LS_USER_KEY)
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login (state, action: PayloadAction<IMessage<ILoginResult>>) {
      setLogin(state, action)
    },
    logout (state) {
      setLogout(state)
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      myStoreEndpoints.login.matchFulfilled,
      (state, action: PayloadAction<IMessage<ILoginResult>>) => {
        setLogin(state, action)
      }
    )
    builder.addMatcher(
      myStoreEndpoints.logout.matchFulfilled,
      (state) => {
        setLogout(state)
      }
    )
  }
})

export const { logout, login } = UserSlice.actions
export const userAction = UserSlice.actions
export const userReducer = UserSlice.reducer
