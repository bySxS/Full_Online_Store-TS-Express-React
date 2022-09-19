import React, { FC, memo, useState } from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import { useAppActions } from 'hooks/useStore'
import { useProducts } from '../../hooks/useSelectors'
import style from './Breadcrumb.module.scss'
import { IRoute, routes } from 'AppRouter'
import { NavLink } from 'react-router-dom'

interface IBreadcrumbsProps {
  className?: string
}

const BreadcrumbsComponent: FC<IBreadcrumbsProps> = ({ className }) => {
  const [rout] = useState<IRoute[]>(routes)
  const { breadcrumbLinks, setBreadcrumb } = useBreadcrumb()
  const { filterState } = useProducts()
  const { changeFilterState } = useAppActions()
  const breadcrumbs = useBreadcrumbs(rout, {
    excludePaths: ['/products/category', '/products/:id']
  })

  const clickChangeCategory = (id?: number, name?: string) => {
    if (id && name && filterState?.categoryId !== id) {
      changeFilterState({ categoryId: id })
      setBreadcrumb({
        moduleName: 'Товары',
        moduleLink: '/products',
        sectionName: name,
        sectionId: id
      })
    }
  }

  return (
    <div className={breadcrumbs.length !== 1
      ? (className !== undefined ? className : style.head)
      : undefined}>
      <nav className={style.body}>
        {breadcrumbLinks && breadcrumbLinks.length > 1
          ? breadcrumbLinks.map(({ name, link, id }, i) => (
            (i === 0)
              ? <span key={i}>
                <NavLink to={link}>{name}</NavLink>
              </span>
              : <span key={i}>
                <span className={'px-2'}>
                   <i className="bi bi-arrow-right-short"/>
                </span>
                <span>
                  <NavLink
                    onClick={() => clickChangeCategory(id, String(name))}
                    to={link}
                  >
                    {name}
                  </NavLink>
                </span>
              </span>
          ))
          : breadcrumbs.length !== 1 && breadcrumbs.map(({
            match,
            breadcrumb,
            key
          }, i) => (
            (i === 0)
              ? <span key={match.pathname}>
                <NavLink to={match.pathname}>{breadcrumb}</NavLink>
              </span>
              : <span key={key}>
                <span className={'px-2'}>
                   <i className="bi bi-arrow-right-short"/>
                </span>
                <span>
                  <NavLink to={match.pathname}>
                    {breadcrumb}
                  </NavLink>
                </span>
              </span>
          ))
        }
      </nav>
    </div>
  )
}

export const Breadcrumbs = memo(BreadcrumbsComponent)
