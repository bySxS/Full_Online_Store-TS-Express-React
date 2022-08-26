import React, { FC, useState } from 'react'

interface IDescription {
  description: string
}

const Description: FC<IDescription> = ({ description }) => {
  const [lines] = useState<string[]>(description.split('\\p\\n'))
  return (
    <>
      {lines && lines.map((line, i) => (
        <span key={i}>{line}<br/></span>
      ))}
    </>
  )
}

export default Description
