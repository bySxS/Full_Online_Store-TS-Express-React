import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { ILoginIn, ILoginResult, IUsers } from 'store/myStore/myStoreUser.interface'
import { login, logout } from 'store/user/user.slice'
import baseQueryWithRefreshToken from 'store/myStore/customFetch'

const myStoreUserApi = createApi({
  reducerPath: 'storeUser/api',
  baseQuery: baseQueryWithRefreshToken,
  // tagTypes: ['Users'],
  endpoints: build => ({ // query - get, mutation - post, put
    //
    registration: build.mutation<IMessage<ILoginResult>, ILoginIn>({
      query: (payload: ILoginIn) => ({
        url: 'user/login',
        method: 'POST',
        body: payload
      }),
      async onQueryStarted (args, api) {
        try {
          const reason = await api.queryFulfilled
          api.dispatch(login(reason.data))
        } catch (e) {}
      }
    }), // registration

    login: build.mutation<IMessage<ILoginResult>, ILoginIn>({
      query: (payload: ILoginIn) => ({
        url: 'user/login',
        method: 'POST',
        body: payload
      }),
      async onQueryStarted (args, api) {
        try {
          const reason = await api.queryFulfilled
          api.dispatch(login(reason.data))
        } catch (e) {}
      }
    }), // login

    logout: build.query<IMessage<null>, string>({
      query: () => ({
        url: 'user/logout'
      }),
      async onQueryStarted (args, api) {
        try {
          await api.queryFulfilled
          await api.dispatch(logout())
        } catch (e) {}
      }
      // invalidatesTags: ['Users']
    }), // logout

    fetchAllUsers: build.query<IMessage<IResultList<IUsers>>,
      {limit?: number, page: number}>({
        query: (args) => ({
          url: 'user',
          params: {
            limit: args.limit || 10,
            page: args.page
          }
        })
        // providesTags: ['Users']
      // transformResponse: (response: IMessage<IResultList<IUsers>>) => response.result
      }) // /fetchAllUsers
  })
})

export default myStoreUserApi

export const {
  useFetchAllUsersQuery,
  useLoginMutation,
  useLazyLogoutQuery
  // endpoints: myStoreUserEndpoints
} = myStoreUserApi
