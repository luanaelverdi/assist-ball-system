import { useMemo, useState } from 'react'

export const useFilterBy = <T extends Record<string, unknown>, K extends keyof T>({ 
  entities, 
  idKey, 
  nameKey 
} : {
  entities: T[] | null,
  idKey: K,
  nameKey: K
}) => {
  const [ currentOption, setCurrentOption ] = useState<number>(0)

  const options = useMemo(() => {
    if (entities === null)
      return []

    const uniqueOptions = Array.from(
      new Set(entities.map(entity => entity[idKey])))
      .map(id => {
        return entities.find(entity => entity[idKey] === id)
      })
      .map(entity => ({ id: entity![idKey] as number, nombre: entity![nameKey] as string }))

    return uniqueOptions
  }, [ entities,  idKey, nameKey ])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentOption(parseInt(e.target.value))
  }

  return {
    options,
    currentOption,
    handleChange,
  }
}