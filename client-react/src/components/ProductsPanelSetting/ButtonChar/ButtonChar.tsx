import React, { useContext } from 'react'
import { MyDropDownToggle } from 'components/UI/DropDownToggle/DropDownToggle'
import { ModalContext } from 'context/ModalContext'

const ButtonChar = () => {
  const { modal, openModal, closeModal } = useContext(ModalContext)

  const clickOpenCharModal = () => {
    if (modal) {
      closeModal()
    } else {
      openModal()
    }
  }
  return (
    <>
      <MyDropDownToggle onClick={clickOpenCharModal}>
        <i className={'bi bi-sliders'}/>
      </MyDropDownToggle>
    </>
  )
}

export default ButtonChar
