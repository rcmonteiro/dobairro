export interface IMail {
  to: string
  subject: string
  html: string
}

export abstract class EmailService {
  abstract send(data: IMail): Promise<boolean>
}
