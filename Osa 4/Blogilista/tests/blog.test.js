const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

// Tietokannan alustus yms alkuun

const initialBlogs = [
    {
        title: 'testiblog2323213312i',
        author: 'Emil Lai231312tinen',
        url: 'http://localhost:3003/api/blogs',
        likes: 1
    },
    {
        title: 'testiblo2312312gi',
        author: 'Emil Laitin3fsdfsdfen',
        url: 'http://localhost:3003/api/blogs',
        likes: 321312
    }
  ]
  
  beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

const api = supertest(app)

// Varsinaiset testit

test('GET blogs working?', async () => {
  const response = await api.get('/api/blogs')
  .expect('Content-Type', /application\/json/)

expect(response.body.length).toBe(2)
})

test('id', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.id).toBeDefined
  })


  test('POST id is working?', async () => {
    const newBlog = {
        title: 'testiblogi',
        author: 'Emil Laitinen',
        url: 'http://localhost:3003/api/blogs',
        likes: 1
    }
    await api.post('/api/blogs')
    .send(newBlog)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(3)
  })

  test('POST with missing content', async () => {
    await api.post('/api/blogs')
    .expect(400)
  })

  test('POST with no likes', async () => {
    const newBlog = {
        title: 'testiblogi2',
        author: 'Emil Laitinen',
        url: 'http://localhost:3003/api/blogs',
    }
    const response = await api.post('/api/blogs')
    .send(newBlog)
  
    expect(response.body.likes).toBe(0)
  })  

  

afterAll(() => {
  mongoose.connection.close()
})