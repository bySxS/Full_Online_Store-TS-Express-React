import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList, IUsers } from 'types/responseMyStoreApi'

const baseUrl =
  process.env.REACT_APP_API_URL_STORE || 'http://localhost:3000/api'

const myStoreApi = createApi({
  reducerPath: 'store/api',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  endpoints: build => ({ // query - get, mutation - post, put
    //
    fetchAllUsers: build.query<IMessage<IResultList<IUsers>>, {limit: number, page: number}>({
      query: (args) => ({
        url: '/user',
        params: {
          limit: args.limit,
          page: args.page
        }
      })// ,
      // transformResponse: (response: IMessage<IResultList<IUsers>>) => response.result
    })
    //
  })
})

export default myStoreApi

export const { useFetchAllUsersQuery } = myStoreApi
