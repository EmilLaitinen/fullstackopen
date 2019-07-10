const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1})
    response.json(blogs)
  })

  blogsRouter.delete('/:id', async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }     const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (!(blog.user.toString() === user._id.toString())) {
      return response.status(401).json({ error: 'unauthorized' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).end()
  })
  


  blogsRouter.post('/', async (request, response, next) => {
    try {
    const body = request.body

    console.log(request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!body.likes) {
      body.likes = 0
    } if (!body.url || !body.title) {
      return response.status(400).json('content missing')
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
}
)

  module.exports = blogsRouter
