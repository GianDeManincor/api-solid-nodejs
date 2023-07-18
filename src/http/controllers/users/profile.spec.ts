import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get User Profile (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const profile = await await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profile.statusCode).toEqual(200)
    expect(profile.body.user).toEqual(
      expect.objectContaining({
        email: 'jhondoe@example.com',
      }),
    )
  })
})
