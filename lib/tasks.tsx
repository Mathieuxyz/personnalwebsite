'use server'

import { db } from '@/db'
import { blogArticles, cvSectionItems } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

const optionalText = (value: FormDataEntryValue | null) => {
  const stringValue = value?.toString().trim()
  return stringValue && stringValue.length > 0 ? stringValue : null
}

const requireText = (value: FormDataEntryValue | null, field: string) => {
  const stringValue = value?.toString().trim()
  if (!stringValue) {
    throw new Error(`Missing ${field}`)
  }
  return stringValue
}

const normalizeDateInput = (value: FormDataEntryValue | null) => {
  const raw = value?.toString()
  if (!raw) {
    return new Date().toISOString()
  }
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Invalid date')
  }
  return parsed.toISOString()
}

const revalidateContent = () => {
  revalidatePath('/admin')
  revalidatePath('/cv')
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function createCvSectionItem(formData: FormData) {
  const sectionId = requireText(formData.get('sectionId'), 'sectionId')
  await db.insert(cvSectionItems).values({
    sectionId,
    headline: requireText(formData.get('headline'), 'headline'),
    subline: optionalText(formData.get('subline')),
    description: optionalText(formData.get('description')),
  })
  revalidateContent()
}

export async function updateCvSectionItem(formData: FormData) {
  const id = requireText(formData.get('id'), 'id')
  const sectionId = requireText(formData.get('sectionId'), 'sectionId')
  await db
    .update(cvSectionItems)
    .set({
      sectionId,
      headline: requireText(formData.get('headline'), 'headline'),
      subline: optionalText(formData.get('subline')),
      description: optionalText(formData.get('description')),
    })
    .where(eq(cvSectionItems.id, id))
  revalidateContent()
}

export async function deleteCvSectionItem(formData: FormData) {
  const id = requireText(formData.get('id'), 'id')
  await db.delete(cvSectionItems).where(eq(cvSectionItems.id, id))
  revalidateContent()
}

export async function createBlogArticle(formData: FormData) {
  await db.insert(blogArticles).values({
    title: requireText(formData.get('title'), 'title'),
    excerpt: requireText(formData.get('excerpt'), 'excerpt'),
    image: requireText(formData.get('image'), 'image'),
    publishedAt: normalizeDateInput(formData.get('publishedAt')),
    slug: requireText(formData.get('slug'), 'slug'),
    content: requireText(formData.get('content'), 'content'),
    featured: formData.get('featured') === 'on',
  })
  revalidateContent()
}

export async function updateBlogArticle(formData: FormData) {
  const id = requireText(formData.get('id'), 'id')
  await db
    .update(blogArticles)
    .set({
      title: requireText(formData.get('title'), 'title'),
      excerpt: requireText(formData.get('excerpt'), 'excerpt'),
      image: requireText(formData.get('image'), 'image'),
      publishedAt: normalizeDateInput(formData.get('publishedAt')),
      slug: requireText(formData.get('slug'), 'slug'),
      content: requireText(formData.get('content'), 'content'),
      featured: formData.get('featured') === 'on',
    })
    .where(eq(blogArticles.id, id))
  revalidateContent()
}

export async function deleteBlogArticle(formData: FormData) {
  const id = requireText(formData.get('id'), 'id')
  await db.delete(blogArticles).where(eq(blogArticles.id, id))
  revalidateContent()
}
