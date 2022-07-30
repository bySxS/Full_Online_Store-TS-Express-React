import React from 'react'
// import style from './Breadcrumb.module.scss'

export interface ICrumbs {
  title: string,
  path: string
}

interface IBreadcrumb {
  crumbs: ICrumbs[]
  selected: (crumb: string) => void
}

function Breadcrumb (props: IBreadcrumb) {
  function isLast (index: number) {
    return index === props.crumbs.length - 1
  }

  return (
    <div>
      <ol className={'breadcrumb'}>
        {
          props.crumbs.map((crumb, ci) => {
            const disabled = isLast(ci) ? 'disabled' : ''

            return (
              <li
                key={ ci }
                className="breadcrumb-item align-items-center"
              >
                <button className={`btn btn-link ${disabled}`}
                        onClick={() => props.selected(crumb.path)}>
                  { crumb.title }
                </button>
              </li>
            )
          })
        }
      </ol>
    </div>
  )
}

export default Breadcrumb
