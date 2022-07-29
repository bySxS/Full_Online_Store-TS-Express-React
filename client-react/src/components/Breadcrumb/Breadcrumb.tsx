import React from 'react'
import style from './Breadcrumb.module.scss'

interface IBreadcrumb {
  crumbs: string[]
  selected: (title: string) => void
}

function Breadcrumb (props: IBreadcrumb) {
  function isLast (index: number) {
    return index === props.crumbs.length - 1
  }

  return (
    <nav className="row justify-content-center mt-4">
      <ol className={`breadcrumb ${style.breadcrumb}`}>
        {
          props.crumbs.map((crumb, ci) => {
            const disabled = isLast(ci) ? 'disabled' : ''

            return (
              <li
                key={ ci }
                className="breadcrumb-item align-items-center"
              >
                <button className={`btn btn-link ${disabled}`}
                        onClick={() => props.selected(crumb)}>
                  { crumb }
                </button>
              </li>
            )
          })
        }
      </ol>
    </nav>
  )
}

export default Breadcrumb
