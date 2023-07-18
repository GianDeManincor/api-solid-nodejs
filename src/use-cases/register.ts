import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UsersAlreadyExistsError } from './errors/users-already-exists-error'

// SOLID

// D - Dependency Inversion Principle:
// Permite que a responsabilidade e gerenciamento da dependencia seja de quem está chamando o serviço.
// Desta forma, recebemos a dependencia via construtor deixando de instanciar ela dentro da classe.

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCases {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UsersAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return {
      user,
    }
  }
}
