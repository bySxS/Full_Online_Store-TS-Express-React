import React from 'react'
import { MyDropDownToggle } from 'components/UI/DropDownToggle/DropDownToggle'
import { useModal } from 'context/ModalContext'

const ButtonChar = () => {
  const { modal, openModal, closeModal } = useModal()

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
