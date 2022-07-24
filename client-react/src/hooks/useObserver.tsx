import { RefObject, useEffect, useRef } from 'react'

export const useObserver = (
  lastItem: RefObject<HTMLHeadingElement>,
  page: number,
  totalPages: number,
  isLoading: boolean,
  getNewItem: any) => {
  const observer = useRef<IntersectionObserver>()

  const canLoad: boolean = (page <= totalPages)

  const callback = async (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && canLoad) {
      await getNewItem()
    }
  }

  useEffect(() => {
    if (isLoading) return
    if (observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver(callback)
    if (lastItem.current) {
      observer.current.observe(lastItem.current)
    }
  }, [isLoading, page])
}
