import React, { FC } from 'react'
import UserItems from 'components/UserItems/UserItems'
import { useFetchAllUsersQuery } from 'store/myStore/myStoreUser.api'
import { Helmet } from 'react-helmet'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { Breadcrumbs } from 'components/Breadcrumb/Breadcrumb'
import style from './Users.module.scss'

interface UsersProps {
  name: string
}

const Users: FC<UsersProps> = ({ name }) => {
  const { isLoading, isSuccess, isError, data: users, error } =
    useFetchAllUsersQuery({ limit: 10, page: 1 })
  useInfoLoading({ isLoading, isSuccess, isError, data: users, error })

  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={name + ' все клиенты'} />
      </Helmet>
      <Breadcrumbs className={style.breadcrumbs} />
      <div className="font-bold text-center">{name}</div>
      {isSuccess && users && <div>{users.result?.results.map(user =>
        <UserItems user={user}
                   key={user.id}
        />
      )}</div>}
    </div>
  )
}

export default Users
