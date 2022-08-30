import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import { ICategory, ICategorySearch, ICategorySection } from 'store/myStore/myStoreCategory.interface'

const myStoreCategoryApi = createApi({
  reducerPath: 'storeCategory/api',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['Category'],
  refetchOnFocus: true,
  endpoints: build => ({
    addCategory: build.mutation<IMessage<ICategory>,
      ICategory>({
        query: (body) => ({
          url: 'category',
          method: 'POST',
          body
        }),
        invalidatesTags: ['Category']
      }),

    updateCategory: build.mutation<IMessage<ICategory>,
      { categoryId: number, body: ICategory }>({
        query: ({ categoryId, body }) => ({
          url: 'category/' + categoryId,
          method: 'PUT',
          body
        }),
        invalidatesTags: ['Category']
      }),

    deleteCategory: build.mutation<IMessage<null>,
      number>({
        query: (categoryId: number) => ({
          url: 'category/' + categoryId,
          method: 'DELETE'
        }),
        invalidatesTags: ['Category']
      }),

    getAllCategory: build.query<IMessage<ICategorySection[]>,
      string>({
        query: () => ({
          url: 'category'
        }),
        providesTags: ['Category']
      }),

    searchCategory: build.query<IMessage<IResultList<ICategorySearch>>,
      {value: string, limit?: number, page: number}>({
        query: (args) => ({
          url: 'category/search',
          params: {
            value: args.value,
            limit: args.limit || 10,
            page: args.page
          }
        }),
        providesTags: ['Category']
      })

  })
})

export default myStoreCategoryApi

export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useSearchCategoryQuery,
  useGetAllCategoryQuery,
  endpoints: myStoreCategoryEndpoint
} = myStoreCategoryApi
