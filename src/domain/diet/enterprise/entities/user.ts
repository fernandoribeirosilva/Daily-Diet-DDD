import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Photo } from './value-objects/Photo'

export interface UserProps {
  name: string
  email: string
  password: string
  photo: Photo
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get photo() {
    return this.props.photo
  }

  get password() {
    return this.props.password
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
      },
      id,
    )

    return user
  }
}
