import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { IGetProductsWithFilter, IProduct } from 'store/myStore/myStoreProduct.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import { IFavProduct, IFavProductList } from 'store/myStore/myStoreFavProduct.interface'

const myStoreFavProductApi = createApi({
  reducerPath: 'storeFavProduct/api',
  baseQuery: baseQueryWithRefreshToken,
  // refetchOnFocus: true,
  tagTypes: ['FavProducts'],
  endpoints: build => ({
    addToFavProduct: build.mutation<IMessage<IFavProduct>,
      { productId: number }>({
        query: (body) => ({
          url: 'favorites_products/',
          method: 'POST',
          body
        }),
        invalidatesTags: ['FavProducts']
      }),
    delFromFavProduct: build.mutation<IMessage<IFavProduct>,
      { productId: number }>({
        query: (body) => ({
          url: 'favorites_products/',
          method: 'DELETE',
          body
        }),
        invalidatesTags: ['FavProducts']
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
        }),
        providesTags: ['FavProducts']
      }),

    getFavProductsList: build.query<IMessage<IFavProductList[]>,
      string>({
        query: () => ({
          url: 'favorites_products/list'
        })
        // providesTags: ['FavProducts']
      })
  })
})

export default myStoreFavProductApi

export const {
  useAddToFavProductMutation,
  useDelFromFavProductMutation,
  useGetFavProductsListQuery,
  useLazyGetFavProductsQuery,
  endpoints: myStoreFavProductEndpoint
} = myStoreFavProductApi
