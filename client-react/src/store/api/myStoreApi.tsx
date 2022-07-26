import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList, IUsers } from 'store/api/myStoreApi.interface'

const baseUrl =
  process.env.REACT_APP_API_URL_STORE || 'http://localhost:3000/api'

const myStoreApi = createApi({
  reducerPath: 'store/api',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  endpoints: build => ({ // query - get, mutation - post, put
    //
    fetchAllUsers: build.query<IMessage<IResultList<IUsers>>,
      {limit: number, page: number}>({
        query: (args) => ({
          url: '/user',
          params: {
            limit: args.limit,
            page: args.page
          }
        })// ,
      // transformResponse: (response: IMessage<IResultList<IUsers>>) => response.result
      }),
    // /fetchAllUsers
    searchProducts: build.query<IMessage<IResultList<any>>,
      {value: string, limit: number, page: number}>({
        query: (args) => ({
          url: '/product/search',
          params: {
            value: args.value,
            limit: args.limit,
            page: args.page
          }
        })
      })
    // /searchProducts
  })
})

export default myStoreApi

export const {
  useFetchAllUsersQuery,
  useSearchProductsQuery
} = myStoreApi
