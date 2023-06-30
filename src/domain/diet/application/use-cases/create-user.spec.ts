import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'
import { EmailAlreadyExists } from './error/email-already-exists'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new CreateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to create a new user', async () => {
    const result = await sut.execute({
      name: 'john Doe',
      email: 'john@example.com',
      password: '123',
    })

    expect(result.isRight()).toBeTruthy()
  })

  it('should be able to verify email already exists', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'john Doe',
      email,
      password: '123',
    })

    const result = await sut.execute({
      name: 'john Doe',
      email,
      password: '123',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(EmailAlreadyExists)
  })
})
