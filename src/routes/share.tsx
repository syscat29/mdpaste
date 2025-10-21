import type { Route } from './+types/share'
import db from '@/db'
import { shares } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/stackoverflow-dark.css'
import DOMPurify from 'isomorphic-dompurify'
import { redirect } from 'react-router'

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const data = await db
      .select({
        title: shares.title,
        content: shares.content,
        created_at: shares.created_at,
      })
      .from(shares)
      .where(eq(shares.slug, params.slug))

    if (!data || data.length === 0)
      throw new Response('Not Found', { status: 404 })

    return data[0]
  } catch (e) {
    throw new Response('Server Error', { status: 500 })
  }
}

export default function Paste({ loaderData }: Route.ComponentProps) {
  const { title, content, created_at } = loaderData
  const createdAt = new Date(created_at).toLocaleDateString()

  const marked = new Marked(
    markedHighlight({
      emptyLangClass: 'hljs',
      langPrefix: 'language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlightAuto(code).value
      },
    }),
  )

  const dirtyHTML = marked.parse(content) as string
  const sanitizedHTML = DOMPurify.sanitize(dirtyHTML, {
    USE_PROFILES: { html: true },
  })

  return (
    <>
      <title>Markdown Share</title>

      <section className='flex-1'>
        <div className='wrapper pt-12 pb-10'>
          {title && <h1 className='mt-4 text-2xl'>{title}</h1>}
          <div className='text-sm text-white/70 mb-4'>{createdAt}</div>
          <div
            className='markdown'
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          ></div>
        </div>
      </section>
    </>
  )
}
