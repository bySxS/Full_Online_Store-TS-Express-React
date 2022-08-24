import React, { createContext, useContext, useState } from 'react'

interface IModalContext {
  modal: boolean
  openModal: () => void
  closeModal: () => void
}

export const ModalContext = createContext<IModalContext>({
  modal: false,
  openModal: () => {},
  closeModal: () => {}
})

export const ModalState = ({ children }: {children: React.ReactNode}) => {
  const [modal, setModal] = useState(false)

  const openModal = () => setModal(true)

  const closeModal = () => setModal(false)

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      { children }
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
