import { Snack } from '../../enterprise/entities/snack'

export interface ISnackRepository {
  findById(id: string): Promise<Snack | null>
  save(snack: Snack): Promise<void>
  create(snack: Snack): Promise<void>
}
