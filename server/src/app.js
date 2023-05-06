const express = require('express')
const path = require('node:path')
const cors = require('cors')
const morgan = require('morgan')

const planetsRouter = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)

app.use(morgan('combined'))

const clientPath = path.join(__dirname, '..', 'public')

app.use(express.json())
app.use(express.static(clientPath))

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html')
  res.sendFile(indexPath)
})

app.use('/planets', planetsRouter)
app.use('/launches', launchesRouter)

module.exports = app
