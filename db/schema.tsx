import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const cvBlocksTable = pgTable('cv_blocks', {
  id: uuid().defaultRandom().primaryKey(),   // ➜ ajoute un id !
  title: text().notNull(),
  timeline: text().notNull(),
  description: text().notNull(),
})