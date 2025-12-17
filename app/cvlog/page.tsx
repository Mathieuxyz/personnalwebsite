'use server'

import { db } from '@/db'
import { cvBlocksTable } from '@/db/schema'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function addBlock(form: FormData) {
  db.insert(cvBlocksTable).values({
    title: String(form.get('title')),
    timeline: String(form.get('timeline')),
    description: String(form.get('description')),
  })
  redirect((await headers()).get('referer') ?? '/')
}


export default async function CVLOG() {
  return (
    <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Add a CV block
            </h2>
            <form action={addBlock}>
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Title
                    </label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your title"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="timeline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Timeline
                    </label>
                    <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Indicate the years you worked there"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                    Description
                    </label>
                    <textarea
                    id="description"
                    name="description"
                    rows={6}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description of your role...  "
                    required
                    ></textarea>
                </div>
                <button
                type="submit"
                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
            </form>
        </div>
    </section>
    );
    }
