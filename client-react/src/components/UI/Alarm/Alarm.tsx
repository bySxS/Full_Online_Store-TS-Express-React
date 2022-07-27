import React from 'react'
import {
  Toast, ToastBody, ToastContainer, ToastHeader
} from 'react-bootstrap'
import { useAppActions, useAppDispatch, useAppSelector } from 'hooks/useStore'
import { getAlerts } from 'store/alert/alert.selector'

const Alarm = () => {
  const stackAlert = useAppSelector(getAlerts)
  const dispatch = useAppDispatch()
  const { delFromAlertStack } = useAppActions()

  const delAlert = (id: number | undefined) => {
    console.log('удаляем ', id)
    dispatch(delFromAlertStack(id || 0))
  }

  return (
      <div>
        {stackAlert &&
        <ToastContainer
          containerPosition={'fixed'}
          position={'bottom-center'}
        >
          {stackAlert.map((alert, index) =>
            <Toast
              key={index}
              className="mt-1 mb-2"
              bg={alert.color?.toLowerCase()}
              delay={alert.delay}
              animation={true}
              autohide={true}
              show={true}
              onClose={() => delAlert(alert.id)}
            >
              <ToastHeader
                closeButton={true}
                closeVariant={'white'}
                closeLabel={'Close'}
              >
                <i className="bi bi-envelope-exclamation-fill pr-1.5"></i>
                <strong className="me-auto">{alert.title}</strong>
                <small>{alert.time}</small>
              </ToastHeader>
              <ToastBody>
                {alert.message}
              </ToastBody>
            </Toast>
          )}
        </ToastContainer>
        }
      </div>
  )
}

export default Alarm
