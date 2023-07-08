import { Either, right } from '@/core/either'
import dayjs from 'dayjs'
import { Snack } from '../../enterprise/entities/snack'
import { ISnackRepository } from '../repositories/ISnack-repository'

interface FetchSnackUseCaseRequest {
  userId: string
}

type FetchSnackUseCaseResponse = Either<
  null,
  {
    snack: Snack[]
    percentageInsideInTheDiet: string
    offTheDiet: number
    insideTheDiet: number
    bestSequenceOfDishesWithinTheDiet: number
  }
>

export class FetchSnackUseCase {
  constructor(private snackRepository: ISnackRepository) {}

  async execute({
    userId,
  }: FetchSnackUseCaseRequest): Promise<FetchSnackUseCaseResponse> {
    const snack = await this.snackRepository.findManySnackByIdFromUser(userId)

    const insideTheDiet = snack.reduce((acc, currentItem) => {
      return currentItem.insideTheDiet === true ? acc + 1 : acc
    }, 0)

    const offTheDiet = snack.reduce((acc, currentItem) => {
      return currentItem.insideTheDiet === false ? acc + 1 : acc
    }, 0)

    const totalSnack = snack.reduce((acc) => {
      return acc + 1
    }, 0)

    const bestSequenceOfDishesWithinTheDiet = snack.reduce(
      (acc, currentItem) => {
        const diffDays = dayjs(new Date()).diff(currentItem.date, 'day')

        if (currentItem.insideTheDiet && diffDays <= 7) {
          return acc + 1
        }
        return acc
      },
      0,
    )

    const percentageInsideInTheDiet = (
      (insideTheDiet * 100) /
      totalSnack
    ).toFixed(2)

    // const diasNoMesAtual = dayjs(new Date('2023-2-1')).daysInMonth()
    // console.log(diasNoMesAtual)

    return right({
      snack,
      insideTheDiet,
      percentageInsideInTheDiet,
      bestSequenceOfDishesWithinTheDiet,
      offTheDiet,
    })
  }
}
