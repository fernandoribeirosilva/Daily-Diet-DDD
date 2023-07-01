import { Either, left, right } from '@/core/either'
import { Snack } from '../../enterprise/entities/snack'
import { ISnackRepository } from '../repositories/ISnack-repository'
import { NotAllowedError } from './error/not-allowed-error'
import { ResourceNotFoundError } from './error/resource-not-found-error'

interface EditSnackUseCaseRequest {
  snackId: string
  name: string
  description: string
  date: Date
  hours: string
  insideTheDiet: boolean
  userId: string
}

type EditSnackUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    snack: Snack
  }
>

export class EditSnackUseCase {
  constructor(private snackRepository: ISnackRepository) {}

  async execute({
    snackId,
    name,
    date,
    description,
    hours,
    insideTheDiet,
    userId,
  }: EditSnackUseCaseRequest): Promise<EditSnackUseCaseResponse> {
    const snack = await this.snackRepository.findById(snackId)

    if (!snack) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== snack.userId.toString()) {
      return left(new NotAllowedError())
    }

    snack.name = name
    snack.date = date
    snack.description = description
    snack.hours = hours
    snack.insideTheDiet = insideTheDiet

    await this.snackRepository.save(snack)

    return right({
      snack,
    })
  }
}
