import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Snack, SnackProps } from '@/domain/diet/enterprise/entities/snack'
import { ConvertHoursIntoMinutesAndConvertMinutesIntoHours } from '@/domain/diet/enterprise/entities/value-objects/convert-hours-into-minutes-and-convert-minutes-into-hours'
import { faker } from '@faker-js/faker'

export function makeSnack(
  override: Partial<SnackProps> = {},
  id?: UniqueEntityID,
) {
  const snack = Snack.create(
    {
      date: new Date(),
      description: faker.lorem.sentence(),
      hours:
        ConvertHoursIntoMinutesAndConvertMinutesIntoHours.convertHourStringToMinutes(
          '07:55',
        ),
      insideTheDiet: true,
      name: 'salada',
      userId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return snack
}
