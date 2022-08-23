import React from 'react'
import CategoryList from './CategoryList/CategoryList'
import CharacteristicsSelect from './CharacteristicsSelect/CharacteristicsSelect'
import style from './PanelFilter.module.scss'
import PriceRange from './PriceRange/PriceRange'

const PanelFilter = () => {
  return (
    <div className={style.panel}>
        <CategoryList />
        <hr className={style.hr} />
        <PriceRange />
        <hr className={style.hr} />
        <CharacteristicsSelect />
    </div>
  )
}

export default PanelFilter
