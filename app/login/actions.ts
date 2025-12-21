'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { verifyPassword } from '@/lib/password'
import { makeSessionValue } from '@/lib/session'
import { findUser } from '@/lib/usersStore'

type LoginState = { error?: string }

export async function loginAction(formData: FormData): Promise<LoginState>
export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState>
export async function loginAction(
  arg1: LoginState | FormData,
  arg2?: FormData,
): Promise<LoginState> {
  const formData = arg2 ?? (arg1 as FormData)
  const login = String(formData.get('login') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/admin')

  if (!login || !password) {
    return { error: 'Invalid credentials' }
  }

  const user = await findUser(login)
  if (!user) {
    return { error: 'Invalid credentials' }
  }

  const isValid = await verifyPassword(password, user.passwordHash)
  if (!isValid) {
    return { error: 'Invalid credentials' }
  }

  const sessionValue = makeSessionValue(login)
  const cookieStore = await cookies()
  cookieStore.set('session', sessionValue, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  const nextPath = next.startsWith('/') ? next : '/admin'
  redirect(nextPath)
}
