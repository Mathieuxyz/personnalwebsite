'use server'

import { db } from '@/db'
import { tasksTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getTasks() {
  return await db.select().from(tasksTable)
}

export async function addTask(form: FormData) {
  await db.insert(tasksTable).values({
    title: String(form.get('title')),
    done: false,
  })
  redirect((await headers()).get('referer') ?? '/')
}

export async function editTask(form: FormData) {
  await db
    .update(tasksTable)
    .set({
      title: String(form.get('title')),
      done: form.get('done') === 'on',
    })
    .where(eq(tasksTable.id, String(form.get('id'))))
  redirect((await headers()).get('referer') ?? '/')
}

export async function removeTask(id: string) {
  await db.delete(tasksTable).where(eq(tasksTable.id, id))
  redirect((await headers()).get('referer') ?? '/')
}