import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY

export const resend = resendApiKey ? new Resend(resendApiKey) : null

interface SendEmailOptions {
  to: string
  from?: string
  subject: string
  html: string
}

export async function sendEmail({ to, from, subject, html }: SendEmailOptions) {
  if (!resend) {
    console.warn('RESEND_API_KEY not set — email not sent in dev mode')
    return { success: true, message: 'Email skipped (no API key in dev)' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: from ?? 'Portfolio Contact <onboarding@resend.dev>',
      to,
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Email send failed:', err)
    return { success: false, error: 'Failed to send email' }
  }
}

export function buildContactEmailHtml(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Message</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f0f; color: #e5e5e5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: #1a1a2e; border-radius: 16px; overflow: hidden; border: 1px solid #2d2d5b; }
          .header { background: linear-gradient(135deg, #6d28d9, #0891b2); padding: 32px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .body { padding: 32px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8b8bbb; margin-bottom: 6px; }
          .value { font-size: 16px; color: #e5e5e5; padding: 12px 16px; background: #0f0f1a; border-radius: 8px; border: 1px solid #2d2d5b; }
          .message-value { white-space: pre-wrap; line-height: 1.6; }
          .footer { padding: 20px 32px; border-top: 1px solid #2d2d5b; text-align: center; color: #555; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 New Portfolio Contact</h1>
          </div>
          <div class="body">
            <div class="field">
              <div class="label">From</div>
              <div class="value">${data.name} &lt;${data.email}&gt;</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${data.subject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value message-value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            Sent via Avinash Ramdas Chavan's Portfolio
          </div>
        </div>
      </body>
    </html>
  `
}
