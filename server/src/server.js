const http = require('node:http')
const app = require('./app')
const moongose = require('mongoose')
const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000

const MONGO_URL =
  'mongodb+srv://lemartins07:tJbSt5wENMz2vnrG@nasa-project.dncamen.mongodb.net/?retryWrites=true&w=majority'

const server = http.createServer(app)

moongose.connection.once('open', () => {
  console.log('MongoDB connections is open!')
})

moongose.connection.on('error', (err) => {
  console.error(err)
})

async function startServer() {
  await moongose.connect(MONGO_URL)

  await loadPlanetsData()

  server.listen(PORT, () => {
    console.log(`🚀 Listening on port ${PORT}...`)
  })
}

startServer()
