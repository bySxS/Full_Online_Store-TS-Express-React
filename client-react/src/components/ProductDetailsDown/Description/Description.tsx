import React, { FC } from 'react'

interface IDescription {
  description: string
}

const Description: FC<IDescription> = ({ description }) => {
  return (
    <>
      {description}
    </>
  )
}

export default Description
