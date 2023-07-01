import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeSnack } from 'test/factories/make-snack'
import { InMemorySnackRepository } from 'test/repositories/in-memory-snack-repository'
import { EditSnackUseCase } from './edit-sneck'
import { NotAllowedError } from './error/not-allowed-error'

let inMemorySnackRepository: InMemorySnackRepository
let sut: EditSnackUseCase

describe('Edit Snack', () => {
  beforeEach(() => {
    inMemorySnackRepository = new InMemorySnackRepository()

    sut = new EditSnackUseCase(inMemorySnackRepository)
  })

  it('should be able to edit a snack', async () => {
    const newSnack = makeSnack(
      {
        userId: new UniqueEntityID('user-1'),
      },
      new UniqueEntityID('snack-1'),
    )

    await inMemorySnackRepository.create(newSnack)

    await sut.execute({
      date: new Date(),
      description: 'salada deliciosa',
      hours: '08:02',
      insideTheDiet: true,
      name: 'John Doe',
      snackId: newSnack.id.toValue(),
      userId: newSnack.userId.toValue(),
    })

    expect(inMemorySnackRepository.items[0].insideTheDiet).toBeTruthy()
    expect(inMemorySnackRepository.items[0]).toMatchObject({
      description: 'salada deliciosa',
    })
    expect(inMemorySnackRepository.items[0]).toMatchObject({
      id: new UniqueEntityID('snack-1'),
      userId: new UniqueEntityID('user-1'),
    })
  })

  it('should to able to edit a snack from another snack', async () => {
    const newSnack = makeSnack(
      {
        userId: new UniqueEntityID('user-1'),
      },
      new UniqueEntityID('snack-1'),
    )

    await inMemorySnackRepository.create(newSnack)

    const result = await sut.execute({
      date: new Date(),
      description: 'salada deliciosa',
      hours: '08:02',
      insideTheDiet: true,
      name: 'John Doe',
      snackId: newSnack.id.toValue(),
      userId: 'user-2',
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
