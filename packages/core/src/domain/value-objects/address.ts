import { ValueObject } from '../types/value-object'

interface IAddress {
  street: string
  number: string
  city: string
  state: string
  zipCode: string
}

export class Address extends ValueObject<IAddress> {
  private readonly _value: IAddress

  constructor(
    street: string,
    number: string,
    city: string,
    state: string,
    zipCode: string,
  ) {
    super({ street, number, city, state, zipCode })
    this._value = { street, number, city, state, zipCode }
  }

  static isValid(address: IAddress): boolean {
    if (!address) return false
    return true
  }

  public get street(): string {
    return this._value.street
  }

  public get number(): string {
    return this._value.number
  }

  public get city(): string {
    return this._value.city
  }

  public get state(): string {
    return this._value.state
  }

  public get zipCode(): string {
    return this._value.zipCode
  }
}
