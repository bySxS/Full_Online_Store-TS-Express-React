import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import { ICountFavProduct, IFavProduct } from 'store/myStore/myStoreFavProduct.interface'

const myStoreFavProductApi = createApi({
  reducerPath: 'storeFavProduct/api',
  baseQuery: baseQueryWithRefreshToken,
  refetchOnFocus: true,
  endpoints: build => ({
    addToFavProduct: build.mutation<IMessage<IFavProduct>,
      { productId: number }>({
        query: (body) => ({
          url: 'favorites_products/',
          method: 'POST',
          body
        })
      }),
    delFromFavProduct: build.mutation<IMessage<IFavProduct>,
      { productId: number }>({
        query: (body) => ({
          url: 'favorites_products/',
          method: 'DELETE',
          body
        })
      }),
    countFavProduct: build.query<IMessage<ICountFavProduct>,
      number>({
        query: (productId: number) => ({
          url: 'favorites_products/count_product/' + productId
        })
      }),
    getFavProducts: build.query<IMessage<IResultList<IProduct>>,
      {limit?: number, page: number}>({
        query: (args) => ({
          url: 'favorites_products/',
          params: {
            limit: args.limit || 10,
            page: args.page
          }
        })
      })
  })
})

export default myStoreFavProductApi

export const {
  useAddToFavProductMutation,
  useDelFromFavProductMutation,
  useLazyCountFavProductQuery,
  useLazyGetFavProductsQuery,
  endpoints: myStoreFavProductEndpoint
} = myStoreFavProductApi
