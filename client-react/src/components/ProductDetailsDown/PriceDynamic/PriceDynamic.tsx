import React from 'react'
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
      display: true,
      text: 'Цена'
    }
  }
}

const labels = [
  'January', 'February',
  'March', 'April', 'May', 'June', 'July'
]

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 1000),
      borderColor: 'rgb(0,156,255)',
      backgroundColor: 'rgba(0,158,255,0.5)'
    }
  ]
}

const PriceDynamic = () => {
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

export default PriceDynamic
