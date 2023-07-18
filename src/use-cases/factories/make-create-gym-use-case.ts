import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCases } from '../create-gym'

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const createGymUseCases = new CreateGymUseCases(prismaGymsRepository)

  return createGymUseCases
}
