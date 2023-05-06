const express = require('express')
const {
  HttpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require('./launches.controller')

const launchRouter = express.Router()

launchRouter.get('/', HttpGetAllLaunches)
launchRouter.post('/', httpAddNewLaunch)
launchRouter.delete('/:id', httpAbortLaunch)

module.exports = launchRouter
