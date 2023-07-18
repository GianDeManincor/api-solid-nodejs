import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCases } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCases

describe('Fetch NearBy Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCases(gymsRepository)
  })

  it('should be able to to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'Description test',
      phone: 'test',
      latitude: -20.8412873,
      longitude: -49.3856879,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'Description test',
      phone: 'test',
      latitude: -20.7988638,
      longitude: -49.2359297,
    })

    const { gyms } = await sut.execute({
      userLatitude: -20.8412873,
      userLongitude: -49.3856879,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
