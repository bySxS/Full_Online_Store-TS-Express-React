import dayjs from 'dayjs'
import React, { FC, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useGetDynamicPriceByProductIdQuery } from 'store/myStore/myStoreProduct.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { IDynamicPrice } from 'store/myStore/myStoreProduct.interface'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: false,
      text: 'Динамика цены'
    }
  }
}

const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const currentDay = currentDate.getDay()
const getMonthShift = (shift: number = 0) =>
  dayjs(new Date(`${currentYear}-${currentMonth + shift}-${currentDay}`))
    .format('MMMM YY')

const getMonth = (datetime: string): string => dayjs(new Date(datetime)).format('MMMM YY')

interface IPriceDynamic {
  productId: number
  currentPrice: number
}

const PriceDynamic: FC<IPriceDynamic> = ({
  productId,
  currentPrice
}) => {
  const {
    isLoading, isSuccess, isError, data: dataPrice, error
  } = useGetDynamicPriceByProductIdQuery(productId)
  useInfoLoading({
    isLoading, isSuccess, isError, data: dataPrice, error
  })
  const [month, setMonth] = useState([
    getMonthShift(-5),
    getMonthShift(-4),
    getMonthShift(-3),
    getMonthShift(-2),
    getMonthShift(-1),
    getMonthShift(),
    getMonthShift(+1)
  ])
  const [price, setPrice] = useState(month.map(() => currentPrice))
  const [data, setData] = useState({
    labels: month,
    datasets: [
      {
        label: 'Цена',
        data: price,
        borderColor: 'rgb(0,156,255)',
        backgroundColor: 'rgba(0,158,255,0.5)'
      }
    ]
  })

  const fixArrayReverseAndAddCurrentPrice = (x: IDynamicPrice[]): IDynamicPrice[] => {
    const a: IDynamicPrice[] = []
    for (let i = 0; i < x.length; i++) {
      a.push(x[(x.length - 1) - i])
    }
    a.push({
      updatedAt: getMonth(currentDate.toString()),
      price: currentPrice
    })
    return a
  }

  useEffect(() => {
    if (isSuccess && dataPrice && dataPrice.result) {
      setMonth(fixArrayReverseAndAddCurrentPrice(dataPrice.result).map(item => getMonth(item.updatedAt)))
      setPrice(fixArrayReverseAndAddCurrentPrice(dataPrice.result).map(item => item.price))
    }
  }, [isSuccess])

  useEffect(() => {
    setData({
      labels: month,
      datasets: [
        {
          label: 'Цена',
          data: price,
          borderColor: 'rgb(0,156,255)',
          backgroundColor: 'rgba(0,158,255,0.5)'
        }
      ]
    })
  }, [price])

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

export default PriceDynamic
