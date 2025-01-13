import { useState } from 'react'

export const useFormState = <T extends Record<string, unknown>>(initialState: T, clearResponse: () => void) => {
  const [ state, setState ] = useState(initialState)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    clearResponse()
    const { name, value } = e.target

    let finalValue: number | string = value

    if (e.target.type === 'number')
      finalValue = parseInt(value)

    setState(prev => ({ ...prev, [name]: finalValue }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'number' | 'text') => {
    clearResponse()
    const { name, value } = e.target

    console.log({ name, value })

    let finalValue: string | number = value

    if (type === 'number')
      finalValue = value.length === 0 ? 0 : parseInt(value)

    setState(prev => ({ ...prev, [name]: finalValue }))
  }

  const handleMultiselectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    clearResponse()
    const { name, value } = e.target

    const finalValue: number = parseInt(value)

    const ids = (state[name] as number[])

    const newSelectedIds = [ ...ids, finalValue ]
    setState(prev => ({ ...prev, [name]: newSelectedIds }))
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    clearResponse()
    const { name, value } = e.target

    setState(prev => ({ ...prev, [name]: value }))
  }

  return {
    state,
    handleInputChange,
    handleSelectChange,
    handleTextareaChange,
    handleMultiselectChange,
    setState
  }
}