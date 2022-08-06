import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import {
  IAllOrders,
  IBasket,
  IBasketProductIn,
  IBasketProductOut,
  IBasketToOrderIn, IBasketToOrderOut, IOrderChange
} from 'store/myStore/myStoreBasket.interface'

const myStoreBasketApi = createApi({
  reducerPath: 'storeBasket/api',
  baseQuery: baseQueryWithRefreshToken,
  refetchOnFocus: true,
  endpoints: build => ({
    addToBasket: build.mutation<IMessage<IBasketProductIn>,
      IBasketProductIn>({
        query: (body: IBasketProductIn) => ({
          url: 'basket',
          method: 'POST',
          body
        })
      }),

    delFromBasket: build.mutation<IMessage<{ productId: number }>,
      { productId: number }>({
        query: ({ productId }) => ({
          url: 'basket/' + productId,
          method: 'DELETE'
        })
      }),

    getAllOrders: build.query<IMessage<IResultList<IAllOrders>>,
      {limit?: number, page: number}>({
        query: (args) => ({
          url: 'basket/all_orders/',
          params: {
            limit: args.limit || 10,
            page: args.page
          }
        })
      }),

    getBasket: build.query<IMessage<IBasket>, null>({
      query: () => ({
        url: 'basket/'
      })
    }),

    getOrdersNeedProcess: build.query<IMessage<IResultList<IBasketProductOut>>,
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
        })
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
  endpoints: myStoreBasketEndpoint
} = myStoreBasketApi
