import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Snack } from '../../enterprise/entities/snack'
import { ConvertHoursIntoMinutesAndConvertMinutesIntoHours } from '../../enterprise/entities/value-objects/turning-hours-into-minutes-and-turning-minutes-into-hours'
import { ISnackRepository } from '../repositories/ISnack-repository'

interface CreateSnackUseCaseRequest {
  name: string
  description: string
  date: Date
  hours: string
  insideTheDiet: boolean
  userId: string
}

type CreateSnackUseCaseResponse = Either<
  null,
  {
    snack: Snack
  }
>

export class CreateSnackUseCase {
  constructor(private snackRepository: ISnackRepository) {}

  async execute({
    name,
    date,
    description,
    hours,
    insideTheDiet,
    userId,
  }: CreateSnackUseCaseRequest): Promise<CreateSnackUseCaseResponse> {
    const snack = Snack.create({
      date,
      description,
      hours: new ConvertHoursIntoMinutesAndConvertMinutesIntoHours(hours),
      insideTheDiet,
      name,
      userId: new UniqueEntityID(userId),
    })

    await this.snackRepository.create(snack)

    return right({
      snack,
    })
  }
}
