import 'server-only'

import crypto from 'crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextResponse } from 'next/server'

const SESSION_COOKIE = 'admin_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8

type SessionPayload = {
  iat: number
  exp: number
}

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error('AUTH_SECRET is not set')
  }
  return secret
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  if (leftBuffer.length !== rightBuffer.length) return false
  return crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

function sign(payload: string) {
  return crypto.createHmac('sha256', getAuthSecret()).update(payload).digest('base64url')
}

function encodeSession(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = sign(body)
  return `${body}.${signature}`
}

function decodeSession(value: string | undefined) {
  if (!value) return null
  const [body, signature] = value.split('.')
  if (!body || !signature) return null
  const expected = sign(body)
  if (!safeEqual(expected, signature)) return null
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null
  return payload
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  }
}

export function isPasswordValid(input: string) {
  const stored = process.env.ADMIN_PASSWORD
  if (!stored) return false
  return safeEqual(input, stored)
}

export function setSessionCookie(response: NextResponse) {
  const now = Math.floor(Date.now() / 1000)
  const payload: SessionPayload = {
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS,
  }
  response.cookies.set(SESSION_COOKIE, encodeSession(payload), cookieOptions())
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, '', { ...cookieOptions(), maxAge: 0 })
}

export async function getSession() {
  const store = await cookies()
  const value = store.get(SESSION_COOKIE)?.value
  return decodeSession(value)
}

export async function requireAdminSession() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return session
}
