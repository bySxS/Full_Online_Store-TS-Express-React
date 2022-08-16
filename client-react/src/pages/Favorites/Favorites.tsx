import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { useAppActions } from '../../hooks/useStore'

interface FavoritesProps {
  name: string
}

const Favorites: FC<FavoritesProps> = ({ name }) => {
  const { setShowCategory } = useAppActions()
  const handleClick = () => {
    setShowCategory([])
  }

  return (
    <div onClick={handleClick}>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div className="font-bold">{name}</div>
    </div>
  )
}

export default Favorites
