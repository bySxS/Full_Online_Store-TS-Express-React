import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import {
  ICharacteristicName,
  ICharacteristicSection,
  ICharacteristicValue, ICharacteristicValueDelete, ICharacteristicValueUpdate, ICharNameList
} from 'store/myStore/myStoreCharacteristics.interface'

const myStoreCharacteristicsApi = createApi({
  reducerPath: 'storeCharacteristics/api',
  baseQuery: baseQueryWithRefreshToken,
  refetchOnFocus: true,
  endpoints: build => ({
    addCharacteristicName: build.mutation<IMessage<ICharacteristicName>,
      ICharacteristicName>({
        query: (body) => ({
          url: 'characteristics/name',
          method: 'POST',
          body
        })
      }),

    updateCharacteristicName: build.mutation<IMessage<ICharacteristicName>,
  { characteristicNameId: number, body: ICharacteristicName }>({
    query: ({ characteristicNameId, body }) => ({
      url: 'characteristics/name/' + characteristicNameId,
      method: 'PUT',
      body
    })
  }),

    deleteCharacteristicName: build.mutation<IMessage<null>,
      number>({
        query: (characteristicNameId: number) => ({
          url: 'characteristics/name/' + characteristicNameId,
          method: 'DELETE'
        })
      }),

    addCharacteristicValue: build.mutation<IMessage<ICharacteristicValue>,
      ICharacteristicValue>({
        query: (body) => ({
          url: 'characteristics/value',
          method: 'POST',
          body
        })
      }),

    updateCharacteristicValue: build.mutation<IMessage<ICharacteristicValue>,
      ICharacteristicValueUpdate>({
        query: (body) => ({
          url: 'characteristics/value',
          method: 'PUT',
          body
        })
      }),

    deleteCharacteristicValue: build.mutation<IMessage<null>,
      ICharacteristicValueDelete>({
        query: (body) => ({
          url: 'characteristics/value/',
          method: 'DELETE',
          body
        })
      }),

    getCharacteristicProductById: build.query<IMessage<ICharacteristicSection[]>,
      number>({
        query: (productId: number) => ({
          url: 'characteristics/product/' + productId
        })
      }),

    getAllCharacteristicsNameByCategoryId: build.query<IMessage<ICharNameList>,
      number>({
        query: (categoryId: number) => ({
          url: 'characteristics/category/' + categoryId
        })
      }),

    getAllCharacteristics: build.query<IMessage<ICharacteristicSection[]>,
      { sectionId?: number }>({
        query: (args) => ({
          url: 'characteristics',
          params: {
            section_id: args.sectionId
          }
        })
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
