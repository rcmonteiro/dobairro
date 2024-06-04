import { Entity } from '../types/entity'
import type { Id } from '../types/id'

export interface ITheme {
  name: string
  colors: string[]
}

export class Theme extends Entity<ITheme> {
  private constructor(state: ITheme, id?: Id) {
    super(state, id)
  }

  public get name(): string {
    return this.state.name
  }

  public get colors(): string[] {
    return this.state.colors
  }

  public static create(state: ITheme, id?: Id): Theme {
    return new Theme(state, id)
  }
}
