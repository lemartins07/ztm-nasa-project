const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const launches = new Map()

let lastFlightNumber = 100

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

saveLaunch(launch)

launches.set(launch.flightNumber, launch)

async function getAllLauches() {
  // return Array.from(launches.values())
  return await launchesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    },
  )
}

function launchExistsWithId(launchId) {
  return launches.has(launchId)
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target })

  if (!planet) {
    throw new Error('No matching planet found.')
  }

  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    },
  )
}

function addNewLaunch(launch) {
  lastFlightNumber++
  launches.set(
    lastFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['ZTM', 'NASA'],
      flightNumber: lastFlightNumber,
    }),
  )
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId)

  aborted.upcoming = false
  aborted.success = false
  return aborted
}

module.exports = {
  getAllLauches,
  addNewLaunch,
  launchExistsWithId,
  abortLaunchById,
}
