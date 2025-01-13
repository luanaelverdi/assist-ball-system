import { useCallback, useEffect, useState } from 'react'

export const useDebouncedSearch = () => {
  const [ filter, setFilter ] = useState<string>('')
  const [ debouncedFilter, setDebouncedFilter ] = useState<string>('')

 
  

  const handleFilter: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchTerm = e.target.value
    setFilter(searchTerm)
  }

  return {
    handleFilter,
    filter,
    debouncedFilter
  }
}