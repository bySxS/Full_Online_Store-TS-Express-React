import { useEffect } from 'react'
import { IMessage } from 'store/myStore/myStore.interface'
import { useAppActions } from 'hooks/useStore'

interface IInfoLoadingProps {
     isLoading: boolean
     isSuccess: boolean
     isError: boolean
     data: any
     error: any
}

export function useInfoLoading ({
  data, error, isLoading, isError, isSuccess
}: IInfoLoadingProps) {
  const { addToAlertStack, setLoading } = useAppActions()

  useEffect(() => {
    if (isSuccess && data && 'message' in data) {
      addToAlertStack({
        message: data.message
      })
    }
    if ((isError) &&
      (error && 'status' in error &&
        'data' in error)) {
      const err = error.data as IMessage<string>
      if (err.message !==
          'Пользователь не авторизован или время сессии истекло') {
        addToAlertStack({
          message: err.message,
          status: 'error'
        })
      }
    }
    setLoading(isLoading)
  }, [isSuccess, isError, isLoading])
}
