import { ISnackRepository } from '@/domain/diet/application/repositories/ISnack-repository'
import { Snack } from '@/domain/diet/enterprise/entities/snack'

export class InMemorySnackRepository implements ISnackRepository {
  public items: Snack[] = []

  async create(snack: Snack) {
    this.items.push(snack)
  }
}
