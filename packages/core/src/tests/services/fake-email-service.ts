import type { EmailService, IMail } from '@/application/services/email-service'

export class FakeEmailService implements EmailService {
  public async send(data: IMail): Promise<boolean> {
    if (data.to.indexOf('@') > -1) {
      return true
    }
    return false
  }
}
