'use server'

import { ReactNode } from "react";
import Box from "@/components/CVEntry";
import Text from "@/components/textEntry"
import GithubButton from "@/components/button";

import { db } from '@/db'
import { cvBlocksTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getBlocks() {
  return await db.select().from(cvBlocksTable)
}

export async function addBlock(form: FormData) {
  await db.insert(cvBlocksTable).values({
    title: String(form.get('title')),
    timeline: String(form.get('timeline')),
    description: String(form.get('description')),
  })
  redirect((await headers()).get('referer') ?? '/')
}

export default async function CV() {
    const cvBlocks = getBlocks();

    return (
        <div className="max-w-25xl mx-auto">
            <div className="flex flex-col my-8">
                <Text 
                    h1="Curriculum Vitae" 
                    h2="Aviation passionate, computer science and electronics enthusiast"
                />
                {Array.isArray(cvBlocks) && cvBlocks.length > 0 ? (
                    cvBlocks.map((cv_block) => (
                        <Box
                            key={cv_block.id}
                            title={cv_block.title}
                            dates={cv_block.timeline}
                            description={cv_block.description}
                        />
                    ))
                ) : (
                    <p>Aucune entrée trouvée dans la database.</p>
                )}
                <Text h1="Useful links" />
                <GithubButton />
            </div>
        </div>
    );
}