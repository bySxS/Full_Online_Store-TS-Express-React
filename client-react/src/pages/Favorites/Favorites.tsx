import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface FavoritesProps {
  name: string
}

const Favorites: FC<FavoritesProps> = ({ name }) => {
  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div className="font-bold">{name}</div>
    </div>
  )
}

export default Favorites
