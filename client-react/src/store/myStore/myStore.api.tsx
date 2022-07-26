import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMessage, IProduct, IResultList, IUsers } from 'store/myStore/myStore.interface'

const baseUrl =
  process.env.REACT_APP_API_URL_STORE || 'http://localhost:3000/api'

const myStoreApi = createApi({
  reducerPath: 'store/api',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  // refetchOnFocus: true,
  endpoints: build => ({ // query - get, mutation - post, put
    //
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
  useLazyGetProductByIdQuery
} = myStoreApi
