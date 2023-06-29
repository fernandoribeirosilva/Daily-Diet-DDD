import { Snack } from '../../enterprise/entities/snack'

export interface ISnackRepository {
  create(snack: Snack): Promise<void>
}
