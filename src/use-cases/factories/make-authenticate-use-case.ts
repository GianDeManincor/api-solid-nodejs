import { PrismaUsersRespository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUsersRespository()
  const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)

  return authenticateUseCase
}
