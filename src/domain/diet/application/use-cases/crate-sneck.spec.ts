import { InMemorySnackRepository } from 'test/repositories/in-memory-snack-repository'
import { ConvertHoursIntoMinutesAndConvertMinutesIntoHours } from '../../enterprise/entities/value-objects/turning-hours-into-minutes-and-turning-minutes-into-hours'
import { CreateSnackUseCase } from './crate-sneck'

let inMemorySnackRepository: InMemorySnackRepository
let sut: CreateSnackUseCase

describe('Create Snack', () => {
  beforeEach(() => {
    inMemorySnackRepository = new InMemorySnackRepository()

    sut = new CreateSnackUseCase(inMemorySnackRepository)
  })

  it('should be able to create a new snack', async () => {
    const hours =
      ConvertHoursIntoMinutesAndConvertMinutesIntoHours.convertHourStringToMinutes(
        '15:30',
      )

    const result = await sut.execute({
      date: new Date(),
      description: 'Snack description',
      hours: hours.value,
      insideTheDiet: true,
      name: 'Salada',
      userId: '1',
    })

    expect(result.isRight()).toBeTruthy()
  })
})
