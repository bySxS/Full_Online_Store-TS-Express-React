import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

interface ModalProps {
  children: React.ReactNode
  title: string
  onClose: () => void
  show: boolean
  onSend?: () => void
  onSendName?: string
}

export function ModalComponent (
  {
    children, title, show,
    onClose, onSend, onSendName
  }: ModalProps) {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { children }
        </Modal.Body>
        {onSend !== undefined &&
        <Modal.Footer>
          <Button variant="primary" onClick={onSend}>
            {onSendName !== undefined ? onSendName : 'Отправить'}
          </Button>
        </Modal.Footer>
        }
      </Modal>
    </>
  )
}
