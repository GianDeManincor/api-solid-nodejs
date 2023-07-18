import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCases } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const searchGymsUseCases = new SearchGymsUseCases(prismaGymsRepository)

  return searchGymsUseCases
}
