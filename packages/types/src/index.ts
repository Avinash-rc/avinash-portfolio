// ============================================================
// Shared TypeScript interfaces for the Avinash Portfolio Monorepo
// ============================================================

// ---- Navigation ----
export interface NavItem {
  label: string
  href: string
  icon?: string
}

// ---- Projects ----
export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  featured?: boolean
  createdAt?: Date
}

// ---- Contact ----
export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormState {
  success: boolean
  message: string
  errors?: Partial<ContactFormData>
}

// ---- Education ----
export interface EducationEntry {
  id: string
  degree: string
  institution: string
  period: string
  grade?: string
  status?: string
  icon: 'graduation' | 'school'
  side: 'left' | 'right'
}

// ---- Skills ----
export interface SkillItem {
  name: string
  icon?: string
  level?: number // 0-100
}

export interface SkillCategory {
  category: string
  icon: string
  color: string
  skills: SkillItem[]
}

// ---- Tech Stack (animated icon cards in About) ----
export interface TechIcon {
  name: string
  icon: string // devicon class or SVG URL
  color?: string
}

// ---- Strength ----
export interface Strength {
  title: string
  description: string
  icon: string
}

// ---- Social Links ----
export interface SocialLink {
  label: string
  href: string
  icon: string
}

// ---- API Responses ----
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ---- Owner Info ----
export interface OwnerInfo {
  name: string
  designation: string
  email: string
  phone: string
  location: string
  bio: string
  github: string
  linkedin: string
  twitter: string
}
