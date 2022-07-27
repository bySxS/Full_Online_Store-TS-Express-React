import React, { FC } from 'react'
import UserItems from 'components/UserItems/UserItems'
import { useFetchAllUsersQuery } from 'store/myStore/myStore.api'
import { Helmet } from 'react-helmet'
import { useInfoLoading } from 'hooks/useInfoLoading'

interface UsersProps {
  name: string
}

const Users: FC<UsersProps> = ({ name }) => {
  const { isLoading, isSuccess, isError, data, error } =
    useFetchAllUsersQuery({ limit: 10, page: 1 })
  useInfoLoading({ isLoading, isSuccess, isError, data, error })

  return (
    <div>
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
    </div>
  )
}

export default Users
