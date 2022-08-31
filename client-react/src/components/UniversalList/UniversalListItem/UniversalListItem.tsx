import React, { FC } from 'react'

interface IUniversalListItem {
  image?: string
  name: string
  id: number
  onChange?: (id: number) => void
  onDelete?: (id: number) => void
}

const UniversalListItem: FC<IUniversalListItem> = ({
  // name,
  // onChange,
  // onDelete,
  // id,
  // image
}) => {
  return (
    <div>
    DSFG
    </div>
  )
}

export default UniversalListItem
