import { Mutex } from 'async-mutex'
import { BaseQueryFn, FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from 'store/index'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ILoginResult, IMessage } from 'store/myStore/myStore.interface'
import { addToAlertStack } from 'store/alert/alert.slice'
import { login, logout } from 'store/user/user.slice'

const baseUrl =
  process.env.REACT_APP_API_URL_STORE || 'http://localhost:3000/api'

// настройка репитов неправильных запросов с ошибкой плюс add header
const staggeredBaseQuery = retry(fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    headers.set('Content-type', 'application/json; charset=UTF-8')
    return headers
  }
}), {
  maxRetries: 0
})

const mutex = new Mutex()

// обновление рефреш токена когда потребуется в автоматическом режиме
const baseQueryWithRefreshToken: BaseQueryFn<
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
            url: '/user/refresh',
            method: 'get'
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
