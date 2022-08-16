import { RefObject, useEffect, useRef, useState } from 'react'

export const useObserver = (
  lastItem: RefObject<HTMLHeadingElement>,
  page: number,
  totalPages: number,
  isLoading: boolean,
  category: string,
  getNewItem: () => any) => {
  const [load, setLoad] = useState<boolean>(false)
  const observer = useRef<IntersectionObserver>()
  const canLoad: boolean = (page <= totalPages)

  const callback = async (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && canLoad) {
      setLoad(true)
      await getNewItem()
      setTimeout(() => {
        setLoad(false)
      }, 500)
    }
  }

  useEffect(() => {
    if (load || isLoading) return
    if (observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver(callback)
    if (lastItem.current) {
      observer.current.observe(lastItem.current)
    }
  }, [load, totalPages, category])
}
