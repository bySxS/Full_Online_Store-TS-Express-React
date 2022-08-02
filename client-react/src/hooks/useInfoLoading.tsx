import { useEffect } from 'react'
import { IMessage } from 'store/myStore/myStore.interface'
// import { SerializedError } from '@reduxjs/toolkit'
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useAppActions } from 'hooks/useStore'

interface IInfoLoading {
     isLoading: boolean
     isSuccess: boolean
     isError: boolean
     data: any
     error: any
}

export function useInfoLoading (arg: IInfoLoading) {
  const { addToAlertStack, setLoading } = useAppActions()

  useEffect(() => {
    if ((arg.isError) && (arg.error && 'status' in arg.error)) {
      const err = arg.error.data as IMessage<string>
      if (err.message !==
        'Пользователь не авторизован или время сессии истекло') {
        addToAlertStack({
          message: err.message,
          status: 'error'
        })
      }
    }
  }, [arg.isError])

  useEffect(() => {
    setLoading(arg.isLoading)
  }, [arg.isLoading])

  useEffect(() => {
    if (arg.isSuccess && arg.data) {
      addToAlertStack({
        message: arg.data.message
      })
    }
  }, [arg.isSuccess])
}
