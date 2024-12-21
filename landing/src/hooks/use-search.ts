import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function useSearch() {
  const searchParams = useSearchParams()

  const getSearchFromSearchParams = useCallback(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  const [search, setSearch] = useState(getSearchFromSearchParams())

  useEffect(() => {
    setSearch(getSearchFromSearchParams())
  }, [getSearchFromSearchParams])

  return [search, setSearch] as const
}
