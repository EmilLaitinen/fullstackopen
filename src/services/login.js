import axios from 'axios'
const baseUrl = '/api/login'
const accountUrl = '/api/users'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const newUser = async newUser => {
    const response = await axios.post(accountUrl, newUser)
    return response.data
  }
export default { login, newUser }