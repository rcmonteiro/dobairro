export class ResourceAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? 'Resource already exists.')
  }
}
