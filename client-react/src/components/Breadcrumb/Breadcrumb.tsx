import React, { FC, memo, useState } from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { useCategory } from 'context/CategoryProductContext'
import { useAppActions } from 'hooks/useStore'
import style from './Breadcrumb.module.scss'
import { IRoute, routes } from 'AppRouter'
import { NavLink } from 'react-router-dom'

interface IBreadcrumbsProps {
  className?: string
}

const BreadcrumbsComponent: FC<IBreadcrumbsProps> = ({ className }) => {
  const [rout] = useState<IRoute[]>(routes)
  const {
    categoryName, sectionName, sectionId,
    sectionLink, categoryLink, categoryId
  } = useCategory()
  // const navigate = useNavigate()
  const { changeFilterState } = useAppActions()
  const breadcrumbs = useBreadcrumbs(rout, {
    excludePaths: ['/products/category', '/products/:id']
  })

  return (
    <div className={breadcrumbs.length !== 1
      ? (className !== undefined ? className : style.head)
      : undefined}>
      <nav className={style.body}>
        {breadcrumbs.length !== 1 && breadcrumbs.map(({
          match,
          breadcrumb,
          key
        }, i) => (
          (i !== 0)
            ? <span key={key}>
                <span className={'px-2'}>
                   <i className="bi bi-arrow-right-short"/>
                </span>
                <span>
                  <NavLink to={match.pathname}>
                    {breadcrumb}
                  </NavLink>
                </span>
              </span>
            : <span key={match.pathname}>
                <NavLink to={match.pathname}>{breadcrumb}</NavLink>
              </span>
        ))}
        {sectionName &&
          <span>
                <span className={'px-2'}>
                   <i className="bi bi-arrow-right-short"/>
                </span>
                <span>
                  <NavLink
                    onClick={() => changeFilterState({
                      categoryId: sectionId
                    })}
                    to={sectionLink}>
                    {sectionName}
                  </NavLink>
                </span>
        </span>
        }
        {categoryName &&
          <span>
                <span className={'px-2'}>
                   <i className="bi bi-arrow-right-short"/>
                </span>
                <span>
                  <NavLink
                    onClick={() => changeFilterState({
                      categoryId
                    })}
                    to={categoryLink}
                  >
                    {categoryName}
                  </NavLink>
                </span>
        </span>
        }
      </nav>
    </div>
  )
}

export const Breadcrumbs = memo(BreadcrumbsComponent)
