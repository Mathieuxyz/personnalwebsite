import fs from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

import { db } from '@/db'
import { blogArticles, cvSectionItems, cvSections } from '@/db/schema'
import {
  createBlogArticle,
  createCvSectionItem,
  deleteBlogArticle,
  deleteCvSectionItem,
  updateBlogArticle,
  updateCvSectionItem,
} from '@/lib/tasks'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

const terminalInputClass =
  'w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-green-300 placeholder:text-green-500/60 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono'

function formatDateTimeLocal(value?: string | null) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const offset = date.getTimezoneOffset()
  const localTime = new Date(date.getTime() - offset * 60000)
  return localTime.toISOString().slice(0, 16)
}

async function saveImage(formData: FormData) {
  'use server'
  const file = formData.get('image')
  if (!file || !(file instanceof File) || file.size === 0) {
    throw new Error('Please select an image before uploading.')
  }

  const parsed = path.parse(file.name)
  const safeBase =
    parsed.name.replace(/[^a-zA-Z0-9_-]/g, '-').replace(/-+/g, '-').toLowerCase() ||
    `upload-${Date.now()}`
  const safeExt =
    parsed.ext && parsed.ext.length > 0
      ? parsed.ext
      : `.${file.type?.split('/').pop() ?? 'png'}`
  const relativeName = `${safeBase}${safeExt}`
  const bytes = await file.arrayBuffer()
  await fs.writeFile(path.join(PUBLIC_DIR, relativeName), Buffer.from(bytes))
  revalidatePath('/admin')
}

