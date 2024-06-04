import { z } from 'zod'

export abstract class TextValidator {
  public static isUrl(text: string): boolean {
    const isValid = z.string().url().safeParse(text)
    return isValid.success
  }

  public static isEmail(text: string): boolean {
    const isValid = z.string().email().safeParse(text)
    return isValid.success
  }
}
