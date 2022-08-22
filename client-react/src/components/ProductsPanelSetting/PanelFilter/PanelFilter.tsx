import React from 'react'
import CategoryList from './CategoryList/CategoryList'
import style from './PanelFilter.module.scss'

const PanelFilter = () => {
  return (
    <div className={style.panel}>
      <div> {/* categories */}
        <CategoryList />
      </div>
    </div>
  )
}

export default PanelFilter
