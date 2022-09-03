import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import {
  ICharacteristicName, ICharacteristicSection,
  ICharacteristicValue, ICharacteristicValueDelete,
  ICharacteristicValueUpdate, ICharNameList
} from 'store/myStore/myStoreCharacteristics.interface'

const myStoreCharacteristicsApi = createApi({
  reducerPath: 'storeCharacteristics/api',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['CharacteristicsName', 'CharacteristicsValue'],
  refetchOnFocus: true,
  endpoints: build => ({
    addCharacteristicName: build.mutation<IMessage<ICharacteristicName>,
      ICharacteristicName>({
        query: (body) => ({
          url: 'characteristics/name',
          method: 'POST',
          body
        }),
        invalidatesTags: ['CharacteristicsName', 'CharacteristicsValue']
      }),

    updateCharacteristicName: build.mutation<IMessage<ICharacteristicName>,
  { characteristicNameId: number, body: ICharacteristicName }>({
    query: ({ characteristicNameId, body }) => ({
      url: 'characteristics/name/' + characteristicNameId,
      method: 'PUT',
      body
    }),
    invalidatesTags: ['CharacteristicsName', 'CharacteristicsValue']
  }),

    deleteCharacteristicName: build.mutation<IMessage<null>,
      number>({
        query: (characteristicNameId: number) => ({
          url: 'characteristics/name/' + characteristicNameId,
          method: 'DELETE'
        }),
        invalidatesTags: ['CharacteristicsName', 'CharacteristicsValue']
      }),

    addCharacteristicValue: build.mutation<IMessage<ICharacteristicValue>,
      ICharacteristicValue>({
        query: (body) => ({
          url: 'characteristics/value',
          method: 'POST',
          body
        }),
        invalidatesTags: ['CharacteristicsValue']
      }),

    updateCharacteristicValue: build.mutation<IMessage<ICharacteristicValue>,
      ICharacteristicValueUpdate>({
        query: (body) => ({
          url: 'characteristics/value',
          method: 'PUT',
          body
        }),
        invalidatesTags: ['CharacteristicsValue']
      }),

    deleteCharacteristicValue: build.mutation<IMessage<null>,
      ICharacteristicValueDelete>({
        query: (body) => ({
          url: 'characteristics/value/',
          method: 'DELETE',
          body
        }),
        invalidatesTags: ['CharacteristicsValue']
      }),

    getCharacteristicProductById: build.query<IMessage<ICharacteristicSection[]>,
      number>({
        query: (productId: number) => ({
          url: 'characteristics/product/' + productId
        }),
        providesTags: ['CharacteristicsValue']
      }),

    getAllCharacteristicsNameByCategoryId: build.query<IMessage<ICharacteristicSection[]>,
      {categoryId: number, alsoParents?: boolean}>({
        query: ({ categoryId, alsoParents = false }) => ({
          url: 'characteristics/category/' + categoryId,
          params: {
            alsoParents: alsoParents || undefined
          }
        }),
        providesTags: ['CharacteristicsName']
      }),

    getAllCharacteristics: build.query<IMessage<ICharacteristicSection[]>,
      { sectionId?: number }>({
        query: (args) => ({
          url: 'characteristics',
          params: {
            section_id: args.sectionId
          }
        }),
        providesTags: ['CharacteristicsValue']
      }),

    getCharacteristicValueByNameId: build.query<IMessage<ICharNameList[]>,
      number>({
        query: (charNameId: number) => ({
          url: 'characteristics/values',
          method: 'get',
          params: {
            charNameId
          }
        }),
        providesTags: ['CharacteristicsValue']
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
  useLazyGetCharacteristicProductByIdQuery,
  useGetCharacteristicValueByNameIdQuery,
  endpoints: myStoreCharacteristicEndpoint
} = myStoreCharacteristicsApi
