import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import { IReview, IReviewOut, IUpdRating } from 'store/myStore/myStoreReview.interface'

const myStoreReviewApi = createApi({
  reducerPath: 'storeReview/api',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['Review'],
  refetchOnFocus: true,
  endpoints: build => ({
    addReview: build.mutation<IMessage<IReview>,
      IReview>({
        query: (body) => ({
          url: 'review',
          method: 'POST',
          body
        }),
        invalidatesTags: ['Review']
      }),

    updReview: build.mutation<IMessage<IUpdRating>,
      IUpdRating>({
        query: (body) => ({
          url: 'review',
          method: 'PUT',
          body
        }),
        invalidatesTags: ['Review']
      }),

    deleteReview: build.mutation<IMessage<null>,
      number>({
        query: (reviewId: number) => ({
          url: 'review/' + reviewId,
          method: 'DELETE'
        }),
        invalidatesTags: ['Review']
      }),

    getAllMyReview: build.query<IMessage<IResultList<IReviewOut>>,
      { limit?: number, page: number }>({
        query: (args) => ({
          url: 'review',
          params: {
            limit: args.limit || 20,
            page: args.page
          }
        }),
        providesTags: ['Review']
      }),

    getAllReviewByProductId: build.query<IMessage<IResultList<IReviewOut>>,
      { productId: number, limit?: number, page: number, sort?: 'asc' | 'desc' }>({
        query: ({ productId, limit, page, sort }) => ({
          url: 'review/product/' + productId,
          params: {
            limit: limit || 0,
            page,
            sort
          }
        }),
        providesTags: ['Review']
      }),

    getAllReviewByUserId: build.query<IMessage<IResultList<IReviewOut>>,
      { userId: number, limit?: number, page: number }>({
        query: ({ userId, limit, page }) => ({
          url: 'review/user/' + userId,
          params: {
            limit: limit || 20,
            page
          }
        }),
        providesTags: ['Review']
      })

  })
})

export default myStoreReviewApi

export const {
  useAddReviewMutation,
  useUpdReviewMutation,
  useDeleteReviewMutation,
  useGetAllMyReviewQuery,
  useGetAllReviewByProductIdQuery,
  useGetAllReviewByUserIdQuery,
  endpoints: myStorePriceEndpoint
} = myStoreReviewApi
