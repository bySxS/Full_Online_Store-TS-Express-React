import React, { createContext, useContext, useState } from 'react'

type TCountModal = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

interface IModalContext {
  modal: { [i: number]: boolean }
  openModal: (index: TCountModal) => void
  closeModal: (index: TCountModal) => void
}

export const ModalContext = createContext<IModalContext>({} as IModalContext)

export const ModalState = ({ children }: {children: React.ReactNode}) => {
  const [modal, setModal] = useState<{ [i: number]: boolean }>({
    0: false,
    1: false
  })
  const openModal = (index: number) => setModal((prev) => {
    return { ...prev, [index]: true }
  })
  const closeModal = (index: number) => setModal((prev) => {
    return { ...prev, [index]: false }
  })

  return (
    <ModalContext.Provider value={{
      modal,
      openModal,
      closeModal
    }}>
      { children }
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
