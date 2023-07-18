import { PrismaUsersRespository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUsersRespository()
  const getUserProfileUseCase = new GetUserProfileUseCase(prismaUserRepository)

  return getUserProfileUseCase
}
