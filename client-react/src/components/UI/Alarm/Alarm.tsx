import React, { FC, useState } from 'react'
import {
  Toast, ToastBody, ToastContainer, ToastHeader
} from 'react-bootstrap'

interface IAlarmProps {
  title: string
  message: string
  time?: string
  delay?: number
  color?: string
  // status - success, error, warning
  status?: string
}

const Alarm: FC<IAlarmProps> = ({
  delay = 4000,
  status = 'success',
  title = '',
  message = '',
  time = '',
  color = ''
}) => {
  const [show, setShow] = useState(true)
  if (status.toLowerCase() === 'success') {
    color = 'success'
  } else if (status.toLowerCase() === 'error') {
    color = 'danger'
  } else if (status.toLowerCase() === 'warning') {
    color = 'warning'
  }

  return (
      <div>
        <ToastContainer className={'position-fixed bottom-1'}>
          <Toast
            className="d-inline-block m-1"
            bg={color.toLowerCase()}
            delay={delay}
            animation={true}
            autohide={true}
            show={show}
            onClose={() => setShow(false)}
          >
            <ToastHeader>
              <i className="bi bi-envelope-exclamation-fill pr-1.5"></i>
              <strong className="me-auto">{title}</strong>
              <small>{time}</small>
            </ToastHeader>
            <ToastBody>
              {message}
            </ToastBody>
          </Toast>
        </ToastContainer>
      </div>
  )
}

export default Alarm
