import React, { createContext, useContext, useState } from 'react'
import { RoutePath } from '../AppRouter'

interface ISetCategory {
  categoryId?: number
  categoryName?: string
  sectionId?: number
  sectionName?: string
}

interface ICategoryProductContext {
  categoryName: string
  categoryLink: string
  categoryId: number | undefined
  sectionName: string
  sectionLink: string
  sectionId: number | undefined
  setCategory: (args: ISetCategory) => void
}

export const CategoryProductContext = createContext<ICategoryProductContext>({
  categoryName: '',
  categoryLink: '',
  sectionLink: '',
  sectionName: '',
  categoryId: 0,
  sectionId: 0,
  setCategory: () => {}
})

export const CategoryState = ({ children }: {children: React.ReactNode}) => {
  const [categoryName, setCategoryName] = useState('')
  const [categoryLink, setCategoryLink] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [sectionLink, setSectionLink] = useState('')
  const [sectionId, setSectionId] = useState<number>()
  const [categoryId, setCategoryId] = useState<number>()
  const setCategory = ({ categoryName, categoryId, sectionName, sectionId }: ISetCategory) => {
    setCategoryName(categoryName || '')
    setCategoryLink(categoryId ? `${RoutePath.PRODUCTS}/category/${categoryId}` : '')
    setSectionName(sectionName || '')
    setSectionLink(sectionId ? `${RoutePath.PRODUCTS}/category/${sectionId}` : '')
    if (categoryId) {
      setCategoryId(categoryId)
    }
    if (sectionId) {
      setSectionId(sectionId)
    }
  }

  return (
    <CategoryProductContext.Provider value={{
      categoryName,
      categoryLink,
      sectionName,
      sectionLink,
      categoryId,
      sectionId,
      setCategory
    }}>
      { children }
    </CategoryProductContext.Provider>
  )
}

export const useCategory = () => useContext(CategoryProductContext)
