import React from 'react'
import { useFetchAllUsersQuery } from 'api/myStoreApi'
import Loader from '../UI/Loader/loader'
import UserItem from '../UserItem/UserItem'

const Users = () => {
  const { isLoading, isSuccess, isError, data } =
    useFetchAllUsersQuery({ limit: 10, page: 1 })

  return (
    <div>
      <div>Список пользователей</div>
      {isSuccess && <div>{data.result?.results.map(user =>
        <UserItem user={user}
                  key={user.id}
        />
      )}</div>}
      {isLoading && <Loader/>}
      {isError && <div>Произошла ошибка загрузки</div>}
      {isSuccess && <div>{data.message}</div>}
    </div>
  )
}

export default Users
