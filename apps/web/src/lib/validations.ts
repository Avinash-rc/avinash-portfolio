import { z } from 'zod'

// Contact form validation
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be under 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be under 5000 characters'),
})

export type ContactInput = z.infer<typeof contactSchema>

// Project validation (for API)
export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  techStack: z.array(z.string()).min(1),
  githubUrl: z.string().url().optional().or(z.literal('')),
  demoUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional().default(false),
})

export type ProjectInput = z.infer<typeof projectSchema>
