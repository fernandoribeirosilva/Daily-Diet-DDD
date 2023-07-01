import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ConvertHoursIntoMinutesAndConvertMinutesIntoHours } from './value-objects/convert-hours-into-minutes-and-convert-minutes-into-hours'

export interface SnackProps {
  name: string
  description: string
  date: Date
  hours: ConvertHoursIntoMinutesAndConvertMinutesIntoHours
  insideTheDiet: boolean
  userId: UniqueEntityID
}

export class Snack extends Entity<SnackProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get date() {
    return this.props.date
  }

  get hours() {
    return this.props.hours.value
  }

  get insideTheDiet() {
    return this.props.insideTheDiet
  }

  get userId() {
    return this.props.userId
  }

  set name(value: string) {
    this.props.name = value
  }

  set description(value: string) {
    this.props.description = value
  }

  set date(value: Date) {
    this.props.date = value
  }

  set hours(value: string) {
    this.props.hours =
      ConvertHoursIntoMinutesAndConvertMinutesIntoHours.convertHourStringToMinutes(
        value,
      )
  }

  set insideTheDiet(value: boolean) {
    this.props.insideTheDiet = value
  }

  static create(props: SnackProps, id?: UniqueEntityID) {
    const snack = new Snack(
      {
        ...props,
      },
      id,
    )

    return snack
  }
}
