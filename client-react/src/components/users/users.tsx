import React from 'react'
import { useFetchAllUsersQuery } from 'api/myStoreApi'
import Loader from 'components/UI/Loader/loader'
import UserItem from 'components/userItem/userItem'

const Users = () => {
  const { isLoading, isSuccess, isError, data } = useFetchAllUsersQuery({ limit: 10, page: 1 })
  console.log(data)
  if (isSuccess) {
    console.log(data.message)
  }

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
    </div>
  )
}

export default Users
