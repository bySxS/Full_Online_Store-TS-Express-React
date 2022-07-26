import React, { FC, useEffect, useState } from 'react'
import UserItems from 'components/UserItems/UserItems'
import { useFetchAllUsersQuery } from 'store/api/myStoreApi'
import Loader from 'components/UI/Loader/Loader'
import { IMessage } from 'store/api/myStoreApi.interface'
import { Helmet } from 'react-helmet'
import Alarm from 'components/UI/Alarm/Alarm'

interface UsersProps {
  name: string
}

const Users: FC<UsersProps> = ({ name }) => {
  const [errorStr, setErrorStr] = useState('')
  const { isLoading, isSuccess, isError, data, error } =
    useFetchAllUsersQuery({ limit: 10, page: 1 })
  useEffect(() => {
    if ((isError) && (error && 'status' in error)) {
      const err = error.data as IMessage<string>
      setErrorStr(err.message)
    }
  }, [isError])
  return (
    <div className="body">
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={name + ' все клиенты'} />
      </Helmet>
      <div className="font-bold text-center">{name}</div>
      {isSuccess && <div>{data.result?.results.map(user =>
        <UserItems user={user}
                   key={user.id}
        />
      )}</div>}
      {isLoading && <Loader/>}
      {errorStr && <Alarm title={'Ошибка'} status={'error'} message={errorStr}/>}
      {isSuccess && <Alarm title={'Успех'} message={data.message}/>}
    </div>
  )
}

export default Users
