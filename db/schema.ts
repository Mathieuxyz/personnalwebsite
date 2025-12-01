
import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const cvBlocksTable = pgTable('cv_blocks', {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull(),
  timeline: text().notNull(),
  description: text().notNull(),
})