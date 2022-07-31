import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'

const myStoreProductApi = createApi({
  reducerPath: 'storeProduct/api',
  baseQuery: baseQueryWithRefreshToken,
  refetchOnFocus: true,
  endpoints: build => ({
    searchProducts: build.query<IMessage<IResultList<IProduct>>,
      {value: string, limit?: number, page: number}>({
        query: (args) => ({
          url: 'product/search',
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
          url: 'product',
          params: {
            limit: args.limit || 10,
            page: args.page
          }
        })
      }), // /allProducts
    getProductById: build.query<IMessage<IProduct>,
      number>({
        query: (id: number) => ({
          url: `product/${id}`
        })
      }) // /getProductById
  })
})

export default myStoreProductApi

export const {
  useSearchProductsQuery,
  useLazyAllProductsQuery,
  useLazyGetProductByIdQuery
} = myStoreProductApi
