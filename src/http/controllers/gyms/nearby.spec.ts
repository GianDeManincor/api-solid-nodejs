import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to featch nearby gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const { adminToken } = await createAndAuthenticateUser(app, true)

    await await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Near Gym',
        description: 'Description test',
        phone: 'test',
        latitude: -20.8412873,
        longitude: -49.3856879,
      })

    await await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Gym',
        description: 'Description test',
        phone: 'test',
        latitude: -20.7988638,
        longitude: -49.2359297,
      })

    const response = await await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -20.8412873,
        longitude: -49.3856879,
      })
      .send()

    const { gyms } = response.body

    expect(response.statusCode).toEqual(200)
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
