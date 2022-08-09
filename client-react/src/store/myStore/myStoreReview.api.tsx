import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import { IReview, IReviewOut } from 'store/myStore/myStoreReview.interface'

const myStoreReviewApi = createApi({
  reducerPath: 'storeReview/api',
  baseQuery: baseQueryWithRefreshToken,
  refetchOnFocus: true,
  endpoints: build => ({
    addReview: build.mutation<IMessage<IReview>,
      IReview>({
        query: (body) => ({
          url: 'review',
          method: 'POST',
          body
        })
      }),

    deleteReview: build.mutation<IMessage<null>,
      number>({
        query: (reviewId: number) => ({
          url: 'review/' + reviewId,
          method: 'DELETE'
        })
      }),

    getAllMyReview: build.query<IMessage<IResultList<IReviewOut>>,
      { limit?: number, page: number }>({
        query: (args) => ({
          url: 'review',
          params: {
            limit: args.limit || 20,
            page: args.page
          }
        })
      }),

    getAllReviewByProductId: build.query<IMessage<IResultList<IReviewOut>>,
      { productId: number, limit?: number, page: number }>({
        query: ({ productId, limit, page }) => ({
          url: 'review/product/' + productId,
          params: {
            limit: limit || 20,
            page
          }
        })
      }),

    getAllReviewByUserId: build.query<IMessage<IResultList<IReviewOut>>,
      { userId: number, limit?: number, page: number }>({
        query: ({ userId, limit, page }) => ({
          url: 'review/user/' + userId,
          params: {
            limit: limit || 20,
            page
          }
        })
      })

  })
})

export default myStoreReviewApi

export const {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetAllMyReviewQuery,
  useGetAllReviewByProductIdQuery,
  useGetAllReviewByUserIdQuery,
  endpoints: myStorePriceEndpoint
} = myStoreReviewApi
