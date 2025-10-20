import type { Route } from './+types/share'
import db from '@/db'
import { eq } from 'drizzle-orm'
import { shares } from '@/db/schema'

export async function loader({ params }: Route.LoaderArgs) {
  const data = await db
    .select({
      title: shares.title,
      content: shares.content,
      created_at: shares.created_at,
    })
    .from(shares)
    .where(eq(shares.slug, params.slug))

  if (!data) {
    throw new Response('Not Found', { status: 404 })
  }

  return data[0]
}

export default function Paste({ loaderData }: Route.ComponentProps) {
  const { title, content, created_at } = loaderData
  const createdAt = new Date(created_at).toLocaleDateString()

  return (
    <>
      <title>{title}</title>

      <section className='flex-1'>
        <div className='wrapper pt-12 pb-10'>
          {title && <h1 className='mt-4 text-2xl'>{title}</h1>}
          <div className='text-sm text-white/70'>{createdAt}</div>
          <div className='p-4 mt-4 bg-neutral-900'>{content}</div>
        </div>
      </section>
    </>
  )
}
