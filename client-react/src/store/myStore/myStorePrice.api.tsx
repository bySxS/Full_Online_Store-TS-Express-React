import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import { IPrice, IProductPrice, ITypePrice } from 'store/myStore/myStorePrice.interface'

const myStorePriceApi = createApi({
  reducerPath: 'storePrice/api',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['priceType', 'price'],
  refetchOnFocus: true,
  endpoints: build => ({
    addPriceForProduct: build.mutation<IMessage<IPrice>,
      IPrice>({
        query: (body) => ({
          url: 'product/prices',
          method: 'POST',
          body
        }),
        invalidatesTags: ['price']
      }),

    updatePriceForProduct: build.mutation<IMessage<IPrice>,
      {priceId: number, body: IPrice}>({
        query: ({ priceId, body }) => ({
          url: 'product/prices/' + priceId,
          method: 'PUT',
          body
        }),
        invalidatesTags: ['price']
      }),

    deletePriceForProduct: build.mutation<IMessage<null>,
      number>({
        query: (priceId: number) => ({
          url: 'product/prices/' + priceId,
          method: 'DELETE'
        }),
        invalidatesTags: ['price']
      }),

    getAllPriceByProductId: build.query<IMessage<IProductPrice[]>,
      number>({
        query: (productId: number) => ({
          url: 'product/prices/' + productId
        }),
        providesTags: ['priceType', 'price']
      }),

    addTypePrice: build.mutation<IMessage<ITypePrice>,
      string>({
        query: (name: string) => ({
          url: 'product/prices/types',
          method: 'POST',
          body: { name }
        }),
        invalidatesTags: ['priceType']
      }),

    updateTypePrice: build.mutation<IMessage<ITypePrice>,
      {priceTypeId: number, name: string}>({
        query: ({ priceTypeId, name }) => ({
          url: 'product/prices/types/' + priceTypeId,
          method: 'PUT',
          body: { name }
        }),
        invalidatesTags: ['priceType']
      }),

    deleteTypePrice: build.mutation<IMessage<null>,
      number>({
        query: (priceTypeId: number) => ({
          url: 'product/prices/types/' + priceTypeId,
          method: 'DELETE'
        }),
        invalidatesTags: ['priceType']
      }),

    getAllTypePrice: build.query<IMessage<IResultList<ITypePrice>>,
      string>({
        query: () => ({
          url: 'product/prices/types',
          params: {
            limit: 500,
            page: 1
          }
        }),
        providesTags: ['priceType']
      })

  })
})

export default myStorePriceApi

export const {
  useAddPriceForProductMutation,
  useDeletePriceForProductMutation,
  useUpdatePriceForProductMutation,
  useGetAllPriceByProductIdQuery,
  useAddTypePriceMutation,
  useDeleteTypePriceMutation,
  useUpdateTypePriceMutation,
  useGetAllTypePriceQuery,
  endpoints: myStorePriceEndpoint
} = myStorePriceApi
