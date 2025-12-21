import { NextRequest, NextResponse } from 'next/server'

import { isPasswordValid, setSessionCookie } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const password = String(formData.get('password') ?? '')

  if (!isPasswordValid(password)) {
    const url = new URL('/login', request.url)
    url.searchParams.set('error', '1')
    return NextResponse.redirect(url)
  }

  const response = NextResponse.redirect(new URL('/admin', request.url))
  setSessionCookie(response)
  return response
}
