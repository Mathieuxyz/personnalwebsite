
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const cvBlocksTable = pgTable('cv_blocks', {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull(),
  timeline: text().notNull(),
  description: text().notNull(),
})

export const cvs = pgTable('cvs', {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull(),
  subtitle: text().notNull(),
})

export const cvSections = pgTable('cv_sections', {
  id: uuid().defaultRandom().primaryKey(),
  cvId: uuid()
    .notNull()
    .references(() => cvs.id, { onDelete: 'cascade' }),
  title: text().notNull(),
  subtitle: text(),
  sortOrder: text(),
})

export const cvSectionItems = pgTable('cv_section_items', {
  id: uuid().defaultRandom().primaryKey(),
  sectionId: uuid()
    .notNull()
    .references(() => cvSections.id, { onDelete: 'cascade' }),
  headline: text().notNull(),
  subline: text(),
  description: text(),
})

export const blogArticles = pgTable('blog_articles', {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull(),
  excerpt: text().notNull(),
  image: text().notNull(),
  publishedAt: timestamp('published_at', { mode: 'string' }).notNull(),
  slug: text().notNull(),
  content: text().notNull(),
  featured: boolean().default(false),
})
