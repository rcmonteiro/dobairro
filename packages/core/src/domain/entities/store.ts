import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Theme } from './theme'

export interface IStore {
  title: string
  theme: Theme
}

export class Store extends Entity<IStore> {
  private constructor(state: IStore, id?: Id) {
    super(state, id)
  }

  public get title(): string {
    return this.state.title
  }

  public get theme(): Theme {
    return this.state.theme
  }

  public static create(state: IStore, id?: Id): Store {
    return new Store(state, id)
  }
}
