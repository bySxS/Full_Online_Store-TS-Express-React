import React, { useEffect, useState } from 'react'
import OrdersList from 'components/OrdersList/OrdersList'
import Pagination from 'components/Pagination/Pagination'
import { useSearchParams } from 'react-router-dom'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useAppActions } from 'hooks/useStore'
import { useLazyGetOrdersNeedProcessQuery } from 'store/myStore/myStoreBasket.api'
import { IBasket } from 'store/myStore/myStoreBasket.interface'

const EditOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { changeFilterState } = useAppActions()
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [orders, setOrders] = useState<IBasket[]>([])
  useEffect(() => {
    changeFilterState({})
  }, [])
  const [getOrdersNeedProcess, {
    isLoading, isSuccess, isError, data, error
  }] = useLazyGetOrdersNeedProcessQuery()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  useEffect(() => {
    getOrdersNeedProcess({ limit: 10, page })
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
      <Pagination
        totalPage={totalPage}
        page={page}
        setPage={setPage}
        setQueryPage={setSearchParams}
        widthClassName={'w-[90%]'}
      />
      {orders.length > 0
        ? <OrdersList orders={orders} inAdmin={true}/>
        : <div className={'text-center w-[90%] m-auto'}>
          Нет заказов нуждающих в обработке:(
      </div>
      }
    </div>
  )
}

export default EditOrders
