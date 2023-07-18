import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCases } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCases

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCases(gymsRepository)
  })

  it('should be able to search gym', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: 'Description test',
      phone: 'test',
      latitude: -20.8412873,
      longitude: -49.3856879,
    })

    await gymsRepository.create({
      title: 'Javascript Gym Unit 2',
      description: 'Description test',
      phone: 'test',
      latitude: -20.8412873,
      longitude: -49.3856879,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: 'Description test',
      phone: 'test',
      latitude: -20.8412873,
      longitude: -49.3856879,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' }),
      expect.objectContaining({ title: 'Javascript Gym Unit 2' }),
    ])
  })

  it('should be able to fetch pagineted gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Typescript Gym ${i}`,
        description: 'Description test',
        phone: 'test',
        latitude: -20.8412873,
        longitude: -49.3856879,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Typescript Gym 21' }),
      expect.objectContaining({ title: 'Typescript Gym 22' }),
    ])
  })
})
