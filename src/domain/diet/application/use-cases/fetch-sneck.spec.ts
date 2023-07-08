import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeSnack } from 'test/factories/make-snack'
import { InMemorySnackRepository } from 'test/repositories/in-memory-snack-repository'
import { FetchSnackUseCase } from './fetch-sneck'

let inMemorySnackRepository: InMemorySnackRepository
let sut: FetchSnackUseCase

describe('Fetch Snack', () => {
  beforeEach(() => {
    inMemorySnackRepository = new InMemorySnackRepository()

    sut = new FetchSnackUseCase(inMemorySnackRepository)
  })

  it('should be able to fetch snack', async () => {
    await inMemorySnackRepository.create(
      makeSnack(
        {
          userId: new UniqueEntityID('user-1'),
          date: new Date('2023-06-29'),
        },
        new UniqueEntityID('snack-1'),
      ),
    )

    await inMemorySnackRepository.create(
      makeSnack(
        {
          userId: new UniqueEntityID('user-1'),
          date: new Date('2023-06-30'),
          insideTheDiet: false,
        },
        new UniqueEntityID('snack-1'),
      ),
    )

    await inMemorySnackRepository.create(
      makeSnack(
        {
          userId: new UniqueEntityID('user-1'),
          date: new Date('2023-07-01'),
        },
        new UniqueEntityID('snack-1'),
      ),
    )

    await inMemorySnackRepository.create(
      makeSnack(
        {
          userId: new UniqueEntityID('user-1'),
          date: new Date('2023-07-03'),
        },
        new UniqueEntityID('snack-1'),
      ),
    )

    await inMemorySnackRepository.create(
      makeSnack(
        {
          userId: new UniqueEntityID('user-1'),
          date: new Date('2023-07-06'),
        },
        new UniqueEntityID('snack-1'),
      ),
    )

    await inMemorySnackRepository.create(
      makeSnack(
        {
          userId: new UniqueEntityID('user-1'),
          date: new Date('2023-07-07'),
        },
        new UniqueEntityID('snack-1'),
      ),
    )

    await inMemorySnackRepository.create(
      makeSnack(
        {
          userId: new UniqueEntityID('user-1'),
          date: new Date('2023-07-08'),
        },
        new UniqueEntityID('snack-1'),
      ),
    )

    const result = await sut.execute({
      userId: 'user-1',
    })

    expect(result.value?.snack).toHaveLength(7)
  })
})
