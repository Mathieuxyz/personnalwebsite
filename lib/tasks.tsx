'use server'

import crypto from 'crypto'
import { revalidatePath } from 'next/cache'

import { readSiteData, writeSiteData } from '@/lib/data/store'

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
  const data = await readSiteData()
  const sectionId = requireText(formData.get('sectionId'), 'sectionId')
  const sections = data.curriculum_vitae?.sections ?? []
  const section = sections.find((entry) => entry.id === sectionId)
  if (!section) {
    throw new Error('Section not found')
  }
  const items = section.items ?? []
  items.push({
    id: crypto.randomUUID(),
    headline: requireText(formData.get('headline'), 'headline'),
    subline: optionalText(formData.get('subline')),
    description: optionalText(formData.get('description')),
  })
  section.items = items
  await writeSiteData(data)
  revalidateContent()
}

export async function updateCvSectionItem(formData: FormData) {
  const data = await readSiteData()
  const id = requireText(formData.get('id'), 'id')
  const sectionId = requireText(formData.get('sectionId'), 'sectionId')
  const sections = data.curriculum_vitae?.sections ?? []
  const targetSection = sections.find((entry) => entry.id === sectionId)
  if (!targetSection) {
    throw new Error('Section not found')
  }

  let currentSectionIndex = -1
  let currentItemIndex = -1
  sections.forEach((section, index) => {
    if (!section.items) return
    const itemIndex = section.items.findIndex((item) => item.id === id)
    if (itemIndex >= 0) {
      currentSectionIndex = index
      currentItemIndex = itemIndex
    }
  })

  if (currentSectionIndex < 0 || currentItemIndex < 0) {
    throw new Error('Item not found')
  }

  const currentSection = sections[currentSectionIndex]
  const currentItem = currentSection.items?.[currentItemIndex]
  if (!currentItem) {
    throw new Error('Item not found')
  }

  const updatedItem = {
    ...currentItem,
    headline: requireText(formData.get('headline'), 'headline'),
    subline: optionalText(formData.get('subline')),
    description: optionalText(formData.get('description')),
  }

  if (currentSection.id === sectionId) {
    currentSection.items![currentItemIndex] = updatedItem
  } else {
    currentSection.items = currentSection.items!.filter((item) => item.id !== id)
    targetSection.items = [...(targetSection.items ?? []), updatedItem]
  }

  await writeSiteData(data)
  revalidateContent()
}

export async function deleteCvSectionItem(formData: FormData) {
  const data = await readSiteData()
  const id = requireText(formData.get('id'), 'id')
  const sections = data.curriculum_vitae?.sections ?? []
  sections.forEach((section) => {
    if (!section.items) return
    section.items = section.items.filter((item) => item.id !== id)
  })
  await writeSiteData(data)
  revalidateContent()
}

export async function createCv(formData: FormData) {
  const data = await readSiteData()
  data.curriculum_vitae = {
    title: requireText(formData.get('title'), 'title'),
    subtitle: requireText(formData.get('subtitle'), 'subtitle'),
    sections: data.curriculum_vitae?.sections ?? [],
  }
  await writeSiteData(data)
  revalidateContent()
}

export async function updateCv(formData: FormData) {
  const data = await readSiteData()
  if (!data.curriculum_vitae) {
    data.curriculum_vitae = { sections: [] }
  }
  data.curriculum_vitae.title = requireText(formData.get('title'), 'title')
  data.curriculum_vitae.subtitle = requireText(formData.get('subtitle'), 'subtitle')
  await writeSiteData(data)
  revalidateContent()
}

export async function createCvSection(formData: FormData) {
  const data = await readSiteData()
  if (!data.curriculum_vitae) {
    data.curriculum_vitae = { sections: [] }
  }
  const sections = data.curriculum_vitae.sections ?? []
  sections.push({
    id: crypto.randomUUID(),
    title: requireText(formData.get('title'), 'title'),
    subtitle: optionalText(formData.get('subtitle')),
    sortOrder: optionalText(formData.get('sortOrder')),
    items: [],
  })
  data.curriculum_vitae.sections = sections
  await writeSiteData(data)
  revalidateContent()
}

export async function updateCvSection(formData: FormData) {
  const data = await readSiteData()
  const id = requireText(formData.get('id'), 'id')
  const section = data.curriculum_vitae?.sections?.find((entry) => entry.id === id)
  if (!section) {
    throw new Error('Section not found')
  }
  section.title = requireText(formData.get('title'), 'title')
  section.subtitle = optionalText(formData.get('subtitle'))
  section.sortOrder = optionalText(formData.get('sortOrder'))
  await writeSiteData(data)
  revalidateContent()
}

export async function deleteCvSection(formData: FormData) {
  const data = await readSiteData()
  const id = requireText(formData.get('id'), 'id')
  if (data.curriculum_vitae?.sections) {
    data.curriculum_vitae.sections = data.curriculum_vitae.sections.filter(
      (section) => section.id !== id,
    )
  }
  await writeSiteData(data)
  revalidateContent()
}

export async function createBlogArticle(formData: FormData) {
  const data = await readSiteData()
  if (!data.blog) {
    data.blog = { articles: [] }
  }
  const articles = data.blog.articles ?? []
  const slug = requireText(formData.get('slug'), 'slug')
  articles.push({
    id: crypto.randomUUID(),
    title: requireText(formData.get('title'), 'title'),
    excerpt: requireText(formData.get('excerpt'), 'excerpt'),
    image: requireText(formData.get('image'), 'image'),
    publishedAt: normalizeDateInput(formData.get('publishedAt')),
    slug,
    content: requireText(formData.get('content'), 'content'),
    featured: formData.get('featured') === 'on',
  })
  data.blog.articles = articles
  await writeSiteData(data)
  revalidateContent()
  revalidatePath(`/blog/${slug}`)
}

export async function updateBlogArticle(formData: FormData) {
  const data = await readSiteData()
  const id = requireText(formData.get('id'), 'id')
  const article = data.blog?.articles?.find((entry) => entry.id === id)
  if (!article) {
    throw new Error('Article not found')
  }
  const previousSlug = article.slug
  article.title = requireText(formData.get('title'), 'title')
  article.excerpt = requireText(formData.get('excerpt'), 'excerpt')
  article.image = requireText(formData.get('image'), 'image')
  article.publishedAt = normalizeDateInput(formData.get('publishedAt'))
  article.slug = requireText(formData.get('slug'), 'slug')
  article.content = requireText(formData.get('content'), 'content')
  article.featured = formData.get('featured') === 'on'
  await writeSiteData(data)
  revalidateContent()
  if (previousSlug !== article.slug) {
    revalidatePath(`/blog/${previousSlug}`)
  }
  revalidatePath(`/blog/${article.slug}`)
}

export async function deleteBlogArticle(formData: FormData) {
  const data = await readSiteData()
  const id = requireText(formData.get('id'), 'id')
  const article = data.blog?.articles?.find((entry) => entry.id === id)
  if (data.blog?.articles) {
    data.blog.articles = data.blog.articles.filter((entry) => entry.id !== id)
  }
  await writeSiteData(data)
  revalidateContent()
  if (article?.slug) {
    revalidatePath(`/blog/${article.slug}`)
  }
}
