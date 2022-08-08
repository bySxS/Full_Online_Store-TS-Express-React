import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { IGetProductsWithFilter, IProduct } from 'store/myStore/myStoreProduct.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import { IFavProduct } from 'store/myStore/myStoreFavProduct.interface'

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
    getFavProducts: build.query<IMessage<IResultList<IProduct>>,
      IGetProductsWithFilter>({
        query: (args) => ({
          url: 'favorites_products',
          params: {
            filter: args.filter,
            price: args.price,
            sort: args.sort,
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
  useLazyGetFavProductsQuery,
  endpoints: myStoreFavProductEndpoint
} = myStoreFavProductApi
