import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import {
  ICharacteristicName, ICharacteristicSection,
  ICharacteristicValue, ICharacteristicValueDelete,
  ICharacteristicValueUpdate
} from 'store/myStore/myStoreCharacteristics.interface'

const myStoreCharacteristicsApi = createApi({
  reducerPath: 'storeCharacteristics/api',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['Characteristics'],
  refetchOnFocus: true,
  endpoints: build => ({
    addCharacteristicName: build.mutation<IMessage<ICharacteristicName>,
      ICharacteristicName>({
        query: (body) => ({
          url: 'characteristics/name',
          method: 'POST',
          body
        }),
        invalidatesTags: ['Characteristics']
      }),

    updateCharacteristicName: build.mutation<IMessage<ICharacteristicName>,
  { characteristicNameId: number, body: ICharacteristicName }>({
    query: ({ characteristicNameId, body }) => ({
      url: 'characteristics/name/' + characteristicNameId,
      method: 'PUT',
      body
    }),
    invalidatesTags: ['Characteristics']
  }),

    deleteCharacteristicName: build.mutation<IMessage<null>,
      number>({
        query: (characteristicNameId: number) => ({
          url: 'characteristics/name/' + characteristicNameId,
          method: 'DELETE'
        }),
        invalidatesTags: ['Characteristics']
      }),

    addCharacteristicValue: build.mutation<IMessage<ICharacteristicValue>,
      ICharacteristicValue>({
        query: (body) => ({
          url: 'characteristics/value',
          method: 'POST',
          body
        }),
        invalidatesTags: ['Characteristics']
      }),

    updateCharacteristicValue: build.mutation<IMessage<ICharacteristicValue>,
      ICharacteristicValueUpdate>({
        query: (body) => ({
          url: 'characteristics/value',
          method: 'PUT',
          body
        }),
        invalidatesTags: ['Characteristics']
      }),

    deleteCharacteristicValue: build.mutation<IMessage<null>,
      ICharacteristicValueDelete>({
        query: (body) => ({
          url: 'characteristics/value/',
          method: 'DELETE',
          body
        }),
        invalidatesTags: ['Characteristics']
      }),

    getCharacteristicProductById: build.query<IMessage<ICharacteristicSection[]>,
      number>({
        query: (productId: number) => ({
          url: 'characteristics/product/' + productId
        }),
        providesTags: ['Characteristics']
      }),

    getAllCharacteristicsNameByCategoryId: build.query<IMessage<ICharacteristicSection[]>,
      number>({
        query: (categoryId: number) => ({
          url: 'characteristics/category/' + categoryId
        }),
        providesTags: ['Characteristics']
      }),

    getAllCharacteristics: build.query<IMessage<ICharacteristicSection[]>,
      { sectionId?: number }>({
        query: (args) => ({
          url: 'characteristics',
          params: {
            section_id: args.sectionId
          }
        }),
        providesTags: ['Characteristics']
      })

  })
})

export default myStoreCharacteristicsApi

export const {
  useAddCharacteristicNameMutation,
  useAddCharacteristicValueMutation,
  useDeleteCharacteristicNameMutation,
  useDeleteCharacteristicValueMutation,
  useUpdateCharacteristicNameMutation,
  useUpdateCharacteristicValueMutation,
  useGetAllCharacteristicsQuery,
  useLazyGetAllCharacteristicsNameByCategoryIdQuery,
  useGetCharacteristicProductByIdQuery,
  endpoints: myStoreCharacteristicEndpoint
} = myStoreCharacteristicsApi
