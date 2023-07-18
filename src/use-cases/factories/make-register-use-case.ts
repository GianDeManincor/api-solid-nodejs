import { PrismaUsersRespository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCases } from '../register'

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUsersRespository()
  const registerUseCases = new RegisterUseCases(prismaUserRepository)

  return registerUseCases
}
