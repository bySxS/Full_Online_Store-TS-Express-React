import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useAppActions } from 'hooks/useStore'
import OrdersList from 'components/OrdersList/OrdersList'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useSearchParams } from 'react-router-dom'
import { useLazyGetAllOrdersQuery } from 'store/myStore/myStoreBasket.api'
import { IBasket } from 'store/myStore/myStoreBasket.interface'
import Pagination from 'components/Pagination/Pagination'

interface AllOrdersProps {
  name: string
}

const AllOrders: FC<AllOrdersProps> = ({ name }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { changeFilterState } = useAppActions()
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [orders, setOrders] = useState<IBasket[]>([])
  useEffect(() => {
    changeFilterState({})
  }, [])
  const [getOrders, {
    isLoading, isSuccess, isError, data, error
  }] = useLazyGetAllOrdersQuery()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  useEffect(() => {
    getOrders({ limit: 10, page })
  }, [page])
  useEffect(() => {
    if (isSuccess && data) {
      setTotalPage(data.result.totalPage)
      setOrders(data.result.results)
    }
  }, [isSuccess, data])
  useEffect(() => {
    const pageP = searchParams.get('page')
    if (pageP && +pageP !== page) {
      setPage(+pageP)
    }
  }, [searchParams])
  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <Pagination
          totalPage={totalPage}
          page={page}
          setPage={setPage}
          setQueryPage={setSearchParams}
          widthClassName={'w-[90%]'}
      />
      {orders.length > 0
        ? <OrdersList orders={orders} />
        : <div className={'text-center w-[90%] m-auto'}>
          У вас не было заказов:(
        </div>
      }
    </div>
  )
}

export default AllOrders
