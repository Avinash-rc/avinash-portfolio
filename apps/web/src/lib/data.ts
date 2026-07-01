import type {
  Project,
  EducationEntry,
  SkillCategory,
  TechIcon,
  Strength,
  SocialLink,
  NavItem,
  OwnerInfo,
} from '@portfolio/types'

// ─────────────────────────────────────────────────────────────
// OWNER
// ─────────────────────────────────────────────────────────────
export const OWNER: OwnerInfo = {
  name: 'Avinash Ramdas Chavan',
  designation: 'Fullstack Developer',
  email: 'avinashrc2710@gmail.com',
  phone: '+91 7620713485',
  location: 'India',
  bio: 'Entry-level Software Engineer with a solid foundation in Python, JavaScript, SQL, and cloud tools. Experienced in building web applications, backend APIs, automation scripts, and AI-powered tools. Strong focus on understanding requirements, planning solutions, and delivering quality work.',
  github: 'https://github.com/Avinash-rc',
  linkedin: 'https://www.linkedin.com/in/avinash-chavan25/',
  twitter: 'https://x.com/AvinashCha18763',
}

// ─────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

// ─────────────────────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/Avinash-rc', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/avinash-chavan25/', icon: 'linkedin' },
  { label: 'Twitter', href: 'https://x.com/AvinashCha18763', icon: 'twitter' },
  { label: 'Email', href: 'mailto:avinashrc2710@gmail.com', icon: 'mail' },
]

// ─────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Smart Attendance Management System',
    description:
      'A Python-based attendance management system that automatically records student attendance, reducing manual effort and human error. Maintains accurate records and improves reliability over manual methods.',
    techStack: ['Python', 'Anaconda', 'OpenCV', 'SQLite'],
    githubUrl: 'https://github.com/Avinash-rc',
    demoUrl: '',
    featured: true,
  },
  {
    id: '2',
    title: 'Emotion Detection Chat Application',
    description:
      'An AI-powered chat application that detects and understands user emotions from text messages. Backend logic in Python processes inputs and identifies emotional tone for smooth, responsive communication.',
    techStack: ['JavaScript', 'Python', 'Ollama', 'AI/ML'],
    githubUrl: 'https://github.com/Avinash-rc',
    demoUrl: '',
    featured: true,
  },
]

// ─────────────────────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────────────────────
export const EDUCATION: EducationEntry[] = [
  {
    id: '1',
    degree: 'MCA (Master of Computer Applications)',
    institution: 'Department Of Management Science (UDMS), Dr. Babasaheb Ambedkar Marathwada University',
    period: '2024 – 2026',
    status: 'Currently Appearing',
    icon: 'graduation',
    side: 'right',
  },
  {
    id: '2',
    degree: 'BSc Computer Science',
    institution:
      'Vivekanand Institute of Advanced Studies In Management Science and Communication',
    period: '2021 – 2024',
    grade: '74.87%',
    icon: 'graduation',
    side: 'left',
  },
  {
    id: '3',
    degree: 'HSC (12th Standard)',
    institution: 'Vivekanand Arts, Sardar Dalipsingh Commerce and Science College',
    period: '2019 – 2021',
    grade: '87%',
    icon: 'school',
    side: 'right',
  },
  {
    id: '4',
    degree: 'SSC (10th Standard)',
    institution: 'Bal DnyanMandir Primary School',
    period: '2019',
    grade: '60%',
    icon: 'school',
    side: 'left',
  },
]

// ─────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'JavaScript' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    color: 'from-violet-500 to-purple-600',
    skills: [
      { name: 'Python' },
      { name: 'Node.js' },
      { name: 'GraphQL' },
      { name: 'API Integration' },
      { name: 'REST APIs' },
    ],
  },
  {
    category: 'Database',
    icon: '🗄️',
    color: 'from-cyan-500 to-blue-500',
    skills: [{ name: 'MySQL' }, { name: 'Prisma ORM' }, { name: 'SQLite' }],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    color: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'AWS EC2' },
      { name: 'AWS S3' },
      { name: 'AWS IAM' },
      { name: 'Docker' },
      { name: 'Linux' },
      { name: 'CI/CD' },
      { name: 'Terraform' },
    ],
  },
  {
    category: 'Tools',
    icon: '🛠️',
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Postman' },
      { name: 'Ollama' },
      { name: 'Anaconda' },
      { name: 'Shopify' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// TECH ICONS (About section animated grid)
// ─────────────────────────────────────────────────────────────
export const TECH_ICONS: TechIcon[] = [
  { name: 'Node.js', icon: 'nodejs', color: '#339933' },
  { name: 'Next.js', icon: 'nextjs', color: '#ffffff' },
  { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
  { name: 'Prisma', icon: 'prisma', color: '#2D3748' },
  { name: 'Shopify', icon: 'shopify', color: '#96BF48' },
  { name: 'GraphQL', icon: 'graphql', color: '#E10098' },
  { name: 'Postman', icon: 'postman', color: '#FF6C37' },
  { name: 'Git', icon: 'git', color: '#F05032' },
  { name: 'GitHub', icon: 'github', color: '#ffffff' },
  { name: 'Python', icon: 'python', color: '#3776AB' },
  { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
  { name: 'HTML5', icon: 'html5', color: '#E34F26' },
  { name: 'CSS3', icon: 'css3', color: '#1572B6' },
  { name: 'MySQL', icon: 'mysql', color: '#4479A1' },
  { name: 'AWS', icon: 'amazonwebservices', color: '#FF9900' },
  { name: 'Docker', icon: 'docker', color: '#2496ED' },
  { name: 'Linux', icon: 'linux', color: '#FCC624' },
  { name: 'CI/CD', icon: 'github', color: '#6e40c9' },
]

// ─────────────────────────────────────────────────────────────
// STRENGTHS
// ─────────────────────────────────────────────────────────────
export const STRENGTHS: Strength[] = [
  {
    title: 'Logical & Analytical',
    description: 'Strong logical and analytical skills to break down complex problems into elegant solutions.',
    icon: '🧠',
  },
  {
    title: 'Quick Learner',
    description: 'Adapts quickly to new technologies, environments, and team dynamics with minimal ramp-up time.',
    icon: '⚡',
  },
  {
    title: 'Full Ownership',
    description: 'Takes complete ownership of tasks and responsibilities from ideation to delivery.',
    icon: '🎯',
  },
  {
    title: 'Team Collaborator',
    description: 'Effective collaborator in both technical and non-technical teams, bridging gaps with clear communication.',
    icon: '🤝',
  },
]
