import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import { IPrice, IProductPrice, ITypePrice } from 'store/myStore/myStorePrice.interface'

const myStorePriceApi = createApi({
  reducerPath: 'storePrice/api',
  baseQuery: baseQueryWithRefreshToken,
  refetchOnFocus: true,
  endpoints: build => ({
    addPriceForProduct: build.mutation<IMessage<IPrice>,
      IPrice>({
        query: (body) => ({
          url: 'product/prices',
          method: 'POST',
          body
        })
      }),

    updatePriceForProduct: build.mutation<IMessage<IPrice>,
      {priceId: number, body: IPrice}>({
        query: ({ priceId, body }) => ({
          url: 'product/prices/' + priceId,
          method: 'PUT',
          body
        })
      }),

    deletePriceForProduct: build.mutation<IMessage<null>,
      number>({
        query: (priceId: number) => ({
          url: 'product/prices/' + priceId,
          method: 'DELETE'
        })
      }),

    getAllPriceByProductId: build.query<IMessage<IProductPrice[]>,
      number>({
        query: (productId: number) => ({
          url: 'product/prices/' + productId
        })
      }),

    addTypePrice: build.mutation<IMessage<ITypePrice>,
      string>({
        query: (name: string) => ({
          url: 'product/prices/types',
          method: 'POST',
          body: { name }
        })
      }),

    updateTypePrice: build.mutation<IMessage<ITypePrice>,
      {typePriceId: number, name: string}>({
        query: ({ typePriceId, name }) => ({
          url: 'product/prices/types/' + typePriceId,
          method: 'PUT',
          body: { name }
        })
      }),

    deleteTypePrice: build.mutation<IMessage<null>,
      number>({
        query: (typePriceId: number) => ({
          url: 'product/prices/types/' + typePriceId,
          method: 'DELETE'
        })
      }),

    getAllTypePrice: build.query<IMessage<IResultList<ITypePrice>>,
      string>({
        query: () => ({
          url: 'product/prices/types'
        })
      })

  })
})

export default myStorePriceApi

export const {
  useAddPriceForProductMutation,
  useAddTypePriceMutation,
  useDeletePriceForProductMutation,
  useDeleteTypePriceMutation,
  useUpdatePriceForProductMutation,
  useUpdateTypePriceMutation,
  useGetAllPriceByProductIdQuery,
  useGetAllTypePriceQuery,
  endpoints: myStorePriceEndpoint
} = myStorePriceApi
