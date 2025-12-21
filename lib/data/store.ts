import 'server-only'

import crypto from 'crypto'
import fs from 'fs/promises'
import path from 'path'

type CvItem = {
  id?: string
  headline: string
  subline?: string | null
  description?: string | null
}

type CvSection = {
  id?: string
  title: string
  subtitle?: string | null
  sortOrder?: string | null
  items?: CvItem[]
  github?: boolean
}

type CvData = {
  title?: string
  subtitle?: string | null
  sections?: CvSection[]
}

type BlogArticle = {
  id?: string
  title: string
  excerpt: string
  image: string
  publishedAt?: string
  date?: string
  slug: string
  content: string
  featured?: boolean
}

type SiteData = {
  curriculum_vitae?: CvData
  blog?: {
    articles?: BlogArticle[]
  }
  cv_log?: Array<{
    id?: string
    title: string
    timeline: string
    description: string
    createdAt?: string
  }>
}

const DATA_PATH = path.join(process.cwd(), 'data.json')

function ensureId(id?: string) {
  return id && id.length > 0 ? id : crypto.randomUUID()
}

function normalizeCvItems(items: unknown): { items: CvItem[]; changed: boolean } {
  if (!Array.isArray(items)) return { items: [], changed: false }
  let changed = false

  const normalized = items.map((item) => {
    if (!item || typeof item !== 'object') {
      changed = true
      return null
    }

    const record = item as Record<string, unknown>

    if ('headline' in record) {
      const normalizedItem: CvItem = {
        id: ensureId(record.id as string | undefined),
        headline: String(record.headline ?? '').trim(),
        subline: record.subline ? String(record.subline) : null,
        description: record.description ? String(record.description) : null,
      }
      if (record.id !== normalizedItem.id) changed = true
      return normalizedItem
    }

    if ('institution' in record) {
      changed = true
      return {
        id: ensureId(record.id as string | undefined),
        headline: String(record.institution ?? '').trim(),
        subline: record.dates ? String(record.dates) : null,
        description: record.description ? String(record.description) : null,
      }
    }

    if ('language' in record) {
      changed = true
      return {
        id: ensureId(record.id as string | undefined),
        headline: String(record.language ?? '').trim(),
        subline: record.level ? String(record.level) : null,
        description: record.note ? String(record.note) : null,
      }
    }

    changed = true
    return null
  })

  return { items: normalized.filter(Boolean) as CvItem[], changed }
}

function normalizeSiteData(raw: SiteData): { data: SiteData; changed: boolean } {
  let changed = false
  const data: SiteData = { ...raw }

  if (!data.curriculum_vitae || typeof data.curriculum_vitae !== 'object') {
    data.curriculum_vitae = { title: 'Curriculum Vitae', subtitle: '', sections: [] }
    changed = true
  }

  const cv = data.curriculum_vitae
  const sectionsInput = Array.isArray(cv.sections) ? cv.sections : []
  if (!Array.isArray(cv.sections)) {
    changed = true
  }

  const sections: CvSection[] = sectionsInput.map((section) => {
    const normalizedSection: CvSection = {
      id: ensureId(section.id),
      title: String(section.title ?? '').trim(),
      subtitle: section.subtitle ? String(section.subtitle) : null,
      sortOrder: section.sortOrder ? String(section.sortOrder) : null,
      github: section.github,
      items: [],
    }

    if (section.id !== normalizedSection.id) changed = true

    const normalizedItems = normalizeCvItems(section.items)
    if (normalizedItems.changed) changed = true
    normalizedSection.items = normalizedItems.items
    return normalizedSection
  })

  cv.sections = sections

  if (!data.blog || typeof data.blog !== 'object') {
    data.blog = { articles: [] }
    changed = true
  }

  const articlesInput = Array.isArray(data.blog.articles) ? data.blog.articles : []
  if (!Array.isArray(data.blog.articles)) {
    changed = true
  }

  data.blog.articles = articlesInput.map((article) => {
    const normalized: BlogArticle = {
      id: ensureId(article.id),
      title: String(article.title ?? '').trim(),
      excerpt: String(article.excerpt ?? '').trim(),
      image: String(article.image ?? '').trim(),
      publishedAt: article.publishedAt,
      date: article.date,
      slug: String(article.slug ?? '').trim(),
      content: String(article.content ?? '').trim(),
      featured: Boolean(article.featured),
    }

    if (!normalized.publishedAt && normalized.date) {
      const parsed = new Date(normalized.date)
      if (!Number.isNaN(parsed.getTime())) {
        normalized.publishedAt = parsed.toISOString()
        changed = true
      }
    }

    if (article.id !== normalized.id) changed = true
    return normalized
  })

  return { data, changed }
}

export async function readSiteData() {
  const raw = await fs.readFile(DATA_PATH, 'utf8')
  const parsed = JSON.parse(raw) as SiteData
  const { data, changed } = normalizeSiteData(parsed)
  if (changed) {
    await writeSiteData(data)
  }
  return data
}

export async function writeSiteData(data: SiteData) {
  const contents = JSON.stringify(data, null, 2)
  await fs.writeFile(DATA_PATH, `${contents}\n`, 'utf8')
}

export type { BlogArticle, CvData, CvItem, CvSection, SiteData }
