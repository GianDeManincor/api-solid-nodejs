import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCases } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymsUseCases = new FetchNearbyGymsUseCases(
    prismaGymsRepository,
  )

  return fetchNearbyGymsUseCases
}
