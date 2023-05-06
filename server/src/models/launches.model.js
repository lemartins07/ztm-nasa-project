const launches = new Map()

let lastFlightNumber = 100

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch)

function getAllLauches() {
  return Array.from(launches.values())
}

function launchExistsWithId(launchId) {
  return launches.has(launchId)
}

function addNewLaunch(launch) {
  lastFlightNumber++
  launches.set(
    lastFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ['ZTM', 'NASA'],
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
