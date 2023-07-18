import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to search gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const { adminToken } = await createAndAuthenticateUser(app, true)

    console.log(token)
    console.log(adminToken)

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

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'TypeScript Gym',
        description: 'JavaScript Gym Description',
        phone: '',
        latitude: -20.8336121,
        longitude: -49.3944832,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'JavaScript',
      })
      .send()

    const { gyms } = response.body

    expect(response.statusCode).toEqual(200)
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
