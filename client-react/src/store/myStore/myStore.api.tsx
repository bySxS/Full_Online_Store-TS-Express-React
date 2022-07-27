import {
  createApi, fetchBaseQuery, retry
} from '@reduxjs/toolkit/query/react'
import {
  ILoginIn, IMessage,
  IProduct, IResultList, IUsers, ILoginResult
} from 'store/myStore/myStore.interface'
import { RootState } from 'store/index'

const baseUrl =
  process.env.REACT_APP_API_URL_STORE || 'http://localhost:3000/api'

const staggeredBaseQuery = retry(fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
}), {
  maxRetries: 0
})

const myStoreApi = createApi({
  reducerPath: 'store/api',
  baseQuery: staggeredBaseQuery,
  refetchOnFocus: true,
  endpoints: build => ({ // query - get, mutation - post, put
    //
    login: build.mutation<IMessage<ILoginResult>, ILoginIn>({
      query: (payload: ILoginIn) => ({
        url: '/user/login',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }), // login
    protected: build.mutation<{ message: string }, void>({
      query: () => 'protected'
    }), // protected
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
  useLoginMutation, useProtectedMutation
} = myStoreApi
