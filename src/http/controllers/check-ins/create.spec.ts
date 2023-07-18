import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Check IN (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to create check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const { adminToken } = await createAndAuthenticateUser(app, true)

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

    const searchGymResponse = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'JavaScript',
      })
      .send()

    const { gyms } = searchGymResponse.body

    const createCheckInResponse = await request(app.server)
      .post(`/gyms/${gyms[0].id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -20.8336121,
        longitude: -49.3944832,
      })

    expect(createCheckInResponse.statusCode).toEqual(201)
  })
})
