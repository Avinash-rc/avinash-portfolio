import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://avinash-chavan.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Avinash Ramdas Chavan — Fullstack Developer',
    template: '%s | Avinash Ramdas Chavan',
  },
  description:
    'Portfolio of Avinash Ramdas Chavan, a Fullstack Developer skilled in Next.js, Node.js, TypeScript, Prisma, GraphQL, Shopify, and AWS.',
  keywords: [
    'Avinash Ramdas Chavan',
    'Fullstack Developer',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Prisma',
    'GraphQL',
    'Shopify',
    'AWS',
    'Python',
    'React',
    'Portfolio',
  ],
  authors: [{ name: 'Avinash Ramdas Chavan', url: siteUrl }],
  creator: 'Avinash Ramdas Chavan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Avinash Ramdas Chavan — Portfolio',
    title: 'Avinash Ramdas Chavan — Fullstack Developer',
    description:
      'Portfolio of Avinash Ramdas Chavan, a Fullstack Developer skilled in Next.js, Node.js, TypeScript, Prisma, GraphQL, Shopify, and AWS.',
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Avinash Ramdas Chavan — Fullstack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avinash Ramdas Chavan — Fullstack Developer',
    description:
      'Portfolio of Avinash Ramdas Chavan, a Fullstack Developer skilled in Next.js, Node.js, TypeScript, and AWS.',
    creator: '@AvinashCha18763',
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// JSON-LD Person Schema
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Avinash Ramdas Chavan',
  url: siteUrl,
  email: 'avinashrc2710@gmail.com',
  jobTitle: 'Fullstack Developer',
  knowsAbout: ['Next.js', 'Node.js', 'TypeScript', 'Python', 'GraphQL', 'AWS', 'Prisma'],
  sameAs: [
    'https://github.com/Avinash-rc',
    'https://www.linkedin.com/in/avinash-chavan25/',
    'https://x.com/AvinashCha18763',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'hsl(224 71% 6%)',
                border: '1px solid hsl(216 34% 17%)',
                color: 'hsl(213 31% 91%)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
