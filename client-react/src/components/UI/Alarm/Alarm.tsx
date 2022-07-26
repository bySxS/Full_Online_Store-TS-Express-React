import React, { FC, useEffect } from 'react'
import {
  Toast, ToastBody, ToastContainer, ToastHeader
} from 'react-bootstrap'
import { useAlert } from 'hooks/useAlarm'

export interface IAlarmStack {
  title?: string
  message: string
  time?: string
  delay?: number
  color?: string
  status?: string
  // show: boolean
}

// interface IAlarmProps {
//   alarm: IAlarmStack
// }

const Alarm: FC<IAlarmStack> = (props) => {
  const { closeAlert, alarm, setAlert } = useAlert()

  useEffect(() => {
    setAlert(props)
  }, [])

  return (
      <div>
        {alarm &&
        <ToastContainer
          containerPosition={'fixed'}
          position={'bottom-center'}
          className="p-3">
            <Toast
              className="d-inline-block m-1"
              bg={alarm.color?.toLowerCase()}
              delay={alarm.delay}
              animation={true}
              autohide={true}
              show={true}
              onClose={closeAlert}
            >
              <ToastHeader closeVariant={'white'}>
                <i className="bi bi-envelope-exclamation-fill pr-1.5"></i>
                <strong className="me-auto">{alarm.title}</strong>
                <small>{''}</small>
              </ToastHeader>
              <ToastBody>
                {alarm.message}
              </ToastBody>
            </Toast>
        </ToastContainer>
        }
      </div>
  )
}

export default Alarm
