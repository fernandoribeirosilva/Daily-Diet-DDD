import { IUserRepository } from '@/domain/diet/application/repositories/IUser-repository'
import { User } from '@/domain/diet/enterprise/entities/user'

export class InMemoryUserRepository implements IUserRepository {
  public item: User[] = []

  async findByEmail(email: string) {
    const user = this.item.find((item) => item.email === email)
    if (!user) return null

    return user
  }

  async create(user: User) {
    this.item.push(user)
  }
}
