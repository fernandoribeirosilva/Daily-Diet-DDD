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
      hours: new ConvertHoursIntoMinutesAndConvertMinutesIntoHours('07:55'),
      insideTheDiet: false,
      name: 'John Doe',
      userId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return snack
}
