import React, {useState, useEffect} from 'react'
import loginService from './services/login' 
import blogsService from './services/blogs' 
import Blog from './components/Blog'  

const App = () => {
const [username, setUsername] = useState('') 
const [password, setPassword] = useState('')
const [newUsername, setNewUsername] = useState('') 
const [newPassword, setNewPassword] = useState('')
const [newName, setNewName] = useState('')
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [url, setUrl] = useState('')
const [errorMessage, setErrorMessage] = useState(null)
const [errorColor, setErrorColor] = useState('black')
const [user, setUser] = useState(null)
const [blogs, setBlogs] = useState([])
const [createVisible, setCreateVisible] = useState(false)
const [accountCreateVisible, setAccountCreateVisible] = useState(false)

useEffect(() => {
  blogsService
    .getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
}, [])

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogsService.setToken(user.token)
  }
}, [])

const handleLogin = async (event) => {
  console.log('1')
  event.preventDefault()
  try {
    if (accountCreateVisible === true) {
      return
    }
    if (username.length === 0 && password.length === 0) {
      return
    }
    else if (username.length < 4 ||password.length < 8) {
      setErrorMessage('Malformed credentials')
      setErrorColor('red')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorColor('black')
      }, 5000)
      return
    }
    const user = await loginService.login({username, password})
    console.log(user)
    setUser(user)
    blogsService.setToken(user.token)
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    ) 
    setUsername('')
    setPassword('')
    setErrorMessage('Successfully logged in')
    setErrorColor('green')
    setTimeout(() => {
    setErrorMessage(null)
    setErrorColor('black')
  }, 5000)
  } catch (exeption) {
    if (exeption)
    setErrorMessage('Invalid credentials')
    setErrorColor('red')
    setTimeout(() => {
      setErrorMessage(null)
      setErrorColor('black')
    }, 5000)
  }
}

const handleCreate = async (event) => {
  event.preventDefault()
  try {
    if (title === "" ||author === "" || url === "") {
      return
    }
    const newBlog = await blogsService.createBlog({title, author, url})
    setAuthor('')
    setTitle('')
    setUrl('')
    setBlogs(blogs.concat(newBlog))
    setErrorColor('green')
    setErrorMessage(`a new blog ${newBlog.title} added`)
    setTimeout(() => {
      setErrorMessage(null)
      setErrorColor('black')
    }, 5000)
  } catch (exeption) {
    setErrorMessage('error')
    setErrorColor('red')
    setTimeout(() => {
      setErrorMessage(null)
      setErrorColor('black')
    }, 5000)
  }
}

const handleAccountCreate = async (event) => {
  event.preventDefault()
  try {
    if (newPassword === "" ||newUsername === "") {
      return
    } if (newPassword.length < 8 || newUsername.length < 4) {
      setErrorColor('red')
      setErrorMessage(`Password and/or username under minimum lenght`)
      setTimeout(() => {
      setErrorMessage(null)
      setErrorColor('black')
    }, 5000)
      return
    }if(newName === "") {
      if (!window.confirm('Are you sure that you want to create an account without name?')) {
        return
      }
    } if (!window.confirm('Create account?')) {
      return
    }
    const newAccount = await loginService.newUser({newPassword, newUsername, newName})
    setNewUsername('')
    setNewPassword('')
    setNewName('')
    setErrorColor('green')
    setErrorMessage(`New account ${newAccount.username} created. You are now able to log in.`)
    setAccountCreateVisible(false)
    setTimeout(() => {
      setErrorMessage(null)
      setErrorColor('black')
    }, 5000)
  } catch (exeption) {
    setErrorMessage('Error while creating new account. Check console for more details.')
    setErrorColor('red')
    setTimeout(() => {
      setErrorMessage(null)
      setErrorColor('black')
    }, 5000)
  }
}

const messageStyle = {
  color: errorColor
}


const LoginForm = () => {
  const hideWhenVisible = { display: accountCreateVisible ? 'none' : '' }
  const showWhenVisible = { display: accountCreateVisible ? '' : 'none' }
  return (
    <div>
    <div style={hideWhenVisible}>
    <h1>Log in to app</h1>
    <form onSubmit={handleLogin}>
      <div style={messageStyle}>
        <h2><u>{errorMessage}</u></h2>
      </div>
      <div>
        Username<input type="text" value={username} onChange={({target}) => setUsername(target.value)}/> <br />
        Password <input type="password" value={password} onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button><button onClick={() => setAccountCreateVisible(true)}>new account</button>
    </form> 
    </div>
    <div style={showWhenVisible}>
    <h1>New account</h1>
    <h2 style={messageStyle}><u>{errorMessage}</u></h2>
    <form onSubmit={handleAccountCreate}>
      <div>
        Username <i>(Min lenght: 4) </i><input type="text" value={newUsername} onChange={({target}) => setNewUsername(target.value)}/> <br />
        Name <i>(Optional) </i> <input type="text" value={newName} onChange={({target}) => setNewName(target.value)}/> <br />
        Password <i>(Min lenght: 8) </i><input type="password" value={newPassword} onChange={({target}) => setNewPassword(target.value)}/>
      </div>
      <button type="submit">Create</button>
    </form>
    <button onClick={() => setAccountCreateVisible(false)}>cancel</button>
    </div> 
    </div> 
    )
}

const Blogs = () => {
  return (
    <div>
    <p>Logged in as {user.name} <button onClick={() =>{ if(window.confirm('Log out?')) {
      window.localStorage.clear() 
      setUser(null)
      setErrorMessage('Successfully logged out')
      setErrorColor('green')
      setTimeout(() => {
      setErrorMessage(null)
      setErrorColor('black')
    }, 5000)}}}>
    Logout</button> </p>
    <h1>Blogs</h1>
    <h2 style={messageStyle}><u>{errorMessage}</u></h2>
    <i>Click blog to see full information</i>
    {blogs.sort((a, b) => b.likes - a.likes).map(blog => Blog(blog={blog}))}
    </div> 
    )
}

const NewBlogForm = () => {
  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }
  return (
    <div>
    <div style={hideWhenVisible}>
      <br />
      <button onClick={() => setCreateVisible(true)}>New blog</button>
    </div>
    <div style={showWhenVisible}>
    <h1>New blog</h1>
    <form onSubmit={handleCreate}>
      <div>
        Title<input type="text" value={title} onChange={({target}) => setTitle(target.value)}/> <br />
        Author<input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/> <br />
        Url<input type="text" value={url} onChange={({target}) => setUrl(target.value)}/>
      </div>
      <button type="submit">Create</button>
    </form>
    <button onClick={() => setCreateVisible(false)}>cancel</button>
    </div> 
    </div>
    )
}

  return (
    <div>
      {user === null && LoginForm()}
      {user !== null && Blogs()}
      {user !== null && NewBlogForm()}
    </div>
  )
}

export default App;
