import React, { FC } from 'react'
import UserItems from 'components/UserItems/UserItems'
import { useFetchAllUsersQuery } from 'store/myStore/myStore.api'
import Loader from 'components/UI/Loader/Loader'
import { Helmet } from 'react-helmet'
import { useErrorFix } from 'hooks/useErrorFix'
import Alarm from 'components/UI/Alarm/Alarm'

interface UsersProps {
  name: string
}

const Users: FC<UsersProps> = ({ name }) => {
  const { isLoading, isSuccess, isError, data, error } =
    useFetchAllUsersQuery({ limit: 10, page: 1 })
  const err = useErrorFix(isError, error)

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
      {isSuccess && data && <Alarm message={data.message} />}
      {isError && err && <Alarm message={err} status={'error'} />}
    </div>
  )
}

export default Users
