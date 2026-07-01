import { NextResponse } from 'next/server'
import { PROJECTS } from '@/lib/data'

export async function GET() {
  try {
    // Return static project data (seeded from data.ts)
    return NextResponse.json(
      {
        success: true,
        data: PROJECTS,
        count: PROJECTS.length,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('Projects API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
