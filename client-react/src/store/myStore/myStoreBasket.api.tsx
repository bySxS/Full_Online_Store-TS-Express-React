import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import {
  IBasket, IBasketProductIn,
  IBasketProductOut, IBasketProductSyncIn, IBasketProductSyncOut,
  IBasketToOrderIn, IBasketToOrderOut, IOrderChange
} from 'store/myStore/myStoreBasket.interface'

const myStoreBasketApi = createApi({
  reducerPath: 'storeBasket/api',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['Basket'],
  refetchOnFocus: true,
  endpoints: build => ({
    addToBasket: build.mutation<IMessage<IBasketProductIn>,
      IBasketProductIn>({
        query: (body: IBasketProductIn) => ({
          url: 'basket',
          method: 'POST',
          body
        }),
        invalidatesTags: ['Basket']
      }),

    changeCountProductInBasket: build.mutation<IMessage<IBasketProductIn>,
      IBasketProductIn>({
        query: (body: IBasketProductIn) => ({
          url: 'basket',
          method: 'PUT',
          body
        }),
        invalidatesTags: ['Basket']
      }),

    syncBasket: build.mutation<IMessage<IBasketProductSyncOut>,
      IBasketProductSyncIn>({
        query: (body: IBasketProductSyncIn) => ({
          url: 'basket/sync',
          method: 'POST',
          body
        }),
        invalidatesTags: ['Basket']
      }),

    getProductBasketNoneAuthUser: build.mutation<IMessage<IBasketProductOut[]>,
      IBasketProductSyncIn>({
        query: (body: IBasketProductSyncIn) => ({
          url: 'basket/not_auth',
          method: 'POST',
          body
        })
      }),

    delFromBasket: build.mutation<IMessage<{ productId: number }>,
      number>({
        query: (productId: number) => ({
          url: 'basket/' + productId,
          method: 'DELETE'
        }),
        invalidatesTags: ['Basket']
      }),

    getAllOrders: build.query<IMessage<IResultList<IBasket>>,
      {limit?: number, page: number}>({
        query: (args) => ({
          url: 'basket/all_orders/',
          params: {
            limit: args.limit || 10,
            page: args.page
          }
        })
      }),

    getBasket: build.query<IMessage<IBasket>, string>({
      query: () => ({
        url: 'basket'
      }),
      providesTags: ['Basket']
    }),

    getOrdersNeedProcess: build.query<IMessage<IResultList<IBasket>>,
      {limit?: number, page: number}>({
        query: (args) => ({
          url: 'basket/need_process/',
          params: {
            limit: args.limit || 10,
            page: args.page
          }
        })
      }),

    basketToOrder: build.mutation<IMessage<IBasketToOrderOut>,
      IBasketToOrderIn>({
        query: (body: IBasketToOrderIn) => ({
          url: 'basket/to_order',
          method: 'POST',
          body
        }),
        invalidatesTags: ['Basket']
      }),

    changeOrder: build.mutation<IMessage<IOrderChange>,
      { productId: number, body: IOrderChange }>({
        query: ({ productId, body }) => ({
          url: 'basket' + productId,
          method: 'PUT',
          body
        })
      })
  })
})

export default myStoreBasketApi

export const {
  useAddToBasketMutation,
  useChangeCountProductInBasketMutation,
  useBasketToOrderMutation,
  useChangeOrderMutation,
  useDelFromBasketMutation,
  useLazyGetBasketQuery,
  useGetOrdersNeedProcessQuery,
  useGetAllOrdersQuery,
  useSyncBasketMutation,
  useGetProductBasketNoneAuthUserMutation,
  endpoints: myStoreBasketEndpoint
} = myStoreBasketApi
