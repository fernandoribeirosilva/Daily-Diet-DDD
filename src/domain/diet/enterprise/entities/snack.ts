import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface SnackProps {
  name: string
  description: string
  date: Date
  hours: string
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
    return this.props.hours
  }

  get insideTheDiet() {
    return this.props.insideTheDiet
  }

  get userId() {
    return this.props.userId
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
