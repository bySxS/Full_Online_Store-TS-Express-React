import React, { createContext, ReactElement, useContext, useState } from 'react'
import { RoutePath } from 'AppRouter'

interface ISetBreadcrumb {
  categoryId?: number
  categoryName?: string
  sectionId?: number
  sectionName?: string
  subCategoryName?: string
  subCategoryId?: number
  productId?: number
  productName?: string
  moduleName?: string
  moduleLink?: string
  pageOneName?: string
  pageOneLink?: string
  pageSecondName?: string
  pageSecondLink?: string
  pageThirdName?: string
  pageThirdLink?: string
  pageFourName?: string
  pageFourLink?: string
}

interface IBreadcrumbsLink {
  name: string | ReactElement
  link: string
  id?: number
}

interface IBreadcrumbContext {
  breadcrumbLinks?: IBreadcrumbsLink[]
  setBreadcrumb: (args: ISetBreadcrumb) => void
}

export const BreadcrumbContext = createContext<IBreadcrumbContext>({
  setBreadcrumb: () => {}
})

export const BreadcrumbState = ({ children }: {children: React.ReactNode}) => {
  const [breadcrumbLinks, setBreadcrumbLinks] = useState<IBreadcrumbsLink[]>()
  const setBreadcrumb = ({
    sectionName, sectionId, categoryName, categoryId, subCategoryName, subCategoryId,
    productName, productId, moduleName, moduleLink,
    pageOneName, pageOneLink, pageSecondName, pageSecondLink,
    pageThirdName, pageThirdLink, pageFourName, pageFourLink
  }: ISetBreadcrumb) => {
    const links: IBreadcrumbsLink[] = [{
      name: <i className="bi bi-house-door-fill"/>,
      link: '/'
    }]
    if (moduleName && moduleLink) {
      links.push({
        name: moduleName,
        link: moduleLink
      })
    }
    if (sectionName && sectionId) {
      links.push({
        name: sectionName,
        link: `${RoutePath.PRODUCTS}/category/${sectionId}`,
        id: sectionId
      })
    }
    if (pageOneName && pageOneLink) {
      links.push({
        name: pageOneName,
        link: pageOneLink
      })
    }
    if (categoryName && categoryId) {
      links.push({
        name: categoryName,
        link: `${RoutePath.PRODUCTS}/category/${categoryId}`,
        id: categoryId
      })
    }
    if (pageSecondName && pageSecondLink) {
      links.push({
        name: pageSecondName,
        link: pageSecondLink
      })
    }
    if (subCategoryName && subCategoryId) {
      links.push({
        name: subCategoryName,
        link: `${RoutePath.PRODUCTS}/category/${subCategoryId}`,
        id: subCategoryId
      })
    }
    if (pageThirdName && pageThirdLink) {
      links.push({
        name: pageThirdName,
        link: pageThirdLink
      })
    }
    if (productName && productId) {
      links.push({
        name: productName,
        link: `${RoutePath.PRODUCTS}/${productId}`
      })
    }
    if (pageFourName && pageFourLink) {
      links.push({
        name: pageFourName,
        link: pageFourLink
      })
    }

    setBreadcrumbLinks(links)
  }

  return (
    <BreadcrumbContext.Provider value={{
      breadcrumbLinks,
      setBreadcrumb
    }}>
      { children }
    </BreadcrumbContext.Provider>
  )
}

export const useBreadcrumb = () => useContext(BreadcrumbContext)
