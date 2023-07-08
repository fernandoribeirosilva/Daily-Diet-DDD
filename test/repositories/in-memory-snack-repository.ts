import { ISnackRepository } from '@/domain/diet/application/repositories/ISnack-repository'
import { Snack } from '@/domain/diet/enterprise/entities/snack'

export class InMemorySnackRepository implements ISnackRepository {
  public items: Snack[] = []

  async findById(id: string) {
    const snack = this.items.find((item) => item.id.toString() === id)
    if (!snack) return null

    return snack
  }

  async findManySnackByIdFromUser(userId: string) {
    const snack = this.items.filter((item) => item.userId.toString() === userId)

    return snack
  }

  async save(snack: Snack) {
    const itemIndex = this.items.findIndex((item) => item.id === snack.id)

    this.items[itemIndex] = snack
  }

  async create(snack: Snack) {
    this.items.push(snack)
  }
}
