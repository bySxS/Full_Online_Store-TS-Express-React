import { createListenerMiddleware } from '@reduxjs/toolkit'
import { logout } from './user.slice'
import myStoreUserApi from 'store/myStore/myStoreUser.api'

export const logoutListenerMiddleware = createListenerMiddleware()

// очищаем кеш при разлогине
logoutListenerMiddleware.startListening({
  actionCreator: logout,
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(myStoreUserApi.util.resetApiState())
  }
})
