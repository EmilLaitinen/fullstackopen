import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent  } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

const blog = {
  title: "asd",
  author: "heeh",
  url: "asdsasd",
  likes: 1,
  user: {username: "heeh", id: 123 },
  id: 123
}

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Donald Tester'
}

localStorage.setItem('loggedUser', JSON.stringify(user))


test('correct content', () => {
  const component = render(
    <Blog blog={blog}/>
  )
  expect(component.container).toHaveTextContent('asd')
})

test('invisible', () => {
  const component = render(
    <Blog blog={blog}/>
  )
  const div = component.container.querySelector('.hidden')
  expect(div).toHaveStyle('display: none')
})

test('visible when clicked', () => {
  const component = render(
    <Blog blog={blog}/>
  )
  const div = component.container.querySelector('.hidden')
  expect(div).toHaveStyle('display: none')
  fireEvent.click(div)
  expect(div).toHaveStyle('display: ')
})