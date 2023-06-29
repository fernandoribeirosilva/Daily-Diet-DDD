import { User } from '../../enterprise/entities/user'

export interface IUserRepository {
  create(user: User): Promise<void>
}
