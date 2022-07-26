import { useEffect, useState } from 'react'
import { IMessage } from 'store/myStore/myStore.interface'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function useErrorFix (isError: boolean, error: FetchBaseQueryError | SerializedError | undefined) {
  const [errorStr, setErrorStr] = useState('')

  useEffect(() => {
    if ((isError) && (error && 'status' in error)) {
      const err = error.data as IMessage<string>
      setErrorStr(err.message)
    }
  }, [isError])

  return errorStr
}
