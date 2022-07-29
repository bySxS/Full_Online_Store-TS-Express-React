import {
  BaseQueryFn,
  createApi, FetchArgs, fetchBaseQuery, retry
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import {
  ILoginIn, IMessage,
  IProduct, IResultList, IUsers, ILoginResult
} from 'store/myStore/myStore.interface'
import { RootState } from 'store/index'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { addToAlertStack } from 'store/alert/alert.slice'
import { login, logout } from 'store/user/user.slice'

const baseUrl =
  process.env.REACT_APP_API_URL_STORE || 'http://localhost:3000/api'

const mutex = new Mutex()

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

// const resetApiState = () => ({
//   type: string,
//   payload: undefined,
// })

const myStoreApi = createApi({
  reducerPath: 'store/api',
  baseQuery: baseQueryWithRefreshToken,
  refetchOnFocus: true,
  endpoints: build => ({ // query - get, mutation - post, put
    //
    login: build.mutation<IMessage<ILoginResult>, ILoginIn>({
      query: (payload: ILoginIn) => ({
        url: '/user/login',
        method: 'POST',
        body: payload,
        credentials: 'include' // для получения cookies
      })
    }), // login
    logout: build.query<IMessage<null>, string>({
      query: () => ({
        url: '/user/logout',
        credentials: 'include'
      })
    }), // logout
    fetchAllUsers: build.query<IMessage<IResultList<IUsers>>,
      {limit?: number, page: number}>({
        query: (args) => ({
          url: '/user',
          params: {
            limit: args.limit || 10,
            page: args.page
          }
        })// ,
      // transformResponse: (response: IMessage<IResultList<IUsers>>) => response.result
      }), // /fetchAllUsers
    searchProducts: build.query<IMessage<IResultList<IProduct>>,
      {value: string, limit?: number, page: number}>({
        query: (args) => ({
          url: '/product/search',
          params: {
            value: args.value,
            limit: args.limit || 50,
            page: args.page
          }
        })
      }), // /searchProducts
    allProducts: build.query<IMessage<IResultList<IProduct>>,
      {limit?: number, page: number}>({
        query: (args) => ({
          url: '/product',
          params: {
            limit: args.limit || 10,
            page: args.page
          }
        })
      }), // /allProducts
    getProductById: build.query<IMessage<IProduct>,
      number>({
        query: (id: number) => ({
          url: `/product/${id}`
        })
      }) // /getProductById
  })
})

export default myStoreApi

export const {
  useFetchAllUsersQuery,
  useSearchProductsQuery,
  useLazyAllProductsQuery,
  useLazyGetProductByIdQuery,
  useLoginMutation,
  useLazyLogoutQuery,
  endpoints: myStoreEndpoints
} = myStoreApi
