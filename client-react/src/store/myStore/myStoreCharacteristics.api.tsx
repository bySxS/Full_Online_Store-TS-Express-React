import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage } from 'store/myStore/myStore.interface'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'
import {
  ICharacteristicName,
  ICharacteristicSection,
  ICharacteristicValue
} from 'store/myStore/myStoreCharacteristics.interface'

const myStoreCharacteristicApi = createApi({
  reducerPath: 'storeCharacteristic/api',
  baseQuery: baseQueryWithRefreshToken,
  refetchOnFocus: true,
  endpoints: build => ({
    addCharacteristicName: build.mutation<IMessage<ICharacteristicName>,
      ICharacteristicName>({
        query: (body) => ({
          url: 'characteristic/name',
          method: 'POST',
          body
        })
      }),

    updateCharacteristicName: build.mutation<IMessage<ICharacteristicName>,
  { characteristicNameId: number, body: ICharacteristicName }>({
    query: ({ characteristicNameId, body }) => ({
      url: 'characteristic/name/' + characteristicNameId,
      method: 'PUT',
      body
    })
  }),

    deleteCharacteristicName: build.mutation<IMessage<null>,
      number>({
        query: (characteristicNameId: number) => ({
          url: 'characteristic/name/' + characteristicNameId,
          method: 'DELETE'
        })
      }),

    addCharacteristicValue: build.mutation<IMessage<ICharacteristicValue>,
      ICharacteristicValue>({
        query: (body) => ({
          url: 'characteristic/value',
          method: 'POST',
          body
        })
      }),

    updateCharacteristicValue: build.mutation<IMessage<ICharacteristicValue>,
      { characteristicValueId: number, body: ICharacteristicValue }>({
        query: ({ characteristicValueId, body }) => ({
          url: 'characteristic/value/' + characteristicValueId,
          method: 'PUT',
          body
        })
      }),

    deleteCharacteristicValue: build.mutation<IMessage<null>,
      number>({
        query: (characteristicValueId: number) => ({
          url: 'characteristic/value/' + characteristicValueId,
          method: 'DELETE'
        })
      }),

    getCharacteristicProductById: build.query<IMessage<ICharacteristicSection>,
      number>({
        query: (productId: number) => ({
          url: 'characteristic/product/' + productId
        })
      })

  })
})

export default myStoreCharacteristicApi

export const {
  useAddCharacteristicNameMutation,
  useAddCharacteristicValueMutation,
  useDeleteCharacteristicNameMutation,
  useDeleteCharacteristicValueMutation,
  useUpdateCharacteristicNameMutation,
  useUpdateCharacteristicValueMutation,
  useLazyGetCharacteristicProductByIdQuery,
  endpoints: myStoreCharacteristicEndpoint
} = myStoreCharacteristicApi
