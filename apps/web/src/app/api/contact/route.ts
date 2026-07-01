import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { buildContactEmailHtml, sendEmail } from '@/lib/resend'
import { contactSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate with Zod
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data

    // Save to database
    const saved = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    })

    // Send email via Resend
    const html = buildContactEmailHtml({ name, email, subject, message })
    await sendEmail({
      to: process.env.NEXT_PUBLIC_OWNER_EMAIL ?? 'avinashrc2710@gmail.com',
      subject: `[Portfolio] ${subject} — from ${name}`,
      html,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        id: saved.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
