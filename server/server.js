import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import {
  getClientById,
  searchClientByEmail,
  searchClientByFirstName,
  searchClientByLastName,
} from './controllers/clientController.js'

const app = express()

app.use(express.json())
const __dirname = path.resolve()

const LOCALHOST_API = 'http://localhost:3000'
const HEROKU_API = 'https://klippa--tech-calculation-game.herokuapp.com'

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', LOCALHOST_API)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  next()
})

dotenv.config()

const PORT = process.env.PORT || 8000

app.get('/single/:id', getClientById)
app.get('/search/first_name', searchClientByFirstName)
app.get('/search/email', searchClientByEmail)
app.get('/search/last_name', searchClientByLastName)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('*', (req, res) => {
    res.send('API is running...')
  })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
