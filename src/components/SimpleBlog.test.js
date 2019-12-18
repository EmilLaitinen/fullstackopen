import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent  } from '@testing-library/react'
import SimbleBlog from './SimbleBlog'

afterEach(cleanup)

const blog = {
  title: 'a',
  author: 'b',
  likes: 1
}

const mockHandler = jest.fn()

test('renders content', () => {

  const component = render(
    <SimbleBlog blog={blog} onClick={mockHandler} />
  )
  expect(component.container).toHaveTextContent(
    'a'
  )
  expect(component.container).toHaveTextContent(
    'b'
  )
  expect(component.container).toHaveTextContent(
    '1'
  ) 
})

test('corret amount of calls', () => {

  const { getByText } = render(
    <SimbleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)

})