import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

interface IModalProps {
  children: React.ReactNode
  title: string
  onClose: () => void
  show: boolean
  onSend?: () => void
  onSendName?: string
  className?: string
}

export function ModalComponent (
  {
    children, title, show, className,
    onClose, onSend, onSendName
  }: IModalProps) {
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        size={'lg'}
        dialogClassName={className || 'w-[500px]'}
      >
        <Modal.Header
          closeButton={true}
          closeVariant={'white'}
        >
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { children }
        </Modal.Body>
        {onSend !== undefined &&
        <Modal.Footer>
          {onSend &&
            <Button variant="primary" onClick={onSend}>
              {onSendName !== undefined ? onSendName : 'Отправить'}
            </Button>
          }
        </Modal.Footer>
        }
      </Modal>
    </>
  )
}
