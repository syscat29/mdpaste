import { NavLink, Outlet } from 'react-router'

export default function AppLayout() {
  return (
    <main className='flex flex-col min-h-screen'>
      <header className='border-b border-neutral-800'>
        <div className='container max-w-5xl mx-auto py-2 flex flex-row justify-between items-center'>
          <h1>App Header</h1>
          <nav className='flex flex-row space-x-4'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
          </nav>
        </div>
      </header>
      <section className='flex-1'>
        <Outlet />
      </section>
    </main>
  )
}
