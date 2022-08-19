import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { IDynamicPrice, IGetProductsWithFilter, IProduct, IProductIn } from 'store/myStore/myStoreProduct.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'

const myStoreProductApi = createApi({
  reducerPath: 'storeProduct/api',
  baseQuery: baseQueryWithRefreshToken,
  refetchOnFocus: true,
  endpoints: build => ({
    addProduct: build.mutation<IMessage<IProductIn>,
      FormData>({
        query: (body: FormData) => ({
          url: 'product',
          method: 'POST',
          body
        })
      }),

    updateProduct: build.mutation<IMessage<IProductIn>,
      {productId: number, body: FormData}>({
        query: ({ productId, body }) => ({
          url: 'product/' + productId,
          method: 'PUT',
          body
        })
      }),

    delProduct: build.mutation<IMessage<null>,
      number>({
        query: (productId: number) => ({
          url: 'product/' + productId,
          method: 'DELETE'
        })
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
        })
      }),

    allProducts: build.query<IMessage<IResultList<IProduct>>,
      IGetProductsWithFilter>({
        query: (args) => ({
          url: 'product',
          params: {
            filter: args.filter,
            price: args.price,
            sort: args.sort,
            limit: args.limit || 10,
            page: args.page
          }
        })
      }),

    getAllProductsByCategoryId: build.query<IMessage<IResultList<IProduct>>,
    IGetProductsWithFilter>({
      query: (args) => ({
        url: 'product/category/' + args.categoryId,
        params: {
          filter: args.filter,
          price: args.price,
          sort: args.sort,
          limit: args.limit || 10,
          page: args.page
        }
      })// ,
      // onQueryStarted (args: IGetProductsWithFilter, api) {
      //   try {
      //     const state = (api.getState() as RootState)
      //     if (state.product.prevCategory !== String(args.categoryId)) {
      //       api.dispatch(clearProducts())
      //     }
      //     api.dispatch(setPrevCategory(String(args.categoryId)))
      //   } catch (e) {
      //     console.log(e)
      //   }
      // }
    }),

    getProductById: build.query<IMessage<IProduct>,
      number>({
        query: (id: number) => ({
          url: 'product/' + id
        })
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
  useLazyAllProductsQuery,
  useLazyGetProductByIdQuery,
  useAddProductMutation,
  useDelProductMutation,
  useUpdateProductMutation,
  useLazyGetDynamicPriceByProductIdQuery,
  useLazyGetAllProductsByCategoryIdQuery,
  endpoints: myStoreProductEndpoint
} = myStoreProductApi
