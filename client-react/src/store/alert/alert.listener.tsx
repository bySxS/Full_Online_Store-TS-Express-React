import { createListenerMiddleware } from '@reduxjs/toolkit'
import { addToAlertStack, delFromAlertStack } from 'store/alert/alert.slice'

// Create the middleware instance and methods
export const alertListenerMiddleware = createListenerMiddleware()

// это нужно потому что уведомления некорректно закрывались
alertListenerMiddleware.startListening({
  actionCreator: addToAlertStack,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    const id = action.payload.id || 0
    if (id !== 0) {
      const delay = action.payload.delay || 2000
      // Can cancel other running instances
      // listenerApi.cancelActiveListeners()

      let delAlert = false
      // Run async logic
      const timer = setTimeout(() => {
        listenerApi.dispatch(delFromAlertStack(id))
        delAlert = true
      }, delay)

      // Pause until action dispatched or state changed
      if (await listenerApi.condition(() => delAlert, 25000)) {
        // Use the listener API methods to dispatch, get state,
        // unsubscribe the listener, start child tasks, and more
        // listenerApi.dispatch(todoAdded('Buy pet food'))
        clearTimeout(timer)

        // Spawn "child tasks" that can do more work and return results
        // const task = listenerApi.fork(async (forkApi) => {
        // Can pause execution
        // await forkApi.delay(5)
        // Complete the child by returning a value
        // return 42
        // })

        // const result = await task.result
        // Unwrap the child result in the listener
        // if (result.status === 'ok') {
        // Logs the `42` result value that was returned
        // console.log('Child succeeded: ', result.value)
        // }
      }
    }
  }
})
