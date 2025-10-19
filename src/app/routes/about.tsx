import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'About' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  return(
    <div className='m-8'>
      <h1>About Page</h1>
    </div>
  )
}
