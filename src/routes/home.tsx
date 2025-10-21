import type { Route } from './+types/home'
import { Form, redirect } from 'react-router'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import db from '../db'
import { shares } from '@/db/schema'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData()
  let title = formData.get('title') as string
  let content = formData.get('content') as string

  const paste = await db
    .insert(shares)
    .values({ title: title, content: content, is_public: false })
    .returning({ slug: shares.slug })

  return redirect(`/s/${paste[0].slug}`)
}

export default function Home() {
  const [content, setContent] = useState('')

  return (
    <>
      <title>MD Share</title>
      <meta name='description' content='Simple markdown share service' />

      <section className='flex-1'>
        <div className='wrapper pt-32 pb-10'>
          <h1 className='text-3xl font-bold mb-16 text-center'>
            Share snippets instantly
          </h1>

          <Form method='post' className='grid space-y-4'>
            <Input name='title' placeholder='Enter a title (optional)...' />

            <CodeMirror
              content={content}
              height='300px'
              extensions={[markdown({ codeLanguages: languages })]}
              theme={'dark'}
              onChange={setContent}
            />

            <Textarea name='content' hidden value={content} />
            <div className='flex justify-end'>
              <Button type='submit'>Create</Button>
            </div>
          </Form>
        </div>
      </section>
    </>
  )
}