export default async function Admin() {
  const [sections, items, articles] = await Promise.all([
    db.select().from(cvSections),
    db.select().from(cvSectionItems),
    db.select().from(blogArticles),
  ])

  const sortedSections = [...sections].sort((a, b) => {
    const left = a.sortOrder ?? a.title
    const right = b.sortOrder ?? b.title
    return left.localeCompare(right)
  })

  const sectionMap = sortedSections.map((section) => ({
    ...section,
    items: items
      .filter((item) => item.sectionId === section.id)
      .sort((a, b) => a.headline.localeCompare(b.headline)),
  }))

  const hasSections = sortedSections.length > 0

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 text-slate-100">
      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-50">CV Terminal</h1>
          <p className="text-sm text-slate-300">
            Each prompt below reflects one row in the <code className="text-green-300">cv_section_items</code>{' '}
            table. Adjust the fields, press <span className="font-semibold text-green-300">Update</span>, or use the
            delete shortcut to remove an entry entirely.
          </p>
        </header>

        {sectionMap.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
            No CV sections available yet. Seed the <code className="text-green-300">cv_sections</code> table first so
            items can attach to a section.
          </p>
        )}

        <div className="space-y-6">
          {sectionMap.map((section) => (
            <div
              key={section.id}
              className="space-y-4 rounded-2xl border border-slate-800/70 bg-slate-950/30 p-4"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate-400">
                  Section #{section.sortOrder ?? '-'}
                </p>
                <h2 className="text-xl font-semibold text-slate-50">{section.title}</h2>
                {section.subtitle && <p className="text-sm text-slate-400">{section.subtitle}</p>}
              </div>

              {section.items.length === 0 && (
                <p className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
                  No items yet for this section.
                </p>
              )}

              <div className="space-y-4">
                {section.items.map((item) => (
                  <form
                    key={item.id}
                    action={updateCvSectionItem}
                    className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-green-300"
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-slate-400">Section</label>
                        <select
                          name="sectionId"
                          defaultValue={item.sectionId}
                          className={terminalInputClass}
                        >
                          {sortedSections.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-slate-400">Headline</label>
                        <input
                          name="headline"
                          defaultValue={item.headline}
                          className={terminalInputClass}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-slate-400">Subline</label>
                      <input
                        name="subline"
                        defaultValue={item.subline ?? ''}
                        className={terminalInputClass}
                        placeholder="dates // level"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-slate-400">Description</label>
                      <textarea
                        name="description"
                        rows={4}
                        defaultValue={item.description ?? ''}
                        className={`${terminalInputClass} min-h-[6rem]`}
                        placeholder="Long-form copy, bullet lines, etc."
                      />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        className="rounded-xl border border-blue-700/60 bg-blue-900/20 px-4 py-2 text-sm font-semibold text-blue-200 hover:bg-blue-900/40"
                      >
                        Update
                      </button>
                      <button
                        formAction={deleteCvSectionItem}
                        className="rounded-xl border border-red-700/60 bg-red-900/20 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-900/40"
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <h3 className="text-lg font-semibold text-slate-50">Add a CV item</h3>
          <form action={createCvSectionItem} className="space-y-3 text-green-300">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-slate-400">Section</label>
                <select
                  name="sectionId"
                  className={terminalInputClass}
                  required
                  disabled={!hasSections}
                >
                  {sortedSections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-slate-400">Headline</label>
                <input
                  name="headline"
                  className={terminalInputClass}
                  placeholder="Institution // Language"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-slate-400">Subline</label>
              <input
                name="subline"
                className={terminalInputClass}
                placeholder="Dates // Level (optional)"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-slate-400">Description</label>
              <textarea
                name="description"
                rows={4}
                className={`${terminalInputClass} min-h-[6rem]`}
                placeholder="Supporting text..."
              />
            </div>
            <button
              type="submit"
              disabled={!hasSections}
              className="rounded-xl border border-green-700/60 bg-green-900/20 px-4 py-2 text-sm font-semibold text-green-200 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {hasSections ? 'Add CV item' : 'Create a section first'}
            </button>
          </form>
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-50">Blog Terminal</h2>
          <p className="text-sm text-slate-300">
            This block edits the <code className="text-green-300">blog_articles</code> table. One pane equals one
            article; flip any value, press update, or execute the delete shortcut.
          </p>
        </header>

        <div className="space-y-4">
          {articles.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
              No articles yet. Compose one below to seed the feed.
            </p>
          )}

          {articles.map((article) => (
            <form
              key={article.id}
              action={updateBlogArticle}
              className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-green-300"
            >
              <input type="hidden" name="id" value={article.id} />
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-slate-400">Title</label>
                  <input name="title" defaultValue={article.title} className={terminalInputClass} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-slate-400">Slug</label>
                  <input name="slug" defaultValue={article.slug} className={terminalInputClass} required />
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-slate-400">Image path</label>
                  <input name="image" defaultValue={article.image} className={terminalInputClass} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-slate-400">Published at</label>
                  <input
                    type="datetime-local"
                    name="publishedAt"
                    defaultValue={formatDateTimeLocal(article.publishedAt)}
                    className={terminalInputClass}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-slate-400">Excerpt</label>
                <textarea
                  name="excerpt"
                  rows={3}
                  defaultValue={article.excerpt}
                  className={`${terminalInputClass} min-h-[5rem]`}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-slate-400">Content</label>
                <textarea
                  name="content"
                  rows={6}
                  defaultValue={article.content}
                  className={`${terminalInputClass} min-h-[8rem]`}
                  required
                />
              </div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={article.featured ?? false}
                  className="h-4 w-4 accent-green-400"
                />
                Featured
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl border border-blue-700/60 bg-blue-900/20 px-4 py-2 text-sm font-semibold text-blue-200 hover:bg-blue-900/40"
                >
                  Update
                </button>
                <button
                  formAction={deleteBlogArticle}
                  className="rounded-xl border border-red-700/60 bg-red-900/20 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-900/40"
                >
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <h3 className="text-lg font-semibold text-slate-50">Compose article</h3>
          <form action={createBlogArticle} className="space-y-3 text-green-300">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-slate-400">Title</label>
                <input name="title" className={terminalInputClass} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-slate-400">Slug</label>
                <input name="slug" className={terminalInputClass} required />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-slate-400">Image path</label>
                <input
                  name="image"
                  className={terminalInputClass}
                  placeholder="/Flower.jpg"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-slate-400">Published at</label>
                <input type="datetime-local" name="publishedAt" className={terminalInputClass} required />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-slate-400">Excerpt</label>
              <textarea
                name="excerpt"
                rows={3}
                className={`${terminalInputClass} min-h-[5rem]`}
                placeholder="Short intro..."
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-slate-400">Content</label>
              <textarea
                name="content"
                rows={6}
                className={`${terminalInputClass} min-h-[8rem]`}
                placeholder="Markdown or plain text"
                required
              />
            </div>
            <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
              <input type="checkbox" name="featured" className="h-4 w-4 accent-green-400" />
              Featured
            </label>
            <button
              type="submit"
              className="rounded-xl border border-green-700/60 bg-green-900/20 px-4 py-2 text-sm font-semibold text-green-200 hover:bg-green-900/40"
            >
              Publish article
            </button>
          </form>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-slate-50">Asset Console</h2>
        <p className="text-sm text-slate-300">
          Drop an image here to copy it into <code className="text-green-300">public/</code>. Reference the resulting
          path in your blog entries.
        </p>
        <form action={saveImage} className="space-y-4" encType="multipart/form-data">
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium text-slate-200">
              Select image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-xl border border-blue-700/60 bg-blue-900/20 px-4 py-2 text-sm font-semibold text-blue-200 hover:bg-blue-900/40"
          >
            Upload asset
          </button>
        </form>
      </section>
    </div>
  )
}
