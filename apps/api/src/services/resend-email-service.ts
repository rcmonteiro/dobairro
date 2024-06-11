import type { EmailService, IMail } from '@dobairro/core'
import { Resend } from 'resend'

import { env } from '@/env'

export class ResendEmailService implements EmailService {
  public async send(data: IMail): Promise<boolean> {
    const resend = new Resend(env.RESEND_API_KEY)

    const { data: emailResponse, error } = await resend.emails.send({
      from: 'Do Bairro <onboarding@resend.dev>',
      to: 'rcmonteiro@gmail.com',
      subject: data.subject,
      html: data.html,
    })

    if (error) {
      console.error('❌ Error sending email', error)
      return false
    }

    console.log('✅ Email sent', emailResponse)

    return true
  }
}
