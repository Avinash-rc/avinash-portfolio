'use server'

import { prisma } from '@/lib/prisma'
import { buildContactEmailHtml, sendEmail } from '@/lib/resend'
import { contactSchema } from '@/lib/validations'
import type { ContactFormState } from '@portfolio/types'

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  }

  const result = contactSchema.safeParse(raw)

  if (!result.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors as ContactFormState['errors'],
    }
  }

  const { name, email, subject, message } = result.data

  try {
    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    })

    const html = buildContactEmailHtml({ name, email, subject, message })
    await sendEmail({
      to: process.env.NEXT_PUBLIC_OWNER_EMAIL ?? 'avinashrc2710@gmail.com',
      subject: `[Portfolio] ${subject} — from ${name}`,
      html,
    })

    return { success: true, message: "Message sent! I'll get back to you soon." }
  } catch (err) {
    console.error('Contact form error:', err)
    return { success: false, message: 'Something went wrong. Please try again later.' }
  }
}
