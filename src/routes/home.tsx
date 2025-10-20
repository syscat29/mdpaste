import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import { Form, redirect } from 'react-router'
import type { Route } from './+types/home'
import db from '../db'
import { shares } from '@/db/schema'

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData()
  let title = formData.get('title') as string
  let syntax = formData.get('syntax') as string
  let content = formData.get('content') as string

  const paste = await db
    .insert(shares)
    .values({ title: title, content: content, is_public: false })
    .returning({ slug: shares.slug })

  return redirect(`/p/${paste[0].slug}`)
}

export default function Home() {
  return (
    <>
      <title>Markdown Paste</title>
      <meta name='description' content='Simple markdown share service' />

      <section className='flex-1'>
        <div className='wrapper pt-32 pb-10'>
          <h1 className='text-3xl font-bold mb-16 text-center'>
            Share snippets instantly
          </h1>

          <Form method='post' className='grid space-y-4'>
            <div className='grid grid-cols-5 gap-4'>
              <div className='grid space-y-2 col-span-4'>
                <span>Title</span>
                <Input name='title' />
              </div>
              <div className='grid space-y-2'>
                <span>Syntax</span>
                <Input name='syntax' />
              </div>
            </div>

            <Textarea name='content' className='min-h-72' />

            <div className='flex justify-end'>
              <Button type='submit'>Create</Button>
            </div>
          </Form>
        </div>
      </section>
    </>
  )
}
