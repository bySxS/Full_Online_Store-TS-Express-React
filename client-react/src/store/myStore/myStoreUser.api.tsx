import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { ILoginIn, ILoginResult, IUser, IUsers } from 'store/myStore/myStoreUser.interface'
import { userAction } from 'store/user/user.slice'
import { baseQueryWithRefreshToken } from 'store/myStore/customFetch'
import { productAction } from 'store/product/product.slice'
const { activatedUserEmail, login, logout, updUser } = userAction
const { clearFavProducts } = productAction

const myStoreUserApi = createApi({
  reducerPath: 'storeUser/api',
  baseQuery: baseQueryWithRefreshToken,
  // tagTypes: ['Users'],
  endpoints: build => ({ // query - get, mutation - post, put
    //
    registration: build.mutation<IMessage<ILoginResult>, FormData>({
      query: (payload) => ({
        url: 'user/registration',
        method: 'POST',
        body: payload
      }),
      async onQueryStarted (args, api) {
        try {
          const reason = await api.queryFulfilled
          api.dispatch(login(reason.data))
        } catch (e) {
          // console.log(e)
        }
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
          api.dispatch(logout())
          api.dispatch(clearFavProducts())
        } catch (e) {}
      }
      // invalidatesTags: ['Users']
    }), // logout

    activateEmail: build.query<IMessage<null>, string>({
      query: (link: string) => ({
        url: 'activate/' + link
      }),
      async onQueryStarted (args, api) {
        try {
          await api.queryFulfilled
          api.dispatch(activatedUserEmail())
        } catch (e) {}
      }
    }),

    searchUsers: build.query<IMessage<IResultList<IUsers>>,
      {value: string, limit?: number, page: number}>({
        query: (args) => ({
          url: 'user/search',
          params: {
            value: args.value,
            limit: args.limit || 20,
            page: args.page
          }
        })
      }),

    allUsers: build.query<IMessage<IResultList<IUsers>>,
      {limit?: number, page: number}>({
        query: (args) => ({
          url: 'user/all',
          params: {
            limit: args.limit || 10,
            page: args.page
          }
        })
        // providesTags: ['Users']
      // transformResponse: (response: IMessage<IResultList<IUsers>>) => response.result
      }), // /fetchAllUsers

    getUserById: build.query<IMessage<IUsers>,
      number>({
        query: (id: number) => ({
          url: 'user/' + id
        })
      }),

    getMyAuthUser: build.query<IMessage<IUsers>,
      string>({
        query: () => ({
          url: 'user'
        })
      }),

    deleteUser: build.mutation<IMessage<null>, number>({
      query: (id: number) => ({
        url: 'user/' + id,
        method: 'DELETE'
      })
    }),

    updateUserById: build.mutation<IMessage<IUser>,
    {id: number, body: FormData}>({
      query: ({ id, body }) => ({
        url: 'user/' + id,
        method: 'PUT',
        body
      }),
      async onQueryStarted (args, api) {
        try {
          const reason = await api.queryFulfilled
          api.dispatch(updUser(reason.data))
        } catch (e) {}
      }
    })

  })
})

export default myStoreUserApi

export const {
  useAllUsersQuery,
  useLoginMutation,
  useRegistrationMutation,
  useDeleteUserMutation,
  useUpdateUserByIdMutation,
  useLazySearchUsersQuery,
  useGetMyAuthUserQuery,
  useLazyGetUserByIdQuery,
  useLazyLogoutQuery,
  useLazyActivateEmailQuery
} = myStoreUserApi
