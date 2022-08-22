import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { MyDropDownMenu, MyDropDownToggle } from 'components/UI/DropDownToggle/DropDownToggle'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import { TSortProduct } from 'store/myStore/myStoreProduct.interface'
import selectProduct from 'store/product/product.selector'

const sortDefault = [
  { id: 1, value: 'price_asc', name: 'Цена по возрастанию' },
  { id: 2, value: 'price_desc', name: 'Цена по убиванию' },
  { id: 3, value: 'id_desc', name: 'Сначала новые' },
  { id: 4, value: 'views_desc', name: 'По популярности' },
  { id: 5, value: 'rating_desc', name: 'По рейтингу' },
  { id: 6, value: 'favorites_desc', name: 'По желанным' }
]

const ButtonSort = () => {
  const [sortValues] = useState(sortDefault)
  const filterState = useAppSelector(selectProduct.filterState)
  const [name, setName] = useState(
    sortDefault
      .filter(item => item.value === filterState.sort)
      .map(item => item.name)[0] || 'Сортировка')

  const { changeFilterState } = useAppActions()
  const handleClick = (e: React.MouseEvent) => {
    const nameCur = e.currentTarget.innerHTML
    setName(nameCur)
    const sort = sortValues
      .filter(item => item.name === nameCur)
      .map(item => item.value)[0] as TSortProduct
    changeFilterState({ sort })
  }

  return (
  <Dropdown>
    <Dropdown.Toggle
      as={MyDropDownToggle}
      id="dropdown-custom-components"
    >
      {name}
    </Dropdown.Toggle>

    <Dropdown.Menu as={MyDropDownMenu}>
      {sortValues.map((item, i) =>
        <Dropdown.Item
          key={i}
          onClick={handleClick}
          eventKey={item.id}
          defaultValue={item.value}
        >
          {item.name}
        </Dropdown.Item>
      )}
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default ButtonSort
