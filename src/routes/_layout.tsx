import { NavLink, Outlet } from 'react-router'

export default function AppLayout() {
  return (
    <main className='flex flex-col min-h-screen'>
      <Outlet />
    </main>
  )
}
