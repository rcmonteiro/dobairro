import { TextValidator } from '@dobairro/core'

import { ValueObject } from '@dobairro/core/src/domain/types/value-object'

export class Url extends ValueObject<string> {
  private _value: string

  constructor(value: string) {
    super(value)
    if (!Url.isValid(value)) {
      throw new Error('Invalid URL')
    }
    this._value = value
  }

  static isValid(url: string): boolean {
    return TextValidator.isUrl(url)
  }

  public get value(): string {
    return this._value
  }
}
