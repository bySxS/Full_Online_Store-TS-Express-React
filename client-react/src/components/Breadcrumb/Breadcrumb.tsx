import React, { FC, memo, useState } from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import style from './Breadcrumb.module.scss'
import { IRoute, routes } from 'AppRouter'
import { NavLink } from 'react-router-dom'

interface IBreadcrumbsProps {
  className?: string
}

const BreadcrumbsComponent: FC<IBreadcrumbsProps> = ({ className }) => {
  const [rout] = useState<IRoute[]>(routes)
  const breadcrumbs = useBreadcrumbs(rout)

  return (
    <div className={breadcrumbs.length !== 1
      ? (className !== undefined ? className : style.head)
      : undefined}>
      <nav className={style.body}>
        {breadcrumbs.length !== 1 && breadcrumbs.map(({
          match,
          breadcrumb
        }, i) => (
          (i !== 0)
            ? <span key={match.pathname}>
                <span className={'px-2'}>
                  {/* &#707; */}
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
