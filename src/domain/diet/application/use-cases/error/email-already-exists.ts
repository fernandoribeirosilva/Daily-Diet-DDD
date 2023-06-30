import { UseCaseError } from '@/core/error/use-case-error'

export class EmailAlreadyExists extends Error implements UseCaseError {
  constructor() {
    super('Email already exists.')
  }
}
