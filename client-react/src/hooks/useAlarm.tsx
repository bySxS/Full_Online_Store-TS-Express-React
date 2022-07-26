import { useCallback, useState } from 'react'
import { IAlarmStack } from 'components/UI/Alarm/Alarm'

export const useAlert = () => {
  const [alarm, setAlarm] =
    useState<IAlarmStack | undefined>(undefined)
  const closeAlert = () => {
    setAlarm(undefined)
  }
  const setAlert = useCallback(
    ({
      title = 'Успех',
      message = '',
      status = 'success',
      delay = 3000,
      time = '',
      color = 'success'
    }) => {
      if (status.toLowerCase() === 'success') {
        color = 'success'
        title = 'Успех'
        delay = 2000
      } else if (status.toLowerCase() === 'error') {
        color = 'danger'
        title = 'Ошибка'
        delay = 5000
      } else if (status.toLowerCase() === 'warning') {
        color = 'warning'
        title = 'Предупреждение'
        delay = 3500
      }
      if (time === '') {
        time = new Date(Date.now()).toString()
      }
      setAlarm({
        title,
        message,
        time,
        delay,
        color,
        status
      })
    }, [])

  return { setAlert, alarm, closeAlert }
}
