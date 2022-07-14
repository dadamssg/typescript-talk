import { renderHook, act } from '@testing-library/react'
import useForm from './useForm'

type Person = {
  name: string,
  age?: number
}

describe('useForm', function () {
  it('can init form', () => {
    const {result} = renderHook(() => useForm<Person>({name: 'John', age: 30}))
    expect(result.current.initialValues).toEqual({name: 'John', age: 30})
    expect(result.current.currentValues).toEqual({name: 'John', age: 30})
  })

  it('can set value', () => {
    const {result} = renderHook(() => useForm<Person>({name: 'John', age: 30}))
    act(() => {
      result.current.setValue('name', 'John Doe')
    })
    expect(result.current.currentValues).toEqual({name: 'John Doe', age: 30})
  })

  it('can set values using partial object', () => {
    const {result} = renderHook(() => useForm<Person>({name: 'John'}))
    act(() => {
      result.current.setValues({age: 30})
    })
    expect(result.current.currentValues).toEqual({name: 'John', age: 30})
  })

  it('can set values using function', () => {
    const {result} = renderHook(() => useForm<Person>({name: 'John'}))
    act(() => {
      result.current.setValues((values) => ({...values, age: 1}))
    })
    expect(result.current.currentValues).toEqual({name: 'John', age: 1})
  })

  it('can delete field', () => {
    const {result} = renderHook(() => useForm<Person>({name: 'John', age: 30}))
    act(() => {
      result.current.deleteField('age')
    })
    expect(result.current.currentValues).toEqual({name: 'John'})
  })
  it('can delete fields', () => {
    type Favorites = {
      color?: string,
      number?: number
    }
    const {result} = renderHook(() => useForm<Favorites>({color: 'green', number: 7}))
    act(() => {
      result.current.deleteFields(['color', 'number'])
    })
    expect(result.current.currentValues).toEqual({})
  })

  it('can reset', () => {
    const {result} = renderHook(() => useForm<Person>({name: 'John', age: 30}))
    act(() => {
      result.current.setValue('name', 'John Doe')
      result.current.reset()
    })
    expect(result.current.currentValues).toEqual({name: 'John', age: 30})
  })
});

