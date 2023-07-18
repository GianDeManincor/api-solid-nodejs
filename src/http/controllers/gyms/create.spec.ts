import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to create gym', async () => {
    const { adminToken } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'JavaScript Gym',
        description: 'JavaScript Gym Description',
        phone: '',
        latitude: -20.8336121,
        longitude: -49.3944832,
      })

    expect(response.statusCode).toEqual(201)
  })
})
