import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import { ICategory, ICategorySearch, ISection } from 'store/myStore/myStoreCategory.interface'

const myStoreCategoryApi = createApi({
  reducerPath: 'storeCategory/api',
  baseQuery: baseQueryWithRefreshToken,
  refetchOnFocus: true,
  endpoints: build => ({
    addCategory: build.mutation<IMessage<ICategory>,
      ICategory>({
        query: (body) => ({
          url: 'category',
          method: 'POST',
          body
        })
      }),

    updateCategory: build.mutation<IMessage<ICategory>,
  { categoryId: number, body: ICategory }>({
    query: ({ categoryId, body }) => ({
      url: 'category/' + categoryId,
      method: 'PUT',
      body
    })
  }),

    deleteCategory: build.mutation<IMessage<null>,
      number>({
        query: (categoryId: number) => ({
          url: 'category/' + categoryId,
          method: 'DELETE'
        })
      }),

    getAllCategory: build.query<IMessage<ISection>,
      string>({
        query: () => ({
          url: 'category'
        })
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
        })
      })

  })
})

export default myStoreCategoryApi

export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useLazySearchCategoryQuery,
  useGetAllCategoryQuery,
  endpoints: myStoreCategoryEndpoint
} = myStoreCategoryApi
