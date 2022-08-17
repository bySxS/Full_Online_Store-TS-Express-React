import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage } from 'store/myStore/myStore.interface'
import { ILoginResult, IUser } from 'store/myStore/myStoreUser.interface'
import { addHostServerToFileLink } from 'utils'

const LS_TOKEN_KEY = 'rtk'
const LS_USER_KEY = 'ruk'
const LS_IS_AUTH_KEY = 'risAk'
const LS_MENU_KEY = 'rMenuk'

interface IUserState {
  token: string
  isAuth: boolean
  user: IUser | undefined
  menuShow: boolean
}

const initialState: IUserState = {
  token: localStorage.getItem(LS_TOKEN_KEY) ?? '',
  isAuth: localStorage.getItem(LS_IS_AUTH_KEY) === '1',
  user: JSON.parse(localStorage.getItem(LS_USER_KEY) ?? '[]'),
  menuShow: localStorage.getItem(LS_MENU_KEY) === '1'
}

const setLogin = (state: IUserState, action: PayloadAction<IMessage<ILoginResult>>) => {
  const { payload } = action
  state.token = payload.result.token.accessToken
  const user = payload.result.user
  const avatar = addHostServerToFileLink(user.avatar, user.id, 'user_avatar')
  state.user = { ...user, avatar }
  state.isAuth = true
  localStorage.setItem(LS_TOKEN_KEY, JSON.stringify(state.token))
  localStorage.setItem(LS_IS_AUTH_KEY, '1')
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
    },
    changeShowMenu (state) {
      state.menuShow = !state.menuShow
      if (state.menuShow) {
        localStorage.setItem(LS_MENU_KEY, '1')
      } else {
        localStorage.removeItem(LS_MENU_KEY)
      }
    }
  }
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     myStoreUserEndpoints.login.matchFulfilled,
  //     (state, action: PayloadAction<IMessage<ILoginResult>>) => {
  //       setLogin(state, action)
  //     }
  //   )
  // builder.addMatcher(
  //   myStoreUserEndpoints.logout.matchFulfilled,
  //   (state) => {
  //     setLogout(state)
  //   }
  // )
  // }
})

export const { logout, login } = UserSlice.actions
export const userAction = UserSlice.actions
export const userReducer = UserSlice.reducer
