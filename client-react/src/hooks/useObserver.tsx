import { RefObject, useEffect, useRef, useState } from 'react'
// import { useLocation } from 'react-router-dom'

export const useObserver = (
  lastItem: RefObject<HTMLHeadingElement>,
  page: number,
  totalPages: number,
  isLoading: boolean,
  lastPage: string,
  getNewItem: () => any) => {
  const [load, setLoad] = useState<boolean>(false)
  const observer = useRef<IntersectionObserver>()
  const canLoad: boolean = (page <= totalPages)

  useEffect(() => {
    if (load || isLoading) return
    if (observer.current) {
      observer.current.disconnect()
    }

    const callback =
      async (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && canLoad) {
          setLoad(true)
          await getNewItem()
          setTimeout(() => {
            setLoad(false)
          }, 500)
        }
      }

    observer.current = new IntersectionObserver(callback)
    if (lastItem.current) {
      observer.current.observe(lastItem.current)
    }
  }, [totalPages, lastPage, load])
}
