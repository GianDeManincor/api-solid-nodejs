import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('History Check In (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to list the history of check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const { adminToken } = await createAndAuthenticateUser(app, true)

    // create gym
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'JavaScript Gym',
        description: 'JavaScript Gym Description',
        phone: '',
        latitude: -20.8336121,
        longitude: -49.3944832,
      })

    // search created gym
    const searchGymResponse = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'JavaScript',
      })
      .send()

    const { gyms } = searchGymResponse.body

    // execute check-in
    await request(app.server)
      .post(`/gyms/${gyms[0].id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -20.8336121,
        longitude: -49.3944832,
      })

    // fetch history gym
    const historyCheckInsResponse = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .query({
        page: 1,
      })
      .send()

    const { checkIns } = historyCheckInsResponse.body

    expect(historyCheckInsResponse.statusCode).toEqual(200)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: gyms[0].id,
      }),
    ])
  })
})
