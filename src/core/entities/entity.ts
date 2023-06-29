import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<props> {
  private _id: UniqueEntityID
  protected props: props

  get id() {
    return this._id
  }

  public constructor(props: props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }
}
