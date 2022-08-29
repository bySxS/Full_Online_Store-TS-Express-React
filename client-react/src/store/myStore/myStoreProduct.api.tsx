import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { IDynamicPrice, IGetProductsWithFilter, IProduct, IProductIn } from 'store/myStore/myStoreProduct.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'

const myStoreProductApi = createApi({
  reducerPath: 'storeProduct/api',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['Products'],
  refetchOnFocus: true,
  endpoints: build => ({
    addProduct: build.mutation<IMessage<IProductIn>,
      FormData>({
        query: (body: FormData) => ({
          url: 'product',
          method: 'POST',
          body
        }),
        invalidatesTags: ['Products']
      }),

    updateProduct: build.mutation<IMessage<IProductIn>,
      {productId: number, body: FormData}>({
        query: ({ productId, body }) => ({
          url: 'product/' + productId,
          method: 'PUT',
          body
        }),
        invalidatesTags: ['Products']
      }),

    delProduct: build.mutation<IMessage<null>,
      number>({
        query: (productId: number) => ({
          url: 'product/' + productId,
          method: 'DELETE'
        }),
        invalidatesTags: ['Products']
      }),

    searchProducts: build.query<IMessage<IResultList<IProduct>>,
      {value: string, limit?: number, page: number}>({
        query: (args) => ({
          url: 'product/search',
          params: {
            value: args.value,
            limit: args.limit || 50,
            page: args.page
          }
        }),
        providesTags: ['Products']
      }),

    getAllProducts: build.query<IMessage<IResultList<IProduct>>,
      IGetProductsWithFilter>({
        query: (args) => ({
          url: 'product',
          params: {
            category_id: args.categoryId,
            filter: args.filter,
            price: args.price,
            sort: args.sort,
            limit: args.limit || 10,
            page: args.page
          }
        }),
        providesTags: ['Products']
      }),

    getProductById: build.query<IMessage<IProduct>,
      number>({
        query: (id: number) => ({
          url: 'product/' + id
        }),
        providesTags: (result, error, id) => [{ type: 'Products', id }]
      }),

    getDynamicPriceByProductId: build.query<IMessage<IDynamicPrice[]>,
      number>({
        query: (id: number) => ({
          url: 'product/dynamic_price/' + id
        })
      })

  })
})

export default myStoreProductApi

export const {
  useSearchProductsQuery,
  useLazyGetAllProductsQuery,
  useLazyGetProductByIdQuery,
  useAddProductMutation,
  useDelProductMutation,
  useUpdateProductMutation,
  useGetDynamicPriceByProductIdQuery,
  endpoints: myStoreProductEndpoint
} = myStoreProductApi
