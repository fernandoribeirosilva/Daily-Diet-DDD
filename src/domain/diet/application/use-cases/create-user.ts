import { Either, left, right } from '@/core/either'
import { hash } from 'bcrypt'
import { User } from '../../enterprise/entities/user'
import { IUserRepository } from '../repositories/IUser-repository'
import { EmailAlreadyExists } from './error/email-already-exists'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  EmailAlreadyExists,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const existEmail = await this.userRepository.findByEmail(email)
    if (existEmail) {
      return left(new EmailAlreadyExists())
    }

    const user = User.create({
      email,
      name,
      password: passwordHash,
    })

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
