import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from 'graphql-tag'
import { prisma } from '@/lib/prisma'
import { buildContactEmailHtml, sendEmail } from '@/lib/resend'
import { contactSchema } from '@/lib/validations'
import { PROJECTS } from '@/lib/data'
import type { NextRequest } from 'next/server'

const typeDefs = gql`
  type Project {
    id: String!
    title: String!
    description: String!
    techStack: [String!]!
    githubUrl: String
    demoUrl: String
    featured: Boolean
  }

  type ContactMessage {
    id: String!
    name: String!
    email: String!
    subject: String!
    message: String!
    createdAt: String!
  }

  type ContactResult {
    success: Boolean!
    message: String
    error: String
    id: String
  }

  type Query {
    projects: [Project!]!
    contactMessages: [ContactMessage!]!
  }

  type Mutation {
    sendContactMessage(
      name: String!
      email: String!
      subject: String!
      message: String!
    ): ContactResult!
  }
`

const resolvers = {
  Query: {
    projects: () => PROJECTS,
    contactMessages: async () => {
      return await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      })
    },
  },
  Mutation: {
    sendContactMessage: async (
      _: unknown,
      args: { name: string; email: string; subject: string; message: string }
    ) => {
      const result = contactSchema.safeParse(args)
      if (!result.success) {
        return {
          success: false,
          error: 'Validation failed: ' + JSON.stringify(result.error.flatten().fieldErrors),
        }
      }

      const { name, email, subject, message } = result.data

      const saved = await prisma.contactMessage.create({
        data: { name, email, subject, message },
      })

      const html = buildContactEmailHtml({ name, email, subject, message })
      await sendEmail({
        to: process.env.NEXT_PUBLIC_OWNER_EMAIL ?? 'avinashrc2710@gmail.com',
        subject: `[Portfolio] ${subject} — from ${name}`,
        html,
      })

      return { success: true, message: 'Message sent!', id: saved.id }
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
})

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
