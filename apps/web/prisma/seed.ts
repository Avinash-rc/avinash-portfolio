import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const projects = [
  {
    title: 'Smart Attendance Management System',
    description:
      'A Python-based attendance management system that automatically records student attendance, reducing manual effort and human error.',
    techStack: JSON.stringify(['Python', 'Anaconda', 'OpenCV', 'SQLite']),
    githubUrl: 'https://github.com/Avinash-rc',
    demoUrl: null,
    featured: true,
  },
  {
    title: 'Emotion Detection Chat Application',
    description:
      'An AI-powered chat application that detects and understands user emotions from text messages using Ollama and Python backend.',
    techStack: JSON.stringify(['JavaScript', 'Python', 'Ollama', 'AI/ML']),
    githubUrl: 'https://github.com/Avinash-rc',
    demoUrl: null,
    featured: true,
  },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing
  await prisma.project.deleteMany()

  // Insert projects
  for (const project of projects) {
    await prisma.project.create({ data: project })
  }

  console.log(`✅ Seeded ${projects.length} projects`)
  console.log('Done!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
