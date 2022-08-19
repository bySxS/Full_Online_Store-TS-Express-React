import { Mutex } from 'async-mutex'
import {
  BaseQueryFn, FetchArgs, fetchBaseQuery, retry
} from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../index'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { IMessage } from 'store/myStore/myStore.interface'
import { alertAction } from 'store/alert/alert.slice'
import { userAction } from 'store/user/user.slice'
import { ILoginResult } from 'store/myStore/myStoreUser.interface'
const { login, logout } = userAction
const { addToAlertStack } = alertAction

const baseUrl =
  process.env.REACT_APP_API_URL_SERVER

// настройка репитов неправильных запросов с ошибкой плюс add header
export const staggeredBaseQuery = retry(fetchBaseQuery({
  baseUrl,
  credentials: 'include', // принимать куки от сервера у всех запросов
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).user.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    const UPLOAD_ENDPOINTS =
      ['registration',
        'updateUserById',
        'addProduct',
        'updateProduct']
    if (!UPLOAD_ENDPOINTS.includes(endpoint)) {
      headers.set('content-type', 'application/json; charset=UTF-8')
    }
    return headers
  }
}), {
  maxRetries: 0
})

const mutex = new Mutex()

// обновление рефреш токена когда потребуется в автоматическом режиме
export const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await staggeredBaseQuery(args, api, extraOptions)
    if ((result.error?.data as IMessage<null>)?.message ===
    'Пользователь не авторизован или время сессии истекло') {
    // проверяем есть ли токен
      const token = (api.getState() as RootState).user.token
      if (token === '') {
      // window.location.href = '/login_reg'
        api.dispatch(addToAlertStack({
          message: 'У вас нет доступа. Авторизируйтесь!',
          status: 'warning'
        }))
        return result
      }
      if (mutex.isLocked()) {
        await mutex.waitForUnlock()
        result = await staggeredBaseQuery(args, api, extraOptions)
        return result
      }
      const release = await mutex.acquire()
      try {
        const refreshResult = await staggeredBaseQuery(
          {
            credentials: 'include',
            url: 'user/refresh',
            method: 'GET'
          },
          api,
          extraOptions
        )
        if (refreshResult.data) {
          const data = refreshResult.data as IMessage<ILoginResult>
          api.dispatch(login(data))
          // Повторите первоначальный запрос
          result = await staggeredBaseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
        }
      } finally {
      // Выпуск должен быть вызван после того, как Mutex должен выйти снова.
        release()
      }
    }

    return result
  }

export default baseQueryWithRefreshToken
