import React from 'react'
import Togglable from './Togglable'
import axios from 'axios'
const baseUrl = '/api/blogs'

const Blog = ({ blog }) => { 

  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUserJSON)
  if (!user) {
    return
  }
  const token = `bearer ${user.token}`
  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    const url = `${baseUrl}/${blog.id}`
    const Blog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    axios.put(url, Blog)
    return 
  }

  const deleteBlog = () => {
    const config = {
      headers: { Authorization: token },
    }
    const url = `${baseUrl}/${blog.id}`
    console.log(token)
    axios.delete(url, config)
    return 
  }

  const a = `${blog.title} ${blog.author}`

  const del = 
    <div>
      <button onClick={deleteBlog}>Delete</button>
    </div>
    
  return (
  <div key={blog.id} style={blogStyle}>
    <Togglable buttonLabel={a}>
      <div>
        <br />
        <a href={blog.url}>{blog.url}</a> <br />
        Likes: {blog.likes} <button onClick={like}>like</button> <br />
        Added by: {blog.user.username}
        {user.username === blog.user.username && del}
      </div>
    </Togglable>
  </div>
  )
}

export default Blog