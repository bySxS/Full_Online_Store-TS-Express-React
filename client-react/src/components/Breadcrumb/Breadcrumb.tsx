import React, { memo, useState } from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import style from './Breadcrumb.module.scss'
import { IRoute, routes } from 'AppRouter'
import { NavLink } from 'react-router-dom'

const BreadcrumbsComponent = () => {
  const [rout] = useState<IRoute[]>(routes)
  const breadcrumbs = useBreadcrumbs(rout)

  return (
    <div>
      <nav className={style.Breadcrumbs}>
        {breadcrumbs.map(({
          match,
          breadcrumb
        }, i) => (
          (i !== 0)
            ? <span key={match.pathname}>
                <span className={'px-2'}>
                  <i className="bi bi-arrow-right-short"/>
                </span>
                <span>
                  <NavLink className={''} to={match.pathname}>
                    {breadcrumb}
                  </NavLink>
                </span>
              </span>
            : <span key={match.pathname}>
                <NavLink to={match.pathname}>{breadcrumb}</NavLink>
              </span>
        ))}
      </nav>
    </div>
  )
}

export const Breadcrumbs = memo(BreadcrumbsComponent)
