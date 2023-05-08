/* eslint-disable no-undef */
// const { describe, test, expect } = require('jest')
const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
  test('It should responde with 200 success', async () => {
    await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})

describe('Test POST /launches', () => {
  const completedLauchData = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186 f',
    launchDate: 'January 4, 2028',
  }

  const launchDataWithOutDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186 f',
  }

  const launchDataWithInvalidDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186 f',
    launchDate: 'invalid date',
  }

  test('It should responde with 201 created', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completedLauchData)
      .expect('Content-Type', /json/)
      .expect(201)

    const requestDate = new Date(completedLauchData.launchDate).valueOf()
    const responseDate = new Date(response.body.launchDate).valueOf()

    expect(requestDate).toBe(responseDate)

    expect(response.body).toMatchObject(launchDataWithOutDate)
  })

  test('It should catch missing required properties', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithOutDate)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property',
    })
  })

  test('It should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date',
    })
  })
})
