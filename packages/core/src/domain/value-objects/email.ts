import { TextValidator } from '@/utils/text-validator'

import { ValueObject } from '../types/value-object'

export class Email extends ValueObject<string> {
  private readonly _value: string

  constructor(value: string) {
    super(value)
    if (!Email.isValid(value)) {
      throw new Error('Invalid E-mail')
    }
    this._value = value.trim().toLowerCase()
  }

  static isValid(email: string): boolean {
    return TextValidator.isEmail(email)
  }

  public get value(): string {
    return this._value
  }
}
